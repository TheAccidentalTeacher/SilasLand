import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarks')
    return savedBookmarks ? JSON.parse(savedBookmarks) : {
      poetry: [],
      music: [],
      literature: [],
      games: [],
      ghibli: [],
      resources: []
    }
  })
  
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('preferences')
    return savedPreferences ? JSON.parse(savedPreferences) : {
      spotifyConnected: false,
      discordConnected: false,
      redditConnected: false,
      notifications: true,
      autoplay: false,
      language: 'en'
    }
  })
  
  const [apiKeys, setApiKeys] = useState(() => {
    const savedKeys = localStorage.getItem('apiKeys')
    return savedKeys ? JSON.parse(savedKeys) : {
      openai: '',
      spotify: '',
      steam: ''
    }
  })

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(preferences))
  }, [preferences])

  useEffect(() => {
    // Encrypt API keys before storing (basic implementation)
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys))
  }, [apiKeys])

  const addBookmark = (category, item) => {
    setBookmarks(prev => ({
      ...prev,
      [category]: [...prev[category], { ...item, id: Date.now(), dateAdded: new Date().toISOString() }]
    }))
  }

  const removeBookmark = (category, itemId) => {
    setBookmarks(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId)
    }))
  }

  const isBookmarked = (category, itemId) => {
    return bookmarks[category].some(item => item.id === itemId || item.originalId === itemId)
  }

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }))
  }

  const updateApiKey = (service, key) => {
    setApiKeys(prev => ({ ...prev, [service]: key }))
  }

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
    // Optionally clear sensitive data
    setApiKeys({
      openai: '',
      spotify: '',
      steam: ''
    })
  }

  const value = {
    user,
    setUser,
    login,
    logout,
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    preferences,
    updatePreferences,
    apiKeys,
    updateApiKey
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}