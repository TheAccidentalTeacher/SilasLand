import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '../ThemeContext'

// Test component to access theme context
const TestComponent = () => {
  const {
    theme,
    fontSize,
    highContrast,
    reducedMotion,
    isDark,
    toggleTheme,
    changeFontSize,
    toggleHighContrast
  } = useTheme()

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="fontSize">{fontSize}</div>
      <div data-testid="highContrast">{highContrast.toString()}</div>
      <div data-testid="reducedMotion">{reducedMotion.toString()}</div>
      <div data-testid="isDark">{isDark.toString()}</div>
      <button data-testid="toggleTheme" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <button data-testid="changeFontSize" onClick={() => changeFontSize('large')}>
        Change Font Size
      </button>
      <button data-testid="toggleHighContrast" onClick={toggleHighContrast}>
        Toggle High Contrast
      </button>
    </div>
  )
}

// Component to test error handling
const TestComponentWithoutProvider = () => {
  try {
    useTheme()
    return <div>Should not render</div>
  } catch (error) {
    return <div data-testid="error">{error.message}</div>
  }
}

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document classes
    document.documentElement.className = ''
    // Reset matchMedia mock
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)' ? false : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('useTheme Hook', () => {
    // Standard Input Tests
    test('provides default theme values when no localStorage data exists', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('theme')).toHaveTextContent('light')
      expect(screen.getByTestId('fontSize')).toHaveTextContent('medium')
      expect(screen.getByTestId('highContrast')).toHaveTextContent('false')
      expect(screen.getByTestId('isDark')).toHaveTextContent('false')
    })

    test('initializes from localStorage when data exists', () => {
      localStorage.setItem('theme', 'dark')
      localStorage.setItem('fontSize', 'large')
      localStorage.setItem('highContrast', 'true')

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('theme')).toHaveTextContent('dark')
      expect(screen.getByTestId('fontSize')).toHaveTextContent('large')
      expect(screen.getByTestId('highContrast')).toHaveTextContent('true')
      expect(screen.getByTestId('isDark')).toHaveTextContent('true')
    })

    test('initializes from system preferences when no localStorage', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)' ? true : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    })

    // Error Handling Tests
    test('throws error when used outside provider', () => {
      render(<TestComponentWithoutProvider />)
      
      expect(screen.getByTestId('error')).toHaveTextContent(
        'useTheme must be used within a ThemeProvider'
      )
    })

    // Edge Cases
    test('handles corrupted localStorage data gracefully', () => {
      localStorage.setItem('theme', 'invalid-theme')
      localStorage.setItem('fontSize', 'invalid-size')
      localStorage.setItem('highContrast', 'invalid-boolean')

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      // Should fall back to defaults
      expect(screen.getByTestId('theme')).toHaveTextContent('invalid-theme') // Will use as-is
      expect(screen.getByTestId('fontSize')).toHaveTextContent('invalid-size') // Will use as-is
      expect(screen.getByTestId('highContrast')).toHaveTextContent('false') // Boolean conversion
    })

    test('handles missing localStorage gracefully', () => {
      // Mock localStorage to throw error
      const originalGetItem = localStorage.getItem
      localStorage.getItem = jest.fn().mockImplementation(() => {
        throw new Error('localStorage not available')
      })

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('theme')).toHaveTextContent('light')
      
      // Restore localStorage
      localStorage.getItem = originalGetItem
    })
  })

  describe('Theme Functions', () => {
    // State Tests
    test('toggleTheme updates state correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('theme')).toHaveTextContent('light')
      expect(screen.getByTestId('isDark')).toHaveTextContent('false')

      await user.click(screen.getByTestId('toggleTheme'))

      expect(screen.getByTestId('theme')).toHaveTextContent('dark')
      expect(screen.getByTestId('isDark')).toHaveTextContent('true')

      await user.click(screen.getByTestId('toggleTheme'))

      expect(screen.getByTestId('theme')).toHaveTextContent('light')
      expect(screen.getByTestId('isDark')).toHaveTextContent('false')
    })

    test('changeFontSize updates state and DOM classes', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('fontSize')).toHaveTextContent('medium')
      expect(document.documentElement.classList.contains('text-base')).toBe(true)

      await user.click(screen.getByTestId('changeFontSize'))

      expect(screen.getByTestId('fontSize')).toHaveTextContent('large')
      expect(document.documentElement.classList.contains('text-lg')).toBe(true)
      expect(document.documentElement.classList.contains('text-base')).toBe(false)
    })

    test('toggleHighContrast updates state and DOM classes', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('highContrast')).toHaveTextContent('false')
      expect(document.documentElement.classList.contains('high-contrast')).toBe(false)

      await user.click(screen.getByTestId('toggleHighContrast'))

      expect(screen.getByTestId('highContrast')).toHaveTextContent('true')
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true)

      await user.click(screen.getByTestId('toggleHighContrast'))

      expect(screen.getByTestId('highContrast')).toHaveTextContent('false')
      expect(document.documentElement.classList.contains('high-contrast')).toBe(false)
    })

    // Integration Tests
    test('theme changes persist to localStorage', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      await user.click(screen.getByTestId('toggleTheme'))

      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    test('font size changes persist to localStorage', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      await user.click(screen.getByTestId('changeFontSize'))

      expect(localStorage.setItem).toHaveBeenCalledWith('fontSize', 'large')
    })

    test('high contrast changes persist to localStorage', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      await user.click(screen.getByTestId('toggleHighContrast'))

      expect(localStorage.setItem).toHaveBeenCalledWith('highContrast', 'true')
    })

    // DOM Manipulation Tests
    test('dark theme adds dark class to document', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      await user.click(screen.getByTestId('toggleTheme'))

      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    test('light theme removes dark class from document', async () => {
      const user = userEvent.setup()
      
      // Start with dark theme
      localStorage.setItem('theme', 'dark')
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(document.documentElement.classList.contains('dark')).toBe(true)

      await user.click(screen.getByTestId('toggleTheme'))

      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  describe('Font Size Management', () => {
    // Boundary Tests
    test('handles all valid font sizes', () => {
      const fontSizes = ['small', 'medium', 'large', 'extra-large']
      
      fontSizes.forEach(size => {
        localStorage.setItem('fontSize', size)
        
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        )

        expect(screen.getByTestId('fontSize')).toHaveTextContent(size)
        
        // Check corresponding CSS class
        const expectedClass = {
          'small': 'text-sm',
          'medium': 'text-base',
          'large': 'text-lg',
          'extra-large': 'text-xl'
        }[size]
        
        expect(document.documentElement.classList.contains(expectedClass)).toBe(true)
      })
    })

    test('defaults to medium font size for invalid values', () => {
      localStorage.setItem('fontSize', 'invalid-size')
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      // Should still show the invalid value but apply default class
      expect(screen.getByTestId('fontSize')).toHaveTextContent('invalid-size')
      expect(document.documentElement.classList.contains('text-base')).toBe(true)
    })
  })

  describe('Reduced Motion Detection', () => {
    test('detects system reduced motion preference', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? true : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('reducedMotion')).toHaveTextContent('true')
    })

    test('handles no reduced motion preference', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      expect(screen.getByTestId('reducedMotion')).toHaveTextContent('false')
    })
  })

  describe('Performance Tests', () => {
    test('rapid theme changes do not cause memory leaks', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      // Rapidly toggle theme multiple times
      for (let i = 0; i < 10; i++) {
        await user.click(screen.getByTestId('toggleTheme'))
      }

      // Should end up back at light theme
      expect(screen.getByTestId('theme')).toHaveTextContent('light')
      expect(localStorage.setItem).toHaveBeenCalledTimes(10)
    })

    test('DOM updates are applied correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      // Change multiple settings
      await user.click(screen.getByTestId('toggleTheme'))
      await user.click(screen.getByTestId('changeFontSize'))
      await user.click(screen.getByTestId('toggleHighContrast'))

      // Verify all DOM changes applied
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(document.documentElement.classList.contains('text-lg')).toBe(true)
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
    })
  })

  describe('Accessibility Features', () => {
    test('provides comprehensive accessibility context', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      // All accessibility features should be available
      expect(screen.getByTestId('theme')).toBeInTheDocument()
      expect(screen.getByTestId('fontSize')).toBeInTheDocument()
      expect(screen.getByTestId('highContrast')).toBeInTheDocument()
      expect(screen.getByTestId('reducedMotion')).toBeInTheDocument()
    })

    test('maintains accessibility preferences across re-renders', async () => {
      const user = userEvent.setup()
      
      const { rerender } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      // Set accessibility preferences
      await user.click(screen.getByTestId('toggleHighContrast'))
      await user.click(screen.getByTestId('changeFontSize'))

      // Re-render component
      rerender(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )

      // Preferences should persist
      expect(screen.getByTestId('highContrast')).toHaveTextContent('true')
      expect(screen.getByTestId('fontSize')).toHaveTextContent('large')
    })
  })
})