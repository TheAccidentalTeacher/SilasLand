import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Poetry from './pages/Poetry'
import Music from './pages/Music'
import Literature from './pages/Literature'
import Games from './pages/Games'
import Ghibli from './pages/Ghibli'
import Resources from './pages/Resources'
import MemoryAlpha from './pages/MemoryAlpha'
import Account from './pages/Account'
import MusicTheory from './pages/MusicTheory'
import Rush from './pages/Rush'
import Dylan from './pages/Dylan'
import Piano from './pages/Piano'

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/poetry" element={<Poetry />} />
              <Route path="/music" element={<Music />} />
              <Route path="/music/theory" element={<MusicTheory />} />
              <Route path="/music/rush" element={<Rush />} />
              <Route path="/music/dylan" element={<Dylan />} />
              <Route path="/music/piano" element={<Piano />} />
              <Route path="/literature" element={<Literature />} />
              <Route path="/games" element={<Games />} />
              <Route path="/ghibli" element={<Ghibli />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/memory-alpha" element={<MemoryAlpha />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </Layout>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App