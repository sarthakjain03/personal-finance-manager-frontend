import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddEditBudgetDialogProps } from "../types/budgets.types";

const categoryOptions = [
  { value: "Food & Dining", icon: "🍽️" },
  { value: "Transportation", icon: "🚗" },
  { value: "Entertainment", icon: "🎬" },
  { value: "Shopping", icon: "🛍️" },
  { value: "Bills & Utilities", icon: "💡" },
  { value: "Health & Fitness", icon: "💪" },
  { value: "Travel", icon: "✈️" },
  { value: "Education", icon: "📚" },
  { value: "Housing", icon: "🏠" },
  { value: "Personal Care", icon: "💄" },
];

const AddEditBudgetDialog = ({
  open,
  onOpenChange,
  budget,
  onNewSave,
  onEditSave,
  action,
}: AddEditBudgetDialogProps) => {
  const [category, setCategory] = useState("");
  const [allocated, setAllocated] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setAllocated(budget.allocated.toString());
      setIcon(budget.icon);
    }
  }, [budget]);

  const handleReset = () => {
    onOpenChange("");
    setCategory("");
    setAllocated("");
    setIcon("");
  };

  const handleSave = () => {
    if (budget && category && allocated) {
      const selectedCategory = categoryOptions.find(
        (cat) => cat.value === category
      );
      if (action === "Create") {
        onNewSave({
          category,
          allocated: parseFloat(allocated),
          icon: selectedCategory?.icon || icon,
        });
      } else if (budget?.id) {
        onEditSave(budget?.id, {
          category,
          allocated: parseFloat(allocated),
          icon: selectedCategory?.icon || icon,
        });
      }
      handleReset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleReset}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{action} Budget</DialogTitle>
          <DialogDescription>
            {action} your budget for better financial management.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="category" className="text-right col-span-3">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-9 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions?.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.value}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="allocated" className="text-right">
              Budget Amount
            </Label>
            <Input
              id="allocated"
              type="number"
              value={allocated}
              onChange={(e) => setAllocated(e.target.value)}
              className="col-span-3"
              placeholder="Enter Amount"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Budget</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBudgetDialog;
