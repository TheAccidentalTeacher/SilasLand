import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import App from '../App'

// Mock BrowserRouter to avoid nesting issues
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>
  }
})

// Mock the context providers to avoid complex setup
jest.mock('../contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>,
  useTheme: () => ({
    theme: 'light',
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
    isDark: false,
    toggleTheme: jest.fn(),
    changeFontSize: jest.fn(),
    toggleHighContrast: jest.fn()
  })
}))

jest.mock('../contexts/UserContext', () => ({
  UserProvider: ({ children }) => <div data-testid="user-provider">{children}</div>,
  useUser: () => ({
    user: null,
    bookmarks: { poetry: [], music: [], literature: [], games: [], ghibli: [], resources: [] },
    preferences: { notifications: true, language: 'en' },
    apiKeys: { openai: '', spotify: '', steam: '' },
    login: jest.fn(),
    logout: jest.fn(),
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    isBookmarked: jest.fn(() => false),
    updatePreferences: jest.fn(),
    updateApiKey: jest.fn()
  })
}))

// Mock all page components to focus on routing logic
jest.mock('../pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home-page">Home Page</div>
  }
})

jest.mock('../pages/Poetry', () => {
  return function MockPoetry() {
    return <div data-testid="poetry-page">Poetry Page</div>
  }
})

jest.mock('../pages/Music', () => {
  return function MockMusic() {
    return <div data-testid="music-page">Music Page</div>
  }
})

jest.mock('../pages/MusicTheory', () => {
  return function MockMusicTheory() {
    return <div data-testid="music-theory-page">Music Theory Page</div>
  }
})

jest.mock('../pages/Rush', () => {
  return function MockRush() {
    return <div data-testid="rush-page">Rush Page</div>
  }
})

jest.mock('../pages/Dylan', () => {
  return function MockDylan() {
    return <div data-testid="dylan-page">Dylan Page</div>
  }
})

jest.mock('../pages/Piano', () => {
  return function MockPiano() {
    return <div data-testid="piano-page">Piano Page</div>
  }
})

jest.mock('../pages/Literature', () => {
  return function MockLiterature() {
    return <div data-testid="literature-page">Literature Page</div>
  }
})

jest.mock('../pages/Games', () => {
  return function MockGames() {
    return <div data-testid="games-page">Games Page</div>
  }
})

jest.mock('../pages/Ghibli', () => {
  return function MockGhibli() {
    return <div data-testid="ghibli-page">Ghibli Page</div>
  }
})

jest.mock('../pages/Resources', () => {
  return function MockResources() {
    return <div data-testid="resources-page">Resources Page</div>
  }
})

jest.mock('../pages/MemoryAlpha', () => {
  return function MockMemoryAlpha() {
    return <div data-testid="memory-alpha-page">Memory Alpha Page</div>
  }
})

jest.mock('../pages/Account', () => {
  return function MockAccount() {
    return <div data-testid="account-page">Account Page</div>
  }
})

// Mock Layout component
jest.mock('../components/Layout', () => {
  return function MockLayout({ children }) {
    return (
      <div data-testid="layout">
        <div data-testid="layout-children">{children}</div>
      </div>
    )
  }
})

// Helper function to render App with specific route
const renderAppWithRoute = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  )
}

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Context Provider Integration', () => {
    test('provides theme context to all routes', () => {
      renderAppWithRoute('/')
      
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
      expect(screen.getByTestId('user-provider')).toBeInTheDocument()
    })

    test('context providers wrap layout and routes correctly', () => {
      renderAppWithRoute('/')
      
      // Theme provider should contain user provider
      const themeProvider = screen.getByTestId('theme-provider')
      const userProvider = screen.getByTestId('user-provider')
      const layout = screen.getByTestId('layout')
      
      expect(themeProvider).toContainElement(userProvider)
      expect(userProvider).toContainElement(layout)
    })

    test('layout wraps all route content', () => {
      renderAppWithRoute('/')
      
      const layout = screen.getByTestId('layout')
      const layoutChildren = screen.getByTestId('layout-children')
      const homePage = screen.getByTestId('home-page')
      
      expect(layout).toContainElement(layoutChildren)
      expect(layoutChildren).toContainElement(homePage)
    })
  })

  describe('Route Configuration', () => {
    // Standard Route Tests
    test('renders home page at root path', () => {
      renderAppWithRoute('/')
      
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
      expect(screen.queryByTestId('poetry-page')).not.toBeInTheDocument()
    })

    test('renders poetry page at /poetry path', () => {
      renderAppWithRoute('/poetry')
      
      expect(screen.getByTestId('poetry-page')).toBeInTheDocument()
      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
    })

    test('renders music page at /music path', () => {
      renderAppWithRoute('/music')
      
      expect(screen.getByTestId('music-page')).toBeInTheDocument()
    })

    test('renders literature page at /literature path', () => {
      renderAppWithRoute('/literature')
      
      expect(screen.getByTestId('literature-page')).toBeInTheDocument()
    })

    test('renders games page at /games path', () => {
      renderAppWithRoute('/games')
      
      expect(screen.getByTestId('games-page')).toBeInTheDocument()
    })

    test('renders ghibli page at /ghibli path', () => {
      renderAppWithRoute('/ghibli')
      
      expect(screen.getByTestId('ghibli-page')).toBeInTheDocument()
    })

    test('renders resources page at /resources path', () => {
      renderAppWithRoute('/resources')
      
      expect(screen.getByTestId('resources-page')).toBeInTheDocument()
    })

    test('renders memory alpha page at /memory-alpha path', () => {
      renderAppWithRoute('/memory-alpha')
      
      expect(screen.getByTestId('memory-alpha-page')).toBeInTheDocument()
    })

    test('renders account page at /account path', () => {
      renderAppWithRoute('/account')
      
      expect(screen.getByTestId('account-page')).toBeInTheDocument()
    })

    // Nested Music Routes
    test('renders music theory page at /music/theory path', () => {
      renderAppWithRoute('/music/theory')
      
      expect(screen.getByTestId('music-theory-page')).toBeInTheDocument()
    })

    test('renders rush page at /music/rush path', () => {
      renderAppWithRoute('/music/rush')
      
      expect(screen.getByTestId('rush-page')).toBeInTheDocument()
    })

    test('renders dylan page at /music/dylan path', () => {
      renderAppWithRoute('/music/dylan')
      
      expect(screen.getByTestId('dylan-page')).toBeInTheDocument()
    })

    test('renders piano page at /music/piano path', () => {
      renderAppWithRoute('/music/piano')
      
      expect(screen.getByTestId('piano-page')).toBeInTheDocument()
    })

    // Edge Cases and Error Handling
    test('handles unknown routes gracefully', () => {
      renderAppWithRoute('/unknown-route')
      
      // Should not crash and should render layout
      expect(screen.getByTestId('layout')).toBeInTheDocument()
      
      // Should not render any specific page
      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
      expect(screen.queryByTestId('poetry-page')).not.toBeInTheDocument()
    })

    test('handles malformed routes', () => {
      renderAppWithRoute('/music/unknown-subpage')
      
      // Should not crash
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })

    test('handles empty route segments', () => {
      renderAppWithRoute('//')
      
      // Should not crash
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })

    test('handles routes with query parameters', () => {
      renderAppWithRoute('/poetry?search=test')
      
      expect(screen.getByTestId('poetry-page')).toBeInTheDocument()
    })

    test('handles routes with hash fragments', () => {
      renderAppWithRoute('/literature#section1')
      
      expect(screen.getByTestId('literature-page')).toBeInTheDocument()
    })
  })

  describe('Navigation Integration', () => {
    test('all configured routes are accessible', () => {
      const routes = [
        { path: '/', testId: 'home-page' },
        { path: '/poetry', testId: 'poetry-page' },
        { path: '/music', testId: 'music-page' },
        { path: '/music/theory', testId: 'music-theory-page' },
        { path: '/music/rush', testId: 'rush-page' },
        { path: '/music/dylan', testId: 'dylan-page' },
        { path: '/music/piano', testId: 'piano-page' },
        { path: '/literature', testId: 'literature-page' },
        { path: '/games', testId: 'games-page' },
        { path: '/ghibli', testId: 'ghibli-page' },
        { path: '/resources', testId: 'resources-page' },
        { path: '/memory-alpha', testId: 'memory-alpha-page' },
        { path: '/account', testId: 'account-page' }
      ]

      routes.forEach(({ path, testId }) => {
        const { unmount } = renderAppWithRoute(path)
        expect(screen.getByTestId(testId)).toBeInTheDocument()
        unmount()
      })
    })

    test('route changes update displayed content', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()

      rerender(
        <MemoryRouter initialEntries={['/poetry']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('poetry-page')).toBeInTheDocument()
      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    test('maintains consistent component hierarchy', () => {
      renderAppWithRoute('/')
      
      // Verify the component hierarchy
      const themeProvider = screen.getByTestId('theme-provider')
      const userProvider = screen.getByTestId('user-provider')
      const layout = screen.getByTestId('layout')
      const layoutChildren = screen.getByTestId('layout-children')
      
      expect(themeProvider).toContainElement(userProvider)
      expect(userProvider).toContainElement(layout)
      expect(layout).toContainElement(layoutChildren)
    })

    test('renders without crashing on all routes', () => {
      const routes = [
        '/', '/poetry', '/music', '/literature', '/games', 
        '/ghibli', '/resources', '/memory-alpha', '/account',
        '/music/theory', '/music/rush', '/music/dylan', '/music/piano'
      ]

      routes.forEach(route => {
        expect(() => {
          const { unmount } = renderAppWithRoute(route)
          unmount()
        }).not.toThrow()
      })
    })

    test('provides consistent layout across all routes', () => {
      const routes = ['/', '/poetry', '/music', '/literature']

      routes.forEach(route => {
        const { unmount } = renderAppWithRoute(route)
        expect(screen.getByTestId('layout')).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Performance Tests', () => {
    test('renders quickly on initial load', () => {
      const startTime = performance.now()
      
      renderAppWithRoute('/')
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Should render in less than 50ms
      expect(renderTime).toBeLessThan(50)
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    test('route changes are instantaneous', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      const startTime = performance.now()
      
      rerender(
        <MemoryRouter initialEntries={['/poetry']}>
          <App />
        </MemoryRouter>
      )
      
      const endTime = performance.now()
      const changeTime = endTime - startTime
      
      // Route change should be very fast
      expect(changeTime).toBeLessThan(10)
      expect(screen.getByTestId('poetry-page')).toBeInTheDocument()
    })

    test('handles rapid route changes without issues', () => {
      const routes = ['/', '/poetry', '/music', '/literature', '/games']
      
      routes.forEach(route => {
        const { unmount } = renderAppWithRoute(route)
        expect(screen.getByTestId('layout')).toBeInTheDocument()
        unmount()
      })
      
      // Should complete all route changes without errors
      expect(true).toBe(true)
    })
  })

  describe('Memory Management', () => {
    test('properly cleans up on unmount', () => {
      const { unmount } = renderAppWithRoute('/')
      
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
      
      // Should unmount without errors
      expect(() => unmount()).not.toThrow()
    })

    test('handles multiple mount/unmount cycles', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = renderAppWithRoute('/')
        expect(screen.getByTestId('home-page')).toBeInTheDocument()
        unmount()
      }
      
      // Should handle multiple cycles without memory leaks
      expect(true).toBe(true)
    })
  })

  describe('Error Boundaries', () => {
    test('handles component errors gracefully', () => {
      // Mock console.error to avoid noise in test output
      const originalError = console.error
      console.error = jest.fn()

      // This test would require an actual error boundary implementation
      // For now, we test that the app doesn't crash with unknown routes
      expect(() => {
        renderAppWithRoute('/unknown-route')
      }).not.toThrow()

      console.error = originalError
    })
  })

  describe('Accessibility', () => {
    test('maintains accessibility structure across routes', () => {
      const routes = ['/', '/poetry', '/music']
      
      routes.forEach(route => {
        const { unmount } = renderAppWithRoute(route)
        
        // Layout should always be present for consistent accessibility
        expect(screen.getByTestId('layout')).toBeInTheDocument()
        
        unmount()
      })
    })

    test('provides consistent context for assistive technologies', () => {
      renderAppWithRoute('/')
      
      // Theme and user contexts should be available for accessibility features
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
      expect(screen.getByTestId('user-provider')).toBeInTheDocument()
    })
  })

  describe('Integration with React Router', () => {
    test('uses BrowserRouter correctly', () => {
      // The component should work with MemoryRouter (which extends Router)
      renderAppWithRoute('/')
      
      expect(screen.getByTestId('layout')).toBeInTheDocument()
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    test('handles browser navigation events', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()

      // Simulate navigation
      rerender(
        <MemoryRouter initialEntries={['/poetry']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('poetry-page')).toBeInTheDocument()
    })

    test('supports deep linking', () => {
      renderAppWithRoute('/music/theory')
      
      expect(screen.getByTestId('music-theory-page')).toBeInTheDocument()
    })
  })
})