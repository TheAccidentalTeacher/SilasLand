import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Music as MusicIcon, 
  Clock, 
  Users, 
  Mic, 
  Piano, 
  ArrowRight,
  ExternalLink,
  Play
} from 'lucide-react'

const Music = () => {
  const musicSections = [
    {
      title: 'Music Theory',
      path: '/music/theory',
      icon: MusicIcon,
      color: 'from-purple-500 to-pink-500',
      description: 'Explore musical concepts, scales, chords, and the evolution of music through different eras.',
      features: ['Era Timeline', 'Theory Explainers', 'Spotify Playlists', 'Interactive Tools'],
      recent: 'Renaissance Harmony'
    },
    {
      title: 'Rush',
      path: '/music/rush',
      icon: Users,
      color: 'from-red-500 to-pink-500',
      description: 'Dive deep into the progressive rock legends - their history, discography, and lyrical genius.',
      features: ['Complete Discography', 'Lyric Analysis', 'Live Performances', 'Fan Discussions'],
      recent: 'Moving Pictures Analysis'
    },
    {
      title: 'Bob Dylan',
      path: '/music/dylan',
      icon: Mic,
      color: 'from-yellow-500 to-orange-500',
      description: 'Explore the poetic folk master\'s extensive catalog and cultural impact.',
      features: ['Song Catalog', 'Lyric Interpretations', 'Historical Context', 'Cover Versions'],
      recent: 'Like a Rolling Stone'
    },
    {
      title: 'Piano Music',
      path: '/music/piano',
      icon: Piano,
      color: 'from-indigo-500 to-purple-500',
      description: 'From classical masterpieces to contemporary compositions and jazz interpretations.',
      features: ['Sheet Music', 'Audio Recordings', 'Practice Guides', 'Composer Profiles'],
      recent: 'Chopin Nocturnes'
    }
  ]

  const featuredContent = [
    {
      type: 'Theory',
      title: 'Understanding Modal Harmony',
      description: 'Explore how different modes create unique emotional landscapes in music.',
      duration: '12 min read',
      category: 'Advanced'
    },
    {
      type: 'Rush',
      title: 'The Spirit of Radio - Song Analysis',
      description: 'Breaking down the musical and lyrical complexity of this prog rock classic.',
      duration: '8 min read',
      category: 'Analysis'
    },
    {
      type: 'Dylan',
      title: 'The Times They Are A-Changin\'',
      description: 'Historical context and lasting impact of Dylan\'s protest anthem.',
      duration: '10 min read',
      category: 'Historical'
    },
    {
      type: 'Piano',
      title: 'Jazz Piano Voicings for Beginners',
      description: 'Essential chord voicings every jazz pianist should know.',
      duration: '15 min read',
      category: 'Tutorial'
    }
  ]

  const quickLinks = [
    {
      title: 'Spotify Playlists',
      description: 'Curated playlists for each musical era and style',
      icon: ExternalLink,
      href: 'https://open.spotify.com'
    },
    {
      title: 'Music Forums',
      description: 'Join discussions about music theory and artists',
      icon: ExternalLink,
      href: 'https://reddit.com/r/musictheory'
    },
    {
      title: 'Sheet Music Library',
      description: 'Free sheet music for piano and other instruments',
      icon: ExternalLink,
      href: 'https://imslp.org'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Music Hub
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Explore music theory, discover legendary artists, and deepen your understanding of musical expression across genres and eras.
        </p>
      </div>

      {/* Main Sections */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Explore Music
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {musicSections.map((section, index) => (
            <Link
              key={index}
              to={section.path}
              className="group block"
            >
              <div className="card hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {section.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-4">
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Features:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {section.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        Recently Updated:
                      </span>
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {section.recent}
                      </p>
                    </div>
                    <Play className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Content */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Featured Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredContent.map((content, index) => (
            <div key={index} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                  {content.type}
                </span>
                <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-full">
                  {content.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
                {content.title}
              </h3>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
                {content.description}
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-1 text-neutral-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{content.duration}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 hover:text-primary-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:shadow-md transition-all hover:scale-105 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                  <link.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {link.description}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Music Timeline Preview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Musical Eras Timeline
        </h2>
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Explore Music Through Time
            </h3>
            <Link 
              to="/music/theory" 
              className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center space-x-1"
            >
              <span>View Full Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { era: 'Medieval', years: '500-1400', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
              { era: 'Renaissance', years: '1400-1600', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
              { era: 'Baroque', years: '1600-1750', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
              { era: 'Classical', years: '1750-1820', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' }
            ].map((period, index) => (
              <div key={index} className={`p-3 rounded-lg ${period.color} text-center`}>
                <h4 className="font-medium mb-1">{period.era}</h4>
                <p className="text-xs opacity-75">{period.years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Music