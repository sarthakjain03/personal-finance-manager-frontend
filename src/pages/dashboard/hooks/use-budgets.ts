import { useEffect, useState } from "react";
import { Budget } from "../types/budgets.types";
import { Categories } from "@/lib/constants/categories";
import { toast } from "sonner";
import getAllBudgets from "../apis/budget/get-all-budgets";
import addNewBudget from "../apis/budget/add-new-budget";

const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [deleteBudgetOpen, setDeleteBudgetOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [totals, setTotals] = useState({
    totalAllocated: 0,
    totalSpent: 0,
    totalRemaining: 0,
    totalSpentPercentage: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllBudgets = async () => {
    setIsLoading(true);
    try {
      const response = await getAllBudgets();
      if (response?.success && response?.data) {
        setBudgets(response?.data.budget);
        setTotals({
          totalAllocated: response?.data.totalBudget,
          totalSpent: response?.data.totalSpent,
          totalRemaining: response?.data.totalRemaining,
          totalSpentPercentage: response?.data.totalSpentPercentage,
        });
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  const createBudget = async (budget: {
    category: string;
    budgetAmount: number;
  }) => {
    setIsLoading(true);
    try {
      const response = await addNewBudget({
        category: budget.category,
        budgetAmount: budget.budgetAmount,
      });
      if (response?.success && response?.data) {
        setBudgets((prev) => {
          if (response?.data?.budget) {
            return [...prev, response?.data?.budget];
          }
          return prev;
        });
        setTotals({
          totalAllocated: response?.data.totalBudget,
          totalSpent: response?.data.totalSpent,
          totalRemaining: response?.data.totalRemaining,
          totalSpentPercentage: response?.data.totalSpentPercentage,
        });
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding budget");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllBudgets();
  }, []);

  useEffect(() => {
    setAvailableCategories(
      Categories.filter(
        (cat) => !budgets?.some((budget) => budget.category === cat)
      )
    );
  }, [budgets]);

  const getStatusColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return "text-red-600";
    if (percentage > 80) return "text-yellow-600";
    return "text-green-600";
  };

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return "bg-red-500";
    if (percentage > 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleCreateBudget = () => {
    setSelectedBudget(null);
    setIsBudgetDialogOpen("new");
  };

  const handleEditBudget = (budget: Budget) => {
    setSelectedBudget(budget);
    setIsBudgetDialogOpen("edit");
  };

  const handleSaveEditBudget = (updatedBudget: Budget) => {
    setBudgets(
      budgets.map((budget) =>
        budget._id === updatedBudget._id
          ? {
              ...budget,
              category: updatedBudget.category,
              budgetAmount: updatedBudget.budgetAmount,
              remaining: updatedBudget.budgetAmount - budget.spentAmount,
            }
          : budget
      )
    );
  };

  const handleDeleteBudget = (budget: (typeof budgets)[0]) => {
    setSelectedBudget(budget);
    setDeleteBudgetOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBudget) {
      setBudgets(budgets.filter((budget) => budget._id !== selectedBudget._id));
      setSelectedBudget(null);
    }
  };

  return {
    deleteBudgetOpen,
    setDeleteBudgetOpen,
    selectedBudget,
    setSelectedBudget,
    budgets,
    setBudgets,
    isBudgetDialogOpen,
    setIsBudgetDialogOpen,
    availableCategories,
    totals,
    isLoading,
    createBudget,
    getStatusColor,
    getProgressColor,
    handleCreateBudget,
    handleEditBudget,
    handleSaveEditBudget,
    handleDeleteBudget,
    handleConfirmDelete,
  };
};

export default useBudgets;
