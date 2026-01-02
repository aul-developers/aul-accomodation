"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allocations as initialAllocations } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Download, FileSpreadsheet, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteConfirmationDialog } from "@/components/admin/delete-confirmation-dialog";
import { toast } from "@/lib/toast";

export default function AdminAllocationsPage() {
  const [allocations, setAllocations] = useState(initialAllocations);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hostelFilter, setHostelFilter] = useState("all");
  const [revokeDialog, setRevokeDialog] = useState<{
    open: boolean;
    allocationId: string;
    studentName: string;
  }>({
    open: false,
    allocationId: "",
    studentName: "",
  });

  // Filter allocations based on search and filters
  const filteredAllocations = allocations.filter((allocation) => {
    const matchesSearch =
      allocation.studentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      allocation.studentMatric
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      allocation.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || allocation.status === statusFilter;

    const matchesHostel =
      hostelFilter === "all" || allocation.hostelName === hostelFilter;

    return matchesSearch && matchesStatus && matchesHostel;
  });

  // Get unique hostel names for filter
  const uniqueHostels = Array.from(
    new Set(allocations.map((a) => a.hostelName))
  );

  const handleRevokeAllocation = () => {
    setAllocations(
      allocations.map((a) =>
        a.id === revokeDialog.allocationId
          ? { ...a, status: "Expired" as const }
          : a
      )
    );
    toast.success(
      `Allocation for ${revokeDialog.studentName} has been revoked successfully!`
    );
    setRevokeDialog({ open: false, allocationId: "", studentName: "" });
  };

  const handleExportCSV = () => {
    const headers = [
      "Ref ID",
      "Student Name",
      "Matric Number",
      "Hostel",
      "Room",
      "Bed Space",
      "Date Allocated",
      "Amount Paid",
      "Status",
    ];
    const csvData = filteredAllocations.map((a) => [
      `${a.id.toUpperCase()}-SEC`,
      a.studentName,
      a.studentMatric,
      a.hostelName,
      a.roomNumber,
      a.bedSpace,
      a.dateAllocated,
      a.amountPaid,
      a.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `allocations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("CSV file downloaded successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Allocation Records
          </h1>
          <p className="text-muted-foreground">
            View and manage student room allocations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => toast.info("Excel export coming soon!")}
          >
            <FileSpreadsheet className="h-4 w-4" /> Export Excel
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by student name, matric no, or ref ID..."
            className="pl-8 bg-muted/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Select value={hostelFilter} onValueChange={setHostelFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Hostel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hostels</SelectItem>
              {uniqueHostels.map((hostel) => (
                <SelectItem key={hostel} value={hostel}>
                  {hostel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Ref ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Allocated Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAllocations.length > 0 ? (
                filteredAllocations.map((allocation) => (
                  <TableRow key={allocation.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {allocation.id.toUpperCase()}-SEC
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground">
                          {allocation.studentName}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {allocation.studentMatric}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{allocation.hostelName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {allocation.roomNumber}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {allocation.dateAllocated}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          allocation.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          allocation.status === "Active"
                            ? "bg-green-500 hover:bg-green-600"
                            : allocation.status === "Expired"
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : ""
                        }
                      >
                        {allocation.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {allocation.status === "Active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            setRevokeDialog({
                              open: true,
                              allocationId: allocation.id,
                              studentName: allocation.studentName,
                            })
                          }
                        >
                          Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No allocations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        open={revokeDialog.open}
        onOpenChange={(open) => setRevokeDialog({ ...revokeDialog, open })}
        onConfirm={handleRevokeAllocation}
        title="Revoke Allocation"
        description="Are you sure you want to revoke this allocation? The student will lose access to their assigned room."
        itemName={`${revokeDialog.studentName}'s allocation`}
      />
    </div>
  );
}
