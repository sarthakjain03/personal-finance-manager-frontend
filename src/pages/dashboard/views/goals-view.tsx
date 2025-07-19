import {
  Target,
  Plus,
  TrendingUp,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddEditGoalDialog from "../components/add-edit-goal-dialog";
import DeleteConfirmDialog from "../components/delete-confirm-dialog";
import useGoals from "../hooks/use-goals";
import { format } from "date-fns";
import formatCurrency from "@/utils/currency-formatter";
import useUserStore from "@/store/user-store";

const GoalsView = () => {
  const { user } = useUserStore();
  const {
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
    setSelectedGoal,
  } = useGoals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Goals</h2>
          <p className="text-gray-600">
            Track your progress towards financial milestones
          </p>
        </div>
        <Button
          onClick={() => setGoalDialogOpen("new")}
          className="cursor-pointer bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          disabled={isLoading || goals?.length >= 25}
        >
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-6 text-gray-600/50 text-2xl col-span-2 pt-14">
            No Goals Added Yet
          </div>
        )}
        {goals?.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        goal.category
                      )}`}
                    >
                      {goal.category}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(goal)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Goal
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(goal)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Goal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(goal.currentAmount, user)}
                    </p>
                    <p className="text-sm text-gray-600">
                      of {formatCurrency(goal.targetAmount, user)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${getProgressColor(
                        progress
                      )}`}
                    >
                      {progress.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">Complete</p>
                  </div>
                </div>

                <Progress value={progress} className="h-3" />

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>
                      {formatCurrency(
                        goal.targetAmount - goal.currentAmount,
                        user
                      )}{" "}
                      to go
                    </span>
                  </div>
                  <span className="text-gray-500">
                    Due: {format(goal.deadline, "dd MMM yyyy")}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dialogs */}
      {goalDialogOpen !== "" && (
        <AddEditGoalDialog
          open={goalDialogOpen !== ""}
          onOpenChange={setGoalDialogOpen}
          handleSave={createOrEditGoal}
          goal={goalDialogOpen === "edit" ? selectedGoal : null}
          action={goalDialogOpen === "edit" ? "Edit" : "Create New"}
          availableCategories={availableCategories}
        />
      )}

      {selectedGoal && deleteGoalOpen ? (
        <DeleteConfirmDialog
          open={selectedGoal && deleteGoalOpen}
          onOpenChange={() => {
            setDeleteGoalOpen(false);
            setSelectedGoal(null);
          }}
          title="Goal"
          description={selectedGoal?.title || ""}
          onConfirm={() => deleteGoalFromId(selectedGoal.id)}
          isLoading={isLoading}
        />
      ) : null}
    </div>
  );
};

export default GoalsView;
