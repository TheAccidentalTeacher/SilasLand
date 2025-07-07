import React from 'react'
import { MessageCircle, Sparkles } from 'lucide-react'
import clsx from 'clsx'

const ChatGPTButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'fixed bottom-24 right-4 z-40',
        'w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500',
        'rounded-full shadow-lg hover:shadow-xl',
        'flex items-center justify-center',
        'transition-all duration-300 hover:scale-110',
        'focus:ring-4 focus:ring-primary-500/30',
        'animate-pulse-soft'
      )}
      aria-label="Open AI Assistant"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 text-white" />
        <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 animate-pulse" />
      </div>
    </button>
  )
}

export default ChatGPTButton