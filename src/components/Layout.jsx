import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'
import ChatGPTButton from './ChatGPTButton'
import ChatOverlay from './ChatOverlay'

const Layout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const location = useLocation()

  const toggleChat = () => {
    setIsChatOpen(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 pb-20 safe-area-bottom">
        <div className="fade-in">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <Navigation />
      
      {/* Floating ChatGPT Button */}
      <ChatGPTButton onClick={toggleChat} />
      
      {/* Chat Overlay */}
      <ChatOverlay 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        currentPage={location.pathname}
      />
    </div>
  )
}

export default Layout