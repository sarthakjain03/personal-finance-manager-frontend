import { useEffect, useState } from "react";
import {
  MonthlyCardsData,
  CategoryWiseExpensesData,
  BudgetSummaryChartData,
  TrendChartData,
} from "../types/summary.types";
import getMonthlyCardsData from "../apis/summary/get-monthly-cards-data";
import getCategoryWiseExpenses from "../apis/summary/get-category-wise-expenses";
import getBudgetChartData from "../apis/summary/get-budget-chart-data";
import getTrendChartData from "../apis/summary/get-trend-chart-data";
import { toast } from "sonner";

const useSummary = () => {
  const [loading, setLoading] = useState(false);
  const [monthlyCardsData, setMonthlyCardsData] =
    useState<MonthlyCardsData | null>(null);
  const [categoryPieChartData, setCategoryPieChartData] =
    useState<CategoryWiseExpensesData>([]);
  const [pieChartTimeline, setPieChartTimeline] = useState<string>("month");
  const [pieChartLoading, setPieChartLoading] = useState(false);
  const [budgetChartLoading, setBudgetChartLoading] = useState(false);
  const [budgetChartData, setBudgetChartData] =
    useState<BudgetSummaryChartData>([]);
  const [spendTrendChartLoading, setSpendTrendChartLoading] = useState(false);
  const [spendTrendChartData, setSpendTrendChartData] =
    useState<TrendChartData>([]);
  const [spendTrendChartTimeline, setSpendTrendChartTimeline] =
    useState<string>("month");

  const fetchMonthlyCardsData = async () => {
    setLoading(true);
    try {
      const response = await getMonthlyCardsData();
      if (response?.success && response?.data) {
        setMonthlyCardsData(response?.data);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const fetchCategoryWiseExpensesData = async () => {
    setPieChartLoading(true);
    try {
      if (pieChartTimeline !== "year" && pieChartTimeline !== "month") return;
      const response = await getCategoryWiseExpenses(pieChartTimeline);
      if (response?.success && response?.data) {
        setCategoryPieChartData(response?.data);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setPieChartLoading(false);
  };

  const fetchBudgetChartData = async () => {
    setBudgetChartLoading(true);
    try {
      const response = await getBudgetChartData();
      if (response?.success && response?.data) {
        setBudgetChartData(response?.data);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setBudgetChartLoading(false);
  };

  const fetchTrendChartData = async () => {
    setSpendTrendChartLoading(true);
    try {
      if (
        spendTrendChartTimeline !== "year" &&
        spendTrendChartTimeline !== "month"
      )
        return;
      const response = await getTrendChartData({
        type: "expense",
        timeline: spendTrendChartTimeline,
      });
      if (response?.success && response?.data) {
        const sortedData = response?.data?.sort((a, b) => {
          const dateA = new Date(a.label);
          const dateB = new Date(b.label);
          return dateA.getTime() - dateB.getTime();
        });
        setSpendTrendChartData(sortedData);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setSpendTrendChartLoading(false);
  };

  useEffect(() => {
    fetchMonthlyCardsData();
    fetchBudgetChartData();
  }, []);

  useEffect(() => {
    fetchCategoryWiseExpensesData();
  }, [pieChartTimeline]);

  useEffect(() => {
    fetchTrendChartData();
  }, [spendTrendChartTimeline]);

  return {
    loading,
    monthlyCardsData,
    categoryPieChartData,
    pieChartTimeline,
    pieChartLoading,
    budgetChartLoading,
    budgetChartData,
    spendTrendChartLoading,
    spendTrendChartData,
    spendTrendChartTimeline,
    fetchMonthlyCardsData,
    fetchCategoryWiseExpensesData,
    fetchBudgetChartData,
    fetchTrendChartData,
    setPieChartTimeline,
    setSpendTrendChartTimeline,
  };
};

export default useSummary;
