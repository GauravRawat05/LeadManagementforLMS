import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit2, 
  Phone, 
  Mail, 
  Building, 
  Calendar,
  User,
  ArrowRight,
  X,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  UserCheck,
  AlertTriangle
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockLeads, mockUsers } from "@/data/mockData";
import { Lead } from "@/components/tables/LeadsTable";

const LeadManagementPage = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // New lead form state
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Website",
    assignedAgent: "",
    notes: ""
  });

  // Lead lifecycle steps
  const lifecycleSteps = [
    { key: "new", label: "New", icon: Plus, color: "bg-teal-100 text-teal-800" },
    { key: "contacted", label: "Contacted", icon: Phone, color: "bg-blue-100 text-blue-800" },
    { key: "qualified", label: "Qualified", icon: CheckCircle, color: "bg-yellow-100 text-yellow-800" },
    { key: "proposal", label: "Proposal", icon: Target, color: "bg-purple-100 text-purple-800" },
    { key: "negotiation", label: "Negotiation", icon: TrendingUp, color: "bg-orange-100 text-orange-800" },
    { key: "converted", label: "Converted", icon: CheckCircle, color: "bg-green-100 text-green-800" },
    { key: "lost", label: "Lost", icon: X, color: "bg-red-100 text-red-800" }
  ];

  // Filter leads based on search and filters
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
      
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, searchQuery, statusFilter, sourceFilter]);

  const handleAddLead = () => {
    const lead: Lead = {
      id: (leads.length + 1).toString(),
      ...newLead,
      status: "new" as const,
      date: new Date().toISOString().split('T')[0],
      nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    setLeads([lead, ...leads]);
    setNewLead({
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "Website",
      assignedAgent: "",
      notes: ""
    });
    setIsAddLeadOpen(false);
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const getStatusBadge = (status: Lead["status"]) => {
    const step = lifecycleSteps.find(s => s.key === status);
    return (
      <Badge className={step?.color || "bg-gray-100 text-gray-800"}>
        {step?.label || status}
      </Badge>
    );
  };

  // Stats calculation
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "new").length,
    converted: leads.filter(l => l.status === "converted").length,
    lost: leads.filter(l => l.status === "lost").length
  };

  return (
    <DashboardLayout role="admin" title="Lead Management">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-gray-600">Manage your leads through the entire sales pipeline</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Add New Lead</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Name</Label>
                      <Input 
                        value={newLead.name}
                        onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                        placeholder="Full name"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Email</Label>
                      <Input 
                        value={newLead.email}
                        onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                        placeholder="email@company.com"
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Phone</Label>
                      <Input 
                        value={newLead.phone}
                        onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                        placeholder="+1 234 567 8900"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Company</Label>
                      <Input 
                        value={newLead.company}
                        onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                        placeholder="Company name"
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Source</Label>
                      <Select value={newLead.source} onValueChange={(value) => setNewLead({...newLead, source: value})}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Ads">Ads</SelectItem>
                          <SelectItem value="Cold Call">Cold Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Assign to Agent</Label>
                      <Select value={newLead.assignedAgent} onValueChange={(value) => setNewLead({...newLead, assignedAgent: value})}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select agent" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockUsers.filter(u => u.role === "Agent").map(agent => (
                            <SelectItem key={agent.id} value={agent.name}>{agent.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Notes</Label>
                    <Textarea 
                      value={newLead.notes}
                      onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                      placeholder="Additional notes about this lead..."
                      className="border-gray-300"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={handleAddLead}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                      disabled={!newLead.name || !newLead.email}
                    >
                      Add Lead
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddLeadOpen(false)}
                      className="border-gray-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: stats.total, icon: User, color: "bg-teal-600" },
            { label: "New Leads", value: stats.new, icon: Plus, color: "bg-blue-600" },
            { label: "Converted", value: stats.converted, icon: CheckCircle, color: "bg-green-600" },
            { label: "Lost", value: stats.lost, icon: AlertTriangle, color: "bg-red-600" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lead Lifecycle Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Lead Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lifecycleSteps.map((step, index) => (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`p-2 rounded-lg ${step.color}`}>
                      <step.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{step.label}</span>
                    {index < lifecycleSteps.length - 2 && (
                      <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-gray-300"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {lifecycleSteps.map(step => (
                  <SelectItem key={step.key} value={step.key}>
                    {step.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Ads">Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-gray-200">
                  <TableHead className="text-gray-700">Lead</TableHead>
                  <TableHead className="text-gray-700">Contact</TableHead>
                  <TableHead className="text-gray-700">Company</TableHead>
                  <TableHead className="text-gray-700">Source</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">Agent</TableHead>
                  <TableHead className="text-gray-700">Date</TableHead>
                  <TableHead className="text-right text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="hover:bg-gray-50 border-gray-200"
                  >
                    <TableCell>
                      <div className="font-medium text-gray-900">{lead.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Building className="h-3 w-3" />
                        {lead.company}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-300 text-gray-700">
                        {lead.source}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell className="text-gray-600">{lead.assignedAgent}</TableCell>
                    <TableCell className="text-gray-600">{lead.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-gray-100"
                        >
                          <Edit2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Lead Detail Modal */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl">
            {selectedLead && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Lead Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-900">{selectedLead.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{selectedLead.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{selectedLead.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{selectedLead.company}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Lead Details</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-500">Status: </span>
                            {getStatusBadge(selectedLead.status)}
                          </div>
                          <div>
                            <span className="text-gray-500">Source: </span>
                            <span className="text-gray-900">{selectedLead.source}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Assigned Agent: </span>
                            <span className="text-gray-900">{selectedLead.assignedAgent}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Date Added: </span>
                            <span className="text-gray-900">{selectedLead.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Status Updates</h3>
                    <div className="flex flex-wrap gap-2">
                      {lifecycleSteps.map(step => (
                        <Button
                          key={step.key}
                          variant={selectedLead.status === step.key ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateLeadStatus(selectedLead.id, step.key as Lead["status"])}
                          className={selectedLead.status === step.key ? "bg-teal-600 hover:bg-teal-700" : "border-gray-300"}
                        >
                          <step.icon className="h-3 w-3 mr-1" />
                          {step.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default LeadManagementPage;