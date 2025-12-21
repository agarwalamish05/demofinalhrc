import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  Fish, 
  Activity, 
  Lock, 
  CheckCircle, 
  BarChart2, 
  Search,
  Menu,
  X,
  Bell,
  User as UserIcon,
  Globe,
  Smartphone,
  MapPin,
  DownloadCloud,
  Clock,
  Briefcase,
  Monitor,
  Moon,
  Check,
  ChevronDown
} from 'lucide-react';
import { Page, RiskLevel } from './types';
import { 
  HIGH_RISK_USERS, 
  RISK_EVENTS, 
  DEPARTMENT_DATA, 
  RISK_OVER_TIME_DATA, 
  PHISHING_CAMPAIGNS,
  REMEDIATION_ACTIONS,
  BEHAVIORAL_ACTIVITY_DATA,
  ANOMALY_DISTRIBUTION,
  TEAM_RISK_STATS,
  ACCESS_LOGS_DATA,
  ACCESS_OVER_TIME,
  ORG_COMPLIANCE,
  ORG_TREND_DATA,
  STRATEGIC_PRIORITIES,
  USER_TIMELINE_DATA,
  INDIVIDUAL_RISK_TREND,
  PHISHING_CLICK_RATE_TREND,
  BEHAVIORAL_TREND_MONTHLY,
  TOP_BEHAVIORAL_USERS,
  SUSPICIOUS_EVENTS_IMAGE,
  ANOMALY_TYPE_BARS,
  TEAM_MEMBERS_IMAGE,
  ACCESS_ANOMALIES_TREND,
  PRIVILEGED_USERS_RISK,
  ACCESS_ANOMALY_TYPES_DATA,
  ROLE_PRIVILEGE_CHANGES,
  UNUSUAL_ACCESS_EVENTS,
  ORG_HUMAN_RISK_TREND,
  ORG_RISK_TREND_SPARK,
  TOP_CRITICAL_EVENTS,
  RISK_BREAKDOWN_PIE
} from './mockData';
import { Card, RiskBadge, Button, SectionHeader } from './components/ui';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, AreaChart, Area
} from 'recharts';

// --- Shared Components ---

const CircularProgress = ({ score, size = "large" }: { score: number, size?: "medium" | "large" }) => {
  const radius = 15.9155;
  const circumference = 100;
  const dimension = size === "large" ? "w-32 h-32" : "w-24 h-24";
  const fontSize = size === "large" ? "text-4xl" : "text-3xl";

  return (
    <div className={`relative ${dimension} flex items-center justify-center`}>
      <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
        <path 
          className="text-slate-700" 
          d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 31.831 a ${radius} ${radius} 0 0 1 0 -31.831`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
        />
        <path 
          className="text-cyan-400" 
          strokeDasharray={`${score}, 100`}
          d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 31.831 a ${radius} ${radius} 0 0 1 0 -31.831`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <span className={`${fontSize} font-bold text-white`}>{score}</span>
        {size === "large" && <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">out of 100</p>}
      </div>
    </div>
  );
};

// --- Risk Timeline Modal ---

const RiskTimelineModal = ({ isOpen, onClose, userName }: { isOpen: boolean, onClose: () => void, userName: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-[#0b0e14] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-800 shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        {/* Header Profile */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
            <UserIcon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-medium text-slate-200">{userName}</h3>
        </div>

        {/* Risk Timeline Header */}
        <div className="mb-8">
           <h2 className="text-4xl font-bold text-white mb-2">Risk Timeline</h2>
           <div className="flex items-start gap-12 mt-6">
              <div className="space-y-1">
                 <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Human Risk Score</p>
                 <div className="text-6xl font-bold text-white">87</div>
              </div>
              
              <div className="flex-1">
                 {/* Filters and Chart Area */}
                 <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-md border border-slate-800 text-cyan-400 text-sm cursor-pointer">
                       <Check className="w-4 h-4" /> Behaviour
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-md border border-slate-800 text-cyan-400 text-sm cursor-pointer">
                       <Check className="w-4 h-4" /> Phishing
                    </div>
                 </div>
                 
                 <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={INDIVIDUAL_RISK_TREND}>
                          <defs>
                            <linearGradient id="timelineScore" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#timelineScore)" />
                          <XAxis dataKey="day" hide />
                          <YAxis hide domain={[40, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                       </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-2 px-1">
                       <span>26 Feb</span>
                       <span>22</span>
                       <span>22 a</span>
                       <span>26</span>
                       <span>87</span>
                    </div>
                 </div>
              </div>

              {/* Stats Box Right */}
              <div className="w-72 bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-6">
                 <div>
                    <h4 className="text-slate-200 text-sm font-medium mb-1">Risk Increased</h4>
                    <div className="flex items-baseline gap-2">
                       <span className="text-cyan-400 text-2xl font-bold">+12</span>
                       <span className="text-slate-500 text-xs">This Week</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">Risk score increased due to multiple phishing clicks and new device usage.</p>
                 </div>
                 
                 <div className="space-y-2">
                    <h4 className="text-slate-200 text-sm font-medium">Last 7 Days</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                       3 anomalies detected
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                       2 critical events
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Activity Section */}
        <div>
           <h3 className="text-lg font-semibold text-white mb-6">Activity</h3>
           <div className="relative pl-8 space-y-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-px bg-slate-800"></div>

              {USER_TIMELINE_DATA.map((item, idx) => {
                 let Icon = Monitor;
                 if (item.type === 'phishing') Icon = AlertTriangle;
                 if (item.type === 'access') Icon = Moon;
                 if (item.type === 'behavior') Icon = DownloadCloud;
                 
                 return (
                    <div key={item.id} className="relative flex items-center gap-6 group">
                       {/* Date Label */}
                       <div className="w-16 text-slate-500 text-sm">{item.date}</div>
                       
                       {/* Timeline Marker */}
                       <div className="absolute left-[11px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 z-10"></div>
                       
                       {/* Content Row */}
                       <div className="flex items-center gap-4 flex-1">
                          <div className={`p-2 rounded-md ${item.isCritical ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-800 text-slate-400'} border border-slate-700/50`}>
                             <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 flex items-baseline gap-2">
                             {item.isCritical && <span className="text-rose-500 font-bold text-sm">Critic!</span>}
                             <span className="text-slate-200 text-sm">{item.event}</span>
                          </div>
                       </div>
                    </div>
                 );
              })}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard View ---

const DashboardView = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center justify-center p-6 bg-slate-850 border-cyan-900/30">
          <CircularProgress score={72} />
          <p className="mt-4 text-sm text-center text-slate-300">Organization Human Risk Score</p>
        </Card>

        <Card className="flex flex-col justify-center">
          <span className="text-4xl font-bold text-white">24</span>
          <span className="text-sm text-slate-400">High-Risk Users</span>
          <div className="w-full bg-slate-700 h-1 mt-4 rounded-full overflow-hidden">
            <div className="bg-rose-500 w-[24%] h-full"></div>
          </div>
        </Card>

        <Card className="flex flex-col justify-center">
          <span className="text-4xl font-bold text-white">16</span>
          <span className="text-sm text-slate-400">Recent Anomalies</span>
          <div className="w-full bg-slate-700 h-1 mt-4 rounded-full overflow-hidden">
             <div className="bg-amber-400 w-[16%] h-full"></div>
          </div>
        </Card>

        <Card className="flex flex-col justify-center">
          <span className="text-4xl font-bold text-white">18.5%</span>
          <span className="text-sm text-slate-400">Phishing Click Rate</span>
           <div className="w-full bg-slate-700 h-1 mt-4 rounded-full overflow-hidden">
             <div className="bg-cyan-400 w-[18.5%] h-full"></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Human Risk Score Over Time</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RISK_OVER_TIME_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} dot={{r: 4, fill: '#1e293b', strokeWidth: 2}} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Risk by Department</h3>
          <div className="h-64 w-full flex items-end justify-between px-4 gap-4">
             {DEPARTMENT_DATA.map((dept, idx) => (
               <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
                 <div className="text-cyan-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold">{idx}</div>
                 <div className="w-full bg-slate-700 rounded-t-sm relative h-full max-h-[200px] flex items-end">
                   <div 
                      className="w-full bg-cyan-500/80 hover:bg-cyan-400 transition-all rounded-t-sm"
                      style={{ height: `${(dept as any).blue}%` }}
                    ></div>
                 </div>
                 <span className="text-xs text-slate-400 mt-3">{dept.name}</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Top 10 High-Risk Users</h3>
            <button onClick={() => setPage(Page.RiskProfile)} className="text-xs text-cyan-400 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-500 uppercase bg-slate-800/50">
                <tr>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Dept</th>
                  <th className="px-4 py-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {HIGH_RISK_USERS.slice(0, 5).map(user => (
                  <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => setPage(Page.RiskProfile)}>
                    <td className="px-4 py-3 font-medium text-white">{user.name}</td>
                    <td className="px-4 py-3">{user.department}</td>
                    <td className="px-4 py-3 text-right"><RiskBadge score={user.riskScore} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Anomalies</h3>
            <button onClick={() => setPage(Page.RiskEvents)} className="text-xs text-cyan-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
             {RISK_EVENTS.slice(0, 4).map(event => (
               <div key={event.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                 <div>
                   <p className="text-sm text-white font-medium">{event.user} - {event.event}</p>
                   <p className="text-xs text-slate-500">{event.timeAgo}</p>
                 </div>
                 <span className="text-xs font-bold text-rose-500">High</span>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Risk Events View ---

const RiskEventsView = () => {
  const [timelineUser, setTimelineUser] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Risk Events" />
      <Card>
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Risk Events Log</h3>
            <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-700 text-sm text-slate-400 flex items-center gap-2">
               <Search className="w-4 h-4" /> Search events...
            </div>
        </div>
        <table className="w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-500 uppercase bg-slate-900/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Risk Event</th>
                    <th className="px-6 py-4">First Event</th>
                    <th className="px-6 py-4">Last Event</th>
                  </tr>
                </thead>
                <tbody>
                  {RISK_EVENTS.map(event => (
                    <tr 
                      key={event.id} 
                      className="border-b border-slate-800 hover:bg-slate-700/30 cursor-pointer"
                      onClick={() => setTimelineUser(event.user)}
                    >
                      <td className="px-6 py-4 font-medium text-white">{event.user}</td>
                      <td className="px-6 py-4 text-rose-400">{event.riskLevel}</td>
                      <td className="px-6 py-4">{event.date}</td>
                      <td className="px-6 py-4">{event.timeAgo}</td>
                    </tr>
                  ))}
                  <tr 
                    className="border-b border-slate-800 hover:bg-slate-700/30 cursor-pointer"
                    onClick={() => setTimelineUser('Michael Wilson')}
                  >
                     <td className="px-6 py-4 text-white">Michael Wilson</td>
                     <td className="px-6 py-4 text-green-400">4</td>
                     <td className="px-6 py-4">5 months ago</td>
                     <td className="px-6 py-4">2 months ago</td>
                  </tr>
                </tbody>
        </table>
      </Card>

      <RiskTimelineModal 
        isOpen={!!timelineUser} 
        onClose={() => setTimelineUser(null)} 
        userName={timelineUser || ''} 
      />
    </div>
  );
};

// --- Risk Profile View ---

const RiskProfileView = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  if (selectedUser) {
    const user = HIGH_RISK_USERS.find(u => u.id === selectedUser) || HIGH_RISK_USERS[0];
    
    return (
      <div className="animate-fade-in space-y-6">
        <Button onClick={() => setSelectedUser(null)} variant="secondary" className="mb-4">← Back to List</Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 flex flex-col items-center text-center">
             <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-slate-700 mb-4" />
             <h2 className="text-2xl font-bold text-white">{user.name}</h2>
             <p className="text-slate-400">{user.role} • {user.department}</p>
             <div className="mt-8 bg-slate-900 rounded-2xl p-6 w-full relative overflow-hidden">
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wide">Human Risk Score</p>
                <div className="text-6xl font-bold text-white">{user.riskScore}</div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500 blur-3xl opacity-20"></div>
             </div>
             <div className="w-full mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Anomalies Detected</span>
                  <span className="text-white font-bold">{user.anomaliesDetected}</span>
                </div>
             </div>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Human Risk Score Breakdown</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                 <CircularProgress score={user.riskScore} size="large" />
                 <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Behavior</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-cyan-500 h-full rounded-full" style={{ width: '30%' }}></div></div>
                        <span className="text-white font-mono">30</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Phishing</span>
                      <div className="flex items-center gap-2">
                         <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-rose-500 h-full rounded-full" style={{ width: '32%' }}></div></div>
                         <span className="text-white font-mono">32</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Access</span>
                      <div className="flex items-center gap-2">
                         <div className="w-32 h-2 bg-slate-700 rounded-full"><div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }}></div></div>
                         <span className="text-white font-mono">28</span>
                      </div>
                    </div>
                 </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Training Status</h3>
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-white font-medium">Security Awareness Training</p>
                  <p className="text-rose-400 text-sm mt-1">Incomplete</p>
                </div>
              </Card>
              <Card>
                 <h3 className="text-sm font-semibold text-slate-300 mb-4">Activity Over Time</h3>
                 <div className="h-24">
                   <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[ {v: 20}, {v: 40}, {v: 35}, {v: 50}, {v: 45}, {v: 70}, {v: 60} ]}>
                      <Line type="monotone" dataKey="v" stroke="#22d3ee" strokeWidth={2} dot={false} />
                    </LineChart>
                   </ResponsiveContainer>
                 </div>
              </Card>
            </div>
          </div>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Anomalies</h3>
          <table className="w-full text-sm text-left text-slate-400">
              <tbody>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3">Credential sharing</td>
                  <td className="py-3 text-right text-slate-500">Sept. 11</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3">Opened suspicious email attachment</td>
                  <td className="py-3 text-right text-slate-500">Aug. 29</td>
                </tr>
                <tr>
                  <td className="py-3">Access from unusual location</td>
                  <td className="py-3 text-right text-slate-500">Aug. 18</td>
                </tr>
              </tbody>
            </table>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <SectionHeader title="Risk Profile" subtitle="High-risk users identified by the correlation engine." />
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Risk Profile</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search users" className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-cyan-500 outline-none w-64" />
          </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-500 uppercase bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Risk Score</th>
                  <th className="px-6 py-4">Phishing Risk</th>
                  <th className="px-6 py-4">Behavior Anomalies</th>
                  <th className="px-6 py-4 text-right">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {HIGH_RISK_USERS.map(user => (
                  <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => setSelectedUser(user.id)}>
                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4"><RiskBadge score={user.riskScore} /></td>
                    <td className="px-6 py-4 text-white">{user.phishingRisk}</td>
                    <td className="px-6 py-4 text-white">{user.anomaliesDetected}</td>
                    <td className="px-6 py-4 text-right">{user.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

// --- Phishing Simulation View ---

const PhishingSimulationView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Phishing Simulation Dashboard" />
    
    {/* KPI and Trend Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#121b2a] border-slate-800 py-8 text-center flex flex-col justify-center">
          <div className="text-5xl font-bold text-white mb-2">18</div>
          <div className="text-sm text-slate-400 font-medium">Total simulations</div>
        </Card>
        <Card className="bg-[#121b2a] border-slate-800 py-8 text-center flex flex-col justify-center">
          <div className="text-5xl font-bold text-white mb-2">1,250</div>
          <div className="text-sm text-slate-400 font-medium">Users targeted</div>
        </Card>
        <Card className="bg-[#121b2a] border-slate-800 py-8 text-center flex flex-col justify-center">
          <div className="text-5xl font-bold text-white mb-2">23%</div>
          <div className="text-sm text-slate-400 font-medium">Click rate</div>
        </Card>
      </div>
      
      <Card className="bg-[#121b2a] border-slate-800">
        <h3 className="text-sm font-semibold text-slate-300 mb-6">Click Rate Over Time</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PHISHING_CLICK_RATE_TREND}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} tick={{fontSize: 10}} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{fontSize: 10}} tickFormatter={(val) => `${val}%`} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
              <Line type="monotone" dataKey="rate" stroke="#22d3ee" strokeWidth={2} dot={{r: 2, fill: '#22d3ee'}} activeDot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Simulation Results Section */}
    <Card className="bg-[#121b2a] border-slate-800">
      <h3 className="text-lg font-semibold text-white mb-8">Simulation Results</h3>
      <div className="relative w-full h-12 bg-slate-900 rounded-lg flex overflow-hidden mb-6">
        <div className="h-full bg-slate-900/80 w-[59%] flex items-center justify-center border-r border-slate-800/20"></div>
        <div className="h-full bg-blue-900/60 w-[23%] flex items-center justify-center border-r border-slate-800/20"></div>
        <div className="h-full bg-cyan-500/80 w-[18%] flex items-center justify-center"></div>
      </div>
      <div className="flex gap-8 px-2">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-600"></span> No click
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <span className="w-3 h-3 rounded-full bg-blue-700"></span> Clicked
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <span className="w-3 h-3 rounded-full bg-cyan-500"></span> Reported
        </div>
      </div>
    </Card>

    {/* Campaign Details Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-500 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-4 font-medium">Name</th>
            <th className="px-4 py-4 font-medium">Launch date</th>
            <th className="px-4 py-4 font-medium">Click rate</th>
            <th className="px-4 py-4 font-medium">Reporting rate</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {PHISHING_CAMPAIGNS.map((camp, i) => (
            <tr key={i} className="border-t border-slate-800/50">
              <td className="px-4 py-6 font-semibold text-white text-base">{camp.name}</td>
              <td className="px-4 py-6 text-slate-400">{camp.launchDate}</td>
              <td className="px-4 py-6 font-bold text-white text-base">{camp.clickRate}</td>
              <td className="px-4 py-6 font-bold text-white text-base">{camp.reportingRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Remediation View ---

const RemediationView = () => {
  const [autoRemediateEnabled, setAutoRemediateEnabled] = useState(true);

  return (
    <div className="animate-fade-in space-y-8 p-2">
      <h1 className="text-4xl font-bold text-white mb-2">Action Center</h1>

      {/* Top Row: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#0b101b] border-slate-800/60 p-8 flex flex-col justify-between h-40">
          <span className="text-sm font-medium text-slate-400">Pending Actions</span>
          <div className="text-5xl font-bold text-slate-100">18</div>
        </Card>
        
        <Card className="bg-[#0b101b] border-slate-800/60 p-8 flex flex-col justify-between h-40">
          <span className="text-sm font-medium text-slate-400">Completed Actions</span>
          <div className="text-5xl font-bold text-slate-100">36</div>
        </Card>
        
        <Card className="bg-[#0b101b] border-slate-800/60 p-8 flex flex-col justify-between h-40">
          <span className="text-sm font-medium text-slate-400">Automated Actions</span>
          <div className="text-5xl font-bold text-slate-100">12</div>
        </Card>
        
        <Card className="bg-[#0b101b] border-slate-800/60 p-8 flex flex-col justify-between h-40">
          <span className="text-sm font-medium text-slate-400">Average Completion Time</span>
          <div className="text-5xl font-bold text-cyan-400">4,2 hrs</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Recommended Actions Table */}
        <div className="lg:col-span-3">
          <h3 className="text-xl font-bold text-white mb-6">Recommended Actions</h3>
          <div className="overflow-x-auto bg-[#0b101b] rounded-xl border border-slate-800/60">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-500 uppercase tracking-widest text-[10px] font-bold border-b border-slate-800/50">
                <tr>
                  <th className="px-6 py-5">User</th>
                  <th className="px-6 py-5">Issue Detected</th>
                  <th className="px-6 py-5">Recommended Action</th>
                  <th className="px-6 py-5 text-right">Priority</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 divide-y divide-slate-800/30">
                {REMEDIATION_ACTIONS.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-6 font-medium text-slate-100">{item.user}</td>
                    <td className="px-6 py-6 text-slate-400">{item.issue}</td>
                    <td className="px-6 py-6 text-slate-400">{item.action}</td>
                    <td className={`px-6 py-6 text-right font-bold ${
                      item.priority === 'High' ? 'text-rose-500' : 
                      item.priority === 'Medium' ? 'text-amber-500' : 
                      item.priority === 'Pending' ? 'text-blue-400' : 'text-slate-100'
                    }`}>
                      {item.priority}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Auto-Remediation Controls */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-xl font-bold text-white">Auto-Remediation</h3>
          <div className="flex items-center justify-between bg-[#0b101b] p-4 rounded-xl border border-slate-800/60 mb-8">
            <span className="text-sm text-slate-200">Enable Auto-Remediati</span>
            <button 
              onClick={() => setAutoRemediateEnabled(!autoRemediateEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${autoRemediateEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${autoRemediateEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[#0b101b] border border-slate-800/60 rounded-xl p-4 text-sm text-slate-300 hover:border-blue-500/50 cursor-pointer transition-all">
              Auto-assign micro-training
            </div>
            <div className="bg-[#0b101b] border border-slate-800/60 rounded-xl p-4 text-sm text-slate-300 hover:border-blue-500/50 cursor-pointer transition-all">
              Auto-trigger device verifica
            </div>
            <div className="bg-[#0b101b] border border-slate-800/60 rounded-xl p-4 text-sm text-slate-300 hover:border-blue-500/50 cursor-pointer transition-all">
              Auto-alert manager
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Behavioral Analytics View ---

const BehavioralAnalyticsView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Behavioural Analytics" />
    
    {/* Top Summary KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-[#121b2a] border-slate-800 text-center py-6">
        <div className="text-3xl font-bold text-cyan-400">1,273</div>
        <div className="text-xs text-slate-400 mt-1">Anomalies Detected</div>
      </Card>
      <Card className="bg-[#121b2a] border-slate-800 text-center py-6">
        <div className="text-3xl font-bold text-cyan-400">312</div>
        <div className="text-xs text-slate-400 mt-1">Off-Hours Logins</div>
      </Card>
      <Card className="bg-[#121b2a] border-slate-800 text-center py-6">
        <div className="text-3xl font-bold text-cyan-400">86</div>
        <div className="text-xs text-slate-400 mt-1">New Devices Detected</div>
      </Card>
      <Card className="bg-[#121b2a] border-slate-800 text-center py-6">
        <div className="text-3xl font-bold text-cyan-400">12</div>
        <div className="text-xs text-slate-400 mt-1">Impossible Travel Events</div>
      </Card>
    </div>

    {/* Middle Row Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-[#0d1421] border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200 mb-6 px-2">Behaviour Anomalies Over Time</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={BEHAVIORAL_TREND_MONTHLY}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} tick={{fontSize: 12}} dy={10} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{fontSize: 12}} domain={[0, 250]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
              <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} dot={{r: 3, fill: '#22d3ee'}} activeDot={{r: 5}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-[#0d1421] border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200 mb-4 px-2">Login Locations</h3>
        <div className="h-64 w-full relative flex items-center justify-center overflow-hidden opacity-60">
           {/* Stylized World Map SVG Placeholder */}
           <svg viewBox="0 0 1000 500" className="w-full h-auto text-slate-700 fill-current">
              <path d="M150,150 Q170,140 190,150 T230,150 T270,160 T310,140 T350,150 T390,160 T430,140 T470,150 T510,160 T550,140 T590,150 T630,160 T670,140 T710,150 T750,160 T790,140 T830,150" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="210" cy="180" r="4" className="text-cyan-400 fill-current shadow-lg shadow-cyan-500/50" />
              <circle cx="450" cy="120" r="3" className="text-cyan-400 fill-current" />
              <circle cx="680" cy="220" r="5" className="text-cyan-400 fill-current" />
              <circle cx="820" cy="150" r="3" className="text-cyan-400 fill-current" />
              <circle cx="910" cy="380" r="4" className="text-cyan-400 fill-current" />
              <circle cx="280" cy="350" r="3" className="text-cyan-400 fill-current" />
           </svg>
           {/* Overlay some dots for effect */}
           <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
           <div className="absolute top-1/2 left-[45%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
           <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </Card>
    </div>

    {/* Bottom Row: Top Users, Events, and Anomaly Types */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Top Users */}
      <Card className="bg-[#0d1421] border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200 mb-6">Top Users by Behavior Anomalies</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="pb-4 font-medium">User</th>
                <th className="pb-4 text-right font-medium">Anomalies</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {TOP_BEHAVIORAL_USERS.map((row, i) => (
                <tr key={i} className="border-t border-slate-800/50">
                  <td className="py-3.5">{row.user}</td>
                  <td className="py-3.5 text-right font-mono">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Suspicious Events */}
      <Card className="bg-[#0d1421] border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200 mb-6">Suspicious Behavior Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] text-left">
            <thead className="text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="pb-4 font-medium">Time</th>
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 text-right font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {SUSPICIOUS_EVENTS_IMAGE.map((row, i) => (
                <tr key={i} className="border-t border-slate-800/50">
                  <td className="py-3.5">{row.user}</td>
                  <td className="py-3.5">{row.event}</td>
                  <td className="py-3.5 text-right text-slate-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Anomaly Types */}
      <Card className="bg-[#0d1421] border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200 mb-6">Top Anomaly Types</h3>
        <div className="space-y-6 mt-4">
          {ANOMALY_TYPE_BARS.map((type, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>{type.name}</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-500/80 h-full rounded-full" 
                  style={{ width: `${type.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// --- Access Monitoring View ---

const AccessMonitoringView = () => (
  <div className="animate-fade-in space-y-8 p-2">
    <SectionHeader title="Access Anomalies" />
    
    {/* Top Row: KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-[#0b101b] border-slate-800/60 py-10 px-6 text-center flex flex-col justify-center items-center h-48">
        <div className="text-5xl font-bold text-slate-200 mb-3 tracking-tight">57</div>
        <div className="text-sm text-slate-400 font-medium">Privileged Accounts</div>
      </Card>
      
      <Card className="bg-[#0b101b] border-slate-800/60 py-10 px-6 flex flex-row items-center justify-center gap-4 h-48">
        <div className="text-6xl font-bold text-cyan-400 tracking-tight">5</div>
        <div className="text-left">
          <div className="text-sm text-slate-200 font-bold leading-tight">High-Risk</div>
          <div className="text-sm text-slate-400 font-medium">Privileged Users</div>
        </div>
      </Card>
      
      <Card className="bg-[#0b101b] border-slate-800/60 py-10 px-6 text-center flex flex-col justify-center items-center h-48">
        <div className="text-5xl font-bold text-slate-200 mb-3 tracking-tight">28</div>
        <div className="text-sm text-slate-400 font-medium">Suspicious Access Events</div>
      </Card>
      
      <Card className="bg-[#0b101b] border-slate-800/60 py-10 px-6 text-center flex flex-col justify-center items-center h-48">
        <div className="text-5xl font-bold text-slate-200 mb-3 tracking-tight">12</div>
        <div className="text-sm text-slate-400 font-medium leading-tight">Bulk File Downloads Detect</div>
      </Card>
    </div>

    {/* Middle Row: Charts and User Table */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Access Anomalies Over Time */}
      <Card className="bg-[#0b101b] border-slate-800/60 min-h-[400px]">
        <h3 className="text-lg font-semibold text-slate-100 mb-8">Access Anomalies Over Time</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ACCESS_ANOMALIES_TREND}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false} tick={{fontSize: 12}} dy={10} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{fontSize: 12}} domain={[0, 40]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
              <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} dot={{r: 0}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Privileged Users by Risk */}
      <Card className="bg-[#0b101b] border-slate-800/60 min-h-[400px]">
        <h3 className="text-lg font-semibold text-slate-100 mb-8">Top Privileged Users by Risk</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">
              <tr className="border-b border-slate-800/50">
                <th className="pb-4 font-semibold">User</th>
                <th className="pb-4 font-semibold">Role</th>
                <th className="pb-4 font-semibold">Department</th>
                <th className="pb-4 font-semibold">Risk</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {PRIVILEGED_USERS_RISK.map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 font-semibold text-slate-200">{row.user}</td>
                  <td className="py-4 text-slate-400">{row.role}</td>
                  <td className="py-4 text-slate-400">{row.department}</td>
                  <td className={`py-4 font-bold text-right ${
                    row.risk === 'High' ? 'text-rose-500' : 
                    row.risk === 'Medium' ? 'text-amber-500' : 'text-cyan-400'
                  }`}>{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>

    {/* Bottom Row: Anomaly Types and Role Changes */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Access Anomaly Types Chart */}
      <Card className="bg-[#0b101b] border-slate-800/60 min-h-[400px]">
        <h3 className="text-lg font-semibold text-slate-100 mb-8">Access Anomaly Types</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ACCESS_ANOMALY_TYPES_DATA} layout="vertical" margin={{ left: 140 }}>
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#64748b" 
                tickLine={false} 
                axisLine={false} 
                tick={{fontSize: 12, fill: '#94a3b8'}} 
                width={130}
              />
              <Bar dataKey="value" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Role & Privilege Changes Table */}
      <Card className="bg-[#0b101b] border-slate-800/60 min-h-[400px]">
        <h3 className="text-lg font-semibold text-slate-100 mb-8">Role & Privilege Changes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">
              <tr className="border-b border-slate-800/50">
                <th className="pb-4 font-semibold">User</th>
                <th className="pb-4 font-semibold">Change</th>
                <th className="pb-4 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {ROLE_PRIVILEGE_CHANGES.map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/20 transition-colors border-b border-slate-800/30 last:border-0">
                  <td className="py-4 font-semibold text-slate-200">{row.user}</td>
                  <td className="py-4 text-slate-400">{row.change}</td>
                  <td className="py-4 text-slate-500 text-right">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>

    {/* Footer Lists Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-[#0b101b] border-slate-800/60 min-h-[250px]">
        <h3 className="text-lg font-semibold text-slate-100 mb-6">Unusual Access Events</h3>
        <div className="space-y-6">
          {UNUSUAL_ACCESS_EVENTS.map((item, i) => (
            <div key={i} className="flex justify-between items-center group">
              <div className="flex gap-4 items-center">
                <span className="font-bold text-slate-100 min-w-[60px]">{item.user}</span>
                <span className="text-slate-400 group-hover:text-slate-200 transition-colors">{item.event}</span>
              </div>
              <span className="text-slate-500 text-sm font-medium">{item.date}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-[#0b101b] border-slate-800/60 min-h-[250px]">
        <h3 className="text-lg font-semibold text-slate-100 mb-6">Role & Privilege Changes</h3>
        <div className="space-y-6">
          {ROLE_PRIVILEGE_CHANGES.slice(0, 2).map((item, i) => (
            <div key={i} className="flex justify-between items-center group">
              <div className="flex gap-4 items-center">
                <span className="font-bold text-slate-100 min-w-[80px]">{item.user}</span>
                <span className="text-slate-400 group-hover:text-slate-200 transition-colors">{item.change}</span>
              </div>
              <span className="text-slate-500 text-sm font-medium">{item.date === 'Oct 11' ? 'October 11' : item.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// --- Team Risk View ---

const TeamRiskView = () => (
  <div className="animate-fade-in space-y-8 flex flex-col items-center max-w-5xl mx-auto py-10">
    <h1 className="text-5xl font-semibold text-white mb-4">Manager / Team View</h1>
    
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
      {/* Selector */}
      <div className="relative w-64">
        <select className="w-full bg-[#1e293b]/50 border border-slate-700 text-white rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer">
          <option>Sales</option>
          <option>Finance</option>
          <option>IT</option>
          <option>HR</option>
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>

      {/* Averages Card */}
      <div className="bg-[#121b2a]/80 border border-slate-800 rounded-xl p-5 w-80 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-300 whitespace-nowrap">Team Average</span>
          <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-cyan-600/60 h-full rounded-full" style={{ width: '37%' }}></div>
          </div>
          <span className="text-sm font-bold text-slate-200">37</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-300 whitespace-nowrap">Org Average</span>
          <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-slate-700 h-full rounded-full" style={{ width: '42%' }}></div>
          </div>
          <span className="text-sm font-bold text-slate-200">42</span>
        </div>
      </div>
    </div>

    {/* Members Table */}
    <div className="w-full bg-[#0d1421] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      <table className="w-full text-sm text-left">
        <thead className="text-slate-200 border-b border-slate-800">
          <tr>
            <th className="px-6 py-5 font-medium">Name</th>
            <th className="px-6 py-5 font-medium text-center">Risk Score</th>
            <th className="px-6 py-5 font-medium text-center">Phishing Risk</th>
            <th className="px-6 py-5 font-medium text-center leading-tight">Behavior<br/>Anomalies</th>
            <th className="px-6 py-5 font-medium">Recommended Action</th>
          </tr>
        </thead>
        <tbody className="text-slate-300 divide-y divide-slate-800/50">
          {TEAM_MEMBERS_IMAGE.map((member, i) => (
            <tr key={i} className="hover:bg-slate-800/20 transition-colors">
              <td className="px-6 py-6 font-medium text-white">{member.name}</td>
              <td className="px-6 py-6 text-center font-mono">{member.score}</td>
              <td className="px-6 py-6 text-center">{member.phishing}</td>
              <td className="px-6 py-6 text-center">{member.behavior}</td>
              <td className="px-6 py-6 text-slate-200">{member.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Organization Overview View ---

const OrganizationOverviewView = () => (
  <div className="animate-fade-in space-y-6">
    <SectionHeader title="Organization Overview" />
    
    {/* Top Row: KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-[#0b101b] border-slate-800/60 p-6 flex flex-col justify-between">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-tight">Organisation Human Risk Score</span>
        <div className="text-5xl font-bold text-slate-100 mt-4">68</div>
      </Card>
      
      <Card className="bg-[#0b101b] border-slate-800/60 p-6 flex flex-col justify-between">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">High-Risk Users</span>
        <div className="mt-4">
          <div className="text-4xl font-bold text-slate-100">14 %</div>
          <div className="text-[10px] uppercase text-slate-500 font-bold mt-1 tracking-widest">Of Users</div>
        </div>
      </Card>
      
      <Card className="bg-[#0b101b] border-slate-800/60 p-6 flex flex-col justify-between">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Top Risk Drivers</span>
        <div className="text-2xl font-bold text-slate-100 mt-6 tracking-wider uppercase">Phishing</div>
      </Card>
      
      <Card className="bg-[#0b101b] border-slate-800/60 p-6 flex flex-col justify-between">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Risk Trend</span>
        <div className="h-16 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ORG_RISK_TREND_SPARK}>
              <Line type="monotone" dataKey="v" stroke="#22d3ee" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Middle Row: Trend and Dept breakdown */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-[#0b101b] border-slate-800/60">
        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-8">Human Risk Trend</h3>
        <div className="h-64 w-full px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ORG_HUMAN_RISK_TREND}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#475569" 
                tickLine={false} 
                axisLine={false} 
                tick={{fontSize: 10, fill: '#64748b'}} 
                dy={10}
              />
              <YAxis 
                stroke="#475569" 
                tickLine={false} 
                axisLine={false} 
                tick={{fontSize: 10, fill: '#64748b'}}
                domain={[0, 100]}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-[#0b101b] border-slate-800/60">
        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-8">Risk by Department</h3>
        <div className="h-64 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={DEPARTMENT_DATA} 
              layout="vertical" 
              margin={{ left: 10, right: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#64748b" 
                tickLine={false} 
                axisLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8'}} 
                width={80}
              />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="blue" stackId="a" fill="#334155" barSize={16} radius={0} />
              <Bar dataKey="teal" stackId="a" fill="#2dd4bf" barSize={16} />
              <Bar dataKey="orange" stackId="a" fill="#f97316" barSize={16} />
              <Bar dataKey="red" stackId="a" fill="#ef4444" barSize={16} />
              <Bar dataKey="empty" stackId="a" fill="#1e293b" barSize={16} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Bottom Row: Lists and Pie */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-[#0b101b] border-slate-800/60 p-6">
        <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-6">Top 5 Critical Events</h3>
        <div className="space-y-4">
          {TOP_CRITICAL_EVENTS.map((event, i) => (
            <div key={i} className="flex justify-between items-start text-xs border-b border-slate-800/50 pb-3 last:border-0 last:pb-0">
              <span className="text-slate-200 font-medium leading-relaxed pr-4">{event.event}</span>
              <span className="text-slate-500 font-bold whitespace-nowrap pt-0.5">{event.date}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-[#0b101b] border-slate-800/60 p-6 opacity-70">
        <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-6">FPT RORCIRCITAL</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-start text-xs border-b border-slate-800/50 pb-3">
            <span className="text-slate-200">Aug- 2 users with User W</span>
          </div>
          <div className="flex justify-between items-start text-xs border-b border-slate-800/50 pb-3">
            <span className="text-slate-200">Bust cups file access</span>
          </div>
          <div className="flex justify-between items-start text-xs border-b border-slate-800/50 pb-3">
            <span className="text-slate-200">Multiple failed, login att</span>
          </div>
          <div className="flex justify-between items-start text-xs border-b border-slate-800/50 pb-3">
            <span className="text-slate-200">Off-hours login by User</span>
          </div>
        </div>
      </Card>

      <Card className="bg-[#0b101b] border-slate-800/60 p-6">
        <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-6">Risk Breakdown</h3>
        <div className="flex items-center justify-between h-40">
          <div className="space-y-4 flex-1">
            {RISK_BREAKDOWN_PIE.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                <span className="text-xs font-bold text-slate-200 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="relative w-32 h-32 flex-shrink-0 ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_BREAKDOWN_PIE}
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {RISK_BREAKDOWN_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">35%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

// --- Layout & Sidebar ---

const Sidebar = ({ activePage, setPage, isMobileOpen, closeMobile }: { activePage: Page, setPage: (p: Page) => void, isMobileOpen: boolean, closeMobile: () => void }) => {
  const menuItems = [
    { page: Page.Dashboard, icon: LayoutDashboard },
    { page: Page.RiskProfile, icon: Users },
    { page: Page.RiskEvents, icon: AlertTriangle },
    { page: Page.TeamRisk, icon: Users },
    { page: Page.PhishingSimulation, icon: Fish },
    { page: Page.BehavioralAnalytics, icon: Activity },
    { page: Page.AccessMonitoring, icon: Lock },
    { page: Page.Remediation, icon: CheckCircle },
    { page: Page.OrganizationOverview, icon: BarChart2 },
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`;

  return (
    <div className={sidebarClasses}>
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white tracking-tight">HumanRisk<span className="text-cyan-400">Cloud</span></h1>
        <button onClick={closeMobile} className="md:hidden text-slate-400"><X /></button>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activePage === item.page;
          const Icon = item.icon;
          return (
            <button key={item.page} onClick={() => { setPage(item.page); closeMobile(); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              {item.page}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case Page.Dashboard: return <DashboardView setPage={setActivePage} />;
      case Page.RiskProfile: return <RiskProfileView />;
      case Page.RiskEvents: return <RiskEventsView />;
      case Page.PhishingSimulation: return <PhishingSimulationView />;
      case Page.Remediation: return <RemediationView />;
      case Page.TeamRisk: return <TeamRiskView />;
      case Page.BehavioralAnalytics: return <BehavioralAnalyticsView />;
      case Page.AccessMonitoring: return <AccessMonitoringView />;
      case Page.OrganizationOverview: return <OrganizationOverviewView />;
      default: return <DashboardView setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 flex">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      <Sidebar activePage={activePage} setPage={setActivePage} isMobileOpen={isMobileMenuOpen} closeMobile={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
           <div className="flex items-center gap-4">
             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-400"><Menu /></button>
             <h2 className="text-lg font-semibold text-white hidden md:block">{activePage}</h2>
           </div>
           <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white relative"><Bell className="w-5 h-5" /></button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                 <div className="text-right hidden sm:block">
                   <p className="text-sm font-medium text-white">Mark Graham</p>
                   <p className="text-xs text-slate-400">Admin</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-cyan-900 text-cyan-400 flex items-center justify-center border border-cyan-700"><UserIcon className="w-4 h-4" /></div>
              </div>
           </div>
        </header>
        <main className="p-6 flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;