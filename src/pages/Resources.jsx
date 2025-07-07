import React, { useState } from 'react'
import { Search, Heart, Phone, Users, BookOpen, Clock, ExternalLink, AlertCircle, Lightbulb } from 'lucide-react'

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'crisis', label: 'Crisis Support' },
    { value: 'therapy', label: 'Therapy & Counseling' },
    { value: 'support-groups', label: 'Support Groups' },
    { value: 'tools', label: 'Tools & Apps' },
    { value: 'education', label: 'Education & Learning' },
    { value: 'workplace', label: 'Workplace Support' },
    { value: 'research', label: 'Research & News' }
  ]

  const resources = [
    // Crisis Support
    {
      id: 1,
      title: "National Suicide Prevention Lifeline",
      category: "crisis",
      type: "Hotline",
      description: "24/7 crisis support for anyone in emotional distress or suicidal crisis.",
      contact: "988",
      url: "https://suicidepreventionlifeline.org",
      availability: "24/7",
      cost: "Free",
      urgent: true
    },
    {
      id: 2,
      title: "Crisis Text Line",
      category: "crisis",
      type: "Text Support",
      description: "Free, 24/7 support for those in crisis via text message.",
      contact: "Text HOME to 741741",
      url: "https://crisistextline.org",
      availability: "24/7",
      cost: "Free",
      urgent: true
    },
    
    // Therapy & Counseling
    {
      id: 3,
      title: "Psychology Today Therapist Finder",
      category: "therapy",
      type: "Directory",
      description: "Find therapists, psychiatrists, and support groups in your area.",
      url: "https://psychologytoday.com",
      availability: "Varies",
      cost: "Varies",
      features: ["Insurance filtering", "Specialization search", "Telehealth options"]
    },
    {
      id: 4,
      title: "BetterHelp",
      category: "therapy",
      type: "Online Therapy",
      description: "Professional counseling done securely online with licensed therapists.",
      url: "https://betterhelp.com",
      availability: "Flexible scheduling",
      cost: "$60-90/week",
      features: ["Text, voice, video", "Licensed therapists", "Mobile app"]
    },
    
    // Support Groups
    {
      id: 5,
      title: "CHADD (ADHD Support)",
      category: "support-groups",
      type: "Organization",
      description: "National resource for children and adults with ADHD and their families.",
      url: "https://chadd.org",
      availability: "Ongoing",
      cost: "Free/Membership",
      features: ["Local chapters", "Online support", "Educational resources"]
    },
    {
      id: 6,
      title: "Autism Society",
      category: "support-groups",
      type: "Organization",
      description: "Leading grassroots autism organization providing support and advocacy.",
      url: "https://autismsociety.org",
      availability: "Ongoing",
      cost: "Free",
      features: ["Local affiliates", "Resource directory", "Advocacy"]
    },
    
    // Tools & Apps
    {
      id: 7,
      title: "Forest - Focus App",
      category: "tools",
      type: "Mobile App",
      description: "Gamified focus app that helps you stay concentrated and build healthy habits.",
      url: "https://forestapp.cc",
      availability: "Always",
      cost: "Free/Premium",
      features: ["Pomodoro timer", "Habit tracking", "Social features"]
    },
    {
      id: 8,
      title: "Notion - Organization Tool",
      category: "tools",
      type: "Productivity",
      description: "All-in-one workspace for notes, tasks, wikis, and databases.",
      url: "https://notion.so",
      availability: "Always",
      cost: "Free/Premium",
      features: ["Templates", "Collaboration", "Mobile sync"]
    },
    {
      id: 9,
      title: "Headspace - Meditation",
      category: "tools",
      type: "Mental Health App",
      description: "Guided meditation and mindfulness exercises for stress and anxiety.",
      url: "https://headspace.com",
      availability: "Always",
      cost: "Free/Premium",
      features: ["Guided meditations", "Sleep stories", "Focus music"]
    },
    
    // Education & Learning
    {
      id: 10,
      title: "Khan Academy",
      category: "education",
      type: "Learning Platform",
      description: "Free online courses and lessons with accommodations for different learning styles.",
      url: "https://khanacademy.org",
      availability: "Always",
      cost: "Free",
      features: ["Self-paced", "Progress tracking", "Accessibility features"]
    },
    
    // Workplace Support
    {
      id: 11,
      title: "Job Accommodation Network (JAN)",
      category: "workplace",
      type: "Resource Center",
      description: "Free consulting service about workplace accommodations and ADA compliance.",
      url: "https://askjan.org",
      contact: "1-800-526-7234",
      availability: "Business hours",
      cost: "Free",
      features: ["Accommodation ideas", "ADA guidance", "Employer resources"]
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const crisisResources = resources.filter(r => r.urgent)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-center">
          <Heart className="w-8 h-8 text-red-500 mr-3" />
          Neurodivergent Resources
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Comprehensive support resources for neurodivergent individuals, including crisis support, therapy, tools, and community connections.
        </p>
      </div>

      {/* Crisis Support Banner */}
      <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
              Need Immediate Help?
            </h3>
            <div className="space-y-2 text-sm">
              {crisisResources.map(resource => (
                <div key={resource.id} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-red-800 dark:text-red-200">
                      {resource.title}
                    </span>
                    {resource.contact && (
                      <span className="ml-2 text-red-700 dark:text-red-300">
                        {resource.contact}
                      </span>
                    )}
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources by name, type, or description..."
            className="w-full pl-12 pr-4 py-3 rounded-lg input-field"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className={`card hover:shadow-lg transition-shadow ${
            resource.urgent ? 'border-red-200 dark:border-red-800' : ''
          }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {resource.urgent && <AlertCircle className="w-5 h-5 text-red-500" />}
                {resource.category === 'therapy' && <Heart className="w-5 h-5 text-blue-500" />}
                {resource.category === 'support-groups' && <Users className="w-5 h-5 text-green-500" />}
                {resource.category === 'tools' && <Lightbulb className="w-5 h-5 text-yellow-500" />}
                {resource.category === 'education' && <BookOpen className="w-5 h-5 text-purple-500" />}
                {resource.category === 'workplace' && <ExternalLink className="w-5 h-5 text-indigo-500" />}
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                  {resource.type}
                </span>
              </div>
              {resource.urgent && (
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium">
                  Urgent
                </span>
              )}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {resource.title}
            </h3>
            
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              {resource.description}
            </p>

            {/* Details */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Availability:</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {resource.availability}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Cost:</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {resource.cost}
                </span>
              </div>
              {resource.contact && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Contact:</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {resource.contact}
                  </span>
                </div>
              )}
            </div>

            {/* Features */}
            {resource.features && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Features:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {resource.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center space-x-2 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  resource.urgent
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                <span>Access Resource</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No resources found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Try adjusting your search terms or category filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Additional Help Section */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Need More Help?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Can't Find What You Need?
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Contact us to suggest new resources or get help finding specific support.
            </p>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              Contact Support →
            </button>
          </div>
          
          <div className="card">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Emergency Situations
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              If you're in immediate danger, please call 911 or go to your nearest emergency room.
            </p>
            <div className="text-sm font-medium text-red-600 dark:text-red-400">
              Emergency: 911
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Resources