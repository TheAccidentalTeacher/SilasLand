// Mock Service Worker setup for API mocking
import { setupServer } from 'msw/node'
import { rest } from 'msw'

// Define request handlers
const handlers = [
  // Mock ChatGPT API calls
  rest.post('/api/chat', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'This is a mock response from the AI assistant.',
        timestamp: new Date().toISOString()
      })
    )
  }),

  // Mock database file loading
  rest.get('/data/poetry/poems_database.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        metadata: {
          title: "Test Poetry Database",
          total_poems: 2
        },
        poems: [
          {
            id: "test_poem_1",
            title: "Test Poem",
            author: "Test Author",
            content: "This is a test poem\nFor testing purposes",
            themes: ["testing", "mock"]
          }
        ]
      })
    )
  }),

  // Mock other database files
  rest.get('/data/literature/classic_literature_database.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        metadata: {
          title: "Test Literature Database",
          total_works: 1
        },
        american_literature: {
          "19th_century": [
            {
              id: "test_book",
              title: "Test Book",
              author: "Test Author",
              year: 1850,
              themes: ["testing"]
            }
          ]
        }
      })
    )
  }),

  // Mock API errors for error handling tests
  rest.get('/api/error', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: 'Internal Server Error',
        message: 'This is a mock error for testing'
      })
    )
  }),

  // Mock network timeout
  rest.get('/api/timeout', (req, res, ctx) => {
    return res(
      ctx.delay('infinite')
    )
  })
]

// Setup server with handlers
export const server = setupServer(...handlers)