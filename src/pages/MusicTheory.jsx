import React, { useState } from 'react'
import { Music, Play, ExternalLink, BookOpen, Clock, Users } from 'lucide-react'

const MusicTheory = () => {
  const [selectedEra, setSelectedEra] = useState('all')

  const eras = [
    { value: 'all', label: 'All Eras', years: '', color: 'bg-neutral-100 dark:bg-neutral-700' },
    { value: 'medieval', label: 'Medieval', years: '500-1400', color: 'bg-amber-100 dark:bg-amber-900/30' },
    { value: 'renaissance', label: 'Renaissance', years: '1400-1600', color: 'bg-green-100 dark:bg-green-900/30' },
    { value: 'baroque', label: 'Baroque', years: '1600-1750', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { value: 'classical', label: 'Classical', years: '1750-1820', color: 'bg-purple-100 dark:bg-purple-900/30' },
    { value: 'romantic', label: 'Romantic', years: '1820-1900', color: 'bg-pink-100 dark:bg-pink-900/30' },
    { value: 'modern', label: 'Modern', years: '1900-1950', color: 'bg-orange-100 dark:bg-orange-900/30' },
    { value: 'contemporary', label: 'Contemporary', years: '1950-present', color: 'bg-teal-100 dark:bg-teal-900/30' }
  ]

  const topics = [
    {
      id: 1,
      title: "Understanding Scales and Modes",
      era: "all",
      difficulty: "Beginner",
      duration: "15 min",
      description: "Learn the fundamental building blocks of music theory - scales and their modal variations.",
      concepts: ["Major scales", "Minor scales", "Church modes", "Pentatonic scales"],
      spotifyPlaylist: "https://open.spotify.com/playlist/scales-modes"
    },
    {
      id: 2,
      title: "Baroque Harmony and Counterpoint",
      era: "baroque",
      difficulty: "Advanced",
      duration: "25 min",
      description: "Explore the intricate harmonic language of Bach and his contemporaries.",
      concepts: ["Voice leading", "Figured bass", "Fugue structure", "Counterpoint rules"],
      spotifyPlaylist: "https://open.spotify.com/playlist/baroque-harmony"
    },
    {
      id: 3,
      title: "Classical Form and Structure",
      era: "classical",
      difficulty: "Intermediate",
      duration: "20 min",
      description: "Understand sonata form, rondo, and other classical structures used by Mozart and Haydn.",
      concepts: ["Sonata form", "Rondo form", "Theme and variations", "Classical cadences"],
      spotifyPlaylist: "https://open.spotify.com/playlist/classical-forms"
    },
    {
      id: 4,
      title: "Romantic Expression and Chromaticism",
      era: "romantic",
      difficulty: "Intermediate",
      duration: "18 min",
      description: "Discover how Romantic composers expanded harmonic language for emotional expression.",
      concepts: ["Chromatic harmony", "Extended chords", "Program music", "Leitmotifs"],
      spotifyPlaylist: "https://open.spotify.com/playlist/romantic-harmony"
    },
    {
      id: 5,
      title: "Jazz Harmony and Improvisation",
      era: "modern",
      difficulty: "Advanced",
      duration: "30 min",
      description: "Learn the complex harmonic language that defines jazz music.",
      concepts: ["Extended chords", "Chord substitutions", "Modal jazz", "Bebop scales"],
      spotifyPlaylist: "https://open.spotify.com/playlist/jazz-harmony"
    },
    {
      id: 6,
      title: "Contemporary Techniques",
      era: "contemporary",
      difficulty: "Advanced",
      duration: "22 min",
      description: "Explore modern compositional techniques and electronic music theory.",
      concepts: ["Serialism", "Minimalism", "Electronic synthesis", "Microtonality"],
      spotifyPlaylist: "https://open.spotify.com/playlist/contemporary-music"
    }
  ]

  const filteredTopics = selectedEra === 'all' 
    ? topics 
    : topics.filter(topic => topic.era === selectedEra || topic.era === 'all')

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
      case 'Intermediate': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
      case 'Advanced': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
      default: return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-center">
          <Music className="w-8 h-8 text-purple-500 mr-3" />
          Music Theory
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Explore musical concepts through the ages, from medieval modes to contemporary techniques, with interactive examples and curated playlists.
        </p>
      </div>

      {/* Era Timeline */}
      <div className="card">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Musical Eras Timeline
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {eras.map((era) => (
            <button
              key={era.value}
              onClick={() => setSelectedEra(era.value)}
              className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
                selectedEra === era.value
                  ? `${era.color} ring-2 ring-primary-500`
                  : `${era.color} hover:opacity-80`
              }`}
            >
              <div className="font-medium text-sm mb-1">{era.label}</div>
              {era.years && (
                <div className="text-xs opacity-75">{era.years}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <div key={topic.id} className="card hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                {topic.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-neutral-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{topic.duration}</span>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {topic.title}
            </h3>
            
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              {topic.description}
            </p>

            {/* Concepts */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Key Concepts:
              </h4>
              <div className="flex flex-wrap gap-1">
                {topic.concepts.map((concept, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <button className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                <span>Learn</span>
              </button>
              
              <a
                href={topic.spotifyPlaylist}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
              >
                <Play className="w-4 h-4" />
                <span>Listen</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Quick Reference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Circle of Fifths
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Visual representation of key signatures and their relationships.
            </p>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              View Interactive Chart →
            </button>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Chord Progressions
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Common chord progressions used across different genres.
            </p>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              Explore Progressions →
            </button>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Interval Calculator
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Calculate intervals between notes and hear the differences.
            </p>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              Use Calculator →
            </button>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <Users className="w-6 h-6 mr-2 text-purple-500" />
          Community Discussions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://reddit.com/r/musictheory"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              r/musictheory
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Active community discussing music theory concepts, analysis, and questions.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Reddit • 500k+ members</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500" />
            </div>
          </a>
          
          <a
            href="https://discord.gg/musictheory"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              Music Theory Discord
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Real-time discussions, homework help, and composition feedback.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Discord • Live chat</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500" />
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

export default MusicTheory