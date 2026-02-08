import React, { useState } from "react";
import { 
  Users, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  CheckCircle
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SummaryCard } from "@/components/ui/summary-card";
import { mockLeads } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AgentDashboard = () => {
  const [leads, setLeads] = useState(mockLeads.filter(lead => lead.assignedAgent === "John Smith"));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => l.status === "converted").length;
  const qualifiedLeads = leads.filter(l => l.status === "qualified").length;
  const newLeads = leads.filter(l => l.status === "new").length;

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (leadId, newStatus) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    setIsDetailOpen(false);
  };

  return (
    <DashboardLayout role="agent" title="Agent Dashboard">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-gray-600">Manage your leads and grow your sales pipeline.</p>
          </div>
          <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Add New Lead</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="leadName" className="text-gray-700">Full Name</Label>
                  <Input id="leadName" placeholder="Enter lead name" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadEmail" className="text-gray-700">Email</Label>
                  <Input id="leadEmail" type="email" placeholder="email@company.com" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadPhone" className="text-gray-700">Phone</Label>
                  <Input id="leadPhone" type="tel" placeholder="+1 (555) 000-0000" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadCompany" className="text-gray-700">Company</Label>
                  <Input id="leadCompany" placeholder="Company name" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadNotes" className="text-gray-700">Notes</Label>
                  <Textarea id="leadNotes" placeholder="Initial notes about the lead..." className="border-gray-300" />
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                  Add Lead
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <SummaryCard
            title="My Total Leads"
            value={totalLeads}
            icon={Users}
            delay={0}
          />
          <SummaryCard
            title="New Leads"
            value={newLeads}
            icon={Plus}
            variant="primary"
            delay={0.1}
          />
          <SummaryCard
            title="Qualified"
            value={qualifiedLeads}
            icon={TrendingUp}
            delay={0.2}
          />
          <SummaryCard
            title="Converted"
            value={convertedLeads}
            icon={CheckCircle}
            variant="success"
            delay={0.3}
          />
        </div>

        {/* Leads Management */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-gray-200 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">My Leads</h2>
              <p className="text-sm text-gray-600">Manage your assigned leads and track progress</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64 border-gray-300"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4 p-4">
            {filteredLeads.map((lead, index) => (
              <div
                key={lead.id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">{lead.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100"
                    onClick={() => handleViewLead(lead)}
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Company:</span>
                    <span className="text-sm font-medium text-gray-900 text-right">{lead.company}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm text-gray-700 text-right truncate max-w-[180px]">{lead.email}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span className="text-sm text-gray-700 text-right">{lead.phone}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge
                      className={
                        lead.status === "converted" ? "bg-green-100 text-green-800" :
                        lead.status === "qualified" ? "bg-blue-100 text-blue-800" :
                        lead.status === "proposal" ? "bg-yellow-100 text-yellow-800" :
                        lead.status === "new" ? "bg-purple-100 text-purple-800" :
                        lead.status === "contacted" ? "bg-orange-100 text-orange-800" :
                        "bg-red-100 text-red-800"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-gray-200">
                  <TableHead className="min-w-[150px] text-gray-700">Name</TableHead>
                  <TableHead className="min-w-[150px] text-gray-700">Company</TableHead>
                  <TableHead className="min-w-[200px] text-gray-700">Email</TableHead>
                  <TableHead className="min-w-[120px] text-gray-700">Phone</TableHead>
                  <TableHead className="min-w-[100px] text-gray-700">Status</TableHead>
                  <TableHead className="text-right min-w-[100px] text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-gray-50 border-gray-200">
                    <TableCell className="font-medium text-gray-900">{lead.name}</TableCell>
                    <TableCell className="text-gray-600">{lead.company}</TableCell>
                    <TableCell className="text-gray-600">{lead.email}</TableCell>
                    <TableCell className="text-gray-600">{lead.phone}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          lead.status === "converted" ? "bg-green-100 text-green-800" :
                          lead.status === "qualified" ? "bg-blue-100 text-blue-800" :
                          lead.status === "proposal" ? "bg-yellow-100 text-yellow-800" :
                          lead.status === "new" ? "bg-purple-100 text-purple-800" :
                          lead.status === "contacted" ? "bg-orange-100 text-orange-800" :
                          "bg-red-100 text-red-800"
                        }
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100"
                        onClick={() => handleViewLead(lead)}
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle className="text-gray-900">Lead Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedLead.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedLead.name}</h2>
                        <p className="text-gray-600">{selectedLead.company}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{selectedLead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedLead.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Created: {new Date(selectedLead.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge
                    className={
                      selectedLead.status === "converted" ? "bg-green-100 text-green-800" :
                      selectedLead.status === "qualified" ? "bg-blue-100 text-blue-800" :
                      selectedLead.status === "proposal" ? "bg-yellow-100 text-yellow-800" :
                      selectedLead.status === "new" ? "bg-purple-100 text-purple-800" :
                      selectedLead.status === "contacted" ? "bg-orange-100 text-orange-800" :
                      "bg-red-100 text-red-800"
                    }
                  >
                    {selectedLead.status}
                  </Badge>
                </div>

                {selectedLead.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                    <p className="text-gray-600">{selectedLead.notes}</p>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  <Select onValueChange={(value) => handleUpdateStatus(selectedLead.id, value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Lead
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AgentDashboard;