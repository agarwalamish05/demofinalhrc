import { RiskLevel, UserRiskProfile, RiskEventLog, TimelineEvent } from './types';

export const HIGH_RISK_USERS: UserRiskProfile[] = [
  { id: '1', name: 'James Smith', department: 'Sales', role: 'Sales Rep', riskScore: 91, phishingRisk: 'Yes', anomaliesDetected: 4, lastActivity: '3 hours ago', email: 'j.smith@company.com', avatarUrl: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'Mary Johnson', department: 'Finance', role: 'Accountant', riskScore: 72, phishingRisk: 'No', anomaliesDetected: 3, lastActivity: '7 days ago', email: 'm.johnson@company.com', avatarUrl: 'https://picsum.photos/100/100?random=2' },
  { id: '3', name: 'Robert Brown', department: 'Finance', role: 'Analyst', riskScore: 54, phishingRisk: 'Yes', anomaliesDetected: 5, lastActivity: '2 days ago', email: 'r.brown@company.com', avatarUrl: 'https://picsum.photos/100/100?random=3' },
  { id: '4', name: 'Julia Reese', department: 'Sales', role: 'Sales Director', riskScore: 90, phishingRisk: 'Yes', anomaliesDetected: 6, lastActivity: '1 hour ago', email: 'j.reese@company.com', avatarUrl: 'https://picsum.photos/100/100?random=4' },
  { id: '5', name: 'John Miller', department: 'IT', role: 'Admin', riskScore: 82, phishingRisk: 'Yes', anomaliesDetected: 3, lastActivity: '4 hours ago', email: 'j.miller@company.com', avatarUrl: 'https://picsum.photos/100/100?random=5' },
  { id: '6', name: 'Linda Taylor', department: 'HR', role: 'Manager', riskScore: 86, phishingRisk: 'Yes', anomaliesDetected: 5, lastActivity: '7 days ago', email: 'l.taylor@company.com', avatarUrl: 'https://picsum.photos/100/100?random=6' },
  { id: '7', name: 'Jennifer Davis', department: 'Legal', role: 'Counsel', riskScore: 91, phishingRisk: 'Yes', anomaliesDetected: 1, lastActivity: '4 days ago', email: 'j.davis@company.com', avatarUrl: 'https://picsum.photos/100/100?random=7' },
];

export const RISK_EVENTS: RiskEventLog[] = [
  { id: '1', user: 'James Smith', event: 'Clicked phishing email', riskLevel: 34, date: '2 days ago', timeAgo: '2 days ago' },
  { id: '2', user: 'Mary Johnson', event: 'New device login (Berlin)', riskLevel: 27, date: '3 days ago', timeAgo: '3 days ago' },
  { id: '3', user: 'Robert Brown', event: 'Off-hours login at 3:12 AM', riskLevel: 17, date: '8 days ago', timeAgo: '8 days ago' },
  { id: '4', user: 'Patricia Jones', event: 'Bulk download of 1:100 files', riskLevel: 11, date: '14 days ago', timeAgo: '14 days ago' },
  { id: '5', user: 'John Miller', event: 'Privilege escalation detected', riskLevel: 9, date: '1 month ago', timeAgo: '1 month ago' },
  { id: '6', user: 'Linda Taylor', event: 'Failed login attempts (10+)', riskLevel: 7, date: '2 months ago', timeAgo: '2 months ago' },
];

export const USER_TIMELINE_DATA: TimelineEvent[] = [
  { id: 't1', date: 'Mar. 26', event: 'Clicked phishing email', type: 'phishing', isCritical: true },
  { id: 't2', date: 'Mar. 22', event: 'New device: Laptop ABC123', type: 'device' },
  { id: 't3', date: 'Mar. 22', event: 'Off-hours login at 3:12 AM', type: 'access' },
  { id: 't4', date: 'Mar. 17', event: 'Bulk download of 1:100 files', type: 'behavior' },
  { id: 't5', date: 'Mar. 2', event: 'Clicked phishing email', type: 'phishing', isCritical: true },
];

export const INDIVIDUAL_RISK_TREND = [
  { day: '26 Feb', score: 62 },
  { day: '1 Mar', score: 65 },
  { day: '10 Mar', score: 63 },
  { day: '17 Mar', score: 75 },
  { day: '22 Mar', score: 82 },
  { day: '26 Mar', score: 87 },
];

export const DEPARTMENT_DATA = [
  { name: 'FINANCE', blue: 30, teal: 20, orange: 15, red: 10, empty: 25 },
  { name: 'SALES', blue: 35, teal: 15, orange: 10, red: 15, empty: 25 },
  { name: 'HR', blue: 25, teal: 25, orange: 10, red: 5, empty: 35 },
  { name: 'MARKETING', blue: 20, teal: 20, orange: 10, red: 0, empty: 50 },
];

export const RISK_OVER_TIME_DATA = [
  { name: 'July', score: 68 },
  { name: 'August', score: 70 },
  { name: 'September', score: 65 },
  { name: 'October', score: 72 },
  { name: 'November', score: 69 },
  { name: 'December', score: 72 },
];

export const PHISHING_CLICK_RATE_TREND = [
  { month: 'Apr', rate: 12 },
  { month: 'May', rate: 25 },
  { month: 'Jn', rate: 18 },
  { month: 'Jl', rate: 28 },
  { month: 'A', rate: 22 },
  { month: 'S', rate: 15 },
  { month: 'O', rate: 24 },
  { month: 'Mar', rate: 32 },
];

export const PHISHING_CAMPAIGNS = [
  { name: 'Password Reset', launchDate: 'Mar 15, 2024', clickRate: '12%', reportingRate: '10%' },
  { name: 'Security Alert', launchDate: 'Feb 20, 2024', clickRate: '27%', reportingRate: '3%' },
  { name: 'Payment Invoice', launchDate: 'Jan 10, 2024', clickRate: '34%', reportingRate: '12%' },
  { name: 'File Share', launchDate: 'Nov 25, 2023', clickRate: '18%', reportingRate: '5%' },
];

export const REMEDIATION_ACTIONS = [
  { user: 'Jane Smith', issue: 'Phishing Email Opened', action: 'Assign micro-training', priority: 'High' },
  { user: 'John Doe', issue: 'New Device Detected', action: 'Verify device', priority: 'Medium' },
  { user: 'Emily Brown', issue: 'Off-Hours Login', action: 'Report incident', priority: 'Pending' }, 
  { user: 'Michael Johnson', issue: 'Phishing Email Opened', action: 'Update browser', priority: 'Low' },
  { user: 'Sarah Wilson', issue: 'Browser Vulnerabr.', action: 'Pending', priority: 'Pending' },
  { user: 'David Lee', issue: 'Offhond Detected', action: 'Acsorn allicdent', priority: 'Medium' },
  { user: 'Jessica Taylor', issue: 'Browser Vurulonal letec', action: 'Apr. 22, 2024', priority: 'Apr. 2, 2024' },
  { user: 'Jessica Taylor', issue: 'JessCt tamaged', action: 'Apr. 22, 2024', priority: 'Apr. 2, 2024' },
];

// --- New Data for Behavioral, Team, and Access pages ---

export const BEHAVIORAL_ACTIVITY_DATA = [
  { hour: '00:00', normal: 120, anomaly: 2 },
  { hour: '04:00', normal: 80, anomaly: 15 }, // High anomaly
  { hour: '08:00', normal: 850, anomaly: 5 },
  { hour: '12:00', normal: 1200, anomaly: 8 },
  { hour: '16:00', normal: 1100, anomaly: 6 },
  { hour: '20:00', normal: 300, anomaly: 4 },
];

export const BEHAVIORAL_TREND_MONTHLY = [
  { name: 'Apr', value: 10 },
  { name: 'May', value: 50 },
  { name: 'May ', value: 90 }, // Match image repeated May label
  { name: 'Jun', value: 30 },
  { name: 'Jul', value: 240 },
  { name: 'Aug', value: 110 },
  { name: 'Sep', value: 170 },
  { name: 'Oct', value: 90 },
];

export const TOP_BEHAVIORAL_USERS = [
  { user: 'Frank Hall', count: 117 },
  { user: 'Ann Lewis', count: 312 },
  { user: 'Joseph Griffin', count: 86 },
  { user: 'Maria Edwards', count: 63 },
  { user: 'Mark Taylor', count: 63 },
];

export const SUSPICIOUS_EVENTS_IMAGE = [
  { user: 'Ann Lewis', event: 'ApprihWard', date: 'Oct 4 2023' },
  { user: 'Joseph Griffin', event: 'Griffmordon Ward', date: 'Sep 28 2023' },
  { user: 'Maria Edwards', event: 'Gordon Ward', date: 'Sep 28 2023' },
  { user: 'Ann Lewis', event: 'October are', date: 'Sep 28 2023' },
  { user: 'Gordon Ward', event: 'September', date: 'Oct 24 2023' },
];

export const ANOMALY_TYPE_BARS = [
  { name: 'Off-Hours Login', value: 85 },
  { name: 'New Device', value: 65 },
  { name: 'Login Failure', value: 40 },
  { name: 'Impossible Travel', value: 25 },
];

export const ANOMALY_DISTRIBUTION = [
  { name: 'Data Exfiltration', value: 35, color: '#f43f5e' }, // rose-500
  { name: 'Unusual Login', value: 45, color: '#fbbf24' }, // amber-400
  { name: 'Shadow IT', value: 20, color: '#22d3ee' }, // cyan-400
];

export const TEAM_RISK_STATS = [
  { id: '1', name: 'Sales', employees: 45, riskScore: 82, highRiskCount: 12, phishingRate: '18%' },
  { id: '2', name: 'Finance', employees: 12, riskScore: 65, highRiskCount: 2, phishingRate: '8%' },
  { id: '3', name: 'Engineering', employees: 80, riskScore: 45, highRiskCount: 5, phishingRate: '4%' },
  { id: '4', name: 'HR', employees: 8, riskScore: 55, highRiskCount: 1, phishingRate: '12%' },
  { id: '5', name: 'Marketing', employees: 22, riskScore: 60, highRiskCount: 3, phishingRate: '15%' },
];

export const TEAM_MEMBERS_IMAGE = [
  { name: 'Sarah Brown', score: 31, phishing: 'No', behavior: 1, action: 'Additional Training' },
  { name: 'James Wilson', score: 45, phishing: 'Yes', behavior: 0, action: 'Phishing Simulation' },
  { name: 'Emily Davis', score: 29, phishing: 'No', behavior: 0, action: 'No Action Needed' },
  { name: 'Michael Clark', score: 38, phishing: 'No', behavior: 3, action: 'Review Behavior' },
];

export const ACCESS_LOGS_DATA = [
  { id: '1', user: 'James Smith', ip: '192.168.1.1', location: 'New York, US', device: 'Windows PC', status: 'Success', time: '2 mins ago' },
  { id: '2', user: 'Mary Johnson', ip: '45.22.19.12', location: 'Berlin, DE', device: 'MacBook Pro', status: 'Failed', time: '15 mins ago' },
  { id: '3', user: 'Robert Brown', ip: '192.168.1.55', location: 'London, UK', device: 'iPhone 13', status: 'Success', time: '1 hour ago' },
  { id: '4', user: 'Admin User', ip: '10.0.0.5', location: 'Internal', device: 'Linux Server', status: 'Success', time: '2 hours ago' },
  { id: '5', user: 'Unknown', ip: '185.20.55.1', location: 'Moscow, RU', device: 'Unknown', status: 'Blocked', time: '3 hours ago' },
];

export const ACCESS_OVER_TIME = [
  { time: '06:00', success: 40, failed: 2 },
  { time: '09:00', success: 120, failed: 5 },
  { time: '12:00', success: 150, failed: 8 },
  { time: '15:00', success: 140, failed: 4 },
  { time: '18:00', success: 80, failed: 12 }, // spike
  { time: '21:00', success: 30, failed: 1 },
];

// --- Access Anomalies Page Data ---
export const ACCESS_ANOMALIES_TREND = [
  { date: 'May 1', value: 14 },
  { date: 'Jun 1', value: 12 },
  { date: 'Jul 1', value: 24 },
  { date: 'Aug 1', value: 28 },
  { date: 'Sep 1', value: 20 },
  { date: 'Oct 1', value: 26 },
  { date: 'Nov 1', value: 30 },
];

export const PRIVILEGED_USERS_RISK = [
  { user: 'John Doe', role: 'System Admin', department: 'IT', risk: 'High' },
  { user: 'Mary Smith', role: 'Finance Manager', department: 'Finance', risk: 'Medium' },
  { user: 'James Brown', role: 'DevOps Engineer', department: 'Engineering', risk: 'Medium' },
  { user: 'Robert Johnson', role: 'HR Director', department: 'HR', risk: 'Low' },
  { user: 'Patricia Taylor', role: 'IT Support Specialist', department: 'IT', risk: 'Low' },
];

export const ACCESS_ANOMALY_TYPES_DATA = [
  { name: 'Unusual Time', value: 40 },
  { name: 'Failed Login Attempts', value: 65 },
  { name: 'Remote Access', value: 110 },
  { name: 'Access Grant', value: 55 },
];

export const ROLE_PRIVILEGE_CHANGES = [
  { user: 'Emily White', change: 'Granted admin privileges', date: 'Oct 11' },
  { user: 'User CD', change: 'Revoked access to sensitive data', date: 'Oct 9' },
  { user: 'User OP', change: 'Role changed to Manager', date: 'Oct 6' },
  { user: 'William Davis', change: 'Privileges reduced to standard', date: 'Oct 5' },
];

export const UNUSUAL_ACCESS_EVENTS = [
  { user: 'User RZ', event: 'Remote login from new country', date: 'Oct 14' },
  { user: 'User MV', event: 'Off hours login at 0327', date: 'Oct 13' },
  { user: 'User TX', event: 'Concurrent login session detected', date: 'Oct 12' },
];

// --- Organization Overview Data ---

export const ORG_COMPLIANCE = [
  { name: 'ISO 27001', progress: 78, color: '#22d3ee' }, // cyan
  { name: 'SOC 2 Type II', progress: 92, color: '#34d399' }, // emerald
  { name: 'GDPR', progress: 100, color: '#a78bfa' }, // violet
  { name: 'NIST CSF', progress: 55, color: '#fbbf24' }, // amber
];

export const ORG_TREND_DATA = [
  { month: 'Jan', score: 65 }, { month: 'Feb', score: 66 }, { month: 'Mar', score: 64 },
  { month: 'Apr', score: 68 }, { month: 'May', score: 70 }, { month: 'Jun', score: 72 },
  { month: 'Jul', score: 71 }, { month: 'Aug', score: 73 }, { month: 'Sep', score: 75 },
  { month: 'Oct', score: 74 }, { month: 'Nov', score: 76 }, { month: 'Dec', score: 78 },
];

export const ORG_HUMAN_RISK_TREND = [
  { name: 'JUN', score: 20 },
  { name: 'JUL', score: 45 },
  { name: 'AUG', score: 85 },
];

export const ORG_RISK_TREND_SPARK = [
  { v: 10 }, { v: 15 }, { v: 12 }, { v: 25 }, { v: 22 }, { v: 35 }, { v: 30 }, { v: 45 }, { v: 40 }, { v: 50 }
];

export const TOP_CRITICAL_EVENTS = [
  { event: 'Phishing email clicked by User X', date: '30 AUG' },
  { event: 'New device login for User Z', date: '28 AUG' },
  { event: 'Multiple failed login attempts', date: '15 AUG' },
  { event: 'Off-hours login by User W', date: '08 AUG' },
];

export const RISK_BREAKDOWN_PIE = [
  { name: 'BEHAVIOUR', value: 40, color: '#3b82f6' },
  { name: 'PHISHING', value: 33, color: '#0ea5e9' },
  { name: 'ACCESS', value: 25, color: '#22d3ee' },
];

export const STRATEGIC_PRIORITIES = [
  { id: 1, initiative: 'Zero Trust Network Rollout', owner: 'NetSec Team', status: 'On Track', due: 'Q4 2024' },
  { id: 2, initiative: 'Third-Party Risk Audit', owner: 'GRC Team', status: 'Delayed', due: 'Q3 2024' },
  { id: 3, initiative: 'Employee Bio-Auth Pilot', owner: 'IT Ops', status: 'Planning', due: 'Q1 2025' },
  { id: 4, initiative: 'Cloud DLP Integration', owner: 'Cloud Sec', status: 'Completed', due: 'Q2 2024' },
];