import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Search, Settings, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'

const Header = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { user } = useUser()
  
  const getPageTitle = () => {
    const path = location.pathname
    switch (path) {
      case '/': return "Silas' Hub"
      case '/poetry': return 'Poetry'
      case '/music': return 'Music'
      case '/music/theory': return 'Music Theory'
      case '/music/rush': return 'Rush'
      case '/music/dylan': return 'Bob Dylan'
      case '/music/piano': return 'Piano Music'
      case '/literature': return 'Literature'
      case '/games': return 'Indie Games'
      case '/ghibli': return 'Studio Ghibli'
      case '/resources': return 'Resources'
      case '/memory-alpha': return 'Memory Alpha'
      case '/account': return 'Account'
      default: return "Silas' Hub"
    }
  }
  
  const showBackButton = location.pathname !== '/'
  
  return (
    <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 safe-area-top sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Back Button or Logo */}
          <div className="flex items-center space-x-4">
            {showBackButton ? (
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors touch-target"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
              </Link>
            )}
            
            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              {getPageTitle()}
            </h1>
          </div>
          
          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Only show on main pages */}
            {!showBackButton && (
              <button
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors touch-target"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors touch-target"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <div className="w-5 h-5 rounded-full bg-neutral-800"></div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-yellow-400 border-2 border-yellow-300"></div>
              )}
            </button>
            
            {/* Profile/Account */}
            <Link
              to="/account"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors touch-target"
              aria-label="Account"
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header