import React, { useState } from 'react'
import { Search, ExternalLink, Star, Users, BookOpen, Zap } from 'lucide-react'

const MemoryAlpha = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const curatedContent = [
    {
      id: 1,
      title: "Neurodiversity in Star Trek",
      description: "Exploring how Star Trek has portrayed neurodivergent characters and themes throughout the series.",
      topics: ["Data", "Spock", "Autism representation", "Vulcan logic"],
      episodes: ["The Measure of a Man", "In Theory", "Data's Day"],
      relevance: "High"
    },
    {
      id: 2,
      title: "Vulcan Philosophy and Logic",
      description: "Understanding Vulcan approaches to emotion, logic, and mental discipline.",
      topics: ["IDIC", "Meditation", "Emotional control", "Kolinahr"],
      episodes: ["Amok Time", "The Savage Curtain", "Unification"],
      relevance: "Medium"
    },
    {
      id: 3,
      title: "Data's Journey of Self-Discovery",
      description: "Following Data's quest to understand humanity and emotions.",
      topics: ["Artificial intelligence", "Emotion chip", "Friendship", "Growth"],
      episodes: ["The Measure of a Man", "Data's Day", "In Theory", "Descent"],
      relevance: "High"
    },
    {
      id: 4,
      title: "Ghibli-like Themes in Star Trek",
      description: "Environmental consciousness, wonder, and magical realism in Trek episodes.",
      topics: ["Environmental protection", "Wonder", "Spirituality", "Nature"],
      episodes: ["The Inner Light", "Darmok", "Who Watches the Watchers"],
      relevance: "Medium"
    }
  ]

  const quickSearches = [
    "Data's cat Spot",
    "Vulcan meditation techniques",
    "USS Enterprise specifications",
    "Spock's human side",
    "Holodeck safety protocols",
    "Warp drive theory",
    "Prime Directive examples",
    "Borg collective consciousness"
  ]

  const filteredContent = curatedContent.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleMemoryAlphaSearch = () => {
    if (searchTerm.trim()) {
      const searchUrl = `https://memory-alpha.fandom.com/wiki/Special:Search?query=${encodeURIComponent(searchTerm)}`
      window.open(searchUrl, '_blank')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Star className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Memory Alpha Portal
          </h1>
          <Star className="w-8 h-8 text-blue-500" />
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Your gateway to the Star Trek universe. Search Memory Alpha, explore curated content, and discover connections between Trek and your interests.
        </p>
      </div>

      {/* Search Section */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-blue-500" />
          Search Memory Alpha
        </h2>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMemoryAlphaSearch()}
              placeholder="Search for characters, episodes, ships, technology..."
              className="flex-1 input-field"
            />
            <button
              onClick={handleMemoryAlphaSearch}
              className="btn-primary flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
          
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              Quick searches:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(query)
                    const searchUrl = `https://memory-alpha.fandom.com/wiki/Special:Search?query=${encodeURIComponent(query)}`
                    window.open(searchUrl, '_blank')
                  }}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Curated Content */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-purple-500" />
          Curated Collections
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Specially curated Star Trek content that connects to neurodiversity, Ghibli themes, and personal growth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContent.map((item) => (
            <div key={item.id} className="card hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.relevance === 'High' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                }`}>
                  {item.relevance} Relevance
                </span>
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Topics */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Key Topics:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {item.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Episodes */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Featured Episodes:
                </h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  {item.episodes.map((episode, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{episode}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  const searchUrl = `https://memory-alpha.fandom.com/wiki/Special:Search?query=${encodeURIComponent(item.title)}`
                  window.open(searchUrl, '_blank')
                }}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Explore on Memory Alpha</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://memory-alpha.fandom.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Memory Alpha Wiki
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  The complete Star Trek database
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </a>

          <a
            href="https://memory-beta.fandom.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Memory Beta
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Extended universe content
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-purple-500 transition-colors" />
            </div>
          </a>

          <a
            href="https://reddit.com/r/startrek"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  r/StarTrek
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Community discussions
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-orange-500 transition-colors" />
            </div>
          </a>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-500" />
          Did You Know?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Data's Cat Spot
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Data's pet cat Spot appeared in multiple TNG episodes and was actually played by several different cats throughout the series.
            </p>
          </div>
          
          <div className="card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Vulcan IDIC Philosophy
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              IDIC stands for "Infinite Diversity in Infinite Combinations" - a Vulcan philosophy celebrating the beauty of different forms of life.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemoryAlpha