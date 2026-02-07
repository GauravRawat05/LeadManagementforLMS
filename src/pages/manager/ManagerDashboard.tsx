import { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Clock,
  TrendingUp,
  Users,
  Filter,
  Search,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SummaryCard } from "@/components/ui/summary-card";
import { AgentPerformanceChart } from "@/components/charts/AgentPerformanceChart";
import { mockLeads, mockAgents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors: Record<string, string> = {
  new: "bg-primary text-primary-foreground",
  contacted: "bg-accent text-accent-foreground",
  qualified: "bg-warning text-warning-foreground",
  proposal: "bg-primary/80 text-primary-foreground",
  negotiation: "bg-warning/80 text-warning-foreground",
  converted: "bg-success text-success-foreground",
  lost: "bg-destructive text-destructive-foreground",
};

const ManagerDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const totalAssigned = mockLeads.length;
  const pendingFollowUp = mockLeads.filter(
    (l) => l.nextFollowUp && new Date(l.nextFollowUp) <= new Date()
  ).length;
  const convertedThisMonth = mockLeads.filter((l) => l.status === "converted").length;
  const agentsUnder = mockAgents.length;

  const filteredLeads = mockLeads.filter((lead) => {
    if (selectedAgent !== "all" && lead.assignedAgent !== selectedAgent) return false;
    if (selectedStatus !== "all" && lead.status !== selectedStatus) return false;
    return true;
  });

  return (
    <DashboardLayout role="manager" title="Manager Dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <SummaryCard
          title="Total Assigned Leads"
          value={totalAssigned}
          icon={ClipboardList}
          delay={0}
        />
        <SummaryCard
          title="Pending Follow-ups"
          value={pendingFollowUp}
          icon={Clock}
          variant="warning"
          delay={0.1}
        />
        <SummaryCard
          title="Converted This Month"
          value={convertedThisMonth}
          icon={TrendingUp}
          variant="success"
          delay={0.2}
        />
        <SummaryCard
          title="Agents Under You"
          value={agentsUnder}
          icon={Users}
          variant="primary"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Lead Assignment Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 rounded-xl border border-border bg-card shadow-sm overflow-hidden"
        >
          <div className="p-4 md:p-6 border-b border-border">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-foreground">Lead Assignment</h2>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search leads..." className="pl-9 w-full sm:w-48" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="p-2">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Agent</p>
                        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Agents" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Agents</SelectItem>
                            {mockAgents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.name}>
                                {agent.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Status</p>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="proposal">Proposal</SelectItem>
                            <SelectItem value="negotiation">Negotiation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[150px]">Lead Name</TableHead>
                  <TableHead className="min-w-[120px]">Status</TableHead>
                  <TableHead className="min-w-[140px]">Assign Agent</TableHead>
                  <TableHead className="min-w-[100px]">Priority</TableHead>
                  <TableHead className="text-right min-w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.slice(0, 6).map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-card-hover"
                  >
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[lead.status]}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue={lead.assignedAgent}>
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mockAgents.map((agent) => (
                            <SelectItem key={agent.id} value={agent.name}>
                              {agent.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="medium">
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" className="gradient-teal text-primary-foreground">
                        Assign
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Agent Performance */}
        <AgentPerformanceChart />
      </div>

      {/* Agent Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="p-4 md:p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Agent Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="min-w-[150px]">Agent Name</TableHead>
                <TableHead className="text-center min-w-[120px]">Leads Assigned</TableHead>
                <TableHead className="text-center min-w-[100px]">Converted</TableHead>
                <TableHead className="text-center min-w-[100px]">Pending</TableHead>
                <TableHead className="text-center min-w-[150px]">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAgents.map((agent, index) => {
                const conversionRate = Math.round(
                  (agent.converted / agent.leadsAssigned) * 100
                );
                return (
                  <motion.tr
                    key={agent.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-card-hover"
                  >
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="text-center">{agent.leadsAssigned}</TableCell>
                    <TableCell className="text-center text-success">{agent.converted}</TableCell>
                    <TableCell className="text-center text-warning">{agent.pending}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${conversionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap">{conversionRate}%</span>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
