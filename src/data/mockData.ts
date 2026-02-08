import { Lead } from "@/components/tables/LeadsTable";

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex@techcorp.com",
    phone: "+1 234 567 8901",
    company: "TechCorp Inc.",
    source: "Website",
    status: "new",
    assignedAgent: "John Smith",
    date: "2025-02-05",
    nextFollowUp: "2025-02-08",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@innovate.io",
    phone: "+1 234 567 8902",
    company: "Innovate.io",
    source: "Referral",
    status: "contacted",
    assignedAgent: "Emily Davis",
    date: "2025-02-04",
    nextFollowUp: "2025-02-07",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@global.com",
    phone: "+1 234 567 8903",
    company: "Global Solutions",
    source: "LinkedIn",
    status: "qualified",
    assignedAgent: "Mike Wilson",
    date: "2025-02-03",
  },
  {
    id: "4",
    name: "Emma Williams",
    email: "emma@startup.co",
    phone: "+1 234 567 8904",
    company: "StartUp Co",
    source: "Ads",
    status: "proposal",
    assignedAgent: "Sarah Johnson",
    date: "2025-02-02",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@enterprise.net",
    phone: "+1 234 567 8905",
    company: "Enterprise Net",
    source: "Website",
    status: "converted",
    assignedAgent: "John Smith",
    date: "2025-01-28",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa@media.com",
    phone: "+1 234 567 8906",
    company: "Media Group",
    source: "Referral",
    status: "negotiation",
    assignedAgent: "Emily Davis",
    date: "2025-02-01",
  },
  {
    id: "7",
    name: "James Wilson",
    email: "james@consulting.biz",
    phone: "+1 234 567 8907",
    company: "Wilson Consulting",
    source: "LinkedIn",
    status: "lost",
    assignedAgent: "Mike Wilson",
    date: "2025-01-25",
  },
  {
    id: "8",
    name: "Jennifer Lee",
    email: "jen@finance.co",
    phone: "+1 234 567 8908",
    company: "Finance Pro",
    source: "Website",
    status: "new",
    assignedAgent: "David Lee",
    date: "2025-02-06",
    nextFollowUp: "2025-02-09",
  },
];

export const mockAgents = [
  { id: "1", name: "John Smith", leadsAssigned: 45, converted: 24, pending: 8, status: "active" },
  { id: "2", name: "Emily Davis", leadsAssigned: 38, converted: 18, pending: 12, status: "active" },
  { id: "3", name: "Mike Wilson", leadsAssigned: 52, converted: 28, pending: 6, status: "active" },
  { id: "4", name: "Sarah Johnson", leadsAssigned: 41, converted: 22, pending: 10, status: "active" },
  { id: "5", name: "David Lee", leadsAssigned: 35, converted: 15, pending: 14, status: "active" },
];

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Agent";
  status: "Active" | "Inactive";
}

export const mockUsers: MockUser[] = [
  { id: "1", name: "Admin User", email: "admin@athenura.com", role: "Admin", status: "Active" },
  { id: "2", name: "Manager One", email: "manager1@athenura.com", role: "Manager", status: "Active" },
  { id: "3", name: "John Smith", email: "john@athenura.com", role: "Agent", status: "Active" },
  { id: "4", name: "Emily Davis", email: "emily@athenura.com", role: "Agent", status: "Active" },
  { id: "5", name: "Mike Wilson", email: "mike@athenura.com", role: "Agent", status: "Inactive" },
  { id: "6", name: "Sarah Johnson", email: "sarah.johnson@athenura.com", role: "Manager", status: "Active" },
  { id: "7", name: "David Lee", email: "david.lee@athenura.com", role: "Agent", status: "Active" },
  { id: "8", name: "Jennifer Kim", email: "jennifer.kim@athenura.com", role: "Agent", status: "Active" },
];

export const mockNotifications = [
  { id: "1", message: "New lead assigned: Alex Thompson", time: "5 minutes ago", read: false },
  { id: "2", message: "Follow-up reminder: Sarah Johnson", time: "1 hour ago", read: false },
  { id: "3", message: "Lead converted: David Brown", time: "2 hours ago", read: true },
  { id: "4", message: "Meeting scheduled with Emma Williams", time: "3 hours ago", read: true },
];

export const mockActivities = [
  { id: "1", type: "call", message: "Called Alex Thompson - Interested in premium plan", time: "10:30 AM" },
  { id: "2", type: "email", message: "Sent proposal to Sarah Johnson", time: "09:15 AM" },
  { id: "3", type: "meeting", message: "Demo meeting with Michael Chen", time: "Yesterday" },
  { id: "4", type: "note", message: "Updated contact info for Emma Williams", time: "Yesterday" },
];
