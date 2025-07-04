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
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AddEditTransactionDialogProps } from "../types/transactions.types";
import { Categories, CategoryIcons } from "@/lib/constants/categories";

const AddEditTransactionDialog = ({
  open,
  onOpenChange,
  handleSave,
  transaction,
  action,
}: AddEditTransactionDialogProps) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"Income" | "Expense" | "">("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (action === "Edit" && transaction) {
      setDescription(transaction.description);
      setCategory(transaction.category);
      setType(transaction.transactionType);
      setAmount(transaction.amount.toString());
      setDate(new Date(transaction.date));
    }
  }, [transaction]);

  const handleReset = () => {
    onOpenChange("");
    setDescription("");
    setCategory("");
    setType("");
    setAmount("");
    setDate(new Date());
  };

  const handleSaveClick = async () => {
    if (description && category && type && amount && date) {
      setSubmitting(true);
      const success = await handleSave({
        description,
        category,
        transactionType: type,
        amount: parseFloat(amount),
        date,
        txnId: transaction?.id,
        reqType: action === "New" ? "new" : "edit",
      });
      if (success) {
        handleReset();
      }
      setSubmitting(false);
    }
  };

  const handleOnOpenChange = () => {
    if (!submitting) {
      handleReset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{action} Transaction</DialogTitle>
          <DialogDescription>
            {action} transaction to track your spending or income.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Enter Description"
              disabled={submitting}
            />
          </div>

          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="category" className="text-right col-span-3">
              Category
            </Label>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={submitting}
            >
              <SelectTrigger className="col-span-9 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Categories?.map((cat) => (
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

          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="type" className="text-right col-span-3">
              Type
            </Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as any)}
              disabled={submitting}
            >
              <SelectTrigger className="col-span-9 w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              placeholder="Enter Amount"
              step="0.01"
              disabled={submitting}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Date</Label>
            <Popover>
              <PopoverTrigger asChild disabled={submitting}>
                <Button
                  variant="outline"
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  disabled={submitting}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleReset()}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveClick} disabled={submitting}>
            Save Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTransactionDialog;
