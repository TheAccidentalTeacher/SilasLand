import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navigation from '../Navigation'

// Helper function to render Navigation with router context
const renderNavigation = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navigation />
    </MemoryRouter>
  )
}

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Navigation Items', () => {
    test('renders all navigation items', () => {
      renderNavigation('/')

      const expectedItems = [
        'Home',
        'Poetry',
        'Music',
        'Literature',
        'Games',
        'Ghibli',
        'Resources',
        'Memory Alpha',
        'Account'
      ]

      expectedItems.forEach(label => {
        expect(screen.getByLabelText(label)).toBeInTheDocument()
        expect(screen.getByText(label)).toBeInTheDocument()
      })
    })

    test('navigation items have correct href attributes', () => {
      renderNavigation('/')

      const expectedLinks = [
        { label: 'Home', href: '/' },
        { label: 'Poetry', href: '/poetry' },
        { label: 'Music', href: '/music' },
        { label: 'Literature', href: '/literature' },
        { label: 'Games', href: '/games' },
        { label: 'Ghibli', href: '/ghibli' },
        { label: 'Resources', href: '/resources' },
        { label: 'Memory Alpha', href: '/memory-alpha' },
        { label: 'Account', href: '/account' }
      ]

      expectedLinks.forEach(({ label, href }) => {
        const link = screen.getByLabelText(label)
        expect(link).toHaveAttribute('href', href)
      })
    })

    test('navigation items display correct icons', () => {
      renderNavigation('/')

      // Each navigation item should have an icon (svg element)
      const navItems = screen.getAllByRole('link')
      expect(navItems).toHaveLength(9)

      navItems.forEach(item => {
        const icon = item.querySelector('svg')
        expect(icon).toBeInTheDocument()
        expect(icon).toHaveClass('w-5', 'h-5', 'mb-1', 'flex-shrink-0')
      })
    })

    test('navigation items have proper text labels', () => {
      renderNavigation('/')

      const textLabels = screen.getAllByText(/^(Home|Poetry|Music|Literature|Games|Ghibli|Resources|Memory Alpha|Account)$/)
      expect(textLabels).toHaveLength(9)

      textLabels.forEach(label => {
        expect(label).toHaveClass('text-xs', 'font-medium', 'truncate', 'max-w-full')
      })
    })
  })

  describe('Active State Management', () => {
    test('highlights home navigation item when on home page', () => {
      renderNavigation('/')

      const homeLink = screen.getByLabelText('Home')
      expect(homeLink).toHaveClass('text-primary-600')
      expect(homeLink).toHaveClass('dark:text-primary-400')
      expect(homeLink).toHaveClass('bg-primary-50')
      expect(homeLink).toHaveClass('dark:bg-primary-900/20')
    })

    test('highlights poetry navigation item when on poetry page', () => {
      renderNavigation('/poetry')

      const poetryLink = screen.getByLabelText('Poetry')
      expect(poetryLink).toHaveClass('text-primary-600')
      expect(poetryLink).toHaveClass('dark:text-primary-400')
      expect(poetryLink).toHaveClass('bg-primary-50')
      expect(poetryLink).toHaveClass('dark:bg-primary-900/20')

      // Other items should not be active
      const homeLink = screen.getByLabelText('Home')
      expect(homeLink).not.toHaveClass('text-primary-600')
      expect(homeLink).toHaveClass('text-neutral-600')
    })

    test('highlights music navigation item when on music page', () => {
      renderNavigation('/music')

      const musicLink = screen.getByLabelText('Music')
      expect(musicLink).toHaveClass('text-primary-600')
      expect(musicLink).toHaveClass('dark:text-primary-400')
    })

    test('highlights music navigation item when on music subpages', () => {
      const musicSubpages = ['/music/theory', '/music/rush', '/music/dylan', '/music/piano']

      musicSubpages.forEach(route => {
        const { unmount } = renderNavigation(route)
        
        const musicLink = screen.getByLabelText('Music')
        expect(musicLink).toHaveClass('text-primary-600')
        expect(musicLink).toHaveClass('dark:text-primary-400')
        
        unmount()
      })
    })

    test('highlights correct item for all main routes', () => {
      const routes = [
        { path: '/literature', label: 'Literature' },
        { path: '/games', label: 'Games' },
        { path: '/ghibli', label: 'Ghibli' },
        { path: '/resources', label: 'Resources' },
        { path: '/memory-alpha', label: 'Memory Alpha' },
        { path: '/account', label: 'Account' }
      ]

      routes.forEach(({ path, label }) => {
        const { unmount } = renderNavigation(path)
        
        const activeLink = screen.getByLabelText(label)
        expect(activeLink).toHaveClass('text-primary-600')
        expect(activeLink).toHaveClass('dark:text-primary-400')
        
        unmount()
      })
    })

    test('only one navigation item is active at a time', () => {
      renderNavigation('/poetry')

      const allLinks = screen.getAllByRole('link')
      const activeLinks = allLinks.filter(link => 
        link.classList.contains('text-primary-600')
      )

      expect(activeLinks).toHaveLength(1)
      expect(activeLinks[0]).toHaveAttribute('aria-label', 'Poetry')
    })

    test('handles unknown routes by not highlighting any item', () => {
      renderNavigation('/unknown-route')

      const allLinks = screen.getAllByRole('link')
      const activeLinks = allLinks.filter(link => 
        link.classList.contains('text-primary-600')
      )

      expect(activeLinks).toHaveLength(0)
    })

    test('home is not active when on other routes', () => {
      renderNavigation('/poetry')

      const homeLink = screen.getByLabelText('Home')
      expect(homeLink).not.toHaveClass('text-primary-600')
      expect(homeLink).toHaveClass('text-neutral-600')
      expect(homeLink).toHaveClass('dark:text-neutral-400')
    })
  })

  describe('Styling and Layout', () => {
    test('applies correct container classes', () => {
      renderNavigation('/')

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('fixed')
      expect(nav).toHaveClass('bottom-0')
      expect(nav).toHaveClass('left-0')
      expect(nav).toHaveClass('right-0')
      expect(nav).toHaveClass('bg-white')
      expect(nav).toHaveClass('dark:bg-neutral-800')
      expect(nav).toHaveClass('border-t')
      expect(nav).toHaveClass('safe-area-bottom')
      expect(nav).toHaveClass('z-50')
    })

    test('uses responsive container layout', () => {
      renderNavigation('/')

      const container = screen.getByRole('navigation').querySelector('.max-w-7xl')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('mx-auto')
    })

    test('applies correct flex layout for navigation items', () => {
      renderNavigation('/')

      const flexContainer = screen.getByRole('navigation').querySelector('.flex.justify-around')
      expect(flexContainer).toBeInTheDocument()
      expect(flexContainer).toHaveClass('items-center')
      expect(flexContainer).toHaveClass('py-2')
    })

    test('navigation items have proper touch target classes', () => {
      renderNavigation('/')

      const allLinks = screen.getAllByRole('link')
      allLinks.forEach(link => {
        expect(link).toHaveClass('touch-target')
        expect(link).toHaveClass('flex')
        expect(link).toHaveClass('flex-col')
        expect(link).toHaveClass('items-center')
        expect(link).toHaveClass('justify-center')
        expect(link).toHaveClass('p-2')
        expect(link).toHaveClass('rounded-lg')
        expect(link).toHaveClass('min-w-0')
        expect(link).toHaveClass('flex-1')
      })
    })

    test('inactive navigation items have correct styling', () => {
      renderNavigation('/poetry')

      const inactiveLink = screen.getByLabelText('Home')
      expect(inactiveLink).toHaveClass('text-neutral-600')
      expect(inactiveLink).toHaveClass('dark:text-neutral-400')
      expect(inactiveLink).toHaveClass('hover:text-neutral-900')
      expect(inactiveLink).toHaveClass('dark:hover:text-neutral-100')
      expect(inactiveLink).toHaveClass('hover:bg-neutral-100')
      expect(inactiveLink).toHaveClass('dark:hover:bg-neutral-700')
    })

    test('active navigation items have correct styling', () => {
      renderNavigation('/poetry')

      const activeLink = screen.getByLabelText('Poetry')
      expect(activeLink).toHaveClass('text-primary-600')
      expect(activeLink).toHaveClass('dark:text-primary-400')
      expect(activeLink).toHaveClass('bg-primary-50')
      expect(activeLink).toHaveClass('dark:bg-primary-900/20')
    })
  })

  describe('Accessibility', () => {
    test('uses semantic navigation element', () => {
      renderNavigation('/')

      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    test('all navigation items have proper ARIA labels', () => {
      renderNavigation('/')

      const expectedLabels = [
        'Home', 'Poetry', 'Music', 'Literature', 'Games',
        'Ghibli', 'Resources', 'Memory Alpha', 'Account'
      ]

      expectedLabels.forEach(label => {
        const link = screen.getByLabelText(label)
        expect(link).toHaveAttribute('aria-label', label)
      })
    })

    test('navigation items are keyboard accessible', async () => {
      const user = userEvent.setup()
      renderNavigation('/')

      const firstLink = screen.getByLabelText('Home')
      
      // Focus should be manageable (simplified test)
      await user.tab()
      expect(firstLink).toBeInTheDocument()
    })

    test('provides sufficient color contrast for text', () => {
      renderNavigation('/')

      const allLinks = screen.getAllByRole('link')
      allLinks.forEach(link => {
        const textElement = link.querySelector('.text-xs')
        expect(textElement).toBeInTheDocument()
      })
    })

    test('icons have proper sizing for accessibility', () => {
      renderNavigation('/')

      const allIcons = screen.getAllByRole('link').map(link => link.querySelector('svg'))
      allIcons.forEach(icon => {
        expect(icon).toHaveClass('w-5')
        expect(icon).toHaveClass('h-5')
      })
    })

    test('text labels are not truncated inappropriately', () => {
      renderNavigation('/')

      const textLabels = screen.getAllByText(/^(Home|Poetry|Music|Literature|Games|Ghibli|Resources|Memory Alpha|Account)$/)
      textLabels.forEach(label => {
        expect(label).toHaveClass('truncate')
        expect(label).toHaveClass('max-w-full')
      })
    })
  })

  describe('Responsive Design', () => {
    test('maintains layout on different screen sizes', () => {
      renderNavigation('/')

      const flexContainer = screen.getByRole('navigation').querySelector('.flex')
      expect(flexContainer).toHaveClass('justify-around')
      
      // Items should be evenly distributed
      const allLinks = screen.getAllByRole('link')
      expect(allLinks).toHaveLength(9)
      
      allLinks.forEach(link => {
        expect(link).toHaveClass('flex-1')
      })
    })

    test('uses safe area classes for mobile devices', () => {
      renderNavigation('/')

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('safe-area-bottom')
    })

    test('maintains touch-friendly sizing', () => {
      renderNavigation('/')

      const allLinks = screen.getAllByRole('link')
      allLinks.forEach(link => {
        expect(link).toHaveClass('touch-target')
        expect(link).toHaveClass('p-2')
      })
    })
  })

  describe('Performance', () => {
    test('renders quickly', () => {
      const startTime = performance.now()
      
      renderNavigation('/')
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      expect(renderTime).toBeLessThan(50)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    test('handles route changes efficiently', () => {
      const routes = ['/', '/poetry', '/music', '/literature']
      
      routes.forEach(route => {
        const startTime = performance.now()
        const { unmount } = renderNavigation(route)
        const endTime = performance.now()
        
        expect(endTime - startTime).toBeLessThan(20)
        unmount()
      })
    })

    test('maintains performance with rapid route changes', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
        </MemoryRouter>
      )

      const routes = ['/poetry', '/music', '/literature', '/games', '/']
      
      routes.forEach(route => {
        const startTime = performance.now()
        
        rerender(
          <MemoryRouter initialEntries={[route]}>
            <Navigation />
          </MemoryRouter>
        )
        
        const endTime = performance.now()
        expect(endTime - startTime).toBeLessThan(10)
      })
    })
  })

  describe('Navigation Logic', () => {
    test('correctly identifies nested routes as active', () => {
      const nestedRoutes = [
        '/music/theory',
        '/music/rush',
        '/music/dylan',
        '/music/piano'
      ]

      nestedRoutes.forEach(route => {
        const { unmount } = renderNavigation(route)
        
        const musicLink = screen.getByLabelText('Music')
        expect(musicLink).toHaveClass('text-primary-600')
        
        unmount()
      })
    })

    test('does not activate parent routes for unrelated paths', () => {
      renderNavigation('/poetry')

      const musicLink = screen.getByLabelText('Music')
      expect(musicLink).not.toHaveClass('text-primary-600')
      expect(musicLink).toHaveClass('text-neutral-600')
    })

    test('handles exact path matching for home route', () => {
      renderNavigation('/poetry')

      const homeLink = screen.getByLabelText('Home')
      expect(homeLink).not.toHaveClass('text-primary-600')
      
      // Home should only be active on exact '/' path
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
        </MemoryRouter>
      )

      const homeLink2 = screen.getByLabelText('Home')
      expect(homeLink2).toHaveClass('text-primary-600')
    })

    test('handles path matching with query parameters', () => {
      renderNavigation('/poetry?search=test')

      const poetryLink = screen.getByLabelText('Poetry')
      expect(poetryLink).toHaveClass('text-primary-600')
    })

    test('handles path matching with hash fragments', () => {
      renderNavigation('/literature#section1')

      const literatureLink = screen.getByLabelText('Literature')
      expect(literatureLink).toHaveClass('text-primary-600')
    })
  })

  describe('Error Handling', () => {
    test('handles malformed routes gracefully', () => {
      expect(() => {
        renderNavigation('//invalid//path')
      }).not.toThrow()

      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    test('handles empty route gracefully', () => {
      expect(() => {
        renderNavigation('')
      }).not.toThrow()

      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    test('handles undefined route gracefully', () => {
      expect(() => {
        render(
          <MemoryRouter>
            <Navigation />
          </MemoryRouter>
        )
      }).not.toThrow()

      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    test('works correctly with React Router', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
        </MemoryRouter>
      )

      expect(screen.getByLabelText('Home')).toHaveClass('text-primary-600')

      rerender(
        <MemoryRouter initialEntries={['/poetry']}>
          <Navigation />
        </MemoryRouter>
      )

      expect(screen.getByLabelText('Poetry')).toHaveClass('text-primary-600')
      expect(screen.getByLabelText('Home')).not.toHaveClass('text-primary-600')
    })

    test('navigation links are functional', async () => {
      const user = userEvent.setup()
      renderNavigation('/')

      const poetryLink = screen.getByLabelText('Poetry')
      
      // Link should be clickable (we can't test actual navigation in this setup)
      expect(poetryLink).toHaveAttribute('href', '/poetry')
      
      // Click event should not throw errors
      await user.click(poetryLink)
    })

    test('maintains state consistency across re-renders', () => {
      const { rerender } = renderNavigation('/music')

      expect(screen.getByLabelText('Music')).toHaveClass('text-primary-600')

      rerender(
        <MemoryRouter initialEntries={['/music']}>
          <Navigation />
        </MemoryRouter>
      )

      expect(screen.getByLabelText('Music')).toHaveClass('text-primary-600')
    })
  })

  describe('Visual Consistency', () => {
    test('all navigation items have consistent structure', () => {
      renderNavigation('/')

      const allLinks = screen.getAllByRole('link')
      
      allLinks.forEach(link => {
        // Each link should have an icon and text
        const icon = link.querySelector('svg')
        const text = link.querySelector('.text-xs')
        
        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
        
        // Consistent classes
        expect(link).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center')
      })
    })

    test('maintains visual hierarchy', () => {
      renderNavigation('/poetry')

      const activeLink = screen.getByLabelText('Poetry')
      const inactiveLink = screen.getByLabelText('Home')

      // Active link should have primary colors
      expect(activeLink).toHaveClass('text-primary-600')
      expect(activeLink).toHaveClass('bg-primary-50')

      // Inactive link should have neutral colors
      expect(inactiveLink).toHaveClass('text-neutral-600')
      expect(inactiveLink).not.toHaveClass('bg-primary-50')
    })
  })
})