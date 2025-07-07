import React, { useState } from 'react'
import { Search, Globe, BookOpen, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Poetry = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const { addBookmark, removeBookmark, isBookmarked } = useUser()

  const countries = [
    { code: 'all', name: 'All Countries', flag: '🌍' },
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'ru', name: 'Russia', flag: '🇷🇺' },
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'cn', name: 'China', flag: '🇨🇳' },
    { code: 'es', name: 'Spain', flag: '🇪🇸' },
    { code: 'it', name: 'Italy', flag: '🇮🇹' },
    { code: 'br', name: 'Brazil', flag: '🇧🇷' }
  ]

  const filters = [
    { value: 'all', label: 'All Poetry' },
    { value: 'translated', label: 'Translated Works' },
    { value: 'original', label: 'Original Language' },
    { value: 'classical', label: 'Classical' },
    { value: 'modern', label: 'Modern' },
    { value: 'contemporary', label: 'Contemporary' }
  ]

  const poems = [
    {
      id: 1,
      title: "The Road Not Taken",
      author: "Robert Frost",
      country: "us",
      year: 1916,
      type: "original",
      era: "modern",
      excerpt: "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood...",
      themes: ["choice", "life", "regret"],
      hasTranslation: true,
      hasAudio: true
    },
    {
      id: 2,
      title: "Haiku Collection",
      author: "Matsuo Bashō",
      country: "jp",
      year: 1686,
      type: "translated",
      era: "classical",
      excerpt: "An ancient pond— a frog leaps in, the sound of water.",
      themes: ["nature", "zen", "simplicity"],
      hasTranslation: true,
      hasAudio: true,
      translator: "R.H. Blyth"
    },
    {
      id: 3,
      title: "Sonnet 18",
      author: "William Shakespeare",
      country: "uk",
      year: 1609,
      type: "original",
      era: "classical",
      excerpt: "Shall I compare thee to a summer's day? Thou art more lovely and more temperate...",
      themes: ["love", "beauty", "immortality"],
      hasTranslation: true,
      hasAudio: true
    },
    {
      id: 4,
      title: "Les Fleurs du mal",
      author: "Charles Baudelaire",
      country: "fr",
      year: 1857,
      type: "translated",
      era: "modern",
      excerpt: "Mother of memories, mistress of mistresses, O you, all my pleasure, O you, all my duty!",
      themes: ["beauty", "decadence", "spirituality"],
      hasTranslation: true,
      hasAudio: false,
      translator: "Richard Howard"
    },
    {
      id: 5,
      title: "Still I Rise",
      author: "Maya Angelou",
      country: "us",
      year: 1978,
      type: "original",
      era: "contemporary",
      excerpt: "You may write me down in history With your bitter, twisted lies, You may trod me in the very dirt But still, like dust, I'll rise.",
      themes: ["resilience", "empowerment", "identity"],
      hasTranslation: true,
      hasAudio: true
    },
    {
      id: 6,
      title: "Gitanjali",
      author: "Rabindranath Tagore",
      country: "in",
      year: 1910,
      type: "translated",
      era: "modern",
      excerpt: "Where the mind is without fear and the head is held high; Where knowledge is free...",
      themes: ["freedom", "spirituality", "enlightenment"],
      hasTranslation: true,
      hasAudio: true,
      translator: "W.B. Yeats"
    }
  ]

  const filteredPoems = poems.filter(poem => {
    const matchesSearch = poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCountry = selectedCountry === 'all' || poem.country === selectedCountry
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'translated' && poem.type === 'translated') ||
                         (selectedFilter === 'original' && poem.type === 'original') ||
                         poem.era === selectedFilter
    
    return matchesSearch && matchesCountry && matchesFilter
  })

  const handleBookmark = (poem) => {
    if (isBookmarked('poetry', poem.id)) {
      removeBookmark('poetry', poem.id)
    } else {
      addBookmark('poetry', {
        id: poem.id,
        title: poem.title,
        author: poem.author,
        description: poem.excerpt.substring(0, 100) + '...'
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Poetry Collection
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Explore poetry from around the world, with translations, audio readings, and contextual analysis.
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
      <div className="space-y-4">
        {/* Country Filter */}
        <div>
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Browse by Country
          </h3>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCountry === country.code
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <span className="text-lg">{country.flag}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Type/Era Filter */}
        <div>
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Filter by Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.value
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing {filteredPoems.length} poem{filteredPoems.length !== 1 ? 's' : ''}
      </div>

      {/* Poems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoems.map((poem) => (
          <div key={poem.id} className="card hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">
                  {countries.find(c => c.code === poem.country)?.flag}
                </span>
                <div>
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {poem.era} • {poem.year}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleBookmark(poem)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked('poetry', poem.id)
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-neutral-400 hover:text-red-500'
                }`}
                aria-label={isBookmarked('poetry', poem.id) ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Heart className={`w-5 h-5 ${isBookmarked('poetry', poem.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {poem.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              by {poem.author}
              {poem.translator && (
                <span className="block text-xs mt-1">
                  Translated by {poem.translator}
                </span>
              )}
            </p>
            
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 italic leading-relaxed">
              {poem.excerpt}
            </p>

            {/* Themes */}
            <div className="flex flex-wrap gap-1 mb-4">
              {poem.themes.map((theme, index) => (
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
              <div className="flex items-center space-x-3">
                {poem.hasAudio && (
                  <button className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm">
                    <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-2 border-l-white border-y-1 border-y-transparent ml-0.5"></div>
                    </div>
                    <span>Listen</span>
                  </button>
                )}
                {poem.hasTranslation && (
                  <button className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm">
                    <Globe className="w-4 h-4" />
                    <span>Translate</span>
                  </button>
                )}
              </div>
              
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
      {filteredPoems.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No poems found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Try adjusting your search terms or filters to find more poetry.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCountry('all')
              setSelectedFilter('all')
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Recent Discussions */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Recent Discussions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Understanding Haiku Structure
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Discussion about the 5-7-5 syllable pattern and its variations in modern haiku.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">r/Poetry • 2 hours ago</span>
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
          
          <div className="card">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Best Poetry Translations
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Community recommendations for the most faithful and beautiful poetry translations.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Discord • 4 hours ago</span>
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Poetry