import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  SpendingSummaryI,
  CategoryWiseSpendingI,
  BudgetSummaryI,
} from "../types/summary.types";
import { cn } from "@/lib/utils";
import { MonthlyCardsData } from "../types/summary.types";
import getMonthlyCardsData from "../apis/summary/get-monthly-cards-data";
import { toast } from "sonner";

const spendingData: SpendingSummaryI[] = [
  { month: "Jan", amount: 2400 },
  { month: "Feb", amount: 2800 },
  { month: "Mar", amount: 2200 },
  { month: "Apr", amount: 3200 },
  { month: "May", amount: 2900 },
  { month: "Jun", amount: 3400 },
];

const categoryData: CategoryWiseSpendingI[] = [
  { name: "Food", value: 1200, color: "#3B82F6" },
  { name: "Transport", value: 800, color: "#10B981" },
  { name: "Entertainment", value: 600, color: "#F59E0B" },
  { name: "Shopping", value: 900, color: "#EF4444" },
  { name: "Bills", value: 1100, color: "#8B5CF6" },
];

const budgetData: BudgetSummaryI[] = [
  { category: "Food", spent: 1200, budget: 1500 },
  { category: "Transport", spent: 800, budget: 1000 },
  { category: "Entertainment", spent: 600, budget: 800 },
  { category: "Shopping", spent: 900, budget: 700 },
];

const SummaryView = () => {
  const [loading, setLoading] = useState(false);
  const [monthlyCardsData, setMonthlyCardsData] =
    useState<MonthlyCardsData | null>(null);

  const fetchMonthlyCardsData = async () => {
    try {
      const response = await getMonthlyCardsData();
      if (response?.success) {
        setMonthlyCardsData(response?.data);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const getAllSummaryData = async () => {
    setLoading(true);
    await fetchMonthlyCardsData();
    setLoading(false);
  };

  useEffect(() => {
    getAllSummaryData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow gap-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-medium text-gray-600">
              Monthly Income
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {monthlyCardsData?.incomeStats?.currentMonth ?? 0}
            </div>
            <p
              className={cn(
                "text-xs flex items-center gap-1 mt-1",
                monthlyCardsData?.incomeStats?.percentChange && [
                  monthlyCardsData?.incomeStats?.percentChange === 0 &&
                    "text-gray-500",
                  monthlyCardsData?.incomeStats?.percentChange < 0 &&
                    "text-red-600",
                  monthlyCardsData?.incomeStats?.percentChange > 0 &&
                    "text-green-600",
                ]
              )}
            >
              {monthlyCardsData?.incomeStats?.percentChange && (
                <>
                  {monthlyCardsData?.incomeStats?.percentChange > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                </>
              )}
              {monthlyCardsData?.incomeStats?.percentChange ?? 0}% from last
              month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow gap-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-medium text-gray-600">
              Monthly Spending
            </CardTitle>
            <CreditCard className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$3,420</div>
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Spending Trend</CardTitle>
              <CardDescription>Your spendings this year</CardDescription>
            </div>
            <ToggleGroup value={"Month"} type="single" onValueChange={() => {}}>
              <ToggleGroupItem value="Month" className="p-4 border">
                Month
              </ToggleGroupItem>
              <ToggleGroupItem value="Year" className="p-4 border">
                Year
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>This month's expense breakdown</CardDescription>
            </div>
            <ToggleGroup value={"Year"} type="single" onValueChange={() => {}}>
              <ToggleGroupItem value="Month" className="p-4 border">
                Month
              </ToggleGroupItem>
              <ToggleGroupItem value="Year" className="p-4 border">
                Year
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
          <CardDescription>
            Compare your planned budget with actual spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="budget" fill="#E5E7EB" name="Budget" />
              <Bar dataKey="spent" fill="#3B82F6" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryView;
