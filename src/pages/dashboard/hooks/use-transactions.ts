import { useEffect, useState } from "react";
import { Transaction } from "../types/transactions.types";
import { TransactionColumns } from "../components/transactions-table";
import { toast } from "sonner";
import getAllTransactions from "../apis/transactions/get-all-transactions";

const limit = 20;

const useTransactions = () => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [deleteTransactionOpen, setDeleteTransactionOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTransactions({
        limit,
        page,
      });
      if (response?.success && response?.data) {
        setTransactions((prev) => [...prev, ...(response?.data ?? [])]);
        if (response?.data.length < limit) {
          setHasMoreData(false);
        }
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  const createOrEditTransaction = async (transaction: {
    description: string;
    category: string;
    transactionType: string;
    amount: number;
    date: Date;
    txnId?: string;
    reqType: "new" | "edit";
  }) => {
    setIsLoading(true);
    try {
      const response = true;
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving goal");
    }
    setIsLoading(false);
    return false;
  };

  const deleteTransactionFromId = async (txnId: string) => {
    setIsLoading(true);
    try {
      // const response = await deleteGoal(txnId);
      // if (response?.success) {
      //   setTransactions((prev) => prev.filter((txn) => txn.id !== txnId));
      //   setSelectedTransaction(null);
      //   toast.success(response?.message);
      //   setDeleteTransactionOpen(false);
      // } else {
      //   toast.error(response?.message);
      // }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting transaction");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (hasMoreData) {
      fetchTransactions();
    }
  }, [page]);

  useEffect(() => {
    // Filter transactions:
    const filteredTransactions: Transaction[] = transactions?.filter((tx) => {
      // Search filter:
      const matchesSearch =
        search?.length === 0 ||
        tx.description?.toLowerCase().includes(search.toLowerCase());

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
    });
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
    selectedTransaction,
    tableColumns: TransactionColumns({
      handleEdit: handleEditTransaction,
      handleDelete: handleDeleteTransaction,
    }),
    setDeleteTransactionOpen,
    deleteTransactionOpen,
    createOrEditTransaction,
    availableCategories,
    isLoading,
    hasMoreData,
    page,
    setPage,
    deleteTransactionFromId,
  };
};

export default useTransactions;
