import { useEffect, useState } from "react";
import useResponsive from "@/hooks/use-responsive";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, CalendarIcon, XCircle } from "lucide-react";
import { Transaction } from "./types/transactions-table-types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TransactionsTable from "./components/transactions-table";

const initialTransactions: Transaction[] = [
  {
    description: "Grocery Shopping",
    amount: -85.5,
    category: "Food",
    date: "2025-01-20",
    merchant: "Whole Foods",
    type: "Expense",
  },
  {
    description: "Salary",
    amount: 5200.0,
    category: "Income",
    date: "2025-01-18",
    merchant: "Acme Corp",
    type: "Income",
  },
  {
    description: "Gas",
    amount: -45.2,
    category: "Transport",
    date: "2025-01-19",
    merchant: "Shell",
    type: "Expense",
  },
  {
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    date: "2025-01-18",
    merchant: "Netflix",
    type: "Expense",
  },
  {
    description: "Clothes Shopping",
    amount: -129.99,
    category: "Shopping",
    date: "2025-01-17",
    merchant: "Zara",
    type: "Expense",
  },
  {
    description: "Interest Earned",
    amount: 2.5,
    category: "Income",
    date: "2025-01-14",
    merchant: "Bank",
    type: "Income",
  },
];

const categories = [
  "All",
  "Food",
  "Income",
  "Transport",
  "Entertainment",
  "Shopping",
];

const TransactionsTabView = () => {
  const { isMobile } = useResponsive();
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  useEffect(() => {
    // Filter transactions:
    const filteredTransactions: Transaction[] = initialTransactions?.filter(
      (tx) => {
        // Search filter:
        const matchesSearch =
          search?.length === 0 ||
          tx.description?.toLowerCase().includes(search.toLowerCase()) ||
          tx.merchant?.toLowerCase().includes(search.toLowerCase());

        // Date range filter:
        let matchesDate = true;
        const txDate = new Date(tx.date);
        if (dateRange?.from && dateRange?.to) {
          const endDate = new Date(dateRange?.to?.setHours(23, 59, 59, 59));
          matchesDate = txDate >= dateRange?.from && txDate <= endDate;
        } else if (dateRange?.from) {
          matchesDate = txDate >= dateRange?.from;
        } else if (dateRange?.to) {
          const endDate = new Date(dateRange?.to?.setHours(23, 59, 59, 59));
          matchesDate = txDate <= endDate;
        }

        return matchesSearch && matchesDate;
      }
    );
    setTransactions(filteredTransactions);
  }, [dateRange, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-gray-600">
            View and filter all your account activity
          </p>
        </div>
      </div>
      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            All your incoming and outgoing transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus={false}
                />
              </div>
              {/* Date Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="outline"
                      className={cn(
                        "flex gap-2 justify-start text-left font-normal"
                      )}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {dateRange?.from && dateRange?.to
                        ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(
                            dateRange.to,
                            "MMM d, yyyy"
                          )}`
                        : dateRange.from
                        ? `${format(dateRange.from, "MMM d, yyyy")}`
                        : "Select Date Range"}
                    </Button>
                    {dateRange?.from && dateRange?.to && (
                      <XCircle
                        className="h-4 w-4 cursor-pointer"
                        onClick={() =>
                          setDateRange({ from: undefined, to: undefined })
                        }
                      />
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange as any}
                    className={cn("p-3 pointer-events-auto")}
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <TransactionsTable data={transactions || []} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsTabView;
