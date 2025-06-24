export interface Goal {
  id: string;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  category: string;
  deadline: Date;
}

export interface AddEditGoalDialogProps {
  open: boolean;
  onOpenChange: (open: string) => void;
  handleSave: ({
    title,
    description,
    currentAmount,
    targetAmount,
    category,
    deadline,
    reqType,
    goalId,
  }: {
    reqType: "new" | "edit";
    goalId?: string;
    title: string;
    description: string;
    currentAmount: number;
    targetAmount: number;
    category: string;
    deadline: Date;
  }) => Promise<boolean>;
  goal?: Goal | null | undefined;
  action: string;
  availableCategories: string[];
}
