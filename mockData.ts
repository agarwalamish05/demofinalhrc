
import { RiskLevel, UserRiskProfile, RiskEventLog, TimelineEvent, DepartmentStat } from './types';

export const HIGH_RISK_USERS: UserRiskProfile[] = [
  { id: '1', name: 'James Smith', department: 'Sales', role: 'Sales Rep', riskScore: 91, phishingRisk: 'Yes', anomaliesDetected: 4, lastActivity: '3 hours ago', email: 'j.smith@company.com', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Mary Johnson', department: 'Finance', role: 'Accountant', riskScore: 72, phishingRisk: 'No', anomaliesDetected: 3, lastActivity: '7 days ago', email: 'm.johnson@company.com', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Robert Brown', department: 'Finance', role: 'Analyst', riskScore: 54, phishingRisk: 'Yes', anomaliesDetected: 5, lastActivity: '2 days ago', email: 'r.brown@company.com', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Julia Reese', department: 'Sales', role: 'Sales Director', riskScore: 90, phishingRisk: 'Yes', anomaliesDetected: 6, lastActivity: '1 hour ago', email: 'j.reese@company.com', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'John Miller', department: 'IT', role: 'Admin', riskScore: 82, phishingRisk: 'Yes', anomaliesDetected: 3, lastActivity: '4 hours ago', email: 'j.miller@company.com', avatarUrl: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Linda Taylor', department: 'HR', role: 'Manager', riskScore: 86, phishingRisk: 'Yes', anomaliesDetected: 5, lastActivity: '7 days ago', email: 'l.taylor@company.com', avatarUrl: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Jennifer Davis', department: 'Legal', role: 'Counsel', riskScore: 91, phishingRisk: 'Yes', anomaliesDetected: 1, lastActivity: '4 days ago', email: 'j.davis@company.com', avatarUrl: 'https://i.pravatar.cc/150?u=7' },
];

export const RISK_EVENTS: RiskEventLog[] = [
  { id: '1', user: 'James Smith', event: 'Clicked phishing email', riskLevel: 34, date: '2 days ago', timeAgo: '2 days ago' },
  { id: '2', user: 'Mary Johnson', event: 'New device login (Berlin)', riskLevel: 27, date: '3 days ago', timeAgo: '3 days ago' },
  { id: '3', user: 'Robert Brown', event: 'Off-hours login at 3:12 AM', riskLevel: 17, date: '8 days ago', timeAgo: '8 days ago' },
  { id: '4', user: 'Patricia Jones', event: 'Bulk download of 1:100 files', riskLevel: 11, date: '14 days ago', timeAgo: '14 days ago' },
  { id: '5', user: 'John Miller', event: 'Privilege escalation detected', riskLevel: 9, date: '1 month ago', timeAgo: '1 month ago' },
  { id: '6', user: 'Linda Taylor', event: 'Failed login attempts (10+)', riskLevel: 7, date: '2 months ago', timeAgo: '2 months ago' },
  { id: '7', user: 'Michael Wilson', event: 'Suspicious API access', riskLevel: 4, date: '2 months ago', timeAgo: '2 months ago' },
];

export const RISK_TIMELINE = [
  { date: '26 Feb', score: 62 },
  { date: '22 Mar', score: 75 },
  { date: '22 Mar ', score: 82 },
  { date: '26 Mar', score: 87 },
];

// Fixed missing RISK_OVER_TIME_DATA member
export const RISK_OVER_TIME_DATA = [
  { name: 'Jan', score: 45 },
  { name: 'Feb', score: 52 },
  { name: 'Mar', score: 48 },
  { name: 'Apr', score: 61 },
  { name: 'May', score: 55 },
  { name: 'Jun', score: 72 },
];

export const RECENT_ANOMALIES_LIST = [
  { id: 'a1', title: 'James Smith - Clicked phishing email', time: '2 days ago', severity: 'High' },
  { id: 'a2', title: 'Mary Johnson - New device login (Berlin)', time: '3 days ago', severity: 'High' },
  { id: 'a3', title: 'Robert Brown - Off-hours login at 3:12 AM', time: '8 days ago', severity: 'High' },
  { id: 'a4', title: 'Patricia Jones - Bulk download of 1:100 files', time: '14 days ago', severity: 'High' },
];

export const RISK_BY_DEPT_BARS = [
  { name: 'FINANCE', value: 72 },
  { name: 'SALES', value: 85 },
  { name: 'HR', value: 45 },
  { name: 'MARKETING', value: 30 },
];

export const DEPT_DETAILS: DepartmentStat[] = [
  { name: 'Sales', employees: 45, highRiskUsers: 12, phishingClickRate: '18%', avgRiskScore: 82 },
  { name: 'Finance', employees: 12, highRiskUsers: 2, phishingClickRate: '8%', avgRiskScore: 65 },
  { name: 'Engineering', employees: 80, highRiskUsers: 5, phishingClickRate: '4%', avgRiskScore: 45 },
  { name: 'HR', employees: 8, highRiskUsers: 1, phishingClickRate: '12%', avgRiskScore: 55 },
  { name: 'Marketing', employees: 22, highRiskUsers: 3, phishingClickRate: '15%', avgRiskScore: 60 },
];

export const PHISHING_STATS = {
  totalSimulations: 18,
  usersTargeted: 1250,
  clickRate: '23%',
};

export const PHISHING_TREND = [
  { time: '1', value: 40 },
  { time: '2', value: 35 },
  { time: '3', value: 55 },
  { time: '4', value: 45 },
  { time: '5', value: 65 },
];

export const PHISHING_CAMPAIGNS = [
  { name: 'Password Reset', date: 'Mar 15, 2024', clickRate: '12%', reportRate: '10%' },
  { name: 'Security Alert', date: 'Feb 20, 2024', clickRate: '27%', reportRate: '3%' },
  { name: 'Payment Invoice', date: 'Jan 10, 2024', clickRate: '34%', reportRate: '12%' },
  { name: 'File Share', date: 'Nov 25, 2023', clickRate: '18%', reportRate: '5%' },
];

export const BEHAVIORAL_STATS = {
  totalAnomalies: 42,
  dataExfiltration: 3,
  offHourActivity: 12,
  shadowIT: 8
};

export const BEHAVIORAL_CHART_DATA = [
  { time: '00:00', normal: 100, anomaly: 0 },
  { time: '04:00', normal: 200, anomaly: 0 },
  { time: '08:00', normal: 600, anomaly: 400 },
  { time: '12:00', normal: 1000, anomaly: 600 },
  { time: '16:00', normal: 1100, anomaly: 200 },
  { time: '20:00', normal: 400, anomaly: 100 },
];

export const ANOMALY_PIE_DATA = [
  { name: 'Data Exfiltration', value: 35, color: '#f43f5e' },
  { name: 'Shadow IT', value: 25, color: '#0ea5e9' },
  { name: 'Unusual Login', value: 40, color: '#f59e0b' },
];

export const BEHAVIORAL_ALERTS = [
  { user: 'James Smith', event: 'High volume data download (5GB)', severity: 'Critical', time: '15 mins ago' },
  { user: 'Sarah Connor', event: 'Login from new device type', severity: 'Medium', time: '2 hours ago' },
  { user: 'Robert Brown', event: 'Accessed sensitive finance folder', severity: 'Low', time: '5 hours ago' },
];

export const ACCESS_STATS = {
  totalLogins: '1,420',
  failedAttempts: 32,
  uniqueDevices: 856,
  unusualLocations: 5
};

export const ACCESS_TREND_DATA = [
  { time: '06:00', success: 40, failed: 5 },
  { time: '09:00', success: 120, failed: 10 },
  { time: '12:00', success: 150, failed: 20 },
  { time: '15:00', success: 140, failed: 15 },
  { time: '18:00', success: 80, failed: 30 },
  { time: '21:00', success: 30, failed: 5 },
];

export const ACCESS_LOCATIONS = [
  { name: 'United States', value: 85, color: '#22d3ee' },
  { name: 'Germany', value: 65, color: '#0ea5e9' },
  { name: 'United Kingdom', value: 45, color: '#22d3ee' },
  { name: 'Russia', value: 25, color: '#f59e0b' },
];

export const ACCESS_LOGS = [
  { user: 'James Smith', ip: '192.168.1.1', location: 'New York, US', device: 'Windows PC', status: 'Success', time: '2 mins ago' },
  { user: 'Mary Johnson', ip: '45.22.19.12', location: 'Berlin, DE', device: 'MacBook Pro', status: 'Failed', time: '15 mins ago' },
  { user: 'Robert Brown', ip: '192.168.1.55', location: 'London, UK', device: 'iPhone 13', status: 'Success', time: '1 hour ago' },
  { user: 'Admin User', ip: '10.0.0.5', location: 'Internal', device: 'Linux Server', status: 'Success', time: '2 hours ago' },
  { user: 'Unknown', ip: '185.20.55.1', location: 'Moscow, RU', device: 'Unknown', status: 'Blocked', time: '3 hours ago' },
];

export const REMEDIATION_STATS = {
  pending: 18,
  completed: 36,
  automated: 12,
  avgTime: '4.2 hrs'
};

export const REMEDIATION_ACTIONS = [
  { user: 'Jane Smith', issue: 'Phishing Email Opened', action: 'Assign micro-training', priority: 'High' },
  { user: 'John Doe', issue: 'New Device Detected', action: 'Verify device', priority: 'Medium' },
  { user: 'Emily Brown', issue: 'Off-Hours Login', action: 'Report incident', priority: 'Pending' },
  { user: 'Michael Johnson', issue: 'Phishing Email Opened', action: 'Update browser', priority: 'Low' },
  { user: 'Sarah Wilson', issue: 'Browser Vulnerab.', action: 'Pending', priority: 'Pending' },
];

export const ORG_OVERVIEW_STATS = {
  securityRating: 'A-',
  compliance: '92%',
  activeAssets: '3,402',
  openRisks: 8
};

export const POSTURE_TREND = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 70 },
  { month: 'May', score: 74 },
  { month: 'Jun', score: 78 },
  { month: 'Jul', score: 82 },
  { month: 'Aug', score: 85 },
  { month: 'Sep', score: 88 },
  { month: 'Oct', score: 90 },
  { month: 'Nov', score: 92 },
  { month: 'Dec', score: 95 },
];

export const COMPLIANCE_FRAMEWORKS = [
  { name: 'ISO 27001', score: '78%' },
  { name: 'SOC 2 Type II', score: '92%' },
  { name: 'GDPR', score: '100%' },
  { name: 'NIST CSF', score: '55%' },
];

export const STRATEGIC_INITIATIVES = [
  { name: 'Zero Trust Network Rollout', owner: 'NetSec Team', due: 'Q4 2024', status: 'On Track' },
  { name: 'Third-Party Risk Audit', owner: 'GRC Team', due: 'Q3 2024', status: 'Delayed' },
  { name: 'Employee Bio-Auth Pilot', owner: 'IT Ops', due: 'Q1 2025', status: 'Planning' },
  { name: 'Cloud DLP Integration', owner: 'Cloud Sec', due: 'Q2 2024', status: 'Completed' },
];
