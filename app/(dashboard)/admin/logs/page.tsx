"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Download,
  Filter,
  UserPlus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  BedDouble,
} from "lucide-react";
import { toast } from "@/lib/toast";

// Mock system logs data
const systemLogs = [
  {
    id: "log-001",
    timestamp: "2026-01-02T22:45:00Z",
    action: "Hostel Created",
    user: "Admin User",
    description: "Created new hostel: Peace Hall",
    type: "create",
    icon: Home,
  },
  {
    id: "log-002",
    timestamp: "2026-01-02T22:30:00Z",
    action: "Room Added",
    user: "Admin User",
    description: "Added Room 101 to Progress Hall",
    type: "create",
    icon: BedDouble,
  },
  {
    id: "log-003",
    timestamp: "2026-01-02T22:15:00Z",
    action: "Allocation Revoked",
    user: "Admin User",
    description: "Revoked allocation for John Doe (MAT: 2021/1234)",
    type: "delete",
    icon: XCircle,
  },
  {
    id: "log-004",
    timestamp: "2026-01-02T22:00:00Z",
    action: "Hostel Updated",
    user: "Admin User",
    description: "Updated capacity for Purity Hall to 150 students",
    type: "update",
    icon: Edit,
  },
  {
    id: "log-005",
    timestamp: "2026-01-02T21:45:00Z",
    action: "Room Deleted",
    user: "Admin User",
    description: "Deleted Room 205 from Patience Hall",
    type: "delete",
    icon: Trash2,
  },
  {
    id: "log-006",
    timestamp: "2026-01-02T21:30:00Z",
    action: "Allocation Created",
    user: "System",
    description: "New allocation for Jane Smith (MAT: 2021/5678)",
    type: "create",
    icon: CheckCircle,
  },
  {
    id: "log-007",
    timestamp: "2026-01-02T21:15:00Z",
    action: "User Login",
    user: "Admin User",
    description: "Admin user logged into the system",
    type: "info",
    icon: UserPlus,
  },
  {
    id: "log-008",
    timestamp: "2026-01-02T21:00:00Z",
    action: "System Alert",
    user: "System",
    description: "Low capacity warning for Progress Hall",
    type: "warning",
    icon: AlertCircle,
  },
];

export default function SystemLogsPage() {
  const [logs] = useState(systemLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || log.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleExportLogs = () => {
    const headers = ["Timestamp", "Action", "User", "Description", "Type"];
    const csvData = filteredLogs.map((log) => [
      new Date(log.timestamp).toLocaleString(),
      log.action,
      log.user,
      log.description,
      log.type,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `system-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("System logs exported successfully!");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "create":
        return "bg-green-100 text-green-700 border-green-200";
      case "update":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "delete":
        return "bg-red-100 text-red-700 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            System Logs
          </h1>
          <p className="text-muted-foreground">
            Monitor all system activities and changes
          </p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExportLogs}>
          <Download className="h-4 w-4" /> Export Logs
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by action, description, or user..."
            className="pl-8 bg-muted/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs List */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>
            Real-time log of all administrative actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => {
                const Icon = log.icon;
                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-slate-100 hover:bg-slate-50/50 transition-colors"
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${getTypeColor(
                        log.type
                      )}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {log.action}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {log.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-muted-foreground">
                              By:{" "}
                              <span className="font-medium">{log.user}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`capitalize ${getTypeColor(log.type)}`}
                        >
                          {log.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No logs found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
