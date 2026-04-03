import { useState, useCallback, useMemo } from 'react'

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

interface DailyMetric {
  date: string
  value: number
}

interface Analysis {
  username: string
  categories: Category[]
  interactions: Interaction[]
  totalPosts: number
  topHashtags: string[]
  engagementRate: number
  joinDate: string
  verifiedFollowers: number
  totalFollowers: number
  impressions: number
  impressionsChange: number
  engagementChange: number
  engagements: number
  engagementsChange: number
  profileVisits: number
  profileVisitsChange: number
  replies: number
  repliesChange: number
  likes: number
  reposts: number
  repostsChange: number
  bookmarks: number
  shares: number
  dailyImpressions: DailyMetric[]
  dailyFollows: DailyMetric[]
  dailyPosts: DailyMetric[]
  dailyReplies: DailyMetric[]
}

// Star field component for Grok-style background
function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 3,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// Metric card for the analytics dashboard
function MetricCard({ label, value, change, suffix }: {
  label: string
  value: string | number
  change?: number
  suffix?: string
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
      <div className="text-sm text-[var(--text)] mb-2 flex items-center gap-1.5">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[var(--text-h)]">{value}</span>
        {suffix && <span className="text-sm text-[var(--text)]">{suffix}</span>}
      </div>
      {change !== undefined && (
        <div className={`text-sm mt-1 ${change >= 0 ? 'change-up' : 'change-down'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      )}
    </div>
  )
}

// Mini bar chart
function MiniBarChart({ data, color, label }: {
  data: DailyMetric[]
  color: string
  label: string
}) {
  const max = Math.max(...data.map(d => Math.abs(d.value)), 1)
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-[var(--text-h)]">{label}</span>
      </div>
      <div className="flex items-end gap-1.5 h-24">
        {data.map((d, i) => {
          const isNeg = d.value < 0
          const h = (Math.abs(d.value) / max) * 100
          return (
            <div key={i} className="flex-1 flex flex-col justify-end items-center h-full relative">
              {isNeg ? (
                <div className="w-full mt-auto" style={{ height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <div className="w-full rounded-b" style={{ height: `${h}%`, backgroundColor: '#f4212e', minHeight: d.value !== 0 ? 4 : 0 }} />
                </div>
              ) : (
                <div className="w-full rounded-t" style={{ height: `${h}%`, backgroundColor: color, minHeight: d.value !== 0 ? 4 : 0 }} />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-[var(--text)]">{data[0]?.date}</span>
        <span className="text-[10px] text-[var(--text)]">{data[data.length - 1]?.date}</span>
      </div>
    </div>
  )
}

function App() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'interactions'>('overview')
  const [timePeriod, setTimePeriod] = useState('7D')

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
      engagementRate: 2.9,
      joinDate: 'March 2012',
      verifiedFollowers: 151,
      totalFollowers: 9100,
      impressions: 1400,
      impressionsChange: 63,
      engagementChange: -47,
      engagements: 42,
      engagementsChange: -14,
      profileVisits: 13,
      profileVisitsChange: -51,
      replies: 0,
      repliesChange: -100,
      likes: 4,
      reposts: 1,
      repostsChange: 10000,
      bookmarks: 0,
      shares: 0,
      dailyImpressions: [
        { date: 'Mar 28', value: 150 },
        { date: 'Mar 29', value: 980 },
        { date: 'Mar 30', value: 0 },
        { date: 'Mar 31', value: 120 },
        { date: 'Apr 1', value: 40 },
        { date: 'Apr 2', value: 30 },
        { date: 'Apr 3', value: 20 },
      ],
      dailyFollows: [
        { date: 'Mar 28', value: -1 },
        { date: 'Mar 29', value: 0 },
        { date: 'Mar 30', value: 1 },
        { date: 'Mar 31', value: 1 },
        { date: 'Apr 1', value: 0 },
        { date: 'Apr 2', value: 0 },
        { date: 'Apr 3', value: 0 },
      ],
      dailyPosts: [
        { date: 'Mar 28', value: 1 },
        { date: 'Mar 29', value: 1 },
        { date: 'Mar 30', value: 1 },
        { date: 'Mar 31', value: 0 },
        { date: 'Apr 1', value: 0 },
        { date: 'Apr 2', value: 0 },
        { date: 'Apr 3', value: 0 },
      ],
      dailyReplies: [
        { date: 'Mar 28', value: 1 },
        { date: 'Mar 29', value: 1 },
        { date: 'Mar 30', value: 0 },
        { date: 'Mar 31', value: 0 },
        { date: 'Apr 1', value: 0 },
        { date: 'Apr 2', value: 0 },
        { date: 'Apr 3', value: 0 },
      ],
    }
  }, [])

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handle.trim()) return
    setIsLoading(true)
    setTimeout(() => {
      setAnalysis(mockAnalysis(handle.trim()))
      setIsLoading(false)
      setActiveTab('overview')
    }, 1200)
  }

  const quickAnalyze = (username: string) => {
    setHandle(username)
    setIsLoading(true)
    setTimeout(() => {
      setAnalysis(mockAnalysis(username))
      setIsLoading(false)
      setActiveTab('overview')
    }, 800)
  }

  const resetAnalysis = () => {
    setAnalysis(null)
    setHandle('')
  }

  const getBarColor = (index: number): string => {
    const colors = ['#1da1f2', '#00ba7c', '#ffd400', '#f91880', '#7856ff', '#ff7a00']
    return colors[index % colors.length]
  }

  // ─── LANDING PAGE (Grok-style) ───
  if (!analysis) {
    return (
      <div className="min-h-screen bg-black text-white relative flex flex-col">
        <StarField />

        {/* Top bar */}
        <header className="relative z-10 flex items-center justify-between px-6 py-4">
          <div className="w-8" />
          <div />
          <div className="flex items-center gap-4 text-sm text-[var(--text)]">
            <button className="hover:text-white transition-colors">About</button>
            <button className="hover:text-white transition-colors">Privacy</button>
          </div>
        </header>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 -mt-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="white" />
              <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="black">X</text>
            </svg>
            <span className="text-3xl font-bold tracking-tight">Profile-X</span>
          </div>

          {/* Search form */}
          <form onSubmit={handleAnalyze} className="w-full max-w-xl">
            <div className="flex items-center bg-[#16181c] border border-[var(--border)] rounded-full px-5 py-3.5 gap-3 focus-within:border-[var(--accent)] transition-colors">
              <span className="text-[var(--text)] text-lg">@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                placeholder="Enter any X handle"
                className="flex-1 bg-transparent outline-none text-[var(--text-h)] placeholder:text-[var(--text)] text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !handle.trim()}
                className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {[
              { label: 'Analyze Profile', icon: '📊' },
              { label: 'View Interactions', icon: '👥' },
              { label: 'Content Topics', icon: '🏷️' },
            ].map((action) => (
              <span
                key={action.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--text)] bg-transparent"
              >
                <span>{action.icon}</span>
                {action.label}
              </span>
            ))}
          </div>

          {/* Example handles */}
          <div className="mt-14 text-center">
            <p className="text-xs text-[var(--text)] mb-3 uppercase tracking-widest">Try an example</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['elonmusk', 'NASA', 'karpathy', 'pmarca'].map((ex) => (
                <button
                  key={ex}
                  onClick={() => quickAnalyze(ex)}
                  className="px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--text)] hover:text-white hover:border-white/30 transition-colors"
                >
                  @{ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 text-center text-xs text-[var(--text)] py-6 opacity-60">
          Not affiliated with X Corp. Built with React + Vite
        </footer>
      </div>
    )
  }

  // ─── ANALYTICS DASHBOARD (X Analytics-style) ───
  return (
    <div className="min-h-screen bg-black text-[var(--text-h)]">
      {/* Top header */}
      <header className="border-b border-[var(--border)] bg-black sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={resetAnalysis} className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Analytics</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--text)]">{analysis.username}</span>
            <button
              onClick={resetAnalysis}
              className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-full hover:bg-[var(--bg-card)] transition-colors"
            >
              New Analysis
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* Tabs */}
        <div className="flex border-b border-[var(--border)]">
          {(['overview', 'categories', 'interactions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 capitalize ${
                activeTab === tab
                  ? 'border-[var(--accent)] text-white'
                  : 'border-transparent text-[var(--text)] hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'overview' ? 'Overview' : tab === 'categories' ? 'Content' : 'Interactions'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="py-6">
            {/* Account overview header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Account overview</h2>
              <div className="flex items-center gap-1">
                {['7D', '2W', '4W', '3M', '1Y'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setTimePeriod(p)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      timePeriod === p
                        ? 'bg-white text-black'
                        : 'bg-[var(--bg-card)] text-[var(--text)] hover:text-white border border-[var(--border)]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Main impressions chart */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[var(--text-h)]">Impressions</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--text)]">
                  <span>Daily</span>
                  <span className="px-2 py-1 bg-[var(--bg-elevated)] rounded">Bar</span>
                </div>
              </div>
              {/* Bar chart */}
              <div className="flex items-end gap-3 h-48">
                {analysis.dailyImpressions.map((d, i) => {
                  const max = Math.max(...analysis.dailyImpressions.map(x => x.value), 1)
                  const h = (d.value / max) * 100
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full relative flex items-end justify-center h-40">
                        <div
                          className="w-full max-w-[40px] rounded-t transition-all group-hover:opacity-80"
                          style={{
                            height: `${h}%`,
                            backgroundColor: '#1da1f2',
                            minHeight: d.value > 0 ? 4 : 0,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-[var(--text)]">{d.date}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Two small charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <MiniBarChart data={analysis.dailyFollows} color="#1da1f2" label="Follows over time" />
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#1da1f2]" />
                    <span className="text-xs text-[var(--text)]">Posts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#00ba7c]" />
                    <span className="text-xs text-[var(--text)]">Replies</span>
                  </div>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {analysis.dailyPosts.map((d, i) => {
                    const r = analysis.dailyReplies[i]
                    const maxV = Math.max(...analysis.dailyPosts.map(x => x.value), ...analysis.dailyReplies.map(x => x.value), 1)
                    return (
                      <div key={i} className="flex-1 flex items-end gap-0.5 h-full">
                        <div className="flex-1 flex items-end justify-center">
                          <div className="w-full rounded-t" style={{ height: `${(d.value / maxV) * 100}%`, backgroundColor: '#1da1f2', minHeight: d.value > 0 ? 4 : 0 }} />
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                          <div className="w-full rounded-t" style={{ height: `${((r?.value || 0) / maxV) * 100}%`, backgroundColor: '#00ba7c', minHeight: (r?.value || 0) > 0 ? 4 : 0 }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-[var(--text)]">{analysis.dailyPosts[0]?.date}</span>
                  <span className="text-[10px] text-[var(--text)]">{analysis.dailyPosts[analysis.dailyPosts.length - 1]?.date}</span>
                </div>
              </div>
            </div>

            {/* Metric cards - top row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
              <MetricCard label="Verified followers ✓" value={analysis.verifiedFollowers} suffix={`/ ${(analysis.totalFollowers / 1000).toFixed(1)}K`} />
              <MetricCard label="Impressions" value={analysis.impressions >= 1000 ? `${(analysis.impressions / 1000).toFixed(1)}K` : analysis.impressions} change={analysis.impressionsChange} />
              <MetricCard label="Engagement rate" value={`${analysis.engagementRate}%`} change={analysis.engagementChange} />
              <MetricCard label="Engagements" value={analysis.engagements} change={analysis.engagementsChange} />
              <MetricCard label="Profile visits" value={analysis.profileVisits} change={analysis.profileVisitsChange} />
            </div>

            {/* Metric cards - bottom row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <MetricCard label="Replies" value={analysis.replies} change={analysis.repliesChange} />
              <MetricCard label="Likes" value={analysis.likes} />
              <MetricCard label="Reposts" value={analysis.reposts} change={analysis.repostsChange} />
              <MetricCard label="Bookmarks" value={analysis.bookmarks} change={-100} />
              <MetricCard label="Shares" value={analysis.shares} change={-100} />
            </div>
          </div>
        )}

        {/* Content Categories Tab */}
        {activeTab === 'categories' && (
          <div className="py-6">
            <h2 className="text-lg font-bold mb-2">Content Categories</h2>
            <p className="text-sm text-[var(--text)] mb-8">Based on {analysis.totalPosts} analyzed posts</p>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <div className="space-y-5">
                {analysis.categories.map((cat, index) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{cat.name}</span>
                      <span className="text-sm text-[var(--text)]">{cat.count} posts · {cat.percentage}%</span>
                    </div>
                    <div className="h-2.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.percentage}%`, backgroundColor: getBarColor(index) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4">Top Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.topHashtags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-sm bg-[var(--accent)]/10 text-[var(--accent)] rounded-full border border-[var(--accent)]/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interactions Tab */}
        {activeTab === 'interactions' && (
          <div className="py-6">
            <h2 className="text-lg font-bold mb-2">Top Interactions</h2>
            <p className="text-sm text-[var(--text)] mb-8">Accounts you engage with most</p>

            <div className="space-y-3">
              {analysis.interactions.map((inter, index) => (
                <div
                  key={index}
                  className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 flex items-center justify-between hover:border-[var(--accent)]/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-lg font-bold text-[var(--accent)]">
                      {inter.username[1]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--text-h)]">{inter.username}</div>
                      <div className="text-xs text-[var(--text)] capitalize mt-0.5">{inter.type}s</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--accent)] tabular-nums">{inter.count}</div>
                    <div className="text-[10px] text-[var(--text)] uppercase tracking-wider">interactions</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-center text-[var(--text)] mt-8 opacity-60">
              Demo analysis · Real version integrates with X API
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
