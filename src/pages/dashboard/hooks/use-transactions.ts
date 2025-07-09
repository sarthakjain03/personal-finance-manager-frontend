import { useEffect, useState, useRef } from "react";
import { Transaction } from "../types/transactions.types";
import { TransactionColumns } from "../components/transactions-table";
import { toast } from "sonner";
import getAllTransactions from "../apis/transactions/get-all-transactions";
import addOrEditTransaction from "../apis/transactions/add-edit-transaction";
import deleteTransaction from "../apis/transactions/delete-transaction";
import useUserStore from "@/store/user-store";

interface Filters {
  category: string;
  type: string;
  dateRange: { from: Date | undefined; to: Date | undefined };
  search: string;
}

const limit = 20;

const useTransactions = () => {
  const { setUser, user } = useUserStore();
  const [filters, setFilters] = useState<Filters>({
    category: "",
    type: "",
    dateRange: { from: undefined, to: undefined },
    search: "",
  });
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>({
    category: "",
    type: "",
    dateRange: { from: undefined, to: undefined },
    search: "",
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [deleteTransactionOpen, setDeleteTransactionOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      let payloadToDate: Date | undefined = undefined;
      if (debouncedFilters.dateRange.to) {
        payloadToDate = new Date(debouncedFilters.dateRange.to);
        payloadToDate.setDate(payloadToDate.getDate() + 1);
      }
      const response = await getAllTransactions({
        limit,
        page,
        fromDate: debouncedFilters.dateRange.from,
        toDate: payloadToDate,
        search: debouncedFilters.search,
        category: debouncedFilters.category,
        type: debouncedFilters.type,
      });
      if (response?.success && response?.data) {
        if (page === 1) {
          setTransactions(response?.data);
        } else {
          setTransactions((prev) => [...prev, ...(response?.data ?? [])]);
        }
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
    transactionType: "" | "Income" | "Expense";
    amount: number;
    date: Date;
    txnId?: string;
    reqType: "new" | "edit";
  }) => {
    setIsLoading(true);
    try {
      const response = await addOrEditTransaction({
        category: transaction.category,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
        reqType: transaction.reqType,
        txnId: transaction.txnId,
        transactionType: transaction.transactionType,
      });
      if (response?.success && response?.data) {
        if (transaction.reqType === "new") {
          setTransactions((prev) => {
            if (response?.data?.transaction) {
              return [response?.data?.transaction, ...prev];
            }
            return prev;
          });
        } else {
          setTransactions((prev) => {
            if (response?.data) {
              return prev.map((txn) =>
                txn.id === response?.data?.transaction?.id
                  ? {
                      ...txn,
                      ...response?.data?.transaction,
                    }
                  : txn
              );
            }
            return prev;
          });
        }
        if (user) {
          setUser({
            ...user,
            currentBalance: response?.data?.currentBalance,
          });
        }
        setIsTransactionDialogOpen("");
        toast.success(response?.message);
        setIsLoading(false);
        return true;
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving transaction");
    }
    setIsLoading(false);
    return false;
  };

  const deleteTransactionFromId = async (txnId: string) => {
    setIsLoading(true);
    try {
      const response = await deleteTransaction(txnId);
      if (response?.success && response?.data) {
        setTransactions((prev) => prev.filter((txn) => txn.id !== txnId));
        setSelectedTransaction(null);
        toast.success(response?.message);
        setDeleteTransactionOpen(false);
        if (user) {
          setUser({
            ...user,
            currentBalance: response?.data?.currentBalance,
          });
        }
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting transaction");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (hasMoreData || page === 1) {
      fetchTransactions();
    }
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      fetchTransactions();
    } else {
      setPage(1);
    }
  }, [debouncedFilters]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [filters]);

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDialogOpen("edit");
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setDeleteTransactionOpen(true);
  };

  return {
    filters,
    setFilters,
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
    isLoading,
    hasMoreData,
    page,
    setPage,
    deleteTransactionFromId,
  };
};

export default useTransactions;
