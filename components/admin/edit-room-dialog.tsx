"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (room: {
    roomNumber: string;
    capacity: number;
    status: "Available" | "Full" | "Maintenance";
  }) => void;
  hostelName: string;
  currentRoom: {
    roomNumber: string;
    capacity: number;
    status: "Available" | "Full" | "Maintenance";
  } | null;
}

export function EditRoomDialog({
  open,
  onOpenChange,
  onEdit,
  hostelName,
  currentRoom,
}: EditRoomDialogProps) {
  const [formData, setFormData] = useState({
    roomNumber: "",
    capacity: "",
    status: "Available" as "Available" | "Full" | "Maintenance",
  });

  useEffect(() => {
    if (currentRoom) {
      setFormData({
        roomNumber: currentRoom.roomNumber,
        capacity: currentRoom.capacity.toString(),
        status: currentRoom.status,
      });
    }
  }, [currentRoom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.roomNumber || !formData.capacity) {
      alert("Please fill in all required fields");
      return;
    }

    onEdit({
      roomNumber: formData.roomNumber,
      capacity: parseInt(formData.capacity),
      status: formData.status,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Room</DialogTitle>
          <DialogDescription>
            Update room details for {hostelName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-roomNumber">Room Number *</Label>
              <Input
                id="edit-roomNumber"
                placeholder="e.g., 101, A1, etc."
                value={formData.roomNumber}
                onChange={(e) =>
                  setFormData({ ...formData, roomNumber: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-capacity">Bed Capacity *</Label>
              <Select
                value={formData.capacity}
                onValueChange={(value) =>
                  setFormData({ ...formData, capacity: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Beds</SelectItem>
                  <SelectItem value="4">4 Beds</SelectItem>
                  <SelectItem value="6">6 Beds</SelectItem>
                  <SelectItem value="8">8 Beds</SelectItem>
                  <SelectItem value="10">10 Beds</SelectItem>
                  <SelectItem value="12">12 Beds</SelectItem>
                  <SelectItem value="14">14 Beds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "Available" | "Full" | "Maintenance") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Full">Full</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full bg-primary">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
