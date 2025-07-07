import React, { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, Lightbulb } from 'lucide-react'
import clsx from 'clsx'

const ChatOverlay = ({ isOpen, onClose, currentPage }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getContextualSuggestions = () => {
    const suggestions = {
      '/': [
        'What can you help me with today?',
        'Show me something inspiring',
        'Help me find new content to explore'
      ],
      '/poetry': [
        'Explain this poem\'s meaning',
        'Find poems similar to this one',
        'Translate this poem for me',
        'What\'s the historical context?'
      ],
      '/music': [
        'Explain this musical concept',
        'Recommend similar artists',
        'What\'s the story behind this song?'
      ],
      '/music/theory': [
        'Explain this chord progression',
        'Help me understand scales',
        'What\'s the difference between modes?'
      ],
      '/music/rush': [
        'Explain Rush\'s influence on prog rock',
        'What\'s the meaning behind this lyric?',
        'Tell me about Neil Peart\'s drumming'
      ],
      '/music/dylan': [
        'Analyze this Dylan song',
        'What\'s the historical context?',
        'Compare Dylan to other folk artists'
      ],
      '/music/piano': [
        'Recommend beginner pieces',
        'Explain jazz chord voicings',
        'Help me understand classical forms'
      ],
      '/literature': [
        'Summarize this work',
        'Compare these authors',
        'What\'s the cultural significance?'
      ],
      '/games': [
        'Recommend games for ADHD',
        'Find cozy, relaxing games',
        'What makes this game accessible?'
      ],
      '/ghibli': [
        'Explain the themes in this film',
        'Find similar animated movies',
        'What\'s the cultural significance?'
      ],
      '/resources': [
        'Find ADHD-friendly tools',
        'Help with time management',
        'Locate support groups nearby'
      ],
      '/memory-alpha': [
        'Explain this Star Trek concept',
        'Find episodes about neurodiversity',
        'Compare Star Trek to other sci-fi'
      ]
    }

    return suggestions[currentPage] || suggestions['/']
  }

  const handleSendMessage = async (messageText = message) => {
    if (!messageText.trim()) return

    const userMessage = { role: 'user', content: messageText, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      // Simulate AI response (replace with actual OpenAI API call)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const aiResponse = {
        role: 'assistant',
        content: `I understand you're asking about "${messageText}". Based on the current page (${currentPage}), I can help you with that. This is a simulated response - in the full implementation, this would connect to OpenAI's API to provide contextual assistance.`,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Panel */}
      <div className={clsx(
        'relative w-full max-w-2xl mx-4 mb-4',
        'bg-white dark:bg-neutral-800 rounded-t-2xl sm:rounded-2xl',
        'shadow-2xl border border-neutral-200 dark:border-neutral-700',
        'flex flex-col max-h-[80vh] sm:max-h-[70vh]'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                AI Assistant
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Context-aware help for {currentPage === '/' ? 'Home' : currentPage.replace('/', '').replace('-', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Lightbulb className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                How can I help you today?
              </h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                I'm here to provide contextual assistance based on what you're exploring.
              </p>
              
              {/* Contextual Suggestions */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                  Suggested questions:
                </p>
                {getContextualSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={clsx(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={clsx(
                  'max-w-[80%] p-3 rounded-2xl',
                  msg.role === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                )}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 input-field"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!message.trim() || isLoading}
              className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatOverlay