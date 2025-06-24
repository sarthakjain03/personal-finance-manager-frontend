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
import { CategoryIcons } from "@/lib/constants/categories";

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
  handleSave,
  action,
  availableCategories,
}: AddEditBudgetDialogProps) => {
  const [category, setCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setBudgetAmount(budget.budgetAmount.toString());
    }
  }, [budget]);

  const handleReset = () => {
    onOpenChange("");
    setCategory("");
    setBudgetAmount("");
  };

  const handleSaveClick = async () => {
    if (category && budgetAmount) {
      const success = await handleSave({
        category,
        budgetAmount: parseFloat(budgetAmount),
        reqType: action === "Create" ? "new" : "edit",
        budgetId: budget?._id,
      });
      if (success) {
        handleReset();
      }
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
                {budget
                  ? [...availableCategories, budget.category]?.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        <div className="flex items-center gap-2">
                          <span>{CategoryIcons[cat]}</span>
                          <span>{cat}</span>
                        </div>
                      </SelectItem>
                    ))
                  : availableCategories?.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        <div className="flex items-center gap-2">
                          <span>{CategoryIcons[cat]}</span>
                          <span>{cat}</span>
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
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              className="col-span-3"
              placeholder="Enter Amount"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleReset}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveClick} className="cursor-pointer">
            Save Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBudgetDialog;
