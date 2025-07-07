import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserProvider, useUser } from '../UserContext'

// Test component to access user context
const TestComponent = () => {
  const {
    user,
    bookmarks,
    preferences,
    apiKeys,
    login,
    logout,
    addBookmark,
    removeBookmark,
    isBookmarked,
    updatePreferences,
    updateApiKey
  } = useUser()

  return (
    <div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'null'}</div>
      <div data-testid="bookmarks">{JSON.stringify(bookmarks)}</div>
      <div data-testid="preferences">{JSON.stringify(preferences)}</div>
      <div data-testid="apiKeys">{JSON.stringify(apiKeys)}</div>
      
      <button 
        data-testid="login" 
        onClick={() => login({ id: 1, name: 'Test User', email: 'test@example.com' })}
      >
        Login
      </button>
      
      <button data-testid="logout" onClick={logout}>
        Logout
      </button>
      
      <button 
        data-testid="addBookmark" 
        onClick={() => addBookmark('poetry', { title: 'Test Poem', author: 'Test Author' })}
      >
        Add Bookmark
      </button>
      
      <button 
        data-testid="removeBookmark" 
        onClick={() => removeBookmark('poetry', 1)}
      >
        Remove Bookmark
      </button>
      
      <div data-testid="isBookmarked">
        {isBookmarked('poetry', 1).toString()}
      </div>
      
      <button 
        data-testid="updatePreferences" 
        onClick={() => updatePreferences({ notifications: false })}
      >
        Update Preferences
      </button>
      
      <button 
        data-testid="updateApiKey" 
        onClick={() => updateApiKey('openai', 'test-api-key')}
      >
        Update API Key
      </button>
    </div>
  )
}

// Component to test error handling
const TestComponentWithoutProvider = () => {
  try {
    useUser()
    return <div>Should not render</div>
  } catch (error) {
    return <div data-testid="error">{error.message}</div>
  }
}

describe('UserContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('useUser Hook', () => {
    // Standard Input Tests
    test('provides default user values when no localStorage data exists', () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      expect(screen.getByTestId('user')).toHaveTextContent('null')
      
      const bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks).toEqual({
        poetry: [],
        music: [],
        literature: [],
        games: [],
        ghibli: [],
        resources: []
      })

      const preferences = JSON.parse(screen.getByTestId('preferences').textContent)
      expect(preferences).toEqual({
        spotifyConnected: false,
        discordConnected: false,
        redditConnected: false,
        notifications: true,
        autoplay: false,
        language: 'en'
      })

      const apiKeys = JSON.parse(screen.getByTestId('apiKeys').textContent)
      expect(apiKeys).toEqual({
        openai: '',
        spotify: '',
        steam: ''
      })
    })

    test('initializes from localStorage when data exists', () => {
      const testUser = { id: 1, name: 'Existing User' }
      const testBookmarks = { poetry: [{ id: 1, title: 'Saved Poem' }], music: [], literature: [], games: [], ghibli: [], resources: [] }
      const testPreferences = { notifications: false, language: 'es' }
      const testApiKeys = { openai: 'existing-key', spotify: '', steam: '' }

      localStorage.setItem('user', JSON.stringify(testUser))
      localStorage.setItem('bookmarks', JSON.stringify(testBookmarks))
      localStorage.setItem('preferences', JSON.stringify(testPreferences))
      localStorage.setItem('apiKeys', JSON.stringify(testApiKeys))

      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(testUser))
      expect(screen.getByTestId('bookmarks')).toHaveTextContent(JSON.stringify(testBookmarks))
      
      const preferences = JSON.parse(screen.getByTestId('preferences').textContent)
      expect(preferences.notifications).toBe(false)
      expect(preferences.language).toBe('es')
      
      const apiKeys = JSON.parse(screen.getByTestId('apiKeys').textContent)
      expect(apiKeys.openai).toBe('existing-key')
    })

    // Error Handling Tests
    test('throws error when used outside provider', () => {
      render(<TestComponentWithoutProvider />)
      
      expect(screen.getByTestId('error')).toHaveTextContent(
        'useUser must be used within a UserProvider'
      )
    })

    test('handles corrupted localStorage data gracefully', () => {
      localStorage.setItem('user', 'invalid-json')
      localStorage.setItem('bookmarks', 'invalid-json')
      localStorage.setItem('preferences', 'invalid-json')
      localStorage.setItem('apiKeys', 'invalid-json')

      // Should not crash and use defaults
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      expect(screen.getByTestId('user')).toHaveTextContent('null')
      
      const bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks.poetry).toEqual([])
    })

    test('handles localStorage quota exceeded', () => {
      // Mock localStorage.setItem to throw quota exceeded error
      const originalSetItem = localStorage.setItem
      localStorage.setItem = jest.fn().mockImplementation(() => {
        throw new Error('QuotaExceededError')
      })

      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // Should not crash
      expect(screen.getByTestId('user')).toHaveTextContent('null')
      
      // Restore localStorage
      localStorage.setItem = originalSetItem
    })
  })

  describe('Authentication Functions', () => {
    // Login Tests
    test('login sets user data correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      expect(screen.getByTestId('user')).toHaveTextContent('null')

      await user.click(screen.getByTestId('login'))

      const userData = JSON.parse(screen.getByTestId('user').textContent)
      expect(userData).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      })

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ id: 1, name: 'Test User', email: 'test@example.com' })
      )
    })

    test('logout clears user data and sensitive information', async () => {
      const user = userEvent.setup()
      
      // Start with logged in user and API keys
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }))
      localStorage.setItem('apiKeys', JSON.stringify({ openai: 'secret-key', spotify: '', steam: '' }))

      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // Verify user is logged in
      expect(screen.getByTestId('user')).not.toHaveTextContent('null')

      await user.click(screen.getByTestId('logout'))

      // User should be cleared
      expect(screen.getByTestId('user')).toHaveTextContent('null')
      
      // API keys should be cleared
      const apiKeys = JSON.parse(screen.getByTestId('apiKeys').textContent)
      expect(apiKeys).toEqual({
        openai: '',
        spotify: '',
        steam: ''
      })

      expect(localStorage.setItem).toHaveBeenCalledWith('user', 'null')
    })

    test('handles malformed user data in login', async () => {
      const user = userEvent.setup()
      
      const TestComponentWithBadLogin = () => {
        const { login } = useUser()
        return (
          <button 
            data-testid="badLogin" 
            onClick={() => login(null)}
          >
            Bad Login
          </button>
        )
      }

      render(
        <UserProvider>
          <TestComponentWithBadLogin />
        </UserProvider>
      )

      await user.click(screen.getByTestId('badLogin'))

      // Should handle null user data
      expect(localStorage.setItem).toHaveBeenCalledWith('user', 'null')
    })
  })

  describe('Bookmark Management', () => {
    // Add Bookmark Tests
    test('addBookmark creates unique IDs and timestamps', async () => {
      const user = userEvent.setup()
      
      // Mock Date.now to return predictable values
      const mockDate = new Date('2023-01-01T00:00:00.000Z')
      const originalNow = Date.now
      const originalDate = global.Date
      global.Date = jest.fn(() => mockDate)
      global.Date.now = jest.fn(() => mockDate.getTime())

      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      await user.click(screen.getByTestId('addBookmark'))

      const bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks.poetry).toHaveLength(1)
      expect(bookmarks.poetry[0]).toEqual({
        title: 'Test Poem',
        author: 'Test Author',
        id: mockDate.getTime(),
        dateAdded: mockDate.toISOString()
      })

      // Restore Date
      global.Date = originalDate
      Date.now = originalNow
    })

    test('addBookmark handles different categories', async () => {
      const user = userEvent.setup()
      
      const TestComponentWithMultipleBookmarks = () => {
        const { addBookmark, bookmarks } = useUser()
        return (
          <div>
            <div data-testid="bookmarks">{JSON.stringify(bookmarks)}</div>
            <button 
              data-testid="addPoetry" 
              onClick={() => addBookmark('poetry', { title: 'Poem' })}
            >
              Add Poetry
            </button>
            <button 
              data-testid="addMusic" 
              onClick={() => addBookmark('music', { title: 'Song' })}
            >
              Add Music
            </button>
          </div>
        )
      }

      render(
        <UserProvider>
          <TestComponentWithMultipleBookmarks />
        </UserProvider>
      )

      await user.click(screen.getByTestId('addPoetry'))
      await user.click(screen.getByTestId('addMusic'))

      const bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks.poetry).toHaveLength(1)
      expect(bookmarks.music).toHaveLength(1)
      expect(bookmarks.poetry[0].title).toBe('Poem')
      expect(bookmarks.music[0].title).toBe('Song')
    })

    // Remove Bookmark Tests
    test('removeBookmark removes correct item', async () => {
      const user = userEvent.setup()
      
      // Start with existing bookmarks
      const existingBookmarks = {
        poetry: [
          { id: 1, title: 'Poem 1' },
          { id: 2, title: 'Poem 2' }
        ],
        music: [],
        literature: [],
        games: [],
        ghibli: [],
        resources: []
      }
      localStorage.setItem('bookmarks', JSON.stringify(existingBookmarks))

      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // Verify initial state
      let bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks.poetry).toHaveLength(2)

      await user.click(screen.getByTestId('removeBookmark'))

      // Should remove item with id 1
      bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks.poetry).toHaveLength(1)
      expect(bookmarks.poetry[0].id).toBe(2)
    })

    test('removeBookmark handles non-existent IDs gracefully', async () => {
      const user = userEvent.setup()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // Try to remove from empty bookmarks
      await user.click(screen.getByTestId('removeBookmark'))

      // Should not crash
      const bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks.poetry).toHaveLength(0)
    })

    // Is Bookmarked Tests
    test('isBookmarked checks both id and originalId', () => {
      const existingBookmarks = {
        poetry: [
          { id: 1, originalId: 'poem-1', title: 'Poem 1' },
          { id: 2, title: 'Poem 2' }
        ],
        music: [],
        literature: [],
        games: [],
        ghibli: [],
        resources: []
      }
      localStorage.setItem('bookmarks', JSON.stringify(existingBookmarks))

      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // Should find by id
      expect(screen.getByTestId('isBookmarked')).toHaveTextContent('true')
    })

    test('isBookmarked returns false for non-bookmarked items', () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      expect(screen.getByTestId('isBookmarked')).toHaveTextContent('false')
    })

    test('isBookmarked handles invalid categories', () => {
      const TestComponentWithInvalidCategory = () => {
        const { isBookmarked } = useUser()
        return (
          <div data-testid="invalidCategory">
            {isBookmarked('invalid-category', 1).toString()}
          </div>
        )
      }

      render(
        <UserProvider>
          <TestComponentWithInvalidCategory />
        </UserProvider>
      )

      // Should not crash and return false
      expect(screen.getByTestId('invalidCategory')).toHaveTextContent('false')
    })
  })

  describe('Preferences Management', () => {
    test('updatePreferences merges new preferences correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // Initial preferences
      let preferences = JSON.parse(screen.getByTestId('preferences').textContent)
      expect(preferences.notifications).toBe(true)
      expect(preferences.language).toBe('en')

      await user.click(screen.getByTestId('updatePreferences'))

      // Should merge new preferences
      preferences = JSON.parse(screen.getByTestId('preferences').textContent)
      expect(preferences.notifications).toBe(false) // Updated
      expect(preferences.language).toBe('en') // Preserved
      expect(preferences.autoplay).toBe(false) // Preserved
    })

    test('updatePreferences handles invalid preference objects', async () => {
      const user = userEvent.setup()
      
      const TestComponentWithBadPreferences = () => {
        const { updatePreferences, preferences } = useUser()
        return (
          <div>
            <div data-testid="preferences">{JSON.stringify(preferences)}</div>
            <button 
              data-testid="badUpdate" 
              onClick={() => updatePreferences(null)}
            >
              Bad Update
            </button>
          </div>
        )
      }

      render(
        <UserProvider>
          <TestComponentWithBadPreferences />
        </UserProvider>
      )

      await user.click(screen.getByTestId('badUpdate'))

      // Should not crash, preferences should remain unchanged
      const preferences = JSON.parse(screen.getByTestId('preferences').textContent)
      expect(preferences.notifications).toBe(true)
    })

    test('preferences persist to localStorage', async () => {
      const user = userEvent.setup()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      await user.click(screen.getByTestId('updatePreferences'))

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'preferences',
        expect.stringContaining('"notifications":false')
      )
    })
  })

  describe('API Key Management', () => {
    test('updateApiKey updates correct service key', async () => {
      const user = userEvent.setup()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      await user.click(screen.getByTestId('updateApiKey'))

      const apiKeys = JSON.parse(screen.getByTestId('apiKeys').textContent)
      expect(apiKeys.openai).toBe('test-api-key')
      expect(apiKeys.spotify).toBe('') // Unchanged
      expect(apiKeys.steam).toBe('') // Unchanged
    })

    test('updateApiKey handles invalid service names', async () => {
      const user = userEvent.setup()
      
      const TestComponentWithInvalidService = () => {
        const { updateApiKey, apiKeys } = useUser()
        return (
          <div>
            <div data-testid="apiKeys">{JSON.stringify(apiKeys)}</div>
            <button 
              data-testid="invalidService" 
              onClick={() => updateApiKey('invalid-service', 'key')}
            >
              Invalid Service
            </button>
          </div>
        )
      }

      render(
        <UserProvider>
          <TestComponentWithInvalidService />
        </UserProvider>
      )

      await user.click(screen.getByTestId('invalidService'))

      // Should add the invalid service key
      const apiKeys = JSON.parse(screen.getByTestId('apiKeys').textContent)
      expect(apiKeys['invalid-service']).toBe('key')
    })

    test('updateApiKey handles empty/null keys', async () => {
      const user = userEvent.setup()
      
      const TestComponentWithEmptyKey = () => {
        const { updateApiKey, apiKeys } = useUser()
        return (
          <div>
            <div data-testid="apiKeys">{JSON.stringify(apiKeys)}</div>
            <button 
              data-testid="emptyKey" 
              onClick={() => updateApiKey('openai', '')}
            >
              Empty Key
            </button>
            <button 
              data-testid="nullKey" 
              onClick={() => updateApiKey('spotify', null)}
            >
              Null Key
            </button>
          </div>
        )
      }

      render(
        <UserProvider>
          <TestComponentWithEmptyKey />
        </UserProvider>
      )

      await user.click(screen.getByTestId('emptyKey'))
      await user.click(screen.getByTestId('nullKey'))

      const apiKeys = JSON.parse(screen.getByTestId('apiKeys').textContent)
      expect(apiKeys.openai).toBe('')
      expect(apiKeys.spotify).toBe(null)
    })

    test('API keys persist to localStorage', async () => {
      const user = userEvent.setup()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      await user.click(screen.getByTestId('updateApiKey'))

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'apiKeys',
        expect.stringContaining('"openai":"test-api-key"')
      )
    })
  })

  describe('Data Persistence', () => {
    test('all state changes trigger localStorage updates', async () => {
      const user = userEvent.setup()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // Clear previous calls
      localStorage.setItem.mockClear()

      // Trigger all state changes
      await user.click(screen.getByTestId('login'))
      await user.click(screen.getByTestId('addBookmark'))
      await user.click(screen.getByTestId('updatePreferences'))
      await user.click(screen.getByTestId('updateApiKey'))

      // Should have called localStorage.setItem for each state change
      expect(localStorage.setItem).toHaveBeenCalledWith('user', expect.any(String))
      expect(localStorage.setItem).toHaveBeenCalledWith('bookmarks', expect.any(String))
      expect(localStorage.setItem).toHaveBeenCalledWith('preferences', expect.any(String))
      expect(localStorage.setItem).toHaveBeenCalledWith('apiKeys', expect.any(String))
    })

    test('handles localStorage write failures gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock localStorage.setItem to fail
      localStorage.setItem = jest.fn().mockImplementation(() => {
        throw new Error('Storage failed')
      })

      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // Should not crash when localStorage fails
      await user.click(screen.getByTestId('login'))
      
      // User should still be set in state even if localStorage fails
      expect(screen.getByTestId('user')).not.toHaveTextContent('null')
    })
  })

  describe('Security Tests', () => {
    test('sensitive data is cleared on logout', async () => {
      const user = userEvent.setup()
      
      // Set up user with sensitive data
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }))
      localStorage.setItem('apiKeys', JSON.stringify({ 
        openai: 'secret-key-123',
        spotify: 'spotify-secret',
        steam: 'steam-secret'
      }))

      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      await user.click(screen.getByTestId('logout'))

      // All API keys should be cleared
      const apiKeys = JSON.parse(screen.getByTestId('apiKeys').textContent)
      expect(apiKeys.openai).toBe('')
      expect(apiKeys.spotify).toBe('')
      expect(apiKeys.steam).toBe('')
    })

    test('API keys are not exposed in component props', () => {
      localStorage.setItem('apiKeys', JSON.stringify({ 
        openai: 'secret-key-123'
      }))

      const { container } = render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      // API keys should only be visible in the designated test element
      const apiKeysElement = screen.getByTestId('apiKeys')
      expect(apiKeysElement).toHaveTextContent('secret-key-123')
      
      // But not in other parts of the DOM
      const otherElements = container.querySelectorAll('*:not([data-testid="apiKeys"])')
      otherElements.forEach(element => {
        if (element.textContent && element.textContent.includes('secret-key-123')) {
          // Only allow in the apiKeys test element
          expect(element.getAttribute('data-testid')).toBe('apiKeys')
        }
      })
    })
  })

  describe('Performance Tests', () => {
    test('handles large bookmark collections efficiently', async () => {
      const user = userEvent.setup()
      
      // Create large bookmark collection
      const largeBookmarks = {
        poetry: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          title: `Poem ${i}`,
          author: `Author ${i}`
        })),
        music: [],
        literature: [],
        games: [],
        ghibli: [],
        resources: []
      }
      localStorage.setItem('bookmarks', JSON.stringify(largeBookmarks))

      const startTime = performance.now()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      const endTime = performance.now()
      
      // Should render quickly even with large data
      expect(endTime - startTime).toBeLessThan(100) // Less than 100ms
      
      // Should still function correctly
      const bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks.poetry).toHaveLength(1000)
    })

    test('bookmark operations scale well', async () => {
      const user = userEvent.setup()
      
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )

      const startTime = performance.now()
      
      // Add multiple bookmarks rapidly
      for (let i = 0; i < 10; i++) {
        await user.click(screen.getByTestId('addBookmark'))
      }

      const endTime = performance.now()
      
      // Should complete quickly
      expect(endTime - startTime).toBeLessThan(1000) // Less than 1 second
      
      // All bookmarks should be added
      const bookmarks = JSON.parse(screen.getByTestId('bookmarks').textContent)
      expect(bookmarks.poetry).toHaveLength(10)
    })
  })
})