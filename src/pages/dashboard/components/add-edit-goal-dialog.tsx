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
import { Textarea } from "@/components/ui/textarea";
import { AddEditGoalDialogProps } from "../types/goals.types";

const categories = [
  "Savings",
  "Travel",
  "Transportation",
  "Housing",
  "Education",
  "Investment",
];

const AddEditGoalDialog = ({
  open,
  onOpenChange,
  onEditSave,
  onNewSave,
  goal,
  action,
}: AddEditGoalDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (goal && action === "Edit") {
      setTitle(goal.title);
      setDescription(goal.description);
      setCurrent(goal.current.toString());
      setTarget(goal.target.toString());
      setCategory(goal.category);
      setDeadline(goal.deadline);
    }
  }, [goal]);

  const handleSave = () => {
    if (
      title &&
      description &&
      current &&
      target &&
      category &&
      deadline
    ) {
      if (goal?.id) {
        onEditSave(goal.id, {
          title,
          description,
          current: parseFloat(current),
          target: parseFloat(target),
          category,
          deadline,
        });
      } else {
        onNewSave({
          title,
          description,
          target: parseFloat(target),
          category,
          deadline,
        })
      }
      onOpenChange("");
    }
  };

  const handleReset = () => {
    onOpenChange("");
    setTitle("");
    setDescription("");
    setTarget("");
    setCategory("");
    setDeadline("");
    setCurrent("");
  };

  return (
    <Dialog open={open} onOpenChange={handleReset}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{action} Goal</DialogTitle>
          <DialogDescription>
            Set up a new financial goal to track your progress towards achieving
            it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Enter Title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Enter Description"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target" className="text-right">
              Target Amount
            </Label>
            <Input
              id="target"
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="col-span-3"
              placeholder="Enter Target Amount"
            />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="category" className="text-right col-span-3">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-9 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">
              Deadline
            </Label>
            <Input
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="col-span-3"
              placeholder="DD-MM-YYYY"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleReset}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={handleSave}>
            Save Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditGoalDialog;
