export interface MonthlyCardsData {
  incomeStats: {
    currentMonth: number;
    lastMonth: number;
    percentChange: number;
  };
  spendingStats: {
    currentMonth: number;
    lastMonth: number;
    percentChange: number;
  };
}

export interface TrendChartObject {
  label: string;
  value: number;
}

export type TrendChartData = TrendChartObject[];

export interface BudgetSummaryChartObject {
  category: string;
  spentAmount: number;
  budgetAmount: number;
}

export type BudgetSummaryChartData = BudgetSummaryChartObject[];

export interface CategoryWiseExpensesObject {
  name: string;
  value: number;
}

export type CategoryWiseExpensesData = CategoryWiseExpensesObject[];
