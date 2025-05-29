export interface Goal {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  category: string;
  deadline: string;
}

export interface AddEditGoalDialogProps {
  open: boolean;
  onOpenChange: (open: string) => void;
  onEditSave: (goalId: string, updatedGoal: Partial<Goal>) => void;
  onNewSave: (goal: {
    title: string;
    description: string;
    target: number;
    category: string;
    deadline: string;
  }) => void;
  goal?: Goal | null | undefined;
  action: string;
}
