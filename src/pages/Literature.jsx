import React, { useState } from 'react'
import { Search, Book, Globe, Heart, MessageCircle, ExternalLink, Filter } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Literature = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const { addBookmark, removeBookmark, isBookmarked } = useUser()

  const genres = [
    { value: 'all', label: 'All Genres' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'poetry', label: 'Poetry' },
    { value: 'drama', label: 'Drama' },
    { value: 'essays', label: 'Essays' },
    { value: 'folklore', label: 'Folklore' },
    { value: 'philosophy', label: 'Philosophy' }
  ]

  const countries = [
    { code: 'all', name: 'All Countries', flag: '🌍' },
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'ru', name: 'Russia', flag: '🇷🇺' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'in', name: 'India', flag: '🇮🇳' }
  ]

  const literature = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      country: "us",
      year: 1960,
      genre: "fiction",
      description: "A gripping tale of racial injustice and childhood innocence in the American South.",
      themes: ["justice", "prejudice", "moral growth"],
      pages: 281,
      rating: 4.3,
      discussions: 1247
    },
    {
      id: 2,
      title: "One Hundred Years of Solitude",
      author: "Gabriel García Márquez",
      country: "co",
      year: 1967,
      genre: "fiction",
      description: "A multi-generational saga of the Buendía family in the fictional town of Macondo.",
      themes: ["magical realism", "family", "solitude"],
      pages: 417,
      rating: 4.1,
      discussions: 892
    },
    {
      id: 3,
      title: "The Art of War",
      author: "Sun Tzu",
      country: "cn",
      year: -500,
      genre: "philosophy",
      description: "Ancient Chinese military treatise on strategy and tactics.",
      themes: ["strategy", "leadership", "conflict"],
      pages: 273,
      rating: 4.0,
      discussions: 634
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      country: "uk",
      year: 1813,
      genre: "fiction",
      description: "A romantic novel about manners, upbringing, morality, and marriage.",
      themes: ["love", "class", "society"],
      pages: 432,
      rating: 4.2,
      discussions: 1156
    }
  ]

  const filteredLiterature = literature.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesGenre = selectedGenre === 'all' || work.genre === selectedGenre
    const matchesCountry = selectedCountry === 'all' || work.country === selectedCountry
    
    return matchesSearch && matchesGenre && matchesCountry
  })

  const handleBookmark = (work) => {
    if (isBookmarked('literature', work.id)) {
      removeBookmark('literature', work.id)
    } else {
      addBookmark('literature', {
        id: work.id,
        title: work.title,
        author: work.author,
        description: work.description
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Literature Collection
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Explore great works of literature from around the world, with analysis, discussions, and cultural context.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, author, or theme..."
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
            Country/Region
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full input-field"
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing {filteredLiterature.length} work{filteredLiterature.length !== 1 ? 's' : ''}
      </div>

      {/* Literature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLiterature.map((work) => (
          <div key={work.id} className="card hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                  {work.genre} • {work.year > 0 ? work.year : `${Math.abs(work.year)} BCE`}
                </span>
              </div>
              <button
                onClick={() => handleBookmark(work)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked('literature', work.id)
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-neutral-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isBookmarked('literature', work.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {work.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              by {work.author}
            </p>
            
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              {work.description}
            </p>

            {/* Themes */}
            <div className="flex flex-wrap gap-1 mb-4">
              {work.themes.map((theme, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full"
                >
                  {theme}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              <span>{work.pages} pages</span>
              <span>★ {work.rating}</span>
              <span>{work.discussions} discussions</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <button className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm">
                <Book className="w-4 h-4" />
                <span>Read</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <MessageCircle className="w-4 h-4 text-neutral-500" />
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <ExternalLink className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLiterature.length === 0 && (
        <div className="text-center py-12">
          <Book className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No literature found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Try adjusting your search terms or filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedGenre('all')
              setSelectedCountry('all')
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Literature