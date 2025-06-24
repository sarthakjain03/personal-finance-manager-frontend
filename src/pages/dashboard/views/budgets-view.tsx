import useResponsive from "@/hooks/use-responsive";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Wallet,
  Plus,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useBudgets from "../hooks/use-budgets";
import AddEditBudgetDialog from "../components/add-edit-budget-dialog";
import DeleteConfirmDialog from "../components/delete-confirm-dialog";
import { CategoryIcons } from "@/lib/constants/categories";

const BudgetsView = () => {
  const { isMobile } = useResponsive();
  const {
    deleteBudgetOpen,
    setDeleteBudgetOpen,
    totals,
    isLoading,
    availableCategories,
    handleDeleteBudget,
    handleEditBudget,
    handleCreateBudget,
    budgets,
    createOrEditBudget,
    deleteBudgetFromId,
    selectedBudget,
    getStatusColor,
    isBudgetDialogOpen,
    setIsBudgetDialogOpen,
  } = useBudgets();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Budget Management
          </h2>
          <p className="text-gray-600">
            Monitor and control your spending across categories
          </p>
        </div>
        <Button
          onClick={handleCreateBudget}
          className="cursor-pointer bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
        >
          <Plus className="w-4 h-4" />
          Create Budget
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white gap-0">
          <CardHeader className="">
            <CardTitle className="text-sm font-medium opacity-90">
              Total Allocated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totals.totalAllocated.toLocaleString()}
            </div>
            <p className="text-xs opacity-90">Monthly budget</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow gap-0">
          <CardHeader className="">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totals.totalSpent.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">
              {totals.totalSpentPercentage}% of budget
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow gap-0">
          <CardHeader className="">
            <CardTitle className="text-sm font-medium text-gray-600">
              Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                totals.totalRemaining >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {Math.abs(totals.totalRemaining).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">
              {totals.totalRemaining >= 0 ? "Under budget" : "Over budget"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          return (
            <Card key={budget.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {CategoryIcons[budget.category]}
                    </span>
                    <div>
                      <CardTitle className="text-lg">
                        {budget.category}
                      </CardTitle>
                      <CardDescription>
                        Monthly budget allocation
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusColor(
                      budget.spentAmount,
                      budget.budgetAmount
                    )?.includes("red") ? (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    ) : getStatusColor(
                        budget.spentAmount,
                        budget.budgetAmount
                      )?.includes("yellow") ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditBudget(budget)}
                        className="cursor-pointer h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBudget(budget)}
                        className="cursor-pointer h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {budget.spentAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      of {budget.budgetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${getStatusColor(
                        budget.spentAmount,
                        budget.budgetAmount
                      )}`}
                    >
                      {budget.spentPercentage}%
                    </p>
                    <p className="text-xs text-gray-500">Used</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={budget.spentPercentage} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span
                      className={
                        budget.remainingAmount >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {budget.remainingAmount >= 0
                        ? "Remaining"
                        : "Over budget"}
                      : {Math.abs(budget.remainingAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add/Edit Budget Dialog */}
      {isBudgetDialogOpen !== "" && (
        <AddEditBudgetDialog
          open={isBudgetDialogOpen !== ""}
          onOpenChange={setIsBudgetDialogOpen}
          budget={selectedBudget}
          handleSave={createOrEditBudget}
          availableCategories={availableCategories}
          action={isBudgetDialogOpen === "new" ? "Create" : "Edit"}
        />
      )}

      {deleteBudgetOpen && selectedBudget && (
        <DeleteConfirmDialog
          open={deleteBudgetOpen}
          onOpenChange={setDeleteBudgetOpen}
          title={"Budget"}
          description={selectedBudget?.category || ""}
          onConfirm={() => deleteBudgetFromId(selectedBudget.id)}
        />
      )}
    </div>
  );
};

export default BudgetsView;
