"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { hostels, rooms as initialRooms } from "@/lib/data";
import {
  Plus,
  ArrowLeft,
  Trash2,
  Edit,
  Users,
  BedDouble,
  Home,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AddRoomDialog } from "@/components/admin/add-room-dialog";
import { EditRoomDialog } from "@/components/admin/edit-room-dialog";
import { DeleteConfirmationDialog } from "@/components/admin/delete-confirmation-dialog";
import { toast } from "@/lib/toast";

export default function AdminHostelRoomsPage({
  params,
}: {
  params: { id: string };
}) {
  const hostel = hostels.find((h) => h.id === params.id);

  if (!hostel) {
    notFound();
  }

  const [rooms, setRooms] = useState(initialRooms);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    room: {
      id: string;
      roomNumber: string;
      capacity: number;
      status: "Available" | "Full" | "Maintenance";
    } | null;
  }>({
    open: false,
    room: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    roomId: string;
    roomNumber: string;
  }>({
    open: false,
    roomId: "",
    roomNumber: "",
  });

  const hostelRooms = rooms.filter((r) => r.hostelId === hostel.id);

  const handleAddRoom = (newRoom: {
    roomNumber: string;
    capacity: number;
    status: "Available" | "Full" | "Maintenance";
  }) => {
    const room = {
      id: `${hostel.id}-${newRoom.roomNumber
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      hostelId: hostel.id,
      roomNumber: newRoom.roomNumber,
      capacity: newRoom.capacity,
      occupants: [],
      status: newRoom.status,
    };

    setRooms([...rooms, room]);
    toast.success(`Room ${newRoom.roomNumber} has been added successfully!`);
  };

  const handleEditRoom = (updatedRoom: {
    roomNumber: string;
    capacity: number;
    status: "Available" | "Full" | "Maintenance";
  }) => {
    if (!editDialog.room) return;

    setRooms(
      rooms.map((r) =>
        r.id === editDialog.room!.id
          ? {
              ...r,
              roomNumber: updatedRoom.roomNumber,
              capacity: updatedRoom.capacity,
              status: updatedRoom.status,
            }
          : r
      )
    );
    toast.success(
      `Room ${updatedRoom.roomNumber} has been updated successfully!`
    );
    setEditDialog({ open: false, room: null });
  };

  const handleDeleteRoom = () => {
    setRooms(rooms.filter((r) => r.id !== deleteDialog.roomId));
    toast.success(
      `Room ${deleteDialog.roomNumber} has been deleted successfully!`
    );
    setDeleteDialog({ open: false, roomId: "", roomNumber: "" });
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/hostels">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/50 hover:bg-white transition-all shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">
              {hostel.name}
            </h1>
            <p className="text-muted-foreground font-medium flex items-center gap-2">
              <Home className="h-4 w-4" /> Room Management
            </p>
          </div>
        </div>
        <Button
          className="gap-2 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4" /> Add New Room
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl shadow-sm border-none bg-linear-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Capacity
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {hostel.capacity}
            </div>
            <p className="text-xs text-muted-foreground">Students maximum</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-none bg-linear-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Rooms
            </CardTitle>
            <BedDouble className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {hostel.availableRooms}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for allocation
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-none bg-linear-to-br from-green-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Occupancy Rate
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500/20" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {Math.round(
                ((hostel.capacity - hostel.availableRooms * 4) /
                  hostel.capacity) *
                  100
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Current utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
        <CardHeader className="px-8 pt-8 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-primary">
                Room Inventory
              </CardTitle>
              <CardDescription className="mt-1">
                Manage room details, capacity, and occupants for {hostel.name}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {/* Placeholders for filters if needed */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="pl-8 h-14">Room Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostelRooms.length > 0 ? (
                hostelRooms.map((room) => {
                  const percentage =
                    (room.occupants.length / room.capacity) * 100;
                  const isFull = room.occupants.length >= room.capacity;

                  return (
                    <TableRow
                      key={room.id}
                      className="hover:bg-slate-50/50 border-slate-100 transition-colors"
                    >
                      <TableCell className="pl-8 font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {room.roomNumber.substring(0, 1)}
                          </div>
                          {room.roomNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="font-normal bg-white border-slate-200 text-slate-600"
                        >
                          {room.capacity} Bedded
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="w-[140px] space-y-2">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-muted-foreground">
                              {room.occupants.length} / {room.capacity} Students
                            </span>
                            <span className="text-primary">
                              {Math.round(percentage)}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isFull
                                  ? "bg-red-500"
                                  : percentage > 50
                                  ? "bg-primary"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {isFull ? (
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-700 hover:bg-red-100 border-none"
                          >
                            Full
                          </Badge>
                        ) : room.occupants.length === 0 ? (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 hover:bg-green-100 border-none"
                          >
                            Empty
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none"
                          >
                            Available
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                            onClick={() =>
                              setEditDialog({
                                open: true,
                                room: {
                                  id: room.id,
                                  roomNumber: room.roomNumber,
                                  capacity: room.capacity,
                                  status: room.status,
                                },
                              })
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                            onClick={() =>
                              setDeleteDialog({
                                open: true,
                                roomId: room.id,
                                roomNumber: room.roomNumber,
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No rooms found for this hostel.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddRoomDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddRoom}
        hostelName={hostel.name}
      />

      <EditRoomDialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog({ ...editDialog, open })}
        onEdit={handleEditRoom}
        hostelName={hostel.name}
        currentRoom={editDialog.room}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={handleDeleteRoom}
        title="Delete Room"
        description="Are you sure you want to delete this room? This action cannot be undone and will remove all occupants from this room."
        itemName={`Room ${deleteDialog.roomNumber}`}
      />
    </div>
  );
}
