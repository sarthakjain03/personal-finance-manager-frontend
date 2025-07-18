export interface Transaction {
  id: string;
  date: Date;
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
    date: Date;
    txnId?: string;
    reqType: "new" | "edit";
  }) => Promise<boolean>;
  action: string;
}
