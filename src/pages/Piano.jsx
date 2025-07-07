import React, { useState } from 'react'
import { Piano, Play, ExternalLink, Download, BookOpen, Users } from 'lucide-react'

const PianoPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('all')

  const genres = [
    { id: 'all', label: 'All Genres' },
    { id: 'baroque', label: 'Baroque' },
    { id: 'classical', label: 'Classical' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'impressionist', label: 'Impressionist' },
    { id: 'jazz', label: 'Jazz' },
    { id: 'contemporary', label: 'Contemporary' }
  ]

  const composers = [
    {
      id: 1,
      name: "Johann Sebastian Bach",
      period: "Baroque",
      genre: "baroque",
      years: "1685-1750",
      description: "Master of counterpoint and harmonic innovation, Bach's keyboard works remain foundational to piano literature.",
      keyWorks: ["Well-Tempered Clavier", "Goldberg Variations", "French Suites", "English Suites"],
      difficulty: "Intermediate to Advanced",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      spotifyUrl: "https://open.spotify.com/artist/bach"
    },
    {
      id: 2,
      name: "Frédéric Chopin",
      period: "Romantic",
      genre: "romantic",
      years: "1810-1849",
      description: "The poet of the piano, Chopin revolutionized piano technique and expression with his nocturnes, études, and ballades.",
      keyWorks: ["Nocturnes", "Études", "Ballades", "Polonaises"],
      difficulty: "Intermediate to Advanced",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=300&h=200&fit=crop",
      spotifyUrl: "https://open.spotify.com/artist/chopin"
    },
    {
      id: 3,
      name: "Claude Debussy",
      period: "Impressionist",
      genre: "impressionist",
      years: "1862-1918",
      description: "Pioneer of musical impressionism, Debussy created atmospheric and coloristic piano works that broke traditional harmonic rules.",
      keyWorks: ["Clair de Lune", "Arabesque", "Images", "Préludes"],
      difficulty: "Intermediate to Advanced",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      spotifyUrl: "https://open.spotify.com/artist/debussy"
    },
    {
      id: 4,
      name: "Bill Evans",
      period: "Jazz",
      genre: "jazz",
      years: "1929-1980",
      description: "Influential jazz pianist known for his impressionistic approach, sophisticated harmonies, and lyrical touch.",
      keyWorks: ["Waltz for Debby", "Autumn Leaves", "My Foolish Heart", "Peace Piece"],
      difficulty: "Advanced",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop",
      spotifyUrl: "https://open.spotify.com/artist/bill-evans"
    },
    {
      id: 5,
      name: "Keith Jarrett",
      period: "Contemporary",
      genre: "contemporary",
      years: "1945-present",
      description: "Renowned for both classical interpretation and jazz improvisation, particularly famous for the Köln Concert.",
      keyWorks: ["The Köln Concert", "Paris Concert", "Bach: Well-Tempered Clavier"],
      difficulty: "Advanced",
      image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=200&fit=crop",
      spotifyUrl: "https://open.spotify.com/artist/keith-jarrett"
    },
    {
      id: 6,
      name: "Philip Glass",
      period: "Minimalist",
      genre: "contemporary",
      years: "1937-present",
      description: "Leading minimalist composer whose repetitive, evolving piano works have influenced contemporary classical music.",
      keyWorks: ["Metamorphosis", "Études", "Mad Rush", "Opening"],
      difficulty: "Intermediate to Advanced",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
      spotifyUrl: "https://open.spotify.com/artist/philip-glass"
    }
  ]

  const practiceResources = [
    {
      title: "Beginner Method Books",
      description: "Essential method books for starting your piano journey",
      resources: [
        "Alfred's Basic Piano Library",
        "Faber Piano Adventures",
        "Bastien Piano Basics",
        "Piano Pronto"
      ]
    },
    {
      title: "Technique Development",
      description: "Resources for developing proper piano technique",
      resources: [
        "Hanon: The Virtuoso Pianist",
        "Czerny Studies",
        "Scales and Arpeggios",
        "Finger Independence Exercises"
      ]
    },
    {
      title: "Jazz Piano Resources",
      description: "Materials for learning jazz piano and improvisation",
      resources: [
        "The Jazz Piano Book - Mark Levine",
        "Voicings for Jazz Keyboard - Frank Mantooth",
        "Jazz Piano Voicing Skills - Dan Haerle",
        "Real Book (6th Edition)"
      ]
    },
    {
      title: "Online Learning Platforms",
      description: "Digital platforms for piano education",
      resources: [
        "Simply Piano",
        "Flowkey",
        "Piano Academy",
        "Playground Sessions"
      ]
    }
  ]

  const filteredComposers = selectedGenre === 'all' 
    ? composers 
    : composers.filter(composer => composer.genre === selectedGenre)

  const getDifficultyColor = (difficulty) => {
    if (difficulty.includes('Beginner')) return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    if (difficulty.includes('Intermediate')) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
    if (difficulty.includes('Advanced')) return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-center">
          <Piano className="w-8 h-8 text-indigo-500 mr-3" />
          Piano Music
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Explore the rich world of piano music from Baroque masters to contemporary innovators, 
          with sheet music, recordings, and practice resources.
        </p>
      </div>

      {/* Genre Filter */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Explore by Genre
        </h2>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedGenre === genre.id
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      {/* Composers Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Featured Composers {selectedGenre !== 'all' && `- ${genres.find(g => g.id === selectedGenre)?.label}`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComposers.map((composer) => (
            <div key={composer.id} className="card hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-32 mb-4 -mx-6 -mt-6">
                <img
                  src={composer.image}
                  alt={composer.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-xl"></div>
                <div className="absolute bottom-2 left-3 right-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(composer.difficulty)}`}>
                    {composer.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {composer.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {composer.period} • {composer.years}
                  </p>
                </div>
                
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {composer.description}
                </p>

                {/* Key Works */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Key Works:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {composer.keyWorks.map((work, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full"
                      >
                        {work}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <a
                    href={composer.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                  >
                    <Play className="w-4 h-4" />
                    <span>Listen</span>
                  </a>
                  
                  <button className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                    <Download className="w-4 h-4" />
                    <span>Sheet Music</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Resources */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-indigo-500" />
          Practice Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceResources.map((category, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.resources.map((resource, resourceIndex) => (
                  <li key={resourceIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {resource}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Piano Techniques */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Essential Techniques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Scales & Arpeggios
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Foundation of piano technique - major, minor, and chromatic scales.
            </p>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              Practice Guide →
            </button>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Jazz Voicings
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Learn essential jazz chord voicings and progressions.
            </p>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              Chord Charts →
            </button>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Pedaling Techniques
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Master sustain and soft pedal techniques for expression.
            </p>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              Learn More →
            </button>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <Users className="w-5 h-5 mr-2 text-indigo-500" />
          Piano Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://reddit.com/r/piano"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              r/piano
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Active community for piano players of all levels.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Reddit • 200k+ members</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-indigo-500" />
            </div>
          </a>
          
          <a
            href="https://pianoworld.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Piano World
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Comprehensive piano forum and community.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Forum • Est. 1999</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-indigo-500" />
            </div>
          </a>

          <a
            href="https://imslp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              IMSLP
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Free public domain sheet music library.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Library • 500k+ scores</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-indigo-500" />
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

export default PianoPage