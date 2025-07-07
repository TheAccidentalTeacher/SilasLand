import React, { useState } from 'react'
import { Music, Play, ExternalLink, MessageCircle, Heart, Calendar, Users } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Rush = () => {
  const [selectedCategory, setSelectedCategory] = useState('overview')
  const { addBookmark, removeBookmark, isBookmarked } = useUser()

  const categories = [
    { id: 'overview', label: 'Overview' },
    { id: 'discography', label: 'Discography' },
    { id: 'lyrics', label: 'Lyrics Analysis' },
    { id: 'live', label: 'Live Performances' },
    { id: 'trivia', label: 'Trivia & Facts' }
  ]

  const albums = [
    {
      id: 1,
      title: "Moving Pictures",
      year: 1981,
      description: "Rush's most commercially successful album, featuring iconic tracks like 'Tom Sawyer' and 'Limelight'.",
      tracks: ["Tom Sawyer", "Red Barchetta", "YYZ", "Limelight", "The Camera Eye", "Witch Hunt", "Vital Signs"],
      spotifyUrl: "https://open.spotify.com/album/moving-pictures",
      significance: "Peak of their progressive rock period",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      title: "2112",
      year: 1976,
      description: "Conceptual masterpiece featuring the epic 20-minute title track about individualism vs. collectivism.",
      tracks: ["2112", "A Passage to Bangkok", "The Twilight Zone", "Lessons", "Tears", "Something for Nothing"],
      spotifyUrl: "https://open.spotify.com/album/2112",
      significance: "Established Rush as prog rock innovators",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Permanent Waves",
      year: 1980,
      description: "Transition album blending progressive complexity with more accessible song structures.",
      tracks: ["The Spirit of Radio", "Freewill", "Jacob's Ladder", "Entre Nous", "Different Strings", "Natural Science"],
      spotifyUrl: "https://open.spotify.com/album/permanent-waves",
      significance: "Bridge between prog and mainstream appeal",
      image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=300&fit=crop"
    }
  ]

  const lyricalThemes = [
    {
      theme: "Individualism vs. Collectivism",
      songs: ["2112", "Freewill", "The Trees"],
      description: "Neil Peart's exploration of personal freedom and societal pressures.",
      analysis: "Influenced by Ayn Rand's philosophy, these songs champion individual thought and resistance to conformity."
    },
    {
      theme: "Time and Mortality",
      songs: ["Time Stand Still", "Subdivisions", "The Pass"],
      description: "Reflections on aging, the passage of time, and life's fleeting nature.",
      analysis: "Peart's mature perspective on life's brevity and the importance of meaningful moments."
    },
    {
      theme: "Technology and Progress",
      songs: ["Red Barchetta", "The Body Electric", "Digital Man"],
      description: "Examination of technology's impact on humanity and society.",
      analysis: "Prescient observations about digital age isolation and the loss of human connection."
    }
  ]

  const livePerformances = [
    {
      title: "Rush in Rio",
      year: 2002,
      venue: "Maracanã Stadium, Brazil",
      attendance: "40,000+",
      significance: "Emotional performance showing Rush's global reach",
      youtubeUrl: "https://youtube.com/watch?v=rush-in-rio"
    },
    {
      title: "Time Machine Tour",
      year: 2010,
      venue: "Various",
      significance: "Celebration of Moving Pictures 30th anniversary",
      youtubeUrl: "https://youtube.com/watch?v=time-machine-tour"
    },
    {
      title: "R40 Live",
      year: 2015,
      venue: "Various",
      significance: "Final tour - 40th anniversary celebration",
      youtubeUrl: "https://youtube.com/watch?v=r40-live"
    }
  ]

  const trivia = [
    {
      fact: "Neil Peart's Drum Kit",
      detail: "Peart's drum kit often contained over 40 pieces, including electronic pads, chimes, and percussion instruments."
    },
    {
      fact: "YYZ Airport Code",
      detail: "The instrumental 'YYZ' is named after Toronto Pearson Airport's identifier, representing the band's hometown."
    },
    {
      fact: "Longest Song",
      detail: "'The Fountain of Lamneth' from Caress of Steel clocks in at 19:57, showcasing their progressive ambitions."
    },
    {
      fact: "Rock Hall Induction",
      detail: "Rush was inducted into the Rock and Roll Hall of Fame in 2013 after years of fan campaigns."
    }
  ]

  const handleBookmark = (item, type) => {
    const bookmarkData = {
      id: item.id,
      title: item.title,
      description: item.description || item.detail,
      type: type
    }

    if (isBookmarked('music', item.id)) {
      removeBookmark('music', item.id)
    } else {
      addBookmark('music', bookmarkData)
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Rush: Progressive Rock Legends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
              alt="Rush band"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Band Members</h3>
              <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                <li><strong>Geddy Lee</strong> - Vocals, Bass, Keyboards</li>
                <li><strong>Alex Lifeson</strong> - Guitar</li>
                <li><strong>Neil Peart</strong> - Drums, Lyrics (1974-2015)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Career Highlights</h3>
              <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• Formed in Toronto, 1968</li>
                <li>• 40+ million albums sold worldwide</li>
                <li>• 24 gold and 14 platinum albums</li>
                <li>• Rock Hall of Fame inductees (2013)</li>
                <li>• Final tour: R40 (2015)</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
          Rush stands as one of the most influential progressive rock bands in history, known for their technical proficiency, 
          complex compositions, and thoughtful lyrics. From their early hard rock roots to their synthesizer-heavy 80s period 
          and return to guitar-driven rock, Rush consistently pushed musical boundaries while maintaining their unique identity.
        </p>
      </div>
    </div>
  )

  const renderDiscography = () => (
    <div className="space-y-6">
      {albums.map((album) => (
        <div key={album.id} className="card hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={album.image}
                alt={album.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {album.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Calendar className="w-4 h-4" />
                  <span>{album.year}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleBookmark(album, 'album')}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked('music', album.id)
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-neutral-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isBookmarked('music', album.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
            {album.description}
          </p>

          <div className="mb-4">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">Track Listing:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {album.tracks.map((track, index) => (
                <div key={index} className="text-sm text-neutral-600 dark:text-neutral-400">
                  {index + 1}. {track}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Significance: 
              </span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">
                {album.significance}
              </span>
            </div>
            <a
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
            >
              <Play className="w-4 h-4" />
              <span>Listen on Spotify</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  )

  const renderLyrics = () => (
    <div className="space-y-6">
      {lyricalThemes.map((theme, index) => (
        <div key={index} className="card">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            {theme.theme}
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
            {theme.description}
          </p>
          <div className="mb-4">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">Featured Songs:</h4>
            <div className="flex flex-wrap gap-2">
              {theme.songs.map((song, songIndex) => (
                <span
                  key={songIndex}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-full"
                >
                  {song}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">Analysis:</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
              {theme.analysis}
            </p>
          </div>
        </div>
      ))}
    </div>
  )

  const renderLive = () => (
    <div className="space-y-6">
      {livePerformances.map((performance, index) => (
        <div key={index} className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {performance.title}
              </h3>
              <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{performance.year}</span>
                </div>
                <div>{performance.venue}</div>
                {performance.attendance && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{performance.attendance}</span>
                  </div>
                )}
              </div>
            </div>
            <a
              href={performance.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
            >
              <Play className="w-4 h-4" />
              <span>Watch</span>
            </a>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300">
            <strong>Significance:</strong> {performance.significance}
          </p>
        </div>
      ))}
    </div>
  )

  const renderTrivia = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {trivia.map((item, index) => (
        <div key={index} className="card">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {item.fact}
          </h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-center">
          <Music className="w-8 h-8 text-red-500 mr-3" />
          Rush
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Explore the progressive rock legends' complete discography, lyrical themes, live performances, and fascinating trivia.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {selectedCategory === 'overview' && renderOverview()}
        {selectedCategory === 'discography' && renderDiscography()}
        {selectedCategory === 'lyrics' && renderLyrics()}
        {selectedCategory === 'live' && renderLive()}
        {selectedCategory === 'trivia' && renderTrivia()}
      </div>

      {/* Community Links */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-red-500" />
          Fan Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://reddit.com/r/rush"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400">
              r/rush
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Active Reddit community for Rush fans worldwide.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Reddit • 50k+ members</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-red-500" />
            </div>
          </a>
          
          <a
            href="https://rushforum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400">
              Rush Forum
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Dedicated forum for in-depth Rush discussions.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Forum • Est. 1995</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-red-500" />
            </div>
          </a>

          <a
            href="https://rush.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-md transition-shadow group"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400">
              Official Website
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Official Rush website with news and archives.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Official • rush.com</span>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-red-500" />
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Rush