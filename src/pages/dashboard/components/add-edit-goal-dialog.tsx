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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, XCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AddEditGoalDialogProps } from "../types/goals.types";
import { CategoryIcons } from "@/lib/constants/categories";

const AddEditGoalDialog = ({
  open,
  onOpenChange,
  handleSave,
  goal,
  action,
  availableCategories,
}: AddEditGoalDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (goal && action === "Edit") {
      setTitle(goal.title);
      setDescription(goal.description);
      setCurrent(goal.currentAmount.toString());
      setTarget(goal.targetAmount.toString());
      setCategory(goal.category);
      setDeadline(goal.deadline);
    }
  }, [goal]);

  const handleReset = () => {
    onOpenChange("");
    setTitle("");
    setDescription("");
    setTarget("");
    setCategory("");
    setDeadline(undefined);
    setCurrent("");
  };

  const handleSaveClick = async () => {
    if (title && description && current && target && category && deadline) {
      const success = await handleSave({
        title,
        description,
        currentAmount: parseFloat(current),
        targetAmount: parseFloat(target),
        category,
        deadline,
        reqType: action === "Create" ? "new" : "edit",
        goalId: goal?.id,
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
            <Label htmlFor="targetAmount" className="text-right">
              Target Amount
            </Label>
            <Input
              id="targetAmount"
              type="number"
              step={0}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="col-span-3"
              placeholder="Enter Target Amount"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="currentAmount"
              className="text-right col-span-1 text-nowrap"
            >
              Current Amount
            </Label>
            <Input
              id="currentAmount"
              type="number"
              step={0}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="col-span-3"
              placeholder="Enter Current Amount"
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
                {goal
                  ? [...availableCategories, goal.category]?.map((cat) => (
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
            <Label htmlFor="deadline" className="text-right">
              Deadline
            </Label>
            <Popover>
              <PopoverTrigger asChild className="col-span-3">
                <div className="flex gap-2 items-center">
                  <Button
                    id="deadline"
                    variant="outline"
                    className={cn(
                      "flex gap-2 justify-start text-left font-normal"
                    )}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {deadline
                      ? `${format(deadline, "dd MMM yyyy")}`
                      : "Select Deadline Date"}
                  </Button>
                  {deadline && (
                    <XCircle
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => setDeadline(undefined)}
                    />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline as any}
                  className={cn("p-3 pointer-events-auto")}
                  numberOfMonths={1}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
          <Button className="cursor-pointer" onClick={handleSaveClick}>
            Save Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditGoalDialog;
