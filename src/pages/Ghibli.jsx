import React, { useState } from 'react'
import { Search, Sparkles, Heart, MessageCircle, ExternalLink, Play, Calendar, Star } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Ghibli = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { addBookmark, removeBookmark, isBookmarked } = useUser()

  const films = [
    {
      id: 1,
      title: "Spirited Away",
      director: "Hayao Miyazaki",
      year: 2001,
      duration: "125 min",
      description: "A young girl enters a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
      themes: ["coming of age", "environmentalism", "identity"],
      rating: 9.3,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      spotifyUrl: "https://open.spotify.com/album/spirited-away-soundtrack",
      discussions: 2341
    },
    {
      id: 2,
      title: "My Neighbor Totoro",
      director: "Hayao Miyazaki",
      year: 1988,
      duration: "86 min",
      description: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits.",
      themes: ["family", "nature", "childhood wonder"],
      rating: 8.2,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      spotifyUrl: "https://open.spotify.com/album/totoro-soundtrack",
      discussions: 1876
    },
    {
      id: 3,
      title: "Princess Mononoke",
      director: "Hayao Miyazaki",
      year: 1997,
      duration: "134 min",
      description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara.",
      themes: ["environmentalism", "war", "balance"],
      rating: 8.4,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      spotifyUrl: "https://open.spotify.com/album/mononoke-soundtrack",
      discussions: 1654
    },
    {
      id: 4,
      title: "Howl's Moving Castle",
      director: "Hayao Miyazaki",
      year: 2004,
      duration: "119 min",
      description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance lies with a self-indulgent yet insecure young wizard.",
      themes: ["self-acceptance", "love", "transformation"],
      rating: 8.2,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      spotifyUrl: "https://open.spotify.com/album/howls-castle-soundtrack",
      discussions: 1432
    },
    {
      id: 5,
      title: "Kiki's Delivery Service",
      director: "Hayao Miyazaki",
      year: 1989,
      duration: "103 min",
      description: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while supporting herself by running an air courier service.",
      themes: ["independence", "self-doubt", "growing up"],
      rating: 7.9,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      spotifyUrl: "https://open.spotify.com/album/kiki-soundtrack",
      discussions: 1298
    },
    {
      id: 6,
      title: "The Wind Rises",
      director: "Hayao Miyazaki",
      year: 2013,
      duration: "126 min",
      description: "A look at the life of Jiro Horikoshi, the man who designed Japanese fighter planes during World War II.",
      themes: ["dreams", "war", "creativity"],
      rating: 7.8,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
      spotifyUrl: "https://open.spotify.com/album/wind-rises-soundtrack",
      discussions: 987
    }
  ]

  const filteredFilms = films.filter(film => 
    film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    film.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
    film.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleBookmark = (film) => {
    if (isBookmarked('ghibli', film.id)) {
      removeBookmark('ghibli', film.id)
    } else {
      addBookmark('ghibli', {
        id: film.id,
        title: film.title,
        director: film.director,
        description: film.description
      })
    }
  }

  const inspirationalQuotes = [
    {
      text: "Always believe in yourself. Do this and no matter where you are, you will have nothing to fear.",
      film: "The Cat Returns",
      character: "Baron"
    },
    {
      text: "A heart's a heavy burden.",
      film: "Howl's Moving Castle",
      character: "Calcifer"
    },
    {
      text: "The creation of a single world comes from a huge number of fragments and chaos.",
      film: "Howl's Moving Castle",
      character: "Howl"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-8 h-8 text-teal-500" />
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Studio Ghibli Collection
          </h1>
          <Sparkles className="w-8 h-8 text-teal-500" />
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Explore the magical world of Studio Ghibli films, with soundtracks, analysis, and community discussions about these beloved animated masterpieces.
        </p>
      </div>

      {/* Inspirational Quote */}
      <div className="card bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-700">
        <div className="text-center">
          <Sparkles className="w-6 h-6 text-teal-500 mx-auto mb-3" />
          <blockquote className="text-lg italic text-neutral-800 dark:text-neutral-200 mb-3">
            "{inspirationalQuotes[0].text}"
          </blockquote>
          <cite className="text-sm text-neutral-600 dark:text-neutral-400">
            — {inspirationalQuotes[0].character}, {inspirationalQuotes[0].film}
          </cite>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search films by title, director, or theme..."
          className="w-full pl-12 pr-4 py-3 rounded-lg input-field"
        />
      </div>

      {/* Results */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing {filteredFilms.length} film{filteredFilms.length !== 1 ? 's' : ''}
      </div>

      {/* Films Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFilms.map((film) => (
          <div key={film.id} className="card hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
            {/* Film Poster */}
            <div className="relative h-48 mb-4 -mx-6 -mt-6">
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleBookmark(film)}
                  className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                    isBookmarked('ghibli', film.id)
                      ? 'bg-red-500/80 text-white'
                      : 'bg-black/20 text-white hover:bg-red-500/80'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isBookmarked('ghibli', film.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{film.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{film.year}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {film.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Directed by {film.director} • {film.duration}
            </p>
            
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              {film.description}
            </p>

            {/* Themes */}
            <div className="flex flex-wrap gap-1 mb-4">
              {film.themes.map((theme, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs rounded-full"
                >
                  {theme}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <a
                href={film.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                <Play className="w-4 h-4" />
                <span>Soundtrack</span>
              </a>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <MessageCircle className="w-4 h-4 text-neutral-500" />
                  <span className="sr-only">{film.discussions} discussions</span>
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
      {filteredFilms.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No films found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Try adjusting your search terms.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="btn-primary"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Community Section */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-teal-500" />
          Fan Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://reddit.com/r/ghibli"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              r/ghibli
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Reddit community for Studio Ghibli fans with discussions, art, and theories.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Reddit • Active community</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500" />
            </div>
          </a>
          
          <a
            href="https://discord.gg/ghibli"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              Ghibli Discord
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Real-time chat with fellow Ghibli enthusiasts and movie watch parties.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Discord • Live chat</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500" />
            </div>
          </a>

          <a
            href="https://ghibli.tumblr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              Ghibli Tumblr
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Fan art, GIFs, and aesthetic posts celebrating Studio Ghibli magic.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Tumblr • Visual content</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500" />
            </div>
          </a>
        </div>
      </section>

      {/* More Quotes */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Inspirational Quotes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inspirationalQuotes.slice(1).map((quote, index) => (
            <div key={index} className="card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <blockquote className="text-neutral-800 dark:text-neutral-200 mb-3 italic">
                "{quote.text}"
              </blockquote>
              <cite className="text-sm text-neutral-600 dark:text-neutral-400">
                — {quote.character}, {quote.film}
              </cite>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Ghibli