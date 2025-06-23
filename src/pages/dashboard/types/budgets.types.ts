export interface Budget {
  _id: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  spentPercentage: number;
}

export interface AddEditBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: string) => void;
  budget: Budget | null | undefined;
  onEditSave: (budgetId: string, updatedBudget: Partial<Budget>) => void;
  onNewSave: (budget: { category: string; budgetAmount: number }) => void;
  action: string;
  availableCategories: string[];
}

export interface BudgetFetchResponse {
  budget: Budget[];
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  totalSpentPercentage: number;
}
