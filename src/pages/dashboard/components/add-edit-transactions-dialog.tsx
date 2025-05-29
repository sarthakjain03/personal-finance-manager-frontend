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

const categories = [
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Income",
  "Shopping",
  "Bills & Utilities",
  "Health & Fitness",
  "Travel",
  "Education",
  "Housing",
  "Personal Care",
];

const AddEditTransactionDialog = ({
  open,
  onOpenChange,
  onNewSave,
  onEditSave,
  transaction,
  action,
}: AddEditTransactionDialogProps) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (action === "Edit" && transaction) {
        setDescription(transaction.description);
        setCategory(transaction.category);
        setType(transaction.type);
        setAmount(transaction.amount.toString());
        setDate(new Date(transaction.date));
    }
  }, [transaction])

  const handleReset = () => {
    onOpenChange("");
    setDescription("");
    setCategory("");
    setType("");
    setAmount("");
    setDate(new Date());
  }

  const handleSave = () => {
    if (description && category && type && amount && date) {
      if (action === "New") {
        onNewSave({
          description,
          category,
          type,
          amount:
            type === "expense"
              ? -Math.abs(parseFloat(amount))
              : Math.abs(parseFloat(amount)),
          date: format(date, "yyyy-MM-dd"),
        });
      } else if (transaction?.id) {
        onEditSave(transaction?.id, {
          description,
          category,
          type,
          amount:
            type === "expense"
              ? -Math.abs(parseFloat(amount))
              : Math.abs(parseFloat(amount)),
          date: format(date, "yyyy-MM-dd"),
        });
      }
      handleReset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => handleReset()}>
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

          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="type" className="text-right col-span-3">
              Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="col-span-9 w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
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
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
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
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleReset()}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTransactionDialog;
