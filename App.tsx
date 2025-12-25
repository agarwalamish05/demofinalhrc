
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, AlertTriangle, ShieldAlert, Fish, Activity, Lock, 
  CheckCircle, BarChart2, Bell, User as UserIcon, Search, MoreHorizontal, 
  Download, Globe, Smartphone, MapPin, Monitor, Laptop, ArrowLeft, X,
  AlertCircle, Shield, TrendingUp, Filter, Calendar, Check, Briefcase
} from 'lucide-react';
import { Page, RiskLevel, UserRiskProfile, RiskEventLog } from './types';
import { 
  HIGH_RISK_USERS, RISK_EVENTS, RISK_BY_DEPT_BARS, RISK_OVER_TIME_DATA,
  DEPT_DETAILS, PHISHING_STATS, PHISHING_TREND, PHISHING_CAMPAIGNS,
  BEHAVIORAL_STATS, BEHAVIORAL_CHART_DATA, ANOMALY_PIE_DATA, BEHAVIORAL_ALERTS,
  ACCESS_STATS, ACCESS_TREND_DATA, ACCESS_LOCATIONS, ACCESS_LOGS,
  REMEDIATION_STATS, REMEDIATION_ACTIONS, ORG_OVERVIEW_STATS, POSTURE_TREND,
  COMPLIANCE_FRAMEWORKS, STRATEGIC_INITIATIVES, RECENT_ANOMALIES_LIST,
  RISK_TIMELINE
} from './mockData';
import { Card, RiskBadge, Button } from './components/ui';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, AreaChart, Area
} from 'recharts';

// --- Shared Components ---

const CircularProgress = ({ score, size = "large" }: { score: number, size?: "medium" | "large" }) => {
  const radius = 15.9155;
  const dimension = size === "large" ? "w-36 h-36" : "w-24 h-24";
  const fontSize = size === "large" ? "text-5xl" : "text-3xl";

  return (
    <div className={`relative ${dimension} flex items-center justify-center`}>
      <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
        <circle cx="18" cy="18" r={radius} fill="none" stroke="#1e293b" strokeWidth="2.5" />
        <circle 
          cx="18" cy="18" r={radius} 
          fill="none" stroke="#22d3ee" 
          strokeWidth="2.5" 
          strokeDasharray={`${score}, 100`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${fontSize} font-bold text-white`}>{score}</span>
        {size === "large" && <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">out of 100</p>}
      </div>
    </div>
  );
};

// --- Views ---

const DashboardView = ({ setPage, setSelectedUser }: { setPage: (p: Page) => void, setSelectedUser: (u: UserRiskProfile) => void }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="flex flex-col items-center justify-center p-6 bg-slate-850/50">
        <CircularProgress score={72} />
        <p className="mt-4 text-[13px] text-slate-400 font-medium">Organization Human Risk Score</p>
      </Card>
      <Card className="flex flex-col justify-between p-6 h-full">
        <div className="text-5xl font-bold text-white">24</div>
        <div>
          <p className="text-sm text-slate-400 mb-2">High-Risk Users</p>
          <div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-rose-500 w-[24%] h-full rounded-full" /></div>
        </div>
      </Card>
      <Card className="flex flex-col justify-between p-6 h-full">
        <div className="text-5xl font-bold text-white">16</div>
        <div>
          <p className="text-sm text-slate-400 mb-2">Recent Anomalies</p>
          <div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-amber-400 w-[45%] h-full rounded-full" /></div>
        </div>
      </Card>
      <Card className="flex flex-col justify-between p-6 h-full">
        <div className="text-5xl font-bold text-white">18.5%</div>
        <div>
          <p className="text-sm text-slate-400 mb-2">Phishing Click Rate</p>
          <div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-cyan-400 w-[18.5%] h-full rounded-full" /></div>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Human Risk Score Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={RISK_OVER_TIME_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} dy={10} fontSize={12} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} domain={[0, 100]} fontSize={12} />
              <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#0b0e14', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Risk by Department</h3>
        <div className="h-64 flex items-end justify-around pb-4">
          {RISK_BY_DEPT_BARS.map((dept) => (
            <div key={dept.name} className="flex flex-col items-center flex-1 h-full justify-end">
              <div className="w-16 bg-slate-800 rounded-sm relative" style={{ height: `${dept.value}%` }}>
                <div className="absolute inset-0 bg-cyan-400/20" />
                <div className="absolute bottom-0 w-full bg-cyan-400" style={{ height: '30%' }} />
              </div>
              <p className="mt-4 text-[10px] font-bold text-slate-500 uppercase">{dept.name}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-0 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-slate-800">
          <h3 className="font-bold text-white">Top 10 High-Risk Users</h3>
          <button onClick={() => setPage(Page.RiskProfile)} className="text-xs text-cyan-400 hover:underline">View All</button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase bg-slate-800/30">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Dept</th>
              <th className="px-6 py-3 text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {HIGH_RISK_USERS.slice(0, 5).map(user => (
              <tr key={user.id} className="hover:bg-slate-800/40 cursor-pointer" onClick={() => { setSelectedUser(user); setPage(Page.RiskProfile); }}>
                <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                <td className="px-6 py-4 text-slate-400">{user.department}</td>
                <td className="px-6 py-4 text-right"><RiskBadge score={user.riskScore} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="p-0 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-slate-800">
          <h3 className="font-bold text-white">Recent Anomalies</h3>
          <button onClick={() => setPage(Page.RiskEvents)} className="text-xs text-cyan-400 hover:underline">View All</button>
        </div>
        <div className="p-6 space-y-4">
          {RECENT_ANOMALIES_LIST.map(anomaly => (
            <div key={anomaly.id} className="flex items-center justify-between p-4 bg-slate-800/40 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">{anomaly.title}</p>
                <p className="text-xs text-slate-500 mt-1">{anomaly.time}</p>
              </div>
              <span className="text-xs font-bold text-rose-500 uppercase">High</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const RiskProfileView = ({ setSelectedUser }: { setSelectedUser: (u: UserRiskProfile) => void }) => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-white">Risk Profile</h2>
      <p className="text-sm text-slate-500 mt-1">High-risk users identified by the correlation engine.</p>
    </div>
    <Card className="p-0 overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        <h3 className="font-bold text-white">Risk Profile</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search users..." className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-cyan-400 transition-colors" />
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-[11px] text-slate-500 uppercase bg-slate-800/30">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Risk Score</th>
            <th className="px-6 py-4">Phishing Risk</th>
            <th className="px-6 py-4">Behavior Anomalies</th>
            <th className="px-6 py-4">Last Activity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {HIGH_RISK_USERS.map(user => (
            <tr key={user.id} className="hover:bg-slate-800/40 cursor-pointer group" onClick={() => setSelectedUser(user)}>
              <td className="px-6 py-5 text-white font-bold">{user.name}</td>
              <td className="px-6 py-5 font-bold"><RiskBadge score={user.riskScore} /></td>
              <td className="px-6 py-5 text-slate-400">{user.phishingRisk}</td>
              <td className="px-6 py-5 text-slate-400 font-bold">{user.anomaliesDetected}</td>
              <td className="px-6 py-5 text-slate-400">{user.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const UserDetailView = ({ user, onBack, onShowTimeline }: { user: UserRiskProfile, onBack: () => void, onShowTimeline: (eId: string) => void }) => (
  <div className="space-y-6 animate-fade-in">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">Back to List</span>
    </button>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-8 flex flex-col items-center">
        <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-2 border-cyan-400 p-1 mb-4" />
        <h2 className="text-xl font-bold text-white">{user.name}</h2>
        <p className="text-sm text-slate-500">{user.role} • {user.department}</p>
        <div className="mt-8 mb-4 p-6 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col items-center w-full">
           <span className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Human Risk Score</span>
           <span className="text-5xl font-bold text-white">{user.riskScore}</span>
        </div>
        <div className="flex justify-between w-full mt-4 text-sm px-2">
          <span className="text-slate-400 font-medium">Anomalies Detected</span>
          <span className="text-white font-bold">{user.anomaliesDetected}</span>
        </div>
      </Card>
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-8">
          <h3 className="font-bold text-white mb-8">Human Risk Score Breakdown</h3>
          <div className="grid grid-cols-2 gap-8 items-center">
            <CircularProgress score={user.riskScore} size="medium" />
            <div className="space-y-6">
              {[
                { label: 'Behavior', val: 30, color: 'bg-cyan-400' },
                { label: 'Phishing', val: 32, color: 'bg-blue-400' },
                { label: 'Access', val: 28, color: 'bg-amber-400' }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[11px] uppercase font-bold text-slate-400 mb-2">
                    <span>{item.label}</span>
                    <span>{item.val}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full`} style={{ width: `${(item.val / 40) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Training Status</h3>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
               <p className="text-white font-bold text-sm">Security Awareness Training</p>
               <p className="text-rose-400 text-xs mt-1">Incomplete</p>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Activity Over Time</h3>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PHISHING_TREND}>
                  <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="#22d3ee20" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h3 className="font-bold text-white">Recent Anomalies</h3>
      </div>
      <div className="divide-y divide-slate-800">
        {[
          { event: 'Credential sharing', date: 'Sept. 11' },
          { event: 'Opened suspicious email attachment', date: 'Aug. 29' },
          { event: 'Access from unusual location', date: 'Aug. 18' }
        ].map((item, i) => (
          <div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-slate-800/20 cursor-pointer" onClick={() => onShowTimeline('1')}>
            <span className="text-sm text-slate-300">{item.event}</span>
            <span className="text-xs text-slate-500">{item.date}</span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const RiskEventsView = ({ onSelectEvent }: { onSelectEvent: (id: string) => void }) => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-white">Risk Events</h2>
    </div>
    <Card className="p-0 overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        <h3 className="font-bold text-white">Risk Events Log</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search events..." className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-cyan-400" />
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-[11px] text-slate-500 uppercase bg-slate-800/30">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Risk Event</th>
            <th className="px-6 py-4">First Event</th>
            <th className="px-6 py-4">Last Event</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {RISK_EVENTS.map(log => (
            <tr key={log.id} className="hover:bg-slate-800/40 cursor-pointer" onClick={() => onSelectEvent(log.id)}>
              <td className="px-6 py-5 text-white font-bold">{log.user}</td>
              <td className="px-6 py-5 font-bold text-rose-500">{log.riskLevel}</td>
              <td className="px-6 py-5 text-slate-400">{log.date}</td>
              <td className="px-6 py-5 text-slate-400">{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const RiskTimelineModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-[#121b2a] border border-slate-800 rounded-2xl w-full max-w-4xl p-10 overflow-hidden animate-scale-in">
      <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X /></button>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"><UserIcon className="w-4 h-4" /></div>
        <span className="font-bold text-white">James Smith</span>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Risk Timeline</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
        <div>
           <div className="mb-2">
             <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Human Risk Score</span>
             <p className="text-6xl font-bold text-white">87</p>
           </div>
           <div className="flex gap-4 mb-8">
             <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded text-[10px] font-bold uppercase border border-cyan-400/20 flex items-center gap-1"><Check className="w-3 h-3" /> Behaviour</span>
             <span className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded text-[10px] font-bold uppercase border border-blue-400/20 flex items-center gap-1"><Check className="w-3 h-3" /> Phishing</span>
           </div>
           <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={RISK_TIMELINE}>
                  <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="#22d3ee20" strokeWidth={3} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8">
           <div className="mb-6">
             <span className="text-[11px] text-slate-500 uppercase font-bold">Risk Increased</span>
             <p className="text-2xl font-bold text-blue-400 mt-1">+12 <span className="text-sm font-medium text-slate-400">This Week</span></p>
             <p className="text-xs text-slate-500 mt-2">Risk score increased due to multiple phishing clicks and new device usage.</p>
           </div>
           <div className="space-y-4 pt-4 border-t border-slate-800">
             <p className="text-[11px] text-slate-500 uppercase font-bold">Last 7 Days</p>
             <div className="flex items-center gap-2 text-sm text-slate-300"><div className="w-2 h-2 rounded-full bg-blue-400" /> 3 anomalies detected</div>
             <div className="flex items-center gap-2 text-sm text-slate-300"><div className="w-2 h-2 rounded-full bg-rose-500" /> 2 critical events</div>
           </div>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Activity</h3>
        <div className="space-y-6">
          {[
            { date: 'Mar. 26', label: 'Critical: Clicked phishing email', color: 'text-rose-500' },
            { date: 'Mar. 22', label: 'New device: Laptop ABC123', color: 'text-white' },
            { date: 'Mar. 22', label: 'Off-hours login at 3:12 AM', color: 'text-white' }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-8 items-center group">
               <span className="text-xs text-slate-500 font-medium w-16">{item.date}</span>
               <div className="flex-1 flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                   {item.label.includes('device') ? <Smartphone className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                 </div>
                 <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TeamRiskView = () => (
  <div className="space-y-8 animate-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Team Risk Overview</h2>
      <p className="text-sm text-slate-500">Compare risk exposure across different departments.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-widest mb-4">Highest Risk Department</p>
        <p className="text-3xl font-bold text-white mb-1">Sales</p>
        <p className="text-xs text-rose-500 font-bold">Risk Score: 82/100</p>
      </Card>
      <Card className="p-6">
        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-widest mb-4">Safest Department</p>
        <p className="text-3xl font-bold text-white mb-1">Engineering</p>
        <p className="text-xs text-cyan-400 font-bold">Risk Score: 45/100</p>
      </Card>
      <Card className="p-6">
        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-widest mb-4">Avg Organization Score</p>
        <p className="text-3xl font-bold text-white mb-1">68.4</p>
        <p className="text-xs text-slate-500 font-medium">stable from last month</p>
      </Card>
    </div>
    <Card className="p-8">
      <h3 className="font-bold text-white mb-8">Risk Score by Department</h3>
      <div className="space-y-8">
        {[
          { name: 'Sales', score: 82, color: 'bg-rose-500' },
          { name: 'Finance', score: 65, color: 'bg-amber-400' },
          { name: 'Engineering', score: 45, color: 'bg-cyan-400' },
          { name: 'HR', score: 55, color: 'bg-cyan-400' },
          { name: 'Marketing', score: 60, color: 'bg-amber-400' }
        ].map(dept => (
          <div key={dept.name}>
             <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-bold text-slate-400">{dept.name}</span>
             </div>
             <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
               <div className={`${dept.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${dept.score}%` }} />
             </div>
          </div>
        ))}
      </div>
    </Card>
    <Card className="p-0 overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-slate-800">
        <h3 className="font-bold text-white">Department Details</h3>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-800 px-4 py-2 rounded border border-slate-700 hover:bg-slate-700"><Download className="w-3.5 h-3.5" /> Download Report</button>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-slate-800/30">
          <tr>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Employees</th>
            <th className="px-6 py-4">High Risk Users</th>
            <th className="px-6 py-4">Phishing Click Rate</th>
            <th className="px-6 py-4 text-right">Avg Risk Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {DEPT_DETAILS.map((dept, i) => (
            <tr key={i} className="hover:bg-slate-800/20">
              <td className="px-6 py-5 text-white font-bold flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-slate-500" /> {dept.name}</td>
              <td className="px-6 py-5 text-slate-400">{dept.employees}</td>
              <td className="px-6 py-5 text-white font-bold">{dept.highRiskUsers}</td>
              <td className="px-6 py-5 text-slate-400">{dept.phishingClickRate}</td>
              <td className="px-6 py-5 text-right font-bold"><RiskBadge score={dept.avgRiskScore} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const PhishingSimulationView = () => (
  <div className="space-y-8 animate-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Phishing Simulation Dashboard</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-8">
        <p className="text-4xl font-bold text-white">{PHISHING_STATS.totalSimulations}</p>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Total simulations</p>
      </Card>
      <Card className="p-8">
        <p className="text-4xl font-bold text-white">{PHISHING_STATS.usersTargeted.toLocaleString()}</p>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Users targeted</p>
      </Card>
      <Card className="p-8">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-4xl font-bold text-white">{PHISHING_STATS.clickRate}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Click rate</p>
          </div>
          <div className="h-12 w-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PHISHING_TREND}><Line type="monotone" dataKey="value" stroke="#22d3ee" dot={false} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
    <Card className="p-8">
       <div className="flex gap-4 mb-10">
         <span className="flex items-center gap-2 text-xs font-bold text-white"><div className="w-2.5 h-2.5 rounded-full bg-slate-600" /> No click</span>
         <span className="flex items-center gap-2 text-xs font-bold text-white"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Clicked</span>
         <span className="flex items-center gap-2 text-xs font-bold text-white"><div className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Reported</span>
       </div>
       <div className="w-full bg-slate-800 h-10 rounded-lg flex overflow-hidden">
          <div className="bg-slate-700 h-full w-[65%]" />
          <div className="bg-blue-600 h-full w-[20%]" />
          <div className="bg-cyan-500 h-full w-[15%]" />
       </div>
    </Card>
    <Card className="p-0 overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-slate-800/30">
          <tr>
            <th className="px-6 py-5">Name</th>
            <th className="px-6 py-5">Launch Date</th>
            <th className="px-6 py-5">Click Rate</th>
            <th className="px-6 py-5">Reporting Rate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {PHISHING_CAMPAIGNS.map((camp, i) => (
            <tr key={i} className="hover:bg-slate-800/20">
              <td className="px-6 py-6 text-white font-bold">{camp.name}</td>
              <td className="px-6 py-6 text-slate-400">{camp.date}</td>
              <td className="px-6 py-6 text-white font-bold">{camp.clickRate}</td>
              <td className="px-6 py-6 text-white font-bold">{camp.reportRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const BehavioralAnalyticsView = () => (
  <div className="space-y-8 animate-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Behavioral Analytics</h2>
      <p className="text-sm text-slate-500">Detect anomalies in user activity patterns and file access.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-6 border-l-4 border-rose-500">
         <div className="flex items-center gap-3 mb-4">
           <AlertTriangle className="w-4 h-4 text-rose-500" />
           <span className="text-[11px] font-bold text-slate-500 uppercase">Total Anomalies</span>
         </div>
         <p className="text-3xl font-bold text-white">{BEHAVIORAL_STATS.totalAnomalies}</p>
      </Card>
      <Card className="p-6">
         <div className="flex items-center gap-3 mb-4">
           <Download className="w-4 h-4 text-slate-500" />
           <span className="text-[11px] font-bold text-slate-500 uppercase">Data Exfiltration</span>
         </div>
         <p className="text-3xl font-bold text-white">{BEHAVIORAL_STATS.dataExfiltration}</p>
      </Card>
      <Card className="p-6">
         <div className="flex items-center gap-3 mb-4">
           <Calendar className="w-4 h-4 text-slate-500" />
           <span className="text-[11px] font-bold text-slate-500 uppercase">Off-Hour Activity</span>
         </div>
         <p className="text-3xl font-bold text-white">{BEHAVIORAL_STATS.offHourActivity}</p>
      </Card>
      <Card className="p-6">
         <div className="flex items-center gap-3 mb-4">
           <Monitor className="w-4 h-4 text-slate-500" />
           <span className="text-[11px] font-bold text-slate-500 uppercase">Shadow IT Events</span>
         </div>
         <p className="text-3xl font-bold text-white">{BEHAVIORAL_STATS.shadowIT}</p>
      </Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-8">
        <h3 className="font-bold text-white mb-8">Activity Volume & Anomalies by Hour</h3>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={BEHAVIORAL_CHART_DATA}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
               <XAxis dataKey="time" stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} dy={10} />
               <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
               <Bar dataKey="normal" fill="#22d3ee" radius={[2, 2, 0, 0]} />
               <Bar dataKey="anomaly" fill="#f43f5e" radius={[2, 2, 0, 0]} />
             </BarChart>
           </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-6">
           <span className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="w-3 h-3 bg-rose-500" /> Anomalous Event</span>
           <span className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="w-3 h-3 bg-cyan-400" /> Normal Activity</span>
        </div>
      </Card>
      <Card className="p-8">
        <h3 className="font-bold text-white mb-10">Anomaly Categories</h3>
        <div className="h-64 relative flex items-center justify-center">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie data={ANOMALY_PIE_DATA} innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                 {ANOMALY_PIE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
               </Pie>
             </PieChart>
           </ResponsiveContainer>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-3xl font-bold text-white">42</span>
             <span className="text-[10px] text-slate-500 uppercase font-bold">Alerts</span>
           </div>
        </div>
        <div className="space-y-4 mt-6">
           {ANOMALY_PIE_DATA.map((item, i) => (
             <div key={i} className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                 <span className="text-xs font-medium text-slate-400">{item.name}</span>
               </div>
               <span className="text-xs font-bold text-white">{item.value}%</span>
             </div>
           ))}
        </div>
      </Card>
    </div>
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h3 className="font-bold text-white">Recent Behavioral Alerts</h3>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-slate-800/30">
          <tr>
            <th className="px-6 py-5">User</th>
            <th className="px-6 py-5">Event Detected</th>
            <th className="px-6 py-5">Severity</th>
            <th className="px-6 py-5 text-right">Time Detected</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {BEHAVIORAL_ALERTS.map((alert, i) => (
            <tr key={i} className="hover:bg-slate-800/20">
              <td className="px-6 py-5 text-white font-bold">{alert.user}</td>
              <td className="px-6 py-5 text-slate-400">{alert.event}</td>
              <td className="px-6 py-5">
                <span className={`text-[10px] font-bold uppercase ${alert.severity === 'Critical' ? 'text-rose-500' : alert.severity === 'Medium' ? 'text-amber-400' : 'text-cyan-400'}`}>{alert.severity}</span>
              </td>
              <td className="px-6 py-5 text-right text-slate-500">{alert.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const AccessMonitoringView = () => (
  <div className="space-y-8 animate-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Access Monitoring</h2>
      <p className="text-sm text-slate-500">Real-time monitoring of login attempts, device access, and geolocation.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-8">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Total Logins (24h)</p>
        <p className="text-4xl font-bold text-white">{ACCESS_STATS.totalLogins}</p>
        <p className="text-[11px] text-green-400 font-bold mt-2">↑ 5% vs yesterday</p>
      </Card>
      <Card className="p-8">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Failed Attempts</p>
        <p className="text-4xl font-bold text-rose-500">{ACCESS_STATS.failedAttempts}</p>
        <p className="text-[11px] text-rose-500 font-bold mt-2">↑ 12% spike detected</p>
      </Card>
      <Card className="p-8">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Unique Devices</p>
        <p className="text-4xl font-bold text-white">{ACCESS_STATS.uniqueDevices}</p>
        <p className="text-[11px] text-slate-500 font-medium mt-2">Stable</p>
      </Card>
      <Card className="p-8">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Unusual Locations</p>
        <p className="text-4xl font-bold text-amber-500">{ACCESS_STATS.unusualLocations}</p>
        <p className="text-[11px] text-slate-500 font-medium mt-2">Requires review</p>
      </Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-8">
        <h3 className="font-bold text-white mb-8">Access Attempts Over Time (24h)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ACCESS_TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tickLine={false} axisLine={false} fontSize={14} dy={10} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
              <Area type="monotone" dataKey="success" stroke="#22d3ee" fill="#22d3ee20" strokeWidth={2} />
              <Area type="monotone" dataKey="failed" stroke="#f43f5e" fill="#f43f5e10" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-8">
        <h3 className="font-bold text-white mb-10">Top Locations</h3>
        <div className="space-y-10">
          {ACCESS_LOCATIONS.map((loc, i) => (
            <div key={i}>
               <div className="flex items-center gap-3 mb-3">
                 <Globe className="w-4 h-4 text-slate-500" />
                 <span className="text-sm font-bold text-slate-300">{loc.name}</span>
               </div>
               <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                 <div className="h-full rounded-full" style={{ width: `${loc.value}%`, backgroundColor: loc.color }} />
               </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
    <Card className="p-0 overflow-hidden">
       <div className="p-6 flex justify-between items-center border-b border-slate-800">
         <h3 className="font-bold text-white">Live Access Logs</h3>
         <Button className="text-xs bg-slate-800 border border-slate-700 hover:bg-slate-700 px-5 py-2.5">Export Log</Button>
       </div>
       <table className="w-full text-sm text-left">
         <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-slate-800/30">
           <tr>
             <th className="px-8 py-5">User</th>
             <th className="px-8 py-5">IP Address</th>
             <th className="px-8 py-5">Location</th>
             <th className="px-8 py-5">Device</th>
             <th className="px-8 py-5">Status</th>
             <th className="px-8 py-5 text-right">Time</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-slate-800">
           {ACCESS_LOGS.map((log, i) => (
             <tr key={i} className="hover:bg-slate-800/20">
               <td className="px-8 py-6 text-white font-bold">{log.user}</td>
               <td className="px-8 py-6 text-slate-400 font-mono text-xs">{log.ip}</td>
               <td className="px-8 py-6 text-slate-400 flex items-center gap-2"><MapPin className="w-3 h-3" /> {log.location}</td>
               <td className="px-8 py-6 text-slate-400">
                 {log.device.includes('PC') ? <Monitor className="w-4 h-4 inline mr-2" /> : <Smartphone className="w-4 h-4 inline mr-2" />}
                 {log.device}
               </td>
               <td className="px-8 py-6">
                 <span className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider ${log.status === 'Success' ? 'bg-green-500/10 text-green-400' : 'bg-rose-500/10 text-rose-400'}`}>
                   {log.status}
                 </span>
               </td>
               <td className="px-8 py-6 text-right text-slate-500 font-medium">{log.time}</td>
             </tr>
           ))}
         </tbody>
       </table>
    </Card>
  </div>
);

const RemediationView = () => (
  <div className="space-y-8 animate-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Action Center</h2>
      <p className="text-sm text-slate-500">Automated and recommended actions to reduce risk.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-8">
        <p className="text-4xl font-bold text-white">{REMEDIATION_STATS.pending}</p>
        <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">Pending Actions</p>
      </Card>
      <Card className="p-8">
        <p className="text-4xl font-bold text-white">{REMEDIATION_STATS.completed}</p>
        <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">Completed Actions</p>
      </Card>
      <Card className="p-8">
        <p className="text-4xl font-bold text-white">{REMEDIATION_STATS.automated}</p>
        <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">Automated Actions</p>
      </Card>
      <Card className="p-8">
        <p className="text-4xl font-bold text-white">{REMEDIATION_STATS.avgTime}</p>
        <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">Avg Completion Time</p>
      </Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="font-bold text-white">Recommended Actions</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-slate-800/30">
            <tr>
              <th className="px-6 py-5">User</th>
              <th className="px-6 py-5">Issue Detected</th>
              <th className="px-6 py-5">Recommended Action</th>
              <th className="px-6 py-5">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {REMEDIATION_ACTIONS.map((rem, i) => (
              <tr key={i} className="hover:bg-slate-800/20">
                <td className="px-6 py-6 text-white font-bold">{rem.user}</td>
                <td className="px-6 py-6 text-slate-400">{rem.issue}</td>
                <td className="px-6 py-6 text-white font-medium">{rem.action}</td>
                <td className="px-6 py-6">
                  <span className={`text-[10px] font-bold uppercase ${rem.priority === 'High' ? 'text-rose-500' : rem.priority === 'Medium' ? 'text-amber-400' : 'text-slate-500'}`}>{rem.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="p-8">
         <h3 className="font-bold text-white mb-8">Auto-Remediation</h3>
         <div className="flex items-center justify-between mb-10">
           <span className="text-sm font-medium text-slate-300">Enable Auto-Remediate</span>
           <div className="w-12 h-6 bg-cyan-600 rounded-full relative p-1 cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
           </div>
         </div>
         <div className="space-y-4">
           {['Auto-assign micro-training', 'Auto-trigger device verification', 'Auto-alert manager'].map(item => (
             <div key={item} className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-xs font-bold text-white">
                {item}
             </div>
           ))}
         </div>
      </Card>
    </div>
  </div>
);

const OrganizationOverviewView = () => (
  <div className="space-y-8 animate-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Organization Overview</h2>
      <p className="text-sm text-slate-500">Executive summary of security posture, compliance, and strategic initiatives.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-8">
         <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Security Rating</p>
         <div className="flex items-baseline gap-2">
           <p className="text-5xl font-bold text-white">{ORG_OVERVIEW_STATS.securityRating}</p>
           <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center"><Shield className="w-3 h-3 text-cyan-400" /></div>
         </div>
         <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">Top 10% of industry peers</p>
      </Card>
      <Card className="p-8">
         <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Compliance Readiness</p>
         <p className="text-5xl font-bold text-white">{ORG_OVERVIEW_STATS.compliance}</p>
         <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">Audit scheduled in 45 days</p>
      </Card>
      <Card className="p-8">
         <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Active Assets</p>
         <p className="text-5xl font-bold text-white">{ORG_OVERVIEW_STATS.activeAssets}</p>
         <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">100% covered by EDR</p>
      </Card>
      <Card className="p-8 border-l-4 border-rose-500">
         <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Open Risks</p>
         <p className="text-5xl font-bold text-rose-500">{ORG_OVERVIEW_STATS.openRisks}</p>
         <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">3 Critical, 5 High</p>
      </Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-8">
         <h3 className="font-bold text-white mb-8">12-Month Security Posture Trend</h3>
         <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={POSTURE_TREND}>
               <defs>
                 <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.1}/>
                   <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
               <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} fontSize={10} />
               <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={10} domain={[50, 100]} />
               <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="url(#colorScore)" strokeWidth={3} />
             </AreaChart>
           </ResponsiveContainer>
         </div>
      </Card>
      <Card className="p-8">
         <h3 className="font-bold text-white mb-10">Compliance Frameworks</h3>
         <div className="space-y-10">
           {COMPLIANCE_FRAMEWORKS.map((fw, i) => (
             <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-300">{fw.name}</span>
                  <span className="text-xs font-bold text-white">{fw.score}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? 'bg-cyan-400' : i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-violet-400' : 'bg-amber-400'}`} 
                    style={{ width: fw.score }} 
                  />
                </div>
             </div>
           ))}
         </div>
         <Button className="w-full mt-10 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs">View Compliance Report</Button>
      </Card>
    </div>
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h3 className="font-bold text-white">Strategic Security Initiatives</h3>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-slate-800/30">
          <tr>
            <th className="px-6 py-5">Initiative</th>
            <th className="px-6 py-5">Owner</th>
            <th className="px-6 py-5">Due Date</th>
            <th className="px-6 py-5 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {STRATEGIC_INITIATIVES.map((item, i) => (
            <tr key={i} className="hover:bg-slate-800/20">
              <td className="px-6 py-6 text-white font-bold">{item.name}</td>
              <td className="px-6 py-6 text-slate-400">{item.owner}</td>
              <td className="px-6 py-6 text-slate-400">{item.due}</td>
              <td className="px-6 py-6 text-right">
                <span className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase ${
                  item.status === 'On Track' ? 'bg-blue-500/10 text-blue-400' :
                  item.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                  item.status === 'Delayed' ? 'bg-rose-500/10 text-rose-400' :
                  'bg-slate-700/50 text-slate-400'
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
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

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0b0e14] border-r border-[#202a3a] transform transition-transform duration-200 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="p-8 mb-6">
        <h1 className="text-xl font-bold text-white tracking-tight">HumanRisk<span className="text-cyan-400">Cloud</span></h1>
      </div>
      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activePage === item.page;
          const Icon = item.icon;
          return (
            <button 
              key={item.page} 
              onClick={() => { setPage(item.page); closeMobile(); }} 
              className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium rounded-lg transition-all ${
                isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              {item.page}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
  const [selectedUser, setSelectedUser] = useState<UserRiskProfile | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    if (selectedUser) {
      return <UserDetailView user={selectedUser} onBack={() => setSelectedUser(null)} onShowTimeline={(id) => setSelectedEventId(id)} />;
    }

    switch (activePage) {
      case Page.Dashboard: return <DashboardView setPage={setActivePage} setSelectedUser={setSelectedUser} />;
      case Page.RiskProfile: return <RiskProfileView setSelectedUser={setSelectedUser} />;
      case Page.RiskEvents: return <RiskEventsView onSelectEvent={(id) => setSelectedEventId(id)} />;
      case Page.TeamRisk: return <TeamRiskView />;
      case Page.PhishingSimulation: return <PhishingSimulationView />;
      case Page.BehavioralAnalytics: return <BehavioralAnalyticsView />;
      case Page.AccessMonitoring: return <AccessMonitoringView />;
      case Page.Remediation: return <RemediationView />;
      case Page.OrganizationOverview: return <OrganizationOverviewView />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] font-sans text-slate-200 flex">
      <Sidebar activePage={activePage} setPage={(p) => { setActivePage(p); setSelectedUser(null); setSelectedEventId(null); }} isMobileOpen={isMobileMenuOpen} closeMobile={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="h-20 border-b border-[#202a3a] flex items-center justify-between px-10 sticky top-0 z-30 bg-[#0b0e14]/80 backdrop-blur-sm">
           <h2 className="text-lg font-bold text-white">{selectedUser ? 'Risk Profile' : activePage}</h2>
           <div className="flex items-center gap-8">
              <button className="text-slate-400 hover:text-white relative"><Bell className="w-5 h-5" /></button>
              <div className="flex items-center gap-4 pl-8 border-l border-[#202a3a]">
                 <div className="text-right">
                   <p className="text-[14px] font-bold text-white">Mark Graham</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Admin</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                   <UserIcon className="w-5 h-5" />
                 </div>
              </div>
           </div>
        </header>
        <main className="p-10 flex-1 overflow-auto bg-[#0b0e14]">
          {renderContent()}
        </main>
      </div>
      {selectedEventId && <RiskTimelineModal onClose={() => setSelectedEventId(null)} />}
    </div>
  );
};

export default App;
