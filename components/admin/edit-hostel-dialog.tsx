"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditHostelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (hostel: {
    name: string;
    description: string;
    gender: "Male" | "Female" | "Mixed";
    capacity: number;
    price: number;
    image: string;
  }) => void;
  currentHostel: {
    name: string;
    description: string;
    gender: "Male" | "Female" | "Mixed";
    capacity: number;
    price: number;
    image: string;
  } | null;
}

export function EditHostelDialog({
  open,
  onOpenChange,
  onEdit,
  currentHostel,
}: EditHostelDialogProps) {
  const [formData, setFormData] = useState({
    name: currentHostel?.name || "",
    description: currentHostel?.description || "",
    gender: (currentHostel?.gender || "Male") as "Male" | "Female" | "Mixed",
    capacity: currentHostel?.capacity.toString() || "",
    price: currentHostel?.price.toString() || "",
    image: currentHostel?.image || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.capacity ||
      !formData.price
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onEdit({
      name: formData.name,
      description: formData.description,
      gender: formData.gender,
      capacity: parseInt(formData.capacity),
      price: parseInt(formData.price),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2938&auto=format&fit=crop",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Hostel</DialogTitle>
          <DialogDescription>
            Update hostel details and configuration
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Hostel Name *</Label>
              <Input
                id="edit-name"
                placeholder="e.g., Peace Hall"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                placeholder="Brief description of the hostel..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-gender">Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value: "Male" | "Female" | "Mixed") =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-capacity">Capacity *</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-price">Base Price (₦) *</Label>
              <Input
                id="edit-price"
                type="number"
                placeholder="e.g., 150000"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                min="0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL (Optional)</Label>
              <Input
                id="edit-image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
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
