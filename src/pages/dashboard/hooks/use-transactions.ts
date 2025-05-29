import { useEffect, useState } from "react";
import { Transaction } from "../types/transactions.types";
import { TransactionColumns } from "../components/transactions-table";

const initialTransactions: Transaction[] = [
  {
    id: "1",
    description: "Grocery Shopping",
    amount: -85.5,
    category: "Food & Dining",
    date: "2025-01-20",
    merchant: "Whole Foods",
    type: "expense",
  },
  {
    id: "2",
    description: "Salary",
    amount: 5200.0,
    category: "Income",
    date: "2025-01-18",
    merchant: "Acme Corp",
    type: "income",
  },
  {
    id: "3",
    description: "Gas",
    amount: -45.2,
    category: "Transportation",
    date: "2025-01-19",
    merchant: "Shell",
    type: "expense",
  },
  {
    id: "4",
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    date: "2025-01-18",
    merchant: "Netflix",
    type: "expense",
  },
  {
    id: "5",
    description: "Clothes Shopping",
    amount: -129.99,
    category: "Shopping",
    date: "2025-01-17",
    merchant: "Zara",
    type: "expense",
  },
  {
    id: "6",
    description: "Interest Earned",
    amount: 2.5,
    category: "Income",
    date: "2025-01-14",
    merchant: "Bank",
    type: "income",
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
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [deleteTransactionOpen, setDeleteTransactionOpen] = useState(false);

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

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDialogOpen("edit");
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setDeleteTransactionOpen(true);
  };

  return {
    setSearch,
    search,
    setDateRange,
    dateRange,
    transactions,
    setIsTransactionDialogOpen,
    isTransactionDialogOpen,
    setSelectedTransaction,
    selectedTransaction,
    tableColumns: TransactionColumns({
      handleEdit: handleEditTransaction,
      handleDelete: handleDeleteTransaction,
    }),
    setDeleteTransactionOpen,
    deleteTransactionOpen,
  };
};

export default useTransactions;
