import { useEffect, useState } from "react";
import { Goal } from "../types/goals.types";

const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Emergency Fund",
      description: "Build a 6-month emergency fund",
      current: 8200,
      target: 15000,
      category: "Savings",
      deadline: "Dec 2025",
    },
    {
      id: 2,
      title: "Vacation to Europe",
      description: "Save for a 2-week European vacation",
      current: 3500,
      target: 8000,
      category: "Travel",
      deadline: "Jun 2025",
    },
    {
      id: 3,
      title: "New Car",
      description: "Save for a reliable used car",
      current: 12000,
      target: 20000,
      category: "Transportation",
      deadline: "Aug 2025",
    },
    {
      id: 4,
      title: "Home Down Payment",
      description: "Save for a house down payment",
      current: 25000,
      target: 60000,
      category: "Housing",
      deadline: "Dec 2026",
    },
  ]);

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

  const handleNewGoal = (newGoal: Omit<Goal, "id" | "current">) => {
    const goal: Goal = {
      ...newGoal,
      id: Math.max(...goals.map((g) => g.id)) + 1,
      current: 0,
    };
    setGoals([...goals, goal]);
  };

  const handleEditGoal = (goalId: number, updatedGoal: Partial<Goal>) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId ? { ...goal, ...updatedGoal } : goal
      )
    );
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
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
    handleNewGoal,
    handleEditGoal,
    handleDeleteGoal,
    getCategoryColor,
    getProgressColor,
  };
};

export default useGoals;
