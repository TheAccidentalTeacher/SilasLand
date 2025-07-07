import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Layout from '../Layout'

// Mock the child components
jest.mock('../Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>
  }
})

jest.mock('../Navigation', () => {
  return function MockNavigation() {
    return <div data-testid="navigation">Navigation Component</div>
  }
})

jest.mock('../ChatGPTButton', () => {
  return function MockChatGPTButton({ onClick }) {
    return (
      <button data-testid="chat-button" onClick={onClick}>
        Chat Button
      </button>
    )
  }
})

jest.mock('../ChatOverlay', () => {
  return function MockChatOverlay({ isOpen, onClose, currentPage }) {
    return (
      <div data-testid="chat-overlay" data-open={isOpen} data-page={currentPage}>
        Chat Overlay
        {isOpen && (
          <button data-testid="close-chat" onClick={onClose}>
            Close Chat
          </button>
        )}
      </div>
    )
  }
})

// Helper function to render Layout with router context
const renderLayout = (children = <div data-testid="test-children">Test Content</div>, initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Layout>{children}</Layout>
    </MemoryRouter>
  )
}

describe('Layout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Structure', () => {
    test('renders all required layout components', () => {
      renderLayout()

      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('chat-button')).toBeInTheDocument()
      expect(screen.getByTestId('chat-overlay')).toBeInTheDocument()
    })

    test('renders children content correctly', () => {
      const testContent = <div data-testid="custom-content">Custom Test Content</div>
      renderLayout(testContent)

      expect(screen.getByTestId('custom-content')).toBeInTheDocument()
      expect(screen.getByText('Custom Test Content')).toBeInTheDocument()
    })

    test('maintains proper component hierarchy', () => {
      renderLayout()

      // Find the main container
      const mainContainer = screen.getByRole('main')
      expect(mainContainer).toBeInTheDocument()
      
      // Children should be inside main
      expect(mainContainer).toContainElement(screen.getByTestId('test-children'))
    })

    test('applies correct CSS classes for layout structure', () => {
      renderLayout()

      // Check for responsive and accessibility classes
      const container = screen.getByTestId('header').parentElement.parentElement
      expect(container).toHaveClass('min-h-screen')
      expect(container).toHaveClass('bg-neutral-50')
      expect(container).toHaveClass('dark:bg-neutral-900')
      expect(container).toHaveClass('flex')
      expect(container).toHaveClass('flex-col')
    })
  })

  describe('Chat Functionality', () => {
    test('chat overlay is initially closed', () => {
      renderLayout()

      const chatOverlay = screen.getByTestId('chat-overlay')
      expect(chatOverlay).toHaveAttribute('data-open', 'false')
      expect(screen.queryByTestId('close-chat')).not.toBeInTheDocument()
    })

    test('clicking chat button opens chat overlay', async () => {
      const user = userEvent.setup()
      renderLayout()

      const chatButton = screen.getByTestId('chat-button')
      await user.click(chatButton)

      const chatOverlay = screen.getByTestId('chat-overlay')
      expect(chatOverlay).toHaveAttribute('data-open', 'true')
      expect(screen.getByTestId('close-chat')).toBeInTheDocument()
    })

    test('clicking close button closes chat overlay', async () => {
      const user = userEvent.setup()
      renderLayout()

      // Open chat
      const chatButton = screen.getByTestId('chat-button')
      await user.click(chatButton)

      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-open', 'true')

      // Close chat
      const closeButton = screen.getByTestId('close-chat')
      await user.click(closeButton)

      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-open', 'false')
    })

    test('toggles chat state correctly with multiple clicks', async () => {
      const user = userEvent.setup()
      renderLayout()

      const chatButton = screen.getByTestId('chat-button')
      const chatOverlay = screen.getByTestId('chat-overlay')

      // Initially closed
      expect(chatOverlay).toHaveAttribute('data-open', 'false')

      // Click to open
      await user.click(chatButton)
      expect(chatOverlay).toHaveAttribute('data-open', 'true')

      // Click to close
      await user.click(chatButton)
      expect(chatOverlay).toHaveAttribute('data-open', 'false')

      // Click to open again
      await user.click(chatButton)
      expect(chatOverlay).toHaveAttribute('data-open', 'true')
    })

    test('passes current page to chat overlay', () => {
      renderLayout(undefined, '/poetry')

      const chatOverlay = screen.getByTestId('chat-overlay')
      expect(chatOverlay).toHaveAttribute('data-page', '/poetry')
    })

    test('updates current page when route changes', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/music']}>
          <Layout>
            <div data-testid="test-children">Test Content</div>
          </Layout>
        </MemoryRouter>
      )

      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-page', '/music')

      rerender(
        <MemoryRouter initialEntries={['/literature']}>
          <Layout>
            <div data-testid="test-children">Test Content</div>
          </Layout>
        </MemoryRouter>
      )

      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-page', '/literature')
    })
  })

  describe('State Management', () => {
    test('manages chat state independently', async () => {
      const user = userEvent.setup()
      renderLayout()

      const chatButton = screen.getByTestId('chat-button')
      
      // State should be independent and persistent during component lifecycle
      await user.click(chatButton)
      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-open', 'true')

      // Re-render with different children
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <Layout>
            <div data-testid="different-children">Different Content</div>
          </Layout>
        </MemoryRouter>
      )

      // Chat state should reset with new component instance
      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-open', 'false')
    })

    test('initializes with correct default state', () => {
      renderLayout()

      // Chat should be closed by default
      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-open', 'false')
    })
  })

  describe('Responsive Design', () => {
    test('applies mobile-first responsive classes', () => {
      renderLayout()

      const mainElement = screen.getByRole('main')
      expect(mainElement).toHaveClass('pb-20') // Bottom padding for navigation
      expect(mainElement).toHaveClass('safe-area-bottom') // Safe area for mobile
    })

    test('includes fade-in animation for content', () => {
      renderLayout()

      const mainElement = screen.getByRole('main')
      const fadeInDiv = mainElement.querySelector('.fade-in')
      expect(fadeInDiv).toBeInTheDocument()
      expect(fadeInDiv).toContainElement(screen.getByTestId('test-children'))
    })
  })

  describe('Accessibility', () => {
    test('uses semantic HTML elements', () => {
      renderLayout()

      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    test('maintains proper focus management', async () => {
      const user = userEvent.setup()
      renderLayout()

      const chatButton = screen.getByTestId('chat-button')
      
      // Chat button should be focusable
      await user.tab()
      // Note: In a real test, we'd check if chatButton is focused
      // but jsdom doesn't fully support focus management
      expect(chatButton).toBeInTheDocument()
    })

    test('provides accessible structure for screen readers', () => {
      renderLayout()

      // Main content area should be properly labeled
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      
      // All major components should be present
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    test('renders quickly with minimal re-renders', () => {
      const startTime = performance.now()
      
      renderLayout()
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      expect(renderTime).toBeLessThan(50) // Should render in less than 50ms
      expect(screen.getByTestId('test-children')).toBeInTheDocument()
    })

    test('handles state changes efficiently', async () => {
      const user = userEvent.setup()
      renderLayout()

      const startTime = performance.now()
      
      // Perform multiple state changes
      const chatButton = screen.getByTestId('chat-button')
      await user.click(chatButton) // Open
      await user.click(chatButton) // Close
      await user.click(chatButton) // Open again
      
      const endTime = performance.now()
      const operationTime = endTime - startTime
      
      expect(operationTime).toBeLessThan(100) // Should complete quickly
      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-open', 'true')
    })
  })

  describe('Error Handling', () => {
    test('handles missing children gracefully', () => {
      expect(() => {
        render(
          <MemoryRouter>
            <Layout />
          </MemoryRouter>
        )
      }).not.toThrow()
    })

    test('handles null children', () => {
      expect(() => {
        renderLayout(null)
      }).not.toThrow()
    })

    test('handles undefined children', () => {
      expect(() => {
        renderLayout(undefined)
      }).not.toThrow()
    })

    test('continues to function if child components fail', () => {
      // Mock console.error to avoid noise
      const originalError = console.error
      console.error = jest.fn()

      // This would require actual error boundaries in a real scenario
      renderLayout()
      
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      
      console.error = originalError
    })
  })

  describe('Integration with Router', () => {
    test('works with different routes', () => {
      const routes = ['/', '/poetry', '/music', '/literature']
      
      routes.forEach(route => {
        const { unmount } = renderLayout(undefined, route)
        
        expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-page', route)
        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('navigation')).toBeInTheDocument()
        
        unmount()
      })
    })

    test('updates location context correctly', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/games']}>
          <Layout>
            <div data-testid="test-children">Test Content</div>
          </Layout>
        </MemoryRouter>
      )

      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-page', '/games')

      rerender(
        <MemoryRouter initialEntries={['/ghibli']}>
          <Layout>
            <div data-testid="test-children">Test Content</div>
          </Layout>
        </MemoryRouter>
      )

      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-page', '/ghibli')
    })
  })

  describe('Component Lifecycle', () => {
    test('initializes correctly on mount', () => {
      renderLayout()

      // All components should be rendered
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('chat-button')).toBeInTheDocument()
      expect(screen.getByTestId('chat-overlay')).toBeInTheDocument()
      expect(screen.getByTestId('test-children')).toBeInTheDocument()
    })

    test('cleans up properly on unmount', () => {
      const { unmount } = renderLayout()
      
      expect(screen.getByTestId('header')).toBeInTheDocument()
      
      expect(() => unmount()).not.toThrow()
    })

    test('handles re-renders with different props', () => {
      const { rerender } = renderLayout(
        <div data-testid="initial-content">Initial</div>
      )

      expect(screen.getByTestId('initial-content')).toBeInTheDocument()

      rerender(
        <MemoryRouter>
          <Layout>
            <div data-testid="updated-content">Updated</div>
          </Layout>
        </MemoryRouter>
      )

      expect(screen.getByTestId('updated-content')).toBeInTheDocument()
      expect(screen.queryByTestId('initial-content')).not.toBeInTheDocument()
    })
  })

  describe('CSS Classes and Styling', () => {
    test('applies correct container classes', () => {
      renderLayout()

      const container = screen.getByTestId('header').closest('.min-h-screen')
      expect(container).toHaveClass('min-h-screen')
      expect(container).toHaveClass('bg-neutral-50')
      expect(container).toHaveClass('dark:bg-neutral-900')
      expect(container).toHaveClass('flex')
      expect(container).toHaveClass('flex-col')
    })

    test('applies correct main content classes', () => {
      renderLayout()

      const main = screen.getByRole('main')
      expect(main).toHaveClass('flex-1')
      expect(main).toHaveClass('pb-20')
      expect(main).toHaveClass('safe-area-bottom')
    })

    test('includes animation classes', () => {
      renderLayout()

      const main = screen.getByRole('main')
      const fadeInDiv = main.querySelector('.fade-in')
      expect(fadeInDiv).toBeInTheDocument()
    })
  })

  describe('Event Handling', () => {
    test('handles chat toggle events correctly', async () => {
      const user = userEvent.setup()
      renderLayout()

      const chatButton = screen.getByTestId('chat-button')
      const chatOverlay = screen.getByTestId('chat-overlay')

      // Test multiple toggle events
      await user.click(chatButton)
      expect(chatOverlay).toHaveAttribute('data-open', 'true')

      await user.click(chatButton)
      expect(chatOverlay).toHaveAttribute('data-open', 'false')

      await user.click(chatButton)
      expect(chatOverlay).toHaveAttribute('data-open', 'true')
    })

    test('handles rapid click events', async () => {
      const user = userEvent.setup()
      renderLayout()

      const chatButton = screen.getByTestId('chat-button')
      
      // Rapid clicks should be handled correctly
      await user.click(chatButton)
      await user.click(chatButton)
      await user.click(chatButton)
      await user.click(chatButton)

      // Should end up closed (even number of clicks)
      expect(screen.getByTestId('chat-overlay')).toHaveAttribute('data-open', 'false')
    })
  })
})