import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  FileText,
  PieChart,
  LineChart,
  Activity,
  DollarSign,
  Clock,
  Award,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadsByStatusChart } from "@/components/charts/LeadsByStatusChart";
import { MonthlyGrowthChart } from "@/components/charts/MonthlyGrowthChart";
import { AgentPerformanceChart } from "@/components/charts/AgentPerformanceChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const AdminReports = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("30");
  const [reportType, setReportType] = useState("leads");

  // Export all reports function
  const exportAllReports = () => {
    const reportData = {
      exportDate: new Date().toISOString().split('T')[0],
      dateRange: dateRange,
      kpiData: kpiData,
      reportTemplates: reportTemplates,
      topPerformers: topPerformers,
      conversionTrends: {
        thisMonth: "18.4%",
        lastMonth: "16.3%",
        improvement: "+2.1%"
      },
      teamPerformance: [
        { department: "Sales Team", members: 12, performance: 92, color: "bg-green-500" },
        { department: "Marketing Team", members: 8, performance: 88, color: "bg-blue-500" },
        { department: "Support Team", members: 6, performance: 95, color: "bg-purple-500" },
      ],
      activityOverview: [
        { activity: "Leads Processed", count: 156, change: "+12%" },
        { activity: "Calls Made", count: 89, change: "+8%" },
        { activity: "Emails Sent", count: 234, change: "+15%" },
        { activity: "Meetings Scheduled", count: 45, change: "+5%" },
      ]
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `comprehensive-reports-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    toast({
      title: "Export Successful",
      description: "All reports have been exported successfully.",
    });
  };

  // Refresh data function
  const refreshReports = () => {
    // Simulate refresh
    setDateRange("30");
    setReportType("leads");
    
    toast({
      title: "Data Refreshed",
      description: "Reports data has been refreshed successfully.",
    });
  };

  // Mock data for reports
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$247,890",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-600"
    },
    {
      title: "Conversion Rate",
      value: "18.4%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "bg-teal-600"
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-0.3h",
      trend: "down",
      icon: Clock,
      color: "bg-blue-600"
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      icon: Award,
      color: "bg-purple-600"
    }
  ];

  const reportTemplates = [
    {
      title: "Lead Performance Report",
      description: "Comprehensive analysis of lead generation and conversion",
      icon: TrendingUp,
      type: "leads",
      lastGenerated: "2 hours ago"
    },
    {
      title: "Sales Team Report",
      description: "Individual and team performance metrics",
      icon: Users,
      type: "team",
      lastGenerated: "1 day ago"
    },
    {
      title: "Revenue Analysis",
      description: "Revenue trends and forecasting",
      icon: DollarSign,
      type: "revenue",
      lastGenerated: "3 hours ago"
    },
    {
      title: "Pipeline Health",
      description: "Sales pipeline status and bottlenecks",
      icon: Activity,
      type: "pipeline",
      lastGenerated: "5 hours ago"
    },
    {
      title: "Customer Journey",
      description: "Lead journey from first contact to conversion",
      icon: Target,
      type: "journey",
      lastGenerated: "1 day ago"
    },
    {
      title: "Monthly Summary",
      description: "Executive summary for monthly review",
      icon: FileText,
      type: "summary",
      lastGenerated: "2 days ago"
    }
  ];

  const topPerformers = [
    { name: "John Smith", metric: "24 conversions", score: "95%", trend: "up" },
    { name: "Emily Davis", metric: "18 conversions", score: "88%", trend: "up" },
    { name: "Mike Wilson", metric: "28 conversions", score: "92%", trend: "down" },
    { name: "Sarah Johnson", metric: "22 conversions", score: "90%", trend: "up" },
    { name: "David Lee", metric: "15 conversions", score: "78%", trend: "up" }
  ];

  const generateReport = (type: string) => {
    // Simulate report generation
    console.log(`Generating ${type} report...`);
  };

  return (
    <DashboardLayout role="admin" title="Reports & Analytics">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 3 months</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-300 hover:bg-gray-50"
              onClick={refreshReports}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              size="sm" 
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={exportAllReports}
            >
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <div className={`flex items-center gap-1 text-sm ${
                        kpi.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {kpi.trend === "up" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        {kpi.change}
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${kpi.color}`}>
                      <kpi.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Analytics Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="performance"
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger 
                value="reports"
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger 
                value="team"
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4 mr-2" />
                Team Stats
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <LeadsByStatusChart />
                <MonthlyGrowthChart />
                <AgentPerformanceChart />
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <TrendingUp className="h-5 w-5 text-teal-600" />
                      Conversion Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="font-semibold text-gray-900">18.4%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Month</span>
                        <span className="font-semibold text-gray-900">16.3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Award className="h-5 w-5 text-teal-600" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topPerformers.slice(0, 5).map((performer, index) => (
                        <div key={performer.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{performer.name}</div>
                              <div className="text-xs text-gray-600">{performer.metric}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {performer.score}
                            </Badge>
                            {performer.trend === "up" ? (
                              <ArrowUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTemplates.map((report, index) => (
                  <motion.div
                    key={report.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-teal-600 group-hover:text-white transition-colors">
                            <report.icon className="h-5 w-5 text-teal-600 group-hover:text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold text-gray-900">{report.title}</CardTitle>
                            <p className="text-xs text-gray-600 mt-1">{report.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Last generated: {report.lastGenerated}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 hover:bg-teal-50 hover:border-teal-600"
                            onClick={() => generateReport(report.type)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Team Stats Tab */}
            <TabsContent value="team" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Users className="h-5 w-5 text-teal-600" />
                      Team Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { department: "Sales Team", members: 12, performance: 92, color: "bg-green-500" },
                        { department: "Marketing Team", members: 8, performance: 88, color: "bg-blue-500" },
                        { department: "Support Team", members: 6, performance: 95, color: "bg-purple-500" },
                      ].map((team) => (
                        <div key={team.department} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${team.color}`}></div>
                            <div>
                              <div className="font-medium text-gray-900">{team.department}</div>
                              <div className="text-sm text-gray-600">{team.members} members</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{team.performance}%</div>
                            <div className="text-sm text-gray-600">avg. performance</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Activity className="h-5 w-5 text-teal-600" />
                      Activity Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { activity: "Leads Processed", count: 156, change: "+12%" },
                        { activity: "Calls Made", count: 89, change: "+8%" },
                        { activity: "Emails Sent", count: 234, change: "+15%" },
                        { activity: "Meetings Scheduled", count: 45, change: "+5%" },
                      ].map((item) => (
                        <div key={item.activity} className="flex items-center justify-between">
                          <span className="text-gray-700">{item.activity}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{item.count}</span>
                            <span className="text-sm text-green-600">{item.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;