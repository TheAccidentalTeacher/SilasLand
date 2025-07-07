import React from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Music, 
  Library, 
  Gamepad2, 
  Sparkles, 
  Heart, 
  HelpCircle,
  Search,
  ExternalLink,
  Bookmark,
  TrendingUp
} from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Home = () => {
  const { user, bookmarks } = useUser()

  const quickLinks = [
    { 
      title: 'My Spotify', 
      href: 'https://open.spotify.com', 
      icon: Music,
      description: 'Listen to curated playlists'
    },
    { 
      title: 'My Discord', 
      href: 'https://discord.com', 
      icon: ExternalLink,
      description: 'Join community discussions'
    },
    { 
      title: 'Find Support', 
      href: '/resources', 
      icon: Heart,
      description: 'Neurodivergent resources'
    }
  ]

  const exploreItems = [
    { 
      title: 'Poetry', 
      path: '/poetry', 
      icon: BookOpen, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Explore poetry from around the world'
    },
    { 
      title: 'Music Theory', 
      path: '/music/theory', 
      icon: Music, 
      color: 'from-purple-500 to-pink-500',
      description: 'Learn musical concepts and history'
    },
    { 
      title: 'Literature', 
      path: '/literature', 
      icon: Library, 
      color: 'from-green-500 to-emerald-500',
      description: 'Discover great works of literature'
    },
    { 
      title: 'Indie Games', 
      path: '/games', 
      icon: Gamepad2, 
      color: 'from-orange-500 to-red-500',
      description: 'Find accessible and engaging games'
    },
    { 
      title: 'Studio Ghibli', 
      path: '/ghibli', 
      icon: Sparkles, 
      color: 'from-teal-500 to-blue-500',
      description: 'Explore magical animated films'
    },
    { 
      title: 'Rush', 
      path: '/music/rush', 
      icon: Music, 
      color: 'from-red-500 to-pink-500',
      description: 'Dive into progressive rock'
    },
    { 
      title: 'Bob Dylan', 
      path: '/music/dylan', 
      icon: Music, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Folk music and poetic lyrics'
    },
    { 
      title: 'Piano Music', 
      path: '/music/piano', 
      icon: Music, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Classical and contemporary piano'
    }
  ]

  const dailyInspiration = {
    poem: {
      title: "The Road Not Taken",
      author: "Robert Frost",
      excerpt: "Two roads diverged in a yellow wood, And sorry I could not travel both..."
    },
    game: {
      title: "Celeste",
      description: "A challenging platformer about mental health and perseverance"
    },
    ghibliQuote: {
      text: "Always believe in yourself. Do this and no matter where you are, you will have nothing to fear.",
      film: "The Cat Returns"
    },
    rushLyric: {
      text: "If you choose not to decide, you still have made a choice",
      song: "Freewill"
    },
    dylanLyric: {
      text: "The answer, my friend, is blowin' in the wind",
      song: "Blowin' in the Wind"
    },
    piano: {
      title: "Clair de Lune",
      composer: "Claude Debussy"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto flex items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Welcome to Silas' Hub
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Your comprehensive digital portal for poetry, music, literature, games, and neurodivergent resources. 
          Explore, learn, and connect with communities that matter to you.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Ask or search for anything..."
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-lg"
        />
      </div>

      {/* Daily Inspiration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-primary-500" />
          Daily Inspiration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Poem of the Day */}
          <div className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Poem of the Day</h3>
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">
              {dailyInspiration.poem.title}
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              by {dailyInspiration.poem.author}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
              {dailyInspiration.poem.excerpt}
            </p>
            <Link to="/poetry" className="text-primary-500 hover:text-primary-600 text-sm font-medium mt-2 inline-block">
              Explore Poetry →
            </Link>
          </div>

          {/* Game of the Week */}
          <div className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Game of the Week</h3>
              <Gamepad2 className="w-5 h-5 text-orange-500" />
            </div>
            <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
              {dailyInspiration.game.title}
            </h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {dailyInspiration.game.description}
            </p>
            <Link to="/games" className="text-primary-500 hover:text-primary-600 text-sm font-medium mt-2 inline-block">
              Discover Games →
            </Link>
          </div>

          {/* Ghibli Quote */}
          <div className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Ghibli Wisdom</h3>
              <Sparkles className="w-5 h-5 text-teal-500" />
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 italic mb-2">
              "{dailyInspiration.ghibliQuote.text}"
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              — {dailyInspiration.ghibliQuote.film}
            </p>
            <Link to="/ghibli" className="text-primary-500 hover:text-primary-600 text-sm font-medium mt-2 inline-block">
              Explore Films →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
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
                {link.href.startsWith('http') && (
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Explore Sections */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exploreItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="group block"
            >
              <div className="card hover:shadow-lg transition-all hover:scale-105">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Bookmarks */}
      {Object.values(bookmarks).some(category => category.length > 0) && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
            <Bookmark className="w-6 h-6 mr-2 text-primary-500" />
            Recent Bookmarks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(bookmarks)
              .flatMap(([category, items]) => 
                items.slice(0, 2).map(item => ({ ...item, category }))
              )
              .slice(0, 6)
              .map((item, index) => (
                <div key={index} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <Bookmark className="w-4 h-4 text-primary-500" />
                  </div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {item.description || item.author || 'Bookmarked item'}
                  </p>
                </div>
              ))}
          </div>
          <div className="text-center">
            <Link 
              to="/account" 
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              View All Bookmarks →
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home