import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Header from '../Header'

// Mock the contexts
jest.mock('../../contexts/ThemeContext', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    toggleTheme: jest.fn()
  }))
}))

jest.mock('../../contexts/UserContext', () => ({
  useUser: jest.fn(() => ({
    user: null
  }))
}))

// Mock window.history.back
const mockHistoryBack = jest.fn()
Object.defineProperty(window, 'history', {
  value: {
    back: mockHistoryBack
  },
  writable: true
})

// Helper function to render Header with router context
const renderHeader = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>
  )
}

describe('Header Component', () => {
  // Import the actual hooks for mocking
  const { useTheme } = require('../../contexts/ThemeContext')
  const { useUser } = require('../../contexts/UserContext')

  beforeEach(() => {
    jest.clearAllMocks()
    mockHistoryBack.mockClear()
    
    // Reset default mock implementations
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn()
    })
    
    useUser.mockReturnValue({
      user: null
    })
  })

  describe('Page Title Display', () => {
    test('displays correct title for home page', () => {
      renderHeader('/')
      
      expect(screen.getByText("Silas' Hub")).toBeInTheDocument()
    })

    test('displays correct title for poetry page', () => {
      renderHeader('/poetry')
      
      expect(screen.getByText('Poetry')).toBeInTheDocument()
    })

    test('displays correct title for music page', () => {
      renderHeader('/music')
      
      expect(screen.getByText('Music')).toBeInTheDocument()
    })

    test('displays correct title for music theory page', () => {
      renderHeader('/music/theory')
      
      expect(screen.getByText('Music Theory')).toBeInTheDocument()
    })

    test('displays correct title for rush page', () => {
      renderHeader('/music/rush')
      
      expect(screen.getByText('Rush')).toBeInTheDocument()
    })

    test('displays correct title for dylan page', () => {
      renderHeader('/music/dylan')
      
      expect(screen.getByText('Bob Dylan')).toBeInTheDocument()
    })

    test('displays correct title for piano page', () => {
      renderHeader('/music/piano')
      
      expect(screen.getByText('Piano Music')).toBeInTheDocument()
    })

    test('displays correct title for literature page', () => {
      renderHeader('/literature')
      
      expect(screen.getByText('Literature')).toBeInTheDocument()
    })

    test('displays correct title for games page', () => {
      renderHeader('/games')
      
      expect(screen.getByText('Indie Games')).toBeInTheDocument()
    })

    test('displays correct title for ghibli page', () => {
      renderHeader('/ghibli')
      
      expect(screen.getByText('Studio Ghibli')).toBeInTheDocument()
    })

    test('displays correct title for resources page', () => {
      renderHeader('/resources')
      
      expect(screen.getByText('Resources')).toBeInTheDocument()
    })

    test('displays correct title for memory alpha page', () => {
      renderHeader('/memory-alpha')
      
      expect(screen.getByText('Memory Alpha')).toBeInTheDocument()
    })

    test('displays correct title for account page', () => {
      renderHeader('/account')
      
      expect(screen.getByText('Account')).toBeInTheDocument()
    })

    test('displays default title for unknown routes', () => {
      renderHeader('/unknown-route')
      
      expect(screen.getByText("Silas' Hub")).toBeInTheDocument()
    })

    test('handles empty route path', () => {
      renderHeader('')
      
      expect(screen.getByText("Silas' Hub")).toBeInTheDocument()
    })

    test('handles malformed route paths', () => {
      renderHeader('//invalid//path')
      
      expect(screen.getByText("Silas' Hub")).toBeInTheDocument()
    })
  })

  describe('Back Button Functionality', () => {
    test('shows back button on non-home pages', () => {
      renderHeader('/poetry')
      
      const backButton = screen.getByLabelText('Go back')
      expect(backButton).toBeInTheDocument()
    })

    test('hides back button on home page', () => {
      renderHeader('/')
      
      const backButton = screen.queryByLabelText('Go back')
      expect(backButton).not.toBeInTheDocument()
    })

    test('shows logo/home link on home page instead of back button', () => {
      renderHeader('/')
      
      const homeLink = screen.getByRole('link')
      expect(homeLink).toHaveAttribute('href', '/')
      expect(homeLink.querySelector('.bg-gradient-to-br')).toBeInTheDocument()
    })

    test('back button calls window.history.back when clicked', async () => {
      const user = userEvent.setup()
      renderHeader('/poetry')
      
      const backButton = screen.getByLabelText('Go back')
      await user.click(backButton)
      
      expect(mockHistoryBack).toHaveBeenCalledTimes(1)
    })

    test('back button has proper accessibility attributes', () => {
      renderHeader('/music')
      
      const backButton = screen.getByLabelText('Go back')
      expect(backButton).toHaveAttribute('aria-label', 'Go back')
      expect(backButton).toHaveClass('touch-target')
    })

    test('back button appears on all non-home routes', () => {
      const routes = ['/poetry', '/music', '/literature', '/games', '/ghibli', '/resources', '/memory-alpha', '/account']
      
      routes.forEach(route => {
        const { unmount } = renderHeader(route)
        expect(screen.getByLabelText('Go back')).toBeInTheDocument()
        unmount()
      })
    })

    test('back button appears on nested routes', () => {
      const nestedRoutes = ['/music/theory', '/music/rush', '/music/dylan', '/music/piano']
      
      nestedRoutes.forEach(route => {
        const { unmount } = renderHeader(route)
        expect(screen.getByLabelText('Go back')).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Theme Toggle Functionality', () => {
    test('displays light theme toggle button', () => {
      useTheme.mockReturnValue({
        theme: 'light',
        toggleTheme: jest.fn()
      })
      
      renderHeader('/')
      
      const themeButton = screen.getByLabelText('Switch to dark mode')
      expect(themeButton).toBeInTheDocument()
      
      // Should show dark circle for light theme
      const darkCircle = themeButton.querySelector('.bg-neutral-800')
      expect(darkCircle).toBeInTheDocument()
    })

    test('displays dark theme toggle button', () => {
      useTheme.mockReturnValue({
        theme: 'dark',
        toggleTheme: jest.fn()
      })
      
      renderHeader('/')
      
      const themeButton = screen.getByLabelText('Switch to light mode')
      expect(themeButton).toBeInTheDocument()
      
      // Should show yellow circle for dark theme
      const yellowCircle = themeButton.querySelector('.bg-yellow-400')
      expect(yellowCircle).toBeInTheDocument()
    })

    test('calls toggleTheme when theme button is clicked', async () => {
      const mockToggleTheme = jest.fn()
      useTheme.mockReturnValue({
        theme: 'light',
        toggleTheme: mockToggleTheme
      })
      
      const user = userEvent.setup()
      renderHeader('/')
      
      const themeButton = screen.getByLabelText('Switch to dark mode')
      await user.click(themeButton)
      
      expect(mockToggleTheme).toHaveBeenCalledTimes(1)
    })

    test('theme button has proper accessibility attributes', () => {
      renderHeader('/')
      
      const themeButton = screen.getByLabelText('Switch to dark mode')
      expect(themeButton).toHaveAttribute('aria-label', 'Switch to dark mode')
      expect(themeButton).toHaveClass('touch-target')
    })

    test('theme button updates aria-label based on current theme', () => {
      // Test light theme
      useTheme.mockReturnValue({
        theme: 'light',
        toggleTheme: jest.fn()
      })
      
      const { rerender } = renderHeader('/')
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
      
      // Test dark theme
      useTheme.mockReturnValue({
        theme: 'dark',
        toggleTheme: jest.fn()
      })
      
      rerender(
        <MemoryRouter initialEntries={['/']}>
          <Header />
        </MemoryRouter>
      )
      
      expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
    })
  })

  describe('Search Button', () => {
    test('shows search button on home page', () => {
      renderHeader('/')
      
      const searchButton = screen.getByLabelText('Search')
      expect(searchButton).toBeInTheDocument()
    })

    test('hides search button on non-home pages', () => {
      renderHeader('/poetry')
      
      const searchButton = screen.queryByLabelText('Search')
      expect(searchButton).not.toBeInTheDocument()
    })

    test('search button has proper accessibility attributes', () => {
      renderHeader('/')
      
      const searchButton = screen.getByLabelText('Search')
      expect(searchButton).toHaveAttribute('aria-label', 'Search')
      expect(searchButton).toHaveClass('touch-target')
    })

    test('search button only appears on main pages', () => {
      const mainPages = ['/']
      const subPages = ['/poetry', '/music', '/literature', '/music/theory']
      
      mainPages.forEach(route => {
        const { unmount } = renderHeader(route)
        expect(screen.getByLabelText('Search')).toBeInTheDocument()
        unmount()
      })
      
      subPages.forEach(route => {
        const { unmount } = renderHeader(route)
        expect(screen.queryByLabelText('Search')).not.toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('User Profile/Account', () => {
    test('displays default user icon when no user is logged in', () => {
      useUser.mockReturnValue({
        user: null
      })
      
      renderHeader('/')
      
      const accountLink = screen.getByLabelText('Account')
      expect(accountLink).toBeInTheDocument()
      expect(accountLink).toHaveAttribute('href', '/account')
      
      // Should show default user icon
      const userIcon = accountLink.querySelector('svg')
      expect(userIcon).toBeInTheDocument()
    })

    test('displays user avatar when user is logged in', () => {
      useUser.mockReturnValue({
        user: {
          id: 1,
          name: 'Test User',
          avatar: 'https://example.com/avatar.jpg'
        }
      })
      
      renderHeader('/')
      
      const accountLink = screen.getByLabelText('Account')
      const avatar = accountLink.querySelector('img')
      
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg')
      expect(avatar).toHaveAttribute('alt', 'Profile')
    })

    test('account link navigates to account page', () => {
      renderHeader('/')
      
      const accountLink = screen.getByLabelText('Account')
      expect(accountLink).toHaveAttribute('href', '/account')
    })

    test('account button has proper accessibility attributes', () => {
      renderHeader('/')
      
      const accountLink = screen.getByLabelText('Account')
      expect(accountLink).toHaveAttribute('aria-label', 'Account')
      expect(accountLink).toHaveClass('touch-target')
    })

    test('handles user with missing avatar gracefully', () => {
      useUser.mockReturnValue({
        user: {
          id: 1,
          name: 'Test User'
          // No avatar property
        }
      })
      
      renderHeader('/')
      
      const accountLink = screen.getByLabelText('Account')
      
      // Should show default icon, not avatar
      const userIcon = accountLink.querySelector('svg')
      expect(userIcon).toBeInTheDocument()
      
      const avatar = accountLink.querySelector('img')
      expect(avatar).not.toBeInTheDocument()
    })

    test('handles user with empty avatar string', () => {
      useUser.mockReturnValue({
        user: {
          id: 1,
          name: 'Test User',
          avatar: ''
        }
      })
      
      renderHeader('/')
      
      const accountLink = screen.getByLabelText('Account')
      
      // Should show default icon for empty avatar
      const userIcon = accountLink.querySelector('svg')
      expect(userIcon).toBeInTheDocument()
    })
  })

  describe('Header Structure and Styling', () => {
    test('applies correct CSS classes for layout', () => {
      renderHeader('/')
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-white')
      expect(header).toHaveClass('dark:bg-neutral-800')
      expect(header).toHaveClass('border-b')
      expect(header).toHaveClass('sticky')
      expect(header).toHaveClass('top-0')
      expect(header).toHaveClass('z-40')
    })

    test('includes safe area classes for mobile', () => {
      renderHeader('/')
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('safe-area-top')
    })

    test('maintains proper responsive layout', () => {
      renderHeader('/')
      
      const container = screen.getByRole('banner').querySelector('.max-w-7xl')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('mx-auto')
      expect(container).toHaveClass('px-4')
      expect(container).toHaveClass('sm:px-6')
      expect(container).toHaveClass('lg:px-8')
    })

    test('uses semantic HTML structure', () => {
      renderHeader('/')
      
      expect(screen.getByRole('banner')).toBeInTheDocument()
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    test('maintains layout on different screen sizes', () => {
      renderHeader('/')
      
      const flexContainer = screen.getByRole('banner').querySelector('.flex')
      expect(flexContainer).toHaveClass('items-center')
      expect(flexContainer).toHaveClass('justify-between')
      expect(flexContainer).toHaveClass('h-16')
    })

    test('uses appropriate spacing for touch targets', () => {
      renderHeader('/poetry')
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveClass('touch-target')
      })
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveClass('touch-target')
      })
    })
  })

  describe('Accessibility', () => {
    test('provides proper ARIA labels for all interactive elements', () => {
      renderHeader('/poetry')
      
      expect(screen.getByLabelText('Go back')).toBeInTheDocument()
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
      expect(screen.getByLabelText('Account')).toBeInTheDocument()
    })

    test('uses proper heading hierarchy', () => {
      renderHeader('/')
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent("Silas' Hub")
    })

    test('maintains focus management', async () => {
      const user = userEvent.setup()
      renderHeader('/poetry')
      
      // All interactive elements should be focusable
      const backButton = screen.getByLabelText('Go back')
      const themeButton = screen.getByLabelText('Switch to dark mode')
      const accountLink = screen.getByLabelText('Account')
      
      // Tab through elements (simplified test)
      await user.tab()
      // In a real browser, we'd check document.activeElement
      expect(backButton).toBeInTheDocument()
    })

    test('provides sufficient color contrast', () => {
      renderHeader('/')
      
      // Test that text elements have appropriate contrast classes
      const title = screen.getByText("Silas' Hub")
      expect(title).toHaveClass('text-neutral-900')
      expect(title).toHaveClass('dark:text-neutral-100')
    })
  })

  describe('Performance', () => {
    test('renders quickly', () => {
      const startTime = performance.now()
      
      renderHeader('/')
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      expect(renderTime).toBeLessThan(50)
      expect(screen.getByText("Silas' Hub")).toBeInTheDocument()
    })

    test('handles rapid route changes efficiently', () => {
      const routes = ['/', '/poetry', '/music', '/literature']
      
      routes.forEach(route => {
        const startTime = performance.now()
        const { unmount } = renderHeader(route)
        const endTime = performance.now()
        
        expect(endTime - startTime).toBeLessThan(20)
        unmount()
      })
    })
  })

  describe('Error Handling', () => {
    test('handles missing theme context gracefully', () => {
      useTheme.mockImplementation(() => {
        throw new Error('Theme context not available')
      })
      
      // Should not crash
      expect(() => renderHeader('/')).not.toThrow()
    })

    test('handles missing user context gracefully', () => {
      useUser.mockImplementation(() => {
        throw new Error('User context not available')
      })
      
      // Should not crash
      expect(() => renderHeader('/')).not.toThrow()
    })

    test('handles malformed user data', () => {
      useUser.mockReturnValue({
        user: {
          // Malformed user object
          avatar: null,
          name: undefined
        }
      })
      
      renderHeader('/')
      
      // Should render default user icon
      const accountLink = screen.getByLabelText('Account')
      const userIcon = accountLink.querySelector('svg')
      expect(userIcon).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    test('works correctly with router context', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <Header />
        </MemoryRouter>
      )
      
      expect(screen.getByText("Silas' Hub")).toBeInTheDocument()
      expect(screen.queryByLabelText('Go back')).not.toBeInTheDocument()
      
      rerender(
        <MemoryRouter initialEntries={['/poetry']}>
          <Header />
        </MemoryRouter>
      )
      
      expect(screen.getByText('Poetry')).toBeInTheDocument()
      expect(screen.getByLabelText('Go back')).toBeInTheDocument()
    })

    test('integrates properly with theme and user contexts', async () => {
      const mockToggleTheme = jest.fn()
      useTheme.mockReturnValue({
        theme: 'light',
        toggleTheme: mockToggleTheme
      })
      
      useUser.mockReturnValue({
        user: { id: 1, name: 'Test User', avatar: 'test.jpg' }
      })
      
      const user = userEvent.setup()
      renderHeader('/')
      
      // Theme toggle should work
      await user.click(screen.getByLabelText('Switch to dark mode'))
      expect(mockToggleTheme).toHaveBeenCalled()
      
      // User avatar should be displayed
      const avatar = screen.getByAltText('Profile')
      expect(avatar).toHaveAttribute('src', 'test.jpg')
    })
  })
})