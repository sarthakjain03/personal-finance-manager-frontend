import { useEffect, useState } from "react";
import { Transaction } from "../types/transactions.types";

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

const useTransactions = () => {
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

  return { setSearch, search, setDateRange, dateRange, transactions };
};

export default useTransactions;
