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

interface AddHostelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (hostel: {
    name: string;
    description: string;
    gender: "Male" | "Female" | "Mixed";
    capacity: number;
    price: number;
    image: string;
  }) => void;
}

export function AddHostelDialog({
  open,
  onOpenChange,
  onAdd,
}: AddHostelDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gender: "Male" as "Male" | "Female" | "Mixed",
    capacity: "",
    price: "",
    image: "",
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

    onAdd({
      name: formData.name,
      description: formData.description,
      gender: formData.gender,
      capacity: parseInt(formData.capacity),
      price: parseInt(formData.price),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2938&auto=format&fit=crop",
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
      gender: "Male",
      capacity: "",
      price: "",
      image: "",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Hostel
          </DialogTitle>
          <DialogDescription>
            Create a new hostel accommodation. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Hostel Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Peace Hall"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
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
                <Label htmlFor="gender">Gender *</Label>
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
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
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
              <Label htmlFor="price">Base Price (₦) *</Label>
              <Input
                id="price"
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
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input
                id="image"
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
              Add Hostel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
