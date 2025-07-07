import React, { useState } from 'react'
import { Music, Play, ExternalLink, MessageCircle, Heart, Calendar, Award } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Dylan = () => {
  const [selectedEra, setSelectedEra] = useState('all')
  const { addBookmark, removeBookmark, isBookmarked } = useUser()

  const eras = [
    { id: 'all', label: 'All Eras', years: '' },
    { id: 'folk', label: 'Folk Period', years: '1961-1965' },
    { id: 'electric', label: 'Electric Period', years: '1965-1966' },
    { id: 'country', label: 'Country Period', years: '1967-1970' },
    { id: 'comeback', label: 'Comeback', years: '1975-1976' },
    { id: 'christian', label: 'Christian Period', years: '1979-1981' },
    { id: 'renaissance', label: 'Renaissance', years: '1997-2012' },
    { id: 'standards', label: 'Standards', years: '2015-2017' }
  ]

  const songs = [
    {
      id: 1,
      title: "Like a Rolling Stone",
      album: "Highway 61 Revisited",
      year: 1965,
      era: "electric",
      description: "Revolutionary 6-minute single that changed popular music forever.",
      themes: ["alienation", "social criticism", "transformation"],
      significance: "Ranked #1 on Rolling Stone's 500 Greatest Songs",
      lyrics: "How does it feel / To be without a home / Like a complete unknown / Like a rolling stone?",
      spotifyUrl: "https://open.spotify.com/track/like-a-rolling-stone"
    },
    {
      id: 2,
      title: "Blowin' in the Wind",
      album: "The Freewheelin' Bob Dylan",
      year: 1963,
      era: "folk",
      description: "Iconic protest song that became an anthem of the civil rights movement.",
      themes: ["civil rights", "war", "freedom"],
      significance: "Defining song of the 1960s protest movement",
      lyrics: "The answer, my friend, is blowin' in the wind / The answer is blowin' in the wind",
      spotifyUrl: "https://open.spotify.com/track/blowin-in-the-wind"
    },
    {
      id: 3,
      title: "Tangled Up in Blue",
      album: "Blood on the Tracks",
      year: 1975,
      era: "comeback",
      description: "Masterful narrative song showcasing Dylan's storytelling at its peak.",
      themes: ["love", "memory", "narrative"],
      significance: "Often cited as Dylan's greatest composition",
      lyrics: "Early one mornin' the sun was shinin' / I was layin' in bed / Wonderin' if she'd changed at all / If her hair was still red",
      spotifyUrl: "https://open.spotify.com/track/tangled-up-in-blue"
    },
    {
      id: 4,
      title: "The Times They Are A-Changin'",
      album: "The Times They Are A-Changin'",
      year: 1964,
      era: "folk",
      description: "Prophetic anthem that captured the spirit of social change in the 1960s.",
      themes: ["social change", "generational conflict", "prophecy"],
      significance: "Became the unofficial anthem of the 1960s",
      lyrics: "Come gather 'round people wherever you roam / And admit that the waters around you have grown",
      spotifyUrl: "https://open.spotify.com/track/times-they-are-a-changin"
    },
    {
      id: 5,
      title: "Mr. Tambourine Man",
      album: "Bringing It All Back Home",
      year: 1965,
      era: "electric",
      description: "Surreal, dreamlike song that showcased Dylan's poetic evolution.",
      themes: ["dreams", "escapism", "surrealism"],
      significance: "Influenced countless singer-songwriters",
      lyrics: "Hey! Mr. Tambourine Man, play a song for me / I'm not sleepy and there is no place I'm going to",
      spotifyUrl: "https://open.spotify.com/track/mr-tambourine-man"
    },
    {
      id: 6,
      title: "Things Have Changed",
      album: "Wonder Boys Soundtrack",
      year: 2000,
      era: "renaissance",
      description: "Academy Award-winning song marking Dylan's late-career resurgence.",
      themes: ["aging", "disillusionment", "adaptation"],
      significance: "Won Academy Award for Best Original Song",
      lyrics: "People are crazy and times are strange / I'm locked in tight, I'm out of range / I used to care, but things have changed",
      spotifyUrl: "https://open.spotify.com/track/things-have-changed"
    }
  ]

  const achievements = [
    {
      award: "Nobel Prize in Literature",
      year: 2016,
      description: "For having created new poetic expressions within the great American song tradition"
    },
    {
      award: "Presidential Medal of Freedom",
      year: 2012,
      description: "America's highest civilian honor"
    },
    {
      award: "Academy Award",
      year: 2001,
      description: "Best Original Song for 'Things Have Changed'"
    },
    {
      award: "Rock and Roll Hall of Fame",
      year: 1988,
      description: "Inducted in the first year of eligibility"
    },
    {
      award: "Grammy Lifetime Achievement Award",
      year: 1991,
      description: "Recognition for lifetime contributions to music"
    }
  ]

  const influences = [
    {
      name: "Woody Guthrie",
      influence: "Folk tradition and social consciousness",
      connection: "Dylan's early idol and major influence on his protest songs"
    },
    {
      name: "Hank Williams",
      influence: "Country music and emotional directness",
      connection: "Influenced Dylan's country period and songwriting style"
    },
    {
      name: "Robert Johnson",
      influence: "Blues tradition and mystique",
      connection: "Delta blues influence on Dylan's later work"
    },
    {
      name: "Arthur Rimbaud",
      influence: "Surrealist poetry and imagery",
      connection: "Literary influence on Dylan's poetic lyrics"
    }
  ]

  const filteredSongs = selectedEra === 'all' 
    ? songs 
    : songs.filter(song => song.era === selectedEra)

  const handleBookmark = (song) => {
    if (isBookmarked('music', song.id)) {
      removeBookmark('music', song.id)
    } else {
      addBookmark('music', {
        id: song.id,
        title: song.title,
        author: 'Bob Dylan',
        description: song.description
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-center">
          <Music className="w-8 h-8 text-yellow-500 mr-3" />
          Bob Dylan
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Explore the Nobel Prize-winning songwriter's extensive catalog, from protest anthems to electric innovations, 
          with lyrical analysis and cultural context.
        </p>
      </div>

      {/* Artist Overview */}
      <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
              alt="Bob Dylan"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                The Voice of a Generation
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Born Robert Allen Zimmerman in 1941, Bob Dylan transformed popular music by bringing 
                literary depth to rock and folk. His influence extends far beyond music into literature, 
                culture, and social consciousness.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">Born:</span>
                <p className="text-neutral-600 dark:text-neutral-400">May 24, 1941</p>
              </div>
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">Origin:</span>
                <p className="text-neutral-600 dark:text-neutral-400">Duluth, Minnesota</p>
              </div>
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">Albums:</span>
                <p className="text-neutral-600 dark:text-neutral-400">39 studio albums</p>
              </div>
              <div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">Active:</span>
                <p className="text-neutral-600 dark:text-neutral-400">1961-present</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Era Filter */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Musical Eras
        </h2>
        <div className="flex flex-wrap gap-2">
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedEra === era.id
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <div>{era.label}</div>
              {era.years && (
                <div className="text-xs opacity-75">{era.years}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Songs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Essential Songs {selectedEra !== 'all' && `- ${eras.find(e => e.id === selectedEra)?.label}`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSongs.map((song) => (
            <div key={song.id} className="card hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
                    {song.album} • {song.year}
                  </span>
                </div>
                <button
                  onClick={() => handleBookmark(song)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked('music', song.id)
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-neutral-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isBookmarked('music', song.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {song.title}
              </h3>
              
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                {song.description}
              </p>

              {/* Lyrics Sample */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg mb-4">
                <p className="text-sm italic text-neutral-700 dark:text-neutral-300">
                  "{song.lyrics}"
                </p>
              </div>

              {/* Themes */}
              <div className="flex flex-wrap gap-1 mb-4">
                {song.themes.map((theme, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              {/* Significance */}
              <div className="mb-4">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Significance: 
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">
                  {song.significance}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <a
                  href={song.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                >
                  <Play className="w-4 h-4" />
                  <span>Listen</span>
                </a>
                
                <button className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                  <MessageCircle className="w-4 h-4" />
                  <span>Analyze</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-500" />
          Major Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="card">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {achievement.year}
                </span>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {achievement.award}
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Influences */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Key Influences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {influences.map((influence, index) => (
            <div key={index} className="card">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {influence.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                <strong>Influence:</strong> {influence.influence}
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {influence.connection}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-yellow-500" />
          Dylan Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://reddit.com/r/bobdylan"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
              r/bobdylan
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Active Reddit community for Dylan fans and scholars.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Reddit • 80k+ members</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-yellow-500" />
            </div>
          </a>
          
          <a
            href="https://expectingrain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
              Expecting Rain
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Comprehensive Dylan news and information site.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Website • Est. 1995</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-yellow-500" />
            </div>
          </a>

          <a
            href="https://bobdylan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
              Official Website
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Official Bob Dylan website with news and tour dates.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Official • bobdylan.com</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-yellow-500" />
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Dylan