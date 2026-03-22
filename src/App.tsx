import { useState, useEffect, useCallback } from 'react'
import './App.css'

interface Category {
  name: string
  percentage: number
  count: number
}

interface Interaction {
  username: string
  count: number
  type: 'reply' | 'repost' | 'like'
}

interface Analysis {
  username: string
  categories: Category[]
  interactions: Interaction[]
  totalPosts: number
  topHashtags: string[]
  engagementRate: number
  joinDate: string
}

function App() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState<'categories' | 'interactions' | 'overview'>('overview')

  // Theme management - default to dark like X.com
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    setDarkMode(initialDark)
    
    if (initialDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [])

  const toggleTheme = () => {
    const newDark = !darkMode
    setDarkMode(newDark)
    
    if (newDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }

  const mockAnalysis = useCallback((username: string): Analysis => {
    const categories: Category[] = [
      { name: 'Technology', percentage: 35, count: 124 },
      { name: 'Coding', percentage: 25, count: 89 },
      { name: 'Politics', percentage: 18, count: 64 },
      { name: 'Music', percentage: 12, count: 43 },
      { name: 'Art', percentage: 7, count: 25 },
      { name: 'Sports', percentage: 3, count: 11 },
    ]

    const interactions: Interaction[] = [
      { username: '@elonmusk', count: 45, type: 'repost' },
      { username: '@NASA', count: 32, type: 'reply' },
      { username: '@techcrunch', count: 28, type: 'like' },
      { username: '@verge', count: 19, type: 'repost' },
      { username: '@pmarca', count: 17, type: 'reply' },
    ]

    return {
      username: username.startsWith('@') ? username : `@${username}`,
      categories,
      interactions: interactions.sort((a, b) => b.count - a.count),
      totalPosts: 357,
      topHashtags: ['#AI', '#Tech', '#Web3', '#Innovation', '#Future'],
      engagementRate: 4.8,
      joinDate: 'March 2012'
    }
  }, [])

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handle.trim()) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const username = handle.trim()
      const result = mockAnalysis(username)
      setAnalysis(result)
      setIsLoading(false)
      setActiveTab('overview')
    }, 1200)
  }

  const resetAnalysis = () => {
    setAnalysis(null)
    setHandle('')
  }

  const getBarColor = (index: number): string => {
    const colors = ['#1da1f2', '#00ba7c', '#ffd400', '#f91880', '#7856ff', '#1da1f2']
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-h)] transition-colors duration-300 font-sans">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg)] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-xl">X</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter text-[var(--text-h)]">PROFILE-X</h1>
              <p className="text-xs text-[var(--text)] -mt-1">analytics</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--accent-bg)] text-[var(--text)] transition-colors flex items-center gap-2 text-sm"
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
              <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
            </button>
            
            {analysis && (
              <button
                onClick={resetAnalysis}
                className="px-4 py-1.5 text-sm border border-[var(--border)] rounded-full hover:bg-[var(--accent-bg)] transition-colors"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {!analysis ? (
          /* Landing / Input Screen */
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-[var(--accent-bg)] text-[var(--accent)] px-4 py-1 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                POWERED BY X DATA
              </div>
              <h1 className="text-7xl font-bold tracking-tighter mb-4 text-[var(--text-h)]">PROFILE-X</h1>
              <p className="text-2xl text-[var(--text)] max-w-md mx-auto leading-tight">
                Enter your X handle to see with whom and what you're talking about!
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="w-full max-w-md">
              <div className="relative">
                <label className="block text-sm text-[var(--text)] mb-2 pl-1">Your X handle:</label>
                <div className="flex items-center bg-[var(--bg)] border border-[var(--border)] rounded-2xl px-6 py-5 text-2xl focus-within:border-[var(--accent)] transition-colors shadow-sm">
                  <span className="text-[var(--accent)] font-medium mr-2">@</span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                    placeholder="username"
                    className="flex-1 bg-transparent outline-none text-[var(--text-h)] placeholder:text-[var(--text)] text-2xl"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !handle.trim()}
                className="mt-8 w-full bg-black hover:bg-[#1a1a1a] dark:bg-white dark:text-black dark:hover:bg-[#e6e6e6] text-white py-4 rounded-2xl text-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent animate-spin rounded-full"></div>
                    ANALYZING PROFILE...
                  </>
                ) : (
                  'ANALYZE PROFILE →'
                )}
              </button>

              <p className="text-xs text-center text-[var(--text)] mt-6">
                Your data is processed locally • No account required
              </p>
            </form>

            {/* Example handles */}
            <div className="mt-16 text-sm">
              <p className="text-[var(--text)] mb-3">Try these:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {['elonmusk', 'NASA', 'karpathy', 'pmarca'].map((ex) => (
                  <button
                    key={ex}
                    onClick={() => {
                      const newHandle = ex
                      setHandle(newHandle)
                      setTimeout(() => {
                        const fakeEvent = { 
                          preventDefault: () => {} 
                        } as React.FormEvent
                        // Use the new value directly
                        const tempHandle = newHandle
                        setIsLoading(true)
                        setTimeout(() => {
                          const result = mockAnalysis(tempHandle)
                          setAnalysis(result)
                          setIsLoading(false)
                          setActiveTab('overview')
                          setHandle(tempHandle)
                        }, 800)
                      }, 50)
                    }}
                    className="px-4 py-2 bg-[var(--accent-bg)] hover:bg-[var(--accent)] hover:text-white text-[var(--accent)] rounded-xl text-sm transition-colors"
                  >
                    @{ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Analytics Dashboard */
          <div>
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1da1f2] to-[#7856ff] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-inner">
                    {analysis.username[1]?.toUpperCase() || 'X'}
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold tracking-tighter text-[var(--text-h)]">{analysis.username}</h2>
                    <p className="text-[var(--text)] flex items-center gap-2 mt-1">
                      <span>Joined {analysis.joinDate}</span>
                      <span className="inline-block w-1 h-1 bg-[var(--text)] rounded-full"></span>
                      <span>{analysis.totalPosts} posts analyzed</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-[var(--text)]">ENGAGEMENT RATE</div>
                <div className="text-4xl font-mono font-semibold text-[var(--accent)]">{analysis.engagementRate}%</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[var(--border)] mb-8">
              {[
                { id: 'overview' as const, label: 'Overview' },
                { id: 'categories' as const, label: 'Content Categories' },
                { id: 'interactions' as const, label: 'Top Interactions' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === tab.id 
                      ? 'border-[var(--accent)] text-[var(--text-h)]' 
                      : 'border-transparent text-[var(--text)] hover:text-[var(--text-h)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Categories Preview */}
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-8">
                  <h3 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                    🏷️ TOP CATEGORIES
                  </h3>
                  <div className="space-y-6">
                    {analysis.categories.slice(0, 4).map((cat, index) => (
                      <div key={cat.name} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium text-[var(--text)]">{cat.name}</div>
                        <div className="flex-1 h-3 bg-[var(--border)] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${cat.percentage}%`, 
                              backgroundColor: getBarColor(index) 
                            }}
                          ></div>
                        </div>
                        <div className="w-12 text-right font-mono text-sm text-[var(--text)]">{cat.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactions Preview */}
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-8">
                  <h3 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                    👥 MOST INTERACTED
                  </h3>
                  <div className="space-y-5">
                    {analysis.interactions.slice(0, 4).map((inter, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--accent-bg)] flex items-center justify-center text-xs font-bold text-[var(--accent)]">
                            {inter.username[1]}
                          </div>
                          <div>
                            <div className="font-medium">{inter.username}</div>
                            <div className="text-xs text-[var(--text)] capitalize">{inter.type}</div>
                          </div>
                        </div>
                        <div className="font-mono text-sm bg-[var(--accent-bg)] px-3 py-1 rounded-lg text-[var(--accent)]">
                          {inter.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="md:col-span-2 bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-8">
                  <h3 className="font-semibold mb-6 text-lg">📊 OTHER INSIGHTS</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 border border-[var(--border)] rounded-2xl">
                      <div className="text-4xl font-bold text-[var(--accent)] mb-1">{analysis.topHashtags.length}</div>
                      <div className="text-xs uppercase tracking-widest text-[var(--text)]">Top Hashtags</div>
                      <div className="mt-4 flex flex-wrap gap-1 justify-center">
                        {analysis.topHashtags.map((tag, i) => (
                          <span key={i} className="text-xs bg-[var(--accent-bg)] text-[var(--accent)] px-2 py-px rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center p-6 border border-[var(--border)] rounded-2xl">
                      <div className="text-4xl font-bold text-[var(--accent)] mb-1">87%</div>
                      <div className="text-xs uppercase tracking-widest text-[var(--text)]">Original Content</div>
                    </div>
                    
                    <div className="text-center p-6 border border-[var(--border)] rounded-2xl">
                      <div className="text-4xl font-bold text-[var(--accent)] mb-1">142</div>
                      <div className="text-xs uppercase tracking-widest text-[var(--text)]">Replies</div>
                    </div>
                    
                    <div className="text-center p-6 border border-[var(--border)] rounded-2xl">
                      <div className="text-4xl font-bold text-[var(--accent)] mb-1">4.2k</div>
                      <div className="text-xs uppercase tracking-widest text-[var(--text)]">Impressions est.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Tab - Column Chart */}
            {activeTab === 'categories' && (
              <div className="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-10">
                <div className="flex justify-between items-baseline mb-10">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight">Content Categories</h3>
                    <p className="text-[var(--text)]">What you post about most</p>
                  </div>
                  <div className="text-sm text-[var(--text)]">BASED ON {analysis.totalPosts} POSTS</div>
                </div>
                
                <div className="h-96 flex items-end gap-8 pt-8 border-t border-[var(--border)]">
                  {analysis.categories.map((cat, index) => (
                    <div key={cat.name} className="flex-1 flex flex-col items-center gap-3 group">
                      <div className="text-xs font-mono text-[var(--text)] text-center leading-none mb-2">
                        {cat.count}<br />posts
                      </div>
                      <div 
                        className="w-full rounded-t-xl transition-all group-hover:scale-105 relative"
                        style={{ 
                          height: `${Math.max(80, cat.percentage * 3.5)}px`, 
                          background: `linear-gradient(to top, ${getBarColor(index)}, #333)` 
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs font-mono px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          {cat.percentage}%
                        </div>
                      </div>
                      <div className="text-sm font-medium text-center mt-2 text-[var(--text-h)]">{cat.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactions Tab */}
            {activeTab === 'interactions' && (
              <div className="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-10">
                <h3 className="text-3xl font-semibold tracking-tight mb-2">Most Interacted Accounts</h3>
                <p className="text-[var(--text)] mb-10">Accounts you reply to, repost, and engage with</p>
                
                <div className="space-y-3">
                  {analysis.interactions.map((inter, index) => (
                    <div key={index} className="flex items-center justify-between bg-[var(--accent-bg)] hover:bg-[var(--accent)] hover:text-white group p-6 rounded-2xl transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white dark:bg-black text-black dark:text-white rounded-2xl flex items-center justify-center text-2xl font-bold ring-4 ring-[var(--bg)]">
                          {inter.username.slice(1, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-2xl font-semibold group-hover:underline">{inter.username}</div>
                          <div className="text-sm text-[var(--text)] capitalize">{inter.type}s • {inter.count} times</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-5xl font-light font-mono text-[var(--accent)] group-hover:text-white tabular-nums">
                          {inter.count}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest">interactions</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-xs text-center text-[var(--text)]">
                  This is a demo analysis. Real version would integrate with X API.
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--text)] max-w-4xl mx-auto">
        <div className="flex justify-center gap-8">
          <a href="#" className="hover:text-[var(--text-h)] transition-colors">About</a>
          <a href="#" className="hover:text-[var(--text-h)] transition-colors">How it works</a>
          <a href="#" className="hover:text-[var(--text-h)] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[var(--text-h)] transition-colors">Built as demo with React + Vite</a>
        </div>
        <p className="mt-6 opacity-60">Not affiliated with X Corp.</p>
      </footer>
    </div>
  )
}

export default App
