import { useEffect, useState } from "react";
import { Goal } from "../types/goals.types";
import { Categories } from "@/lib/constants/categories";
import { toast } from "sonner";
import getAllGoals from "../apis/goal/get-all-goals";
import deleteGoal from "../apis/goal/delete-goal";
import addOrEditGoal from "../apis/goal/add-edit-goal";

const useGoals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [deleteGoalOpen, setDeleteGoalOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

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

  const fetchAllGoals = async () => {
    setIsLoading(true);
    try {
      const response = await getAllGoals();
      if (response?.success && response?.data) {
        setGoals(response?.data);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  const createOrEditGoal = async (goal: {
    category: string;
    title: string;
    description: string;
    currentAmount: number;
    targetAmount: number;
    deadline: Date;
    reqType: "new" | "edit";
    goalId?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await addOrEditGoal({
        category: goal.category,
        title: goal.title,
        description: goal.description,
        currentAmount: goal.currentAmount,
        targetAmount: goal.targetAmount,
        deadline: goal.deadline,
        reqType: goal.reqType,
        goalId: goal.goalId,
      });
      if (response?.success && response?.data) {
        if (goal.reqType === "new") {
          setGoals((prev) => {
            if (response?.data) {
              return [...prev, response?.data];
            }
            return prev;
          });
        } else {
          setGoals((prev) => {
            if (response?.data) {
              return prev.map((goal) =>
                goal.id === response?.data?.id
                  ? {
                      ...goal,
                      ...response?.data,
                    }
                  : goal
              );
            }
            return prev;
          });
        }
        setGoalDialogOpen("");
        toast.success(response?.message);
        setIsLoading(false);
        return true;
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving goal");
    }
    setIsLoading(false);
    return false;
  };

  const deleteGoalFromId = async (goalId: string) => {
    setIsLoading(true);
    try {
      const response = await deleteGoal(goalId);
      if (response?.success) {
        setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
        setSelectedGoal(null);
        toast.success(response?.message);
        setDeleteGoalOpen(false);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting goal");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllGoals();
  }, []);

  useEffect(() => {
    setAvailableCategories(
      Categories.filter(
        (cat) => !goals?.some((budget) => budget.category === cat)
      )
    );
  }, [goals]);

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
    createOrEditGoal,
    deleteGoalFromId,
    availableCategories,
  };
};

export default useGoals;
