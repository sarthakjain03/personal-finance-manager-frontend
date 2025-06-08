export interface BudgetSummaryI {
  category: string;
  spent: number;
  budget: number;
}

export interface CategoryWiseSpendingI {
  name: string;
  value: number;
  color: string;
}

export interface SpendingSummaryI {
  month: string;
  amount: number;
}
