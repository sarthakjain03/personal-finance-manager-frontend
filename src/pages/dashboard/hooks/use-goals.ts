import { useEffect, useState } from "react";
import { Goal } from "../types/goals.types";

const useGoals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [deleteGoalOpen, setDeleteGoalOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Savings: "bg-green-100 text-green-800",
      Travel: "bg-blue-100 text-blue-800",
      Transportation: "bg-yellow-100 text-yellow-800",
      Housing: "bg-purple-100 text-purple-800",
      Education: "bg-indigo-100 text-indigo-800",
      Investment: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-blue-600";
  };

  const openEditDialog = (goal: Goal) => {
    setSelectedGoal(goal);
    setGoalDialogOpen("edit");
  };

  const openDeleteDialog = (goal: Goal) => {
    setSelectedGoal(goal);
    setDeleteGoalOpen(true);
  };

  return {
    goals,
    goalDialogOpen,
    setGoalDialogOpen,
    deleteGoalOpen,
    setDeleteGoalOpen,
    selectedGoal,
    openEditDialog,
    openDeleteDialog,
    getCategoryColor,
    getProgressColor,
    isLoading,
  };
};

export default useGoals;
