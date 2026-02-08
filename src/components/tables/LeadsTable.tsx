import { motion } from "framer-motion";
import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "converted" | "lost";
  assignedAgent: string;
  date: string;
  nextFollowUp?: string;
}

interface LeadsTableProps {
  leads: Lead[];
  showAgent?: boolean;
  showActions?: boolean;
  onView?: (lead: Lead) => void;
  onUpdate?: (lead: Lead) => void;
}

const statusColors: Record<Lead["status"], string> = {
  new: "bg-teal-100 text-teal-800",
  contacted: "bg-blue-100 text-blue-800",
  qualified: "bg-yellow-100 text-yellow-800",
  proposal: "bg-purple-100 text-purple-800",
  negotiation: "bg-orange-100 text-orange-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

export function LeadsTable({
  leads,
  showAgent = true,
  showActions = true,
  onView,
  onUpdate,
}: LeadsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4">
        {leads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">{lead.name}</h3>
              {showActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(lead)}>
                      <Eye className="mr-2 h-4 w-4 text-teal-600" />
                      View Details
                    </DropdownMenuItem>
                    {onUpdate && (
                      <DropdownMenuItem onClick={() => onUpdate(lead)}>
                        Update Status
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Source:</span>
                <span className="text-sm font-medium text-gray-900">{lead.source}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge className={statusColors[lead.status]} variant="secondary">
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </Badge>
              </div>
              
              {showAgent && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Agent:</span>
                  <span className="text-sm font-medium text-gray-900">{lead.assignedAgent}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date:</span>
                <span className="text-sm font-medium text-gray-900">{lead.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-gray-200">
              <TableHead className="font-semibold min-w-[150px] text-gray-700">Lead Name</TableHead>
              <TableHead className="font-semibold min-w-[120px] text-gray-700">Source</TableHead>
              <TableHead className="font-semibold min-w-[100px] text-gray-700">Status</TableHead>
              {showAgent && <TableHead className="font-semibold min-w-[140px] text-gray-700">Assigned Agent</TableHead>}
              <TableHead className="font-semibold min-w-[100px] text-gray-700">Date</TableHead>
              {showActions && <TableHead className="font-semibold text-right min-w-[80px] text-gray-700">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead, index) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group transition-colors hover:bg-gray-50 border-gray-200"
              >
                <TableCell className="font-medium text-gray-900">{lead.name}</TableCell>
                <TableCell className="text-gray-600">{lead.source}</TableCell>
                <TableCell>
                  <Badge className={statusColors[lead.status]} variant="secondary">
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </TableCell>
                {showAgent && (
                  <TableCell className="text-gray-600">{lead.assignedAgent}</TableCell>
                )}
                <TableCell className="text-gray-600">{lead.date}</TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView?.(lead)}>
                          <Eye className="mr-2 h-4 w-4 text-teal-600" />
                          View Details
                        </DropdownMenuItem>
                        {onUpdate && (
                          <DropdownMenuItem onClick={() => onUpdate(lead)}>
                            Update Status
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
