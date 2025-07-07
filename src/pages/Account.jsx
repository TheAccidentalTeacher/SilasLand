import React, { useState } from 'react'
import { 
  User, 
  Settings, 
  Bookmark, 
  ExternalLink, 
  Key, 
  Moon, 
  Sun, 
  Type, 
  Eye, 
  Bell,
  Trash2,
  Edit
} from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import { useTheme } from '../contexts/ThemeContext'

const Account = () => {
  const { user, bookmarks, preferences, updatePreferences, apiKeys, updateApiKey, login, logout } = useUser()
  const { theme, toggleTheme, fontSize, changeFontSize, highContrast, toggleHighContrast } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [showApiKeys, setShowApiKeys] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'api-keys', label: 'API Keys', icon: Key }
  ]

  const handleLogin = () => {
    // Simulate login - in real app, this would integrate with auth provider
    login({
      id: '1',
      name: 'Silas Peter Somers',
      email: 'silas@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    })
  }

  const renderProfile = () => (
    <div className="space-y-6">
      {user ? (
        <>
          {/* User Info */}
          <div className="card">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {user.name}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {user.email}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button 
                onClick={logout}
                className="btn-ghost text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Connected Accounts
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Spotify', connected: preferences.spotifyConnected, color: 'green' },
                { name: 'Discord', connected: preferences.discordConnected, color: 'indigo' },
                { name: 'Reddit', connected: preferences.redditConnected, color: 'orange' }
              ].map((account) => (
                <div key={account.name} className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-${account.color}-100 dark:bg-${account.color}-900/30 rounded-lg flex items-center justify-center`}>
                      <ExternalLink className={`w-4 h-4 text-${account.color}-600 dark:text-${account.color}-400`} />
                    </div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {account.name}
                    </span>
                  </div>
                  <button
                    onClick={() => updatePreferences({ [`${account.name.toLowerCase()}Connected`]: !account.connected })}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      account.connected
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                    }`}
                  >
                    {account.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="card text-center">
          <User className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Sign In to Your Account
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Access your bookmarks, preferences, and connected accounts.
          </p>
          <button onClick={handleLogin} className="btn-primary">
            Sign In
          </button>
        </div>
      )}
    </div>
  )

  const renderBookmarks = () => (
    <div className="space-y-6">
      {Object.entries(bookmarks).map(([category, items]) => (
        items.length > 0 && (
          <div key={category} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 capitalize">
                {category} ({items.length})
              </h3>
              <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                Clear All
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      {item.title}
                    </h4>
                    {item.author && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                        by {item.author}
                      </p>
                    )}
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {item.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                      Added {new Date(item.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
      
      {Object.values(bookmarks).every(category => category.length === 0) && (
        <div className="card text-center">
          <Bookmark className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No Bookmarks Yet
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Start exploring and bookmark your favorite content to see it here.
          </p>
        </div>
      )}
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Appearance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Appearance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  Dark Mode
                </span>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme === 'dark' ? 'bg-primary-500' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Type className="w-5 h-5" />
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  Font Size
                </span>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Adjust text size for better readability
                </p>
              </div>
            </div>
            <select
              value={fontSize}
              onChange={(e) => changeFontSize(e.target.value)}
              className="input-field w-32"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5" />
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  High Contrast
                </span>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Increase contrast for better visibility
                </p>
              </div>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                highContrast ? 'bg-primary-500' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5" />
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  Notifications
                </span>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Receive updates about new content
                </p>
              </div>
            </div>
            <button
              onClick={() => updatePreferences({ notifications: !preferences.notifications })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.notifications ? 'bg-primary-500' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                Language
              </span>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Choose your preferred language
              </p>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => updatePreferences({ language: e.target.value })}
              className="input-field w-32"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderApiKeys = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          API Keys
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          Securely store your API keys to enable enhanced features like AI assistance and external integrations.
        </p>
        
        <div className="space-y-4">
          {[
            { key: 'openai', label: 'OpenAI API Key', description: 'For ChatGPT integration and AI features' },
            { key: 'spotify', label: 'Spotify API Key', description: 'For music streaming and playlist features' },
            { key: 'steam', label: 'Steam API Key', description: 'For game information and reviews' }
          ].map((api) => (
            <div key={api.key} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                  {api.label}
                </h4>
                <button
                  onClick={() => setShowApiKeys(!showApiKeys)}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  {showApiKeys ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {api.description}
              </p>
              <input
                type={showApiKeys ? 'text' : 'password'}
                value={apiKeys[api.key] || ''}
                onChange={(e) => updateApiKey(api.key, e.target.value)}
                placeholder={`Enter your ${api.label}`}
                className="w-full input-field"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <Key className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                Security Notice
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Your API keys are encrypted and stored securely. They are only used for the features you enable and are never shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Account Settings
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage your profile, bookmarks, preferences, and integrations.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-700 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'bookmarks' && renderBookmarks()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'api-keys' && renderApiKeys()}
      </div>
    </div>
  )
}

export default Account