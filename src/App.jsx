import { useMemo, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Gauge,
  MessageSquare,
  Settings,
  Leaf,
  Server,
  Cloud,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'optimize', label: 'Optimize', icon: Gauge },
  { id: 'query', label: 'Query', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const activeAgents = [
  {
    name: 'Compute Optimizer',
    status: 'Optimized',
    detail: 'Auto rightsizing EC2 fleet',
    latency: '120ms',
  },
  {
    name: 'Carbon Sentinel',
    status: 'High Carbon',
    detail: 'Monitoring GPU workloads',
    latency: '210ms',
  },
  {
    name: 'Savings Planner',
    status: 'Overprovisioned',
    detail: 'Reserved instance coverage',
    latency: '98ms',
  },
]

const accountStats = [
  { label: 'Monthly Spend', value: '$42.8K', change: '-4.2%' },
  { label: 'Carbon Score', value: '82 / 100', change: '+6.0%' },
  { label: 'Regions Covered', value: '9', change: '+2' },
]

const carbonSummary = [
  { name: 'Compute', value: 45 },
  { name: 'Storage', value: 23 },
  { name: 'Networking', value: 18 },
  { name: 'AI Ops', value: 14 },
]

const serviceInsights = [
  {
    service: 'EC2 AutoScaler',
    instances: 42,
    cost: '$12.4K',
    carbon: 'Optimized',
  },
  {
    service: 'ECS Batch Workers',
    instances: 18,
    cost: '$6.1K',
    carbon: 'Overprovisioned',
  },
  {
    service: 'SageMaker Training',
    instances: 9,
    cost: '$9.6K',
    carbon: 'High Carbon',
  },
  {
    service: 'RDS Aurora',
    instances: 12,
    cost: '$3.2K',
    carbon: 'Optimized',
  },
]

const chatHistory = [
  {
    sender: 'user',
    message: 'Show the latest carbon trends for GPU workloads.',
    timestamp: '09:15',
  },
  {
    sender: 'ai',
    message:
      'GPU clusters in us-west-2 are trending +12% carbon this week. I recommend shifting inference jobs to the new Graviton pool.',
    timestamp: '09:16',
  },
  {
    sender: 'user',
    message: 'Queue the migration playbook for midnight UTC.',
    timestamp: '09:17',
  },
  {
    sender: 'ai',
    message: 'Confirmed. I will brief the Optimize agent and report back at 21:00 UTC.',
    timestamp: '09:17',
  },
]

const optimizeRecommendations = [
  {
    title: 'Rightsize EC2 G5 Instances',
    description: 'Switch 12 inference nodes to g5g.4xlarge for 28% carbon savings.',
    savings: '$3,200',
    carbon: '1.2 tCO₂e',
  },
  {
    title: 'Tiered S3 Storage',
    description: 'Move cold analytics data into Glacier Instant Retrieval.',
    savings: '$1,140',
    carbon: '0.7 tCO₂e',
  },
  {
    title: 'ECS Autoscaling Policy',
    description: 'Tighten off-peak scaling window for queue processors.',
    savings: '$2,480',
    carbon: '0.9 tCO₂e',
  },
  {
    title: 'RDS Snapshot Lifecycle',
    description: 'Purge stale snapshots older than 45 days.',
    savings: '$760',
    carbon: '0.4 tCO₂e',
  },
]

const savingsSpark = [
  { name: 'Mon', cost: 9, carbon: 4 },
  { name: 'Tue', cost: 11, carbon: 5 },
  { name: 'Wed', cost: 8, carbon: 6 },
  { name: 'Thu', cost: 12, carbon: 7 },
  { name: 'Fri', cost: 10, carbon: 6 },
]

const statusStyles = {
  Optimized: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  Overprovisioned: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  'High Carbon': 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
}

function StatusPill({ value }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[value]}`}
    >
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
      {value}
    </span>
  )
}

function DashboardPage() {
  const carbonColors = useMemo(
    () => ['#34d399', '#22d3ee', '#facc15', '#a855f7'],
    [],
  )

  return (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr,360px]">
      <div className="space-y-6">
        <motion.div
          layout
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-emerald-500/5"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Active Agents</h2>
              <p className="text-sm text-slate-400">
                Real-time status across the automation suite
              </p>
            </div>
            <motion.div
              initial={{ rotate: -12 }}
              animate={{ rotate: 0 }}
              className="rounded-full bg-emerald-500/10 p-2"
            >
              <Leaf className="h-4 w-4 text-emerald-400" />
            </motion.div>
          </div>
          <div className="mt-6 space-y-4">
            {activeAgents.map((agent) => (
              <motion.div
                key={agent.name}
                layout
                className="rounded-xl border border-slate-800/60 bg-slate-900/80 p-4"
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{agent.name}</p>
                    <p className="text-xs text-slate-400">{agent.detail}</p>
                  </div>
                  <StatusPill value={agent.status} />
                </div>
                <div className="mt-3 flex items-center text-xs text-slate-500">
                  <Server className="mr-2 h-3.5 w-3.5 text-slate-500" />
                  Response {agent.latency}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/80"
        >
          <h2 className="text-lg font-semibold text-slate-100">Account Overview</h2>
          <p className="mt-1 text-sm text-slate-400">Key performance signals</p>
          <div className="mt-6 space-y-5">
            {accountStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/70 px-4 py-3"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-100">{stat.value}</p>
                </div>
                <span className="text-xs font-medium text-emerald-400">{stat.change}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/80"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">Carbon Summary</h2>
            <Cloud className="h-5 w-5 text-sky-400" />
          </div>
          <div className="mt-6 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={carbonSummary}
                  innerRadius={60}
                  outerRadius={86}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {carbonSummary.map((entry, index) => (
                    <Cell key={entry.name} fill={carbonColors[index % carbonColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    color: '#e2e8f0',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
            {carbonSummary.map((segment, index) => (
              <div key={segment.name} className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: carbonColors[index % carbonColors.length] }}
                />
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    {segment.name}
                  </p>
                  <p className="font-medium">{segment.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        layout
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/80"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Service Insights</h2>
            <p className="text-sm text-slate-400">Live posture across managed services</p>
          </div>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Realtime
          </span>
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800/60">
          <table className="min-w-full divide-y divide-slate-800/60 text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Service</th>
                <th className="px-4 py-3 text-left font-medium">Instances</th>
                <th className="px-4 py-3 text-left font-medium">Cost</th>
                <th className="px-4 py-3 text-left font-medium">Carbon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {serviceInsights.map((row) => (
                <tr key={row.service} className="transition-colors hover:bg-slate-900/80">
                  <td className="px-4 py-4 text-slate-200">{row.service}</td>
                  <td className="px-4 py-4 text-slate-300">{row.instances}</td>
                  <td className="px-4 py-4 text-slate-300">{row.cost}</td>
                  <td className="px-4 py-4">
                    <StatusPill value={row.carbon} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          layout
          className="flex h-[28rem] flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-sky-500/5"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Agent Chat</h2>
              <p className="text-sm text-slate-400">Live co-pilot collaboration</p>
            </div>
            <span className="text-xs text-slate-500">Secure channel</span>
          </div>
          <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-2">
            {chatHistory.map((chat, index) => (
              <motion.div
                key={`${chat.sender}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  chat.sender === 'ai'
                    ? 'ml-auto border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
                    : 'border-slate-800/80 bg-slate-950/80 text-slate-200'
                }`}
              >
                <p>{chat.message}</p>
                <span className="mt-2 block text-xs text-slate-500">{chat.timestamp}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-400">
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Next Action</p>
              <p className="mt-1 font-medium text-slate-200">Migration queued · 21:00 UTC</p>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Channel</p>
              <p className="mt-1 font-medium text-slate-200">Optimize ↔︎ ChatOps</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/80"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">Carbon vs Cost Impact</h2>
            <span className="text-xs text-slate-500">Last 5 days</span>
          </div>
          <div className="mt-5 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsSpark}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(30, 41, 59, 0.6)' }}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    color: '#e2e8f0',
                  }}
                />
                <Bar dataKey="cost" fill="#38bdf8" radius={[8, 8, 0, 0]} barSize={20} />
                <Bar dataKey="carbon" fill="#34d399" radius={[8, 8, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function OptimizePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-slate-100">Optimization Playbooks</h2>
        <p className="text-sm text-slate-400">
          Cost and carbon opportunities prioritized by the Optimize agent.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {optimizeRecommendations.map((item) => (
          <motion.div
            key={item.title}
            layout
            whileHover={{ translateY: -4 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-emerald-500/5"
          >
            <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.description}</p>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                Cost ↓ {item.savings}
              </div>
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sky-300">
                Carbon ↓ {item.carbon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function QueryPage() {
  return (
    <motion.div
      layout
      className="flex min-h-[32rem] flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-100">Agent Query Console</h2>
        <p className="mt-2 text-sm text-slate-400">
          Ask the Agent System anything about your AWS footprint.
        </p>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {chatHistory.map((chat, index) => (
          <div
            key={`${chat.sender}-query-${index}`}
            className={`max-w-[80%] rounded-2xl border px-5 py-3 text-sm leading-relaxed shadow ${
              chat.sender === 'ai'
                ? 'ml-auto border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
                : 'border-slate-800/80 bg-slate-950/80 text-slate-200'
            }`}
          >
            <p>{chat.message}</p>
            <span className="mt-2 block text-xs text-slate-500">{chat.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950/70 px-6 py-3 text-sm text-slate-400">
        <MessageSquare className="h-4 w-4 text-emerald-400" />
        <span>Type a prompt or sync logs to query live signals…</span>
      </div>
    </motion.div>
  )
}

function SettingsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div
        layout
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/80"
      >
        <h2 className="text-xl font-semibold text-slate-100">Connection Profile</h2>
        <p className="mt-2 text-sm text-slate-400">Secure federation to AWS services and chat endpoints.</p>
        <div className="mt-6 space-y-4 text-sm text-slate-300">
          <div className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3">
            <span>IAM Role</span>
            <code className="rounded-lg bg-slate-900/90 px-2 py-1 text-xs text-emerald-300">
              agentcore-observer
            </code>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3">
            <span>EventStream</span>
            <code className="rounded-lg bg-slate-900/90 px-2 py-1 text-xs text-sky-300">
              arn:aws:kinesis:us-west-2:stream/agentcore
            </code>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3">
            <span>ChatOps Relay</span>
            <code className="rounded-lg bg-slate-900/90 px-2 py-1 text-xs text-fuchsia-300">
              matrix://ops.aws/internal
            </code>
          </div>
        </div>
      </motion.div>
      <motion.div
        layout
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/80"
      >
        <h2 className="text-xl font-semibold text-slate-100">Operational Policies</h2>
        <p className="mt-2 text-sm text-slate-400">Guardrails governing the autonomous agent network.</p>
        <div className="mt-6 space-y-5 text-sm text-slate-300">
          <div className="space-y-2 rounded-xl border border-slate-800/70 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">Change Window</p>
            <p className="font-medium text-slate-200">Weekdays · 20:00-04:00 UTC</p>
            <p className="text-slate-400">Critical mitigations may override with manual approval.</p>
          </div>
          <div className="space-y-2 rounded-xl border border-slate-800/70 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">Escalation Matrix</p>
            <p className="font-medium text-slate-200">PagerDuty · FinOps · Sustainability Guild</p>
            <p className="text-slate-400">24/7 monitoring on all agent-initiated workflows.</p>
          </div>
          <div className="space-y-2 rounded-xl border border-slate-800/70 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">Data Residency</p>
            <p className="font-medium text-slate-200">US & EU regions · anonymized telemetry</p>
            <p className="text-slate-400">PII is redacted before entering the Agent System.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const pageTitle = useMemo(() => {
    const current = navItems.find((item) => item.id === activePage)
    return current?.label ?? 'Dashboard'
  }, [activePage])

  const renderPage = () => {
    switch (activePage) {
      case 'optimize':
        return <OptimizePage />
      case 'query':
        return <QueryPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="flex w-72 flex-col border-r border-slate-900/70 bg-slate-950/80 backdrop-blur">
        <div className="flex items-center gap-3 border-b border-slate-900/70 px-6 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
            <Leaf className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">AWS</p>
            <h1 className="text-lg font-semibold text-slate-100">Agent System</h1>
          </div>
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-300 shadow-lg shadow-emerald-500/10'
                    : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </motion.button>
            )
          })}
        </nav>
        <div className="border-t border-slate-900/70 px-6 py-6 text-xs text-slate-500">
          <p className="font-medium text-slate-400">System Health</p>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/80 px-4 py-3">
            <span>Signals</span>
            <span className="text-emerald-400">Stable</span>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900/70 px-8 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">AWS Agent System</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-100">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300">
              Carbon Neutral Trajectory
            </div>
            <div className="rounded-full border border-slate-800/60 bg-slate-950/70 px-4 py-2 text-xs text-slate-400">
              Agent Mesh v2.4
            </div>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.main
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-8 py-8"
          >
            <div className="mx-auto w-full max-w-7xl space-y-8">{renderPage()}</div>
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
