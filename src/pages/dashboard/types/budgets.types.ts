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
  handleSave: ({
    category,
    budgetAmount,
    reqType,
    budgetId,
  }: {
    category: string;
    budgetAmount: number;
    reqType: "new" | "edit";
    budgetId?: string;
  }) => Promise<boolean>;
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
