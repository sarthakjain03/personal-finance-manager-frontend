import { useState } from "react";
import { Budget } from "../types/budgets.types";

const initialBudgets: Budget[] = [
  {
    id: "1",
    category: "Food & Dining",
    allocated: 1500,
    spent: 1200,
    remaining: 300,
    icon: "🍽️",
  },
  {
    id: "2",
    category: "Transportation",
    allocated: 1000,
    spent: 800,
    remaining: 200,
    icon: "🚗",
  },
  {
    id: "3",
    category: "Entertainment",
    allocated: 800,
    spent: 650,
    remaining: 150,
    icon: "🎬",
  },
  {
    id: "4",
    category: "Shopping",
    allocated: 700,
    spent: 920,
    remaining: -220,
    icon: "🛍️",
  },
  {
    id: "5",
    category: "Bills & Utilities",
    allocated: 1200,
    spent: 1100,
    remaining: 100,
    icon: "💡",
  },
  {
    id: "6",
    category: "Health & Fitness",
    allocated: 400,
    spent: 180,
    remaining: 220,
    icon: "💪",
  },
];

const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [deleteBudgetOpen, setDeleteBudgetOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState("");

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
        budget.id === updatedBudget.id
          ? {
              ...budget,
              category: updatedBudget.category,
              allocated: updatedBudget.allocated,
              remaining: updatedBudget.allocated - budget.spent,
              icon: updatedBudget.icon,
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
      setBudgets(budgets.filter((budget) => budget.id !== selectedBudget.id));
      setSelectedBudget(null);
    }
  };

  const totalAllocated = budgets.reduce(
    (sum, budget) => sum + budget.allocated,
    0
  );
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  return {
    deleteBudgetOpen,
    setDeleteBudgetOpen,
    selectedBudget,
    setSelectedBudget,
    budgets,
    setBudgets,
    isBudgetDialogOpen,
    setIsBudgetDialogOpen,
    totalAllocated,
    totalSpent,
    totalRemaining,
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
