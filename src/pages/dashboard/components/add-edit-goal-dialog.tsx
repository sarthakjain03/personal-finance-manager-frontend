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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AddEditGoalDialogProps } from "../types/goals.types";
import { CategoryIcons } from "@/lib/constants/categories";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title should be at least 3 characters")
      .max(50, "Title must be less than 50 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(250, "Description must be less than 250 characters"),
    targetAmount: z
      .string()
      .min(1, "Target Amount is required")
      .regex(/^\d+$/, "Target Amount must contain only numbers"),
    currentAmount: z
      .string()
      .regex(/^\d+$/, "Current Amount must contain only numbers"),
    category: z.string().min(1, "Category is required"),
    deadline: z.date(),
  })
  .refine(
    (data) => {
      const target = parseInt(data.targetAmount, 10);
      return target > 0 && target <= 1_000_000;
    },
    {
      message: "Target Amount must be between 0 and 1000000",
      path: ["targetAmount"],
    }
  )
  .refine(
    (data) => {
      const current = parseInt(data.currentAmount, 10);
      return current >= 0;
    },
    {
      message: "Current Amount cannot be less than 0",
      path: ["currentAmount"],
    }
  )
  .refine(
    (data) => {
      const target = parseInt(data.targetAmount, 10);
      const current = parseInt(data.currentAmount, 10);
      return current === 0 || (current > 0 && current <= target);
    },
    {
      message: "Current Amount cannot be greater than Target Amount",
      path: ["currentAmount"],
    }
  );

const AddEditGoalDialog = ({
  open,
  onOpenChange,
  handleSave,
  goal,
  action,
  availableCategories,
}: AddEditGoalDialogProps) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: new Date(),
    },
  });

  const { handleSubmit, control, reset, setValue } = form;

  const handleReset = () => {
    onOpenChange("");
    reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    const success = await handleSave({
      title: values.title,
      description: values.description,
      currentAmount: parseFloat(values.currentAmount),
      targetAmount: parseFloat(values.targetAmount),
      category: values.category,
      deadline: values.deadline,
      reqType: action === "Create New" ? "new" : "edit",
      goalId: goal?.id,
    });
    if (success) {
      handleReset();
    }
    setSubmitting(false);
  };

  const handleOnOpenChange = () => {
    if (!submitting) {
      handleReset();
    }
  };

  useEffect(() => {
    if (goal && action === "Edit") {
      setValue("title", goal.title);
      setValue("description", goal.description);
      setValue("currentAmount", goal.currentAmount.toString());
      setValue("targetAmount", goal.targetAmount.toString());
      setValue("category", goal.category);
      setValue("deadline", new Date(goal.deadline));
    }
  }, [goal]);

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{action} Goal</DialogTitle>
          <DialogDescription>
            Set up a new financial goal to track your progress towards achieving
            it.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Title"
                          disabled={submitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Textarea
                          {...field}
                          className="col-span-3"
                          placeholder="Enter Description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="targetAmount" className="text-right">
                  Target Amount
                </Label>
                <FormField
                  control={control}
                  name="targetAmount"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Target Amount"
                          type="number"
                          step={0}
                          disabled={submitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="currentAmount"
                  className="text-right col-span-1 text-nowrap"
                >
                  Current Amount
                </Label>
                <FormField
                  control={control}
                  name="currentAmount"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Current Amount"
                          type="number"
                          step={0}
                          disabled={submitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="category" className="text-right col-span-3">
                  Category
                </Label>
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="col-span-9">
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={submitting}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {goal
                            ? [...availableCategories, goal.category]?.map(
                                (cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    <div className="flex items-center gap-2">
                                      <span>{CategoryIcons[cat]}</span>
                                      <span>{cat}</span>
                                    </div>
                                  </SelectItem>
                                )
                              )
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <FormField
                  control={control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild disabled={submitting}>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a Deadline</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="p-3 pointer-events-auto"
                            disabled={submitting}
                            captionLayout="dropdown"
                            numberOfMonths={1}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={handleReset}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={14} color="#fff" />
                    Saving...
                  </>
                ) : (
                  "Save Goal"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditGoalDialog;
