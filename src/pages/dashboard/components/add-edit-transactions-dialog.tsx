import { useEffect, useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AddEditTransactionDialogProps } from "../types/transactions.types";
import {
  CategoryIcons,
  TransactionCategories,
} from "@/lib/constants/categories";

const formSchema = z
  .object({
    description: z
      .string()
      .min(1, "Description is required")
      .max(50, "Description must be less than 50 characters")
      .regex(
        /^[A-Za-z\s]+$/,
        "Description must only contain letters and spaces"
      ),
    category: z.string().min(1, "Category is required"),
    type: z.enum(["Income", "Expense"]),
    amount: z
      .string()
      .min(1, "Amount is required")
      .regex(/^\d+$/, "Amount must contain only numbers"),
    date: z.date(),
  })
  .refine(
    (data) => {
      const amount = parseInt(data.amount, 10);
      return amount >= 100 && amount <= 1_000_000;
    },
    {
      message: "Amount must be between 100 and 1000000",
      path: ["amount"],
    }
  );

const AddEditTransactionDialog = ({
  open,
  onOpenChange,
  handleSave,
  transaction,
  action,
}: AddEditTransactionDialogProps) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      category: "",
      type: "Expense",
      amount: "",
      date: new Date(),
    },
  });

  const { handleSubmit, control, reset, watch, setValue } = form;

  const handleReset = () => {
    onOpenChange("");
    reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    const success = await handleSave({
      description: values.description,
      category: values.category,
      transactionType: values.type,
      amount: parseFloat(values.amount),
      date: values.date,
      txnId: transaction?.id,
      reqType: action === "New" ? "new" : "edit",
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
    if (action === "Edit" && transaction) {
      setValue("description", transaction.description);
      setValue("category", transaction.category);
      setValue("type", transaction.transactionType);
      setValue("amount", transaction.amount.toString());
      setValue("date", new Date(transaction.date));
    }
  }, [transaction]);

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{action} Transaction</DialogTitle>
          <DialogDescription>
            {action} transaction to track your spending or income.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                        <Input
                          {...field}
                          placeholder="Enter Description"
                          disabled={submitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="type" className="text-right col-span-3">
                  Type
                </Label>
                <FormField
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="col-span-9">
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={submitting}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Income">Income</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
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
                          {TransactionCategories[watch("type")]?.map((cat) => (
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
                <Label htmlFor="amount" className="text-right">
                  Amount
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

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Date</Label>
                <FormField
                  control={control}
                  name="date"
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
                              <span>Pick a date</span>
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
                            toDate={new Date()}
                            captionLayout="dropdown"
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
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleReset()}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer flex items-center gap-2 justify-center"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={14} color="#fff" />
                    Saving...
                  </>
                ) : (
                  "Save Transaction"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTransactionDialog;
