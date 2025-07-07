import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  BookOpen, 
  Music, 
  Library, 
  Gamepad2, 
  Sparkles, 
  Heart, 
  HelpCircle,
  User
} from 'lucide-react'
import clsx from 'clsx'

const Navigation = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/poetry', icon: BookOpen, label: 'Poetry' },
    { path: '/music', icon: Music, label: 'Music' },
    { path: '/literature', icon: Library, label: 'Literature' },
    { path: '/games', icon: Gamepad2, label: 'Games' },
    { path: '/ghibli', icon: Sparkles, label: 'Ghibli' },
    { path: '/resources', icon: Heart, label: 'Resources' },
    { path: '/memory-alpha', icon: HelpCircle, label: 'Memory Alpha' },
    { path: '/account', icon: User, label: 'Account' }
  ]
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 safe-area-bottom z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path || 
              (path !== '/' && location.pathname.startsWith(path))
            
            return (
              <Link
                key={path}
                to={path}
                className={clsx(
                  'flex flex-col items-center justify-center p-2 rounded-lg transition-colors touch-target min-w-0 flex-1',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                )}
                aria-label={label}
              >
                <Icon className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate max-w-full">
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation