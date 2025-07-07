import React, { useState } from 'react'
import { Search, Gamepad2, Heart, MessageCircle, ExternalLink, Star, Clock, Users } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [accessibilityFilter, setAccessibilityFilter] = useState('all')
  const { addBookmark, removeBookmark, isBookmarked } = useUser()

  const genres = [
    { value: 'all', label: 'All Genres' },
    { value: 'puzzle', label: 'Puzzle' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'platformer', label: 'Platformer' },
    { value: 'rpg', label: 'RPG' },
    { value: 'simulation', label: 'Simulation' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'narrative', label: 'Narrative' }
  ]

  const accessibilityOptions = [
    { value: 'all', label: 'All Games' },
    { value: 'adhd-friendly', label: 'ADHD Friendly' },
    { value: 'anxiety-friendly', label: 'Anxiety Friendly' },
    { value: 'colorblind-friendly', label: 'Colorblind Friendly' },
    { value: 'low-stress', label: 'Low Stress' },
    { value: 'customizable', label: 'Highly Customizable' }
  ]

  const games = [
    {
      id: 1,
      title: "Celeste",
      developer: "Maddy Makes Games",
      genre: "platformer",
      year: 2018,
      description: "A challenging platformer about climbing a mountain and overcoming personal struggles.",
      steamUrl: "https://store.steampowered.com/app/504230/Celeste/",
      rating: 4.9,
      playtime: "8-12 hours",
      price: "$19.99",
      accessibility: ["adhd-friendly", "anxiety-friendly", "customizable"],
      themes: ["mental health", "perseverance", "self-acceptance"],
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "Stardew Valley",
      developer: "ConcernedApe",
      genre: "simulation",
      year: 2016,
      description: "A farming simulation game where you inherit your grandfather's old farm plot.",
      steamUrl: "https://store.steampowered.com/app/413150/Stardew_Valley/",
      rating: 4.8,
      playtime: "50+ hours",
      price: "$14.99",
      accessibility: ["low-stress", "adhd-friendly", "customizable"],
      themes: ["farming", "community", "relaxation"],
      image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "A Short Hike",
      developer: "adamgryu",
      genre: "adventure",
      year: 2019,
      description: "A relaxing exploration game about hiking to the top of a mountain.",
      steamUrl: "https://store.steampowered.com/app/1055540/A_Short_Hike/",
      rating: 4.7,
      playtime: "1-2 hours",
      price: "$7.99",
      accessibility: ["low-stress", "anxiety-friendly", "colorblind-friendly"],
      themes: ["exploration", "nature", "mindfulness"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
    },
    {
      id: 4,
      title: "Spiritfarer",
      developer: "Thunder Lotus Games",
      genre: "adventure",
      year: 2020,
      description: "A cozy management game about dying, where you play as Stella, ferrymaster to the deceased.",
      steamUrl: "https://store.steampowered.com/app/972660/Spiritfarer/",
      rating: 4.6,
      playtime: "20-30 hours",
      price: "$29.99",
      accessibility: ["low-stress", "anxiety-friendly", "customizable"],
      themes: ["death", "friendship", "letting go"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop"
    },
    {
      id: 5,
      title: "Unpacking",
      developer: "Witch Beam",
      genre: "puzzle",
      year: 2021,
      description: "A zen puzzle game about the familiar experience of pulling possessions out of boxes.",
      steamUrl: "https://store.steampowered.com/app/1135690/Unpacking/",
      rating: 4.5,
      playtime: "4-6 hours",
      price: "$19.99",
      accessibility: ["low-stress", "adhd-friendly", "colorblind-friendly"],
      themes: ["nostalgia", "life stages", "organization"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop"
    },
    {
      id: 6,
      title: "Coffee Talk",
      developer: "Toge Productions",
      genre: "narrative",
      year: 2020,
      description: "A coffee brewing and heart-to-heart talking simulator about listening to people's problems.",
      steamUrl: "https://store.steampowered.com/app/914800/Coffee_Talk/",
      rating: 4.4,
      playtime: "6-8 hours",
      price: "$12.99",
      accessibility: ["low-stress", "anxiety-friendly", "adhd-friendly"],
      themes: ["empathy", "community", "storytelling"],
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=225&fit=crop"
    }
  ]

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre
    const matchesAccessibility = accessibilityFilter === 'all' || 
                                game.accessibility.includes(accessibilityFilter)
    
    return matchesSearch && matchesGenre && matchesAccessibility
  })

  const handleBookmark = (game) => {
    if (isBookmarked('games', game.id)) {
      removeBookmark('games', game.id)
    } else {
      addBookmark('games', {
        id: game.id,
        title: game.title,
        developer: game.developer,
        description: game.description
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Indie Games Collection
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Discover accessible and engaging indie games, with a focus on neurodivergent-friendly experiences and meaningful gameplay.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, developer, or theme..."
          className="w-full pl-12 pr-4 py-3 rounded-lg input-field"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full input-field"
          >
            {genres.map(genre => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Accessibility Features
          </label>
          <select
            value={accessibilityFilter}
            onChange={(e) => setAccessibilityFilter(e.target.value)}
            className="w-full input-field"
          >
            {accessibilityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div key={game.id} className="card hover:shadow-lg transition-shadow overflow-hidden">
            {/* Game Image */}
            <div className="relative h-48 mb-4 -mx-6 -mt-6">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleBookmark(game)}
                  className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                    isBookmarked('games', game.id)
                      ? 'bg-red-500/80 text-white'
                      : 'bg-black/20 text-white hover:bg-red-500/80'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isBookmarked('games', game.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                  {game.genre} • {game.year}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {game.rating}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {game.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              by {game.developer}
            </p>
            
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              {game.description}
            </p>

            {/* Game Info */}
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{game.playtime}</span>
              </div>
              <span className="font-medium text-primary-600 dark:text-primary-400">
                {game.price}
              </span>
            </div>

            {/* Accessibility Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {game.accessibility.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full"
                >
                  {feature.replace('-', ' ')}
                </span>
              ))}
            </div>

            {/* Themes */}
            <div className="flex flex-wrap gap-1 mb-4">
              {game.themes.map((theme, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full"
                >
                  {theme}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <a
                href={game.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>View on Steam</span>
              </a>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <MessageCircle className="w-4 h-4 text-neutral-500" />
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <Users className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <Gamepad2 className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No games found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Try adjusting your search terms or filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedGenre('all')
              setAccessibilityFilter('all')
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Community Section */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Community Discussions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Best Games for ADHD
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Community recommendations for games that work well with ADHD brains.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">r/ADHD_Gamers • 3 hours ago</span>
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
          
          <div className="card">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Cozy Games for Anxiety Relief
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Discussion about games that help with anxiety and stress relief.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Discord • 1 day ago</span>
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Games