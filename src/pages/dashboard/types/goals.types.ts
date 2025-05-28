export interface Goal {
  id: number;
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
  onEditSave: (goalId: number, updatedGoal: Partial<Goal>) => void;
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
