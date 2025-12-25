
export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export interface UserRiskProfile {
  id: string;
  name: string;
  department: string;
  role: string;
  riskScore: number;
  phishingRisk: string;
  anomaliesDetected: number;
  lastActivity: string;
  email: string;
  avatarUrl: string;
}

export interface RiskEventLog {
  id: string;
  user: string;
  event: string;
  riskLevel: number;
  date: string;
  timeAgo: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  type: 'phishing' | 'device' | 'access' | 'behavior';
  isCritical?: boolean;
}

export interface DepartmentStat {
  name: string;
  employees: number;
  highRiskUsers: number;
  phishingClickRate: string;
  avgRiskScore: number;
}

export enum Page {
  Dashboard = 'Dashboard',
  RiskProfile = 'Risk Profile',
  RiskEvents = 'Risk Events',
  TeamRisk = 'Team Risk',
  PhishingSimulation = 'Phishing Simulation',
  BehavioralAnalytics = 'Behavioral Analytics',
  AccessMonitoring = 'Access Monitoring',
  Remediation = 'Remediation',
  OrganizationOverview = 'Organization Overview'
}
