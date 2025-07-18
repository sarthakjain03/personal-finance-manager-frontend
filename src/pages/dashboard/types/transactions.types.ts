export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  transactionType: "Income" | "Expense";
  amount: number;
}

export interface AddEditTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: string) => void;
  transaction: Transaction | null | undefined;
  handleSave: ({
    description,
    category,
    transactionType,
    amount,
    date,
    txnId,
    reqType,
  }: {
    description: string;
    category: string;
    transactionType: "Income" | "Expense";
    amount: number;
    date: string;
    txnId?: string;
    reqType: "new" | "edit";
  }) => Promise<boolean>;
  action: string;
}
