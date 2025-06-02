export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  icon: string;
}

export interface AddEditBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: string) => void;
  budget: Budget | null | undefined;
  onEditSave: (budgetId: string, updatedBudget: Partial<Budget>) => void;
  onNewSave: (budget: {
    category: string;
    allocated: number;
    icon: string;
  }) => void;
  action: string;
}
