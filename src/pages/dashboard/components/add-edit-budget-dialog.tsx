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
import { AddEditBudgetDialogProps } from "../types/budgets.types";
import { CategoryIcons } from "@/lib/constants/categories";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    category: z.string().min(1, "Category is required"),
    amount: z
      .string()
      .min(1, "Budget Amount is required")
      .regex(/^\d+$/, "Budget Amount must contain only numbers"),
  })
  .refine(
    (data) => {
      const amount = parseInt(data.amount, 10);
      return amount >= 100 && amount <= 1_000_000;
    },
    {
      message: "Budget Amount must be between 100 and 1000000",
      path: ["amount"],
    }
  );

const AddEditBudgetDialog = ({
  open,
  onOpenChange,
  budget,
  handleSave,
  action,
  availableCategories,
}: AddEditBudgetDialogProps) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: "",
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
      category: values.category,
      budgetAmount: parseFloat(values.amount),
      budgetId: budget?.id,
      reqType: action === "Create" ? "new" : "edit",
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
    if (budget) {
      setValue("category", budget.category);
      setValue("amount", budget.budgetAmount.toString());
    }
  }, [budget]);

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{action} Budget</DialogTitle>
          <DialogDescription>
            {action} your budget for better financial management.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                          {budget
                            ? [...availableCategories, budget.category]?.map(
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
                <Label htmlFor="allocated" className="text-right">
                  Budget Amount
                </Label>
                <FormField
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Amount"
                          type="number"
                          step="0.01"
                          disabled={submitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleReset}
                className="cursor-pointer"
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
                  "Save Budget"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBudgetDialog;
