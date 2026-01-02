"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { hostels as initialHostels } from "@/lib/data";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AddHostelDialog } from "@/components/admin/add-hostel-dialog";
import { EditHostelDialog } from "@/components/admin/edit-hostel-dialog";
import { DeleteConfirmationDialog } from "@/components/admin/delete-confirmation-dialog";
import { toast } from "@/lib/toast";

export default function AdminHostelsPage() {
  const [hostels, setHostels] = useState(initialHostels);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    hostel: {
      id: string;
      name: string;
      description: string;
      gender: "Male" | "Female" | "Mixed";
      capacity: number;
      price: number;
      image: string;
    } | null;
  }>({
    open: false,
    hostel: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    hostelId: string;
    hostelName: string;
  }>({
    open: false,
    hostelId: "",
    hostelName: "",
  });

  const handleAddHostel = (newHostel: {
    name: string;
    description: string;
    gender: "Male" | "Female" | "Mixed";
    capacity: number;
    price: number;
    image: string;
  }) => {
    const hostel = {
      id: newHostel.name.toLowerCase().replace(/\s+/g, "-"),
      name: newHostel.name,
      image: newHostel.image,
      description: newHostel.description,
      price: newHostel.price,
      availableRooms: newHostel.capacity,
      capacity: newHostel.capacity,
      gender: newHostel.gender,
      roomTypes: [4, 6, 8],
      priceList: {
        4: newHostel.price + 100000,
        6: newHostel.price,
        8: newHostel.price - 50000,
      },
    };

    setHostels([...hostels, hostel]);
    toast.success(`${newHostel.name} has been added successfully!`);
  };

  const handleEditHostel = (updatedHostel: {
    name: string;
    description: string;
    gender: "Male" | "Female" | "Mixed";
    capacity: number;
    price: number;
    image: string;
  }) => {
    if (!editDialog.hostel) return;

    setHostels(
      hostels.map((h) =>
        h.id === editDialog.hostel!.id
          ? {
              ...h,
              name: updatedHostel.name,
              description: updatedHostel.description,
              gender: updatedHostel.gender,
              capacity: updatedHostel.capacity,
              price: updatedHostel.price,
              image: updatedHostel.image,
            }
          : h
      )
    );
    toast.success(`${updatedHostel.name} has been updated successfully!`);
    setEditDialog({ open: false, hostel: null });
  };

  const handleDeleteHostel = () => {
    setHostels(hostels.filter((h) => h.id !== deleteDialog.hostelId));
    toast.success(`${deleteDialog.hostelName} has been deleted successfully!`);
    setDeleteDialog({ open: false, hostelId: "", hostelName: "" });
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <Badge
            variant="outline"
            className="mb-2 bg-primary/10 text-primary border-primary/20"
          >
            Admin Access
          </Badge>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            Hostel Management
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Configure hostel details and manage capacity.
          </p>
        </div>
        <Button
          size="default"
          className="gap-2 bg-primary text-white hover:bg-primary/90"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-5 w-5" /> Add New Hostel
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hostels.map((hostel) => {
          const percentage =
            ((hostel.capacity - hostel.availableRooms) / hostel.capacity) * 100;
          const isFull = percentage >= 100;

          return (
            <div key={hostel.id}>
              <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden">
                <div className="aspect-[21/9] bg-muted relative">
                  <img
                    src={hostel.image}
                    alt={hostel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-heading font-bold text-xl">
                      {hostel.name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {hostel.gender} Students
                    </p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={isFull ? "destructive" : "secondary"}
                      className="shadow-sm border-0"
                    >
                      {isFull
                        ? "Full Capacity"
                        : `${hostel.availableRooms} Spaces Left`}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" /> Capacity
                      </span>
                      <span className="font-semibold">
                        {hostel.capacity} Residents
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        <span>Occupancy</span>
                        <span>{percentage.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${percentage}%` }}
                          className={`h-full rounded-full ${
                            isFull ? "bg-red-500" : "bg-green-500"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-xs text-muted-foreground uppercase font-bold">
                        Price per Session
                      </span>
                      <span className="text-xl font-heading font-bold text-primary">
                        ₦{hostel.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2">
                  <Link href={`/admin/hostels/${hostel.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full bg-white border-slate-200 hover:bg-slate-50"
                    >
                      Manage Rooms
                    </Button>
                  </Link>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:bg-slate-100 hover:text-primary"
                    onClick={() =>
                      toast.info("Edit functionality coming soon!")
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:bg-red-50 hover:text-destructive"
                    onClick={() =>
                      setDeleteDialog({
                        open: true,
                        hostelId: hostel.id,
                        hostelName: hostel.name,
                      })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>

      <AddHostelDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddHostel}
      />

      <EditHostelDialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog({ ...editDialog, open })}
        onEdit={handleEditHostel}
        currentHostel={editDialog.hostel}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={handleDeleteHostel}
        title="Delete Hostel"
        description="Are you sure you want to delete this hostel? This action cannot be undone and will remove all associated rooms and allocations."
        itemName={deleteDialog.hostelName}
      />
    </div>
  );
}
