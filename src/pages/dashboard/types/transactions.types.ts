export interface Transaction {
  id: string;
  date: string;
  description: string;
  merchant: string;
  category: string;
  type: string;
  amount: number;
}

export interface AddEditTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: string) => void;
  transaction: Transaction | null | undefined;
  onEditSave: (txnId: string, updatedTxn: Partial<Transaction>) => void;
  onNewSave: (transaction: {
    description: string;
    category: string;
    type: string;
    amount: number;
    date: string;
  }) => void;
  action: string;
}
