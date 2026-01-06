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
    roomTypes?: number[];
    priceList?: Record<number, number>;
  }) => void;
  currentHostel: {
    name: string;
    description: string;
    gender: "Male" | "Female" | "Mixed";
    capacity: number;
    price: number;
    image: string;
    roomTypes?: number[];
    priceList?: Record<number, number>;
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

  // Manage room configurations (Types & Prices)
  const [configs, setConfigs] = useState<{ beds: number; price: number }[]>(
    currentHostel && currentHostel.roomTypes && currentHostel.priceList
      ? currentHostel.roomTypes.map((type: number) => ({
          beds: type,
          price: currentHostel.priceList?.[type] || currentHostel.price,
        }))
      : []
  );

  const handleAddConfig = () => {
    setConfigs([...configs, { beds: 4, price: 150000 }]);
  };

  const handleRemoveConfig = (index: number) => {
    setConfigs(configs.filter((_, i) => i !== index));
  };

  const handleConfigChange = (
    index: number,
    field: "beds" | "price",
    value: string
  ) => {
    const newConfigs = [...configs];
    newConfigs[index] = {
      ...newConfigs[index],
      [field]: parseInt(value) || 0,
    };
    setConfigs(newConfigs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      alert("Please fill in required fields");
      return;
    }

    // specific parsing for configs
    const roomTypes = configs.map((c) => c.beds);
    const priceList = configs.reduce((acc, c) => {
      acc[c.beds] = c.price;
      return acc;
    }, {} as Record<number, number>);

    onEdit({
      name: formData.name,
      description: formData.description,
      gender: formData.gender,
      capacity: parseInt(formData.capacity),
      price: parseInt(formData.price),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2938&auto=format&fit=crop",
      roomTypes,
      priceList,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Hostel</DialogTitle>
          <DialogDescription>
            Update hostel details and room configurations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b pb-2">
                Basic Information
              </h3>
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Hostel Name *</Label>
                <Input
                  id="edit-name"
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
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={2}
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
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Room Configuration Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Room Configurations
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddConfig}
                  className="h-8 text-xs"
                >
                  + Add Type
                </Button>
              </div>

              {configs.length === 0 && (
                <div className="text-center p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-sm text-slate-500">
                  No room types configured. Add one to define beds and prices.
                </div>
              )}

              <div className="grid gap-3">
                {configs.map((config, index) => (
                  <div
                    key={index}
                    className="flex items-end gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100"
                  >
                    <div className="grid gap-1.5 flex-1">
                      <Label className="text-xs text-slate-500">
                        Beds / Room
                      </Label>
                      <Input
                        type="number"
                        value={config.beds}
                        onChange={(e) =>
                          handleConfigChange(index, "beds", e.target.value)
                        }
                        className="h-9 bg-white"
                        min="1"
                      />
                    </div>
                    <div className="grid gap-1.5 flex-1">
                      <Label className="text-xs text-slate-500">
                        Price (₦)
                      </Label>
                      <Input
                        type="number"
                        value={config.price}
                        onChange={(e) =>
                          handleConfigChange(index, "price", e.target.value)
                        }
                        className="h-9 bg-white"
                        min="0"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveConfig(index)}
                      className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50"
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
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
