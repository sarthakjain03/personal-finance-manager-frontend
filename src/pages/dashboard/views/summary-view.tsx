import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
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
import { cn } from "@/lib/utils";
import useSummary from "../hooks/use-summary";
import formatCurrency from "@/utils/currency-formatter";
import useUserStore from "@/store/user-store";

const pieChartColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const SummaryView = () => {
  const { user } = useUserStore();
  const {
    loading,
    pieChartLoading,
    budgetChartLoading,
    spendTrendChartLoading,
    monthlyCardsData,
    categoryPieChartData,
    pieChartTimeline,
    budgetChartData,
    spendTrendChartData,
    spendTrendChartTimeline,
    setPieChartTimeline,
    setSpendTrendChartTimeline,
  } = useSummary();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <>
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </>
        ) : (
          <>
            <Card className="hover:shadow-lg transition-shadow gap-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="font-medium text-gray-600">
                  Monthly Income
                </CardTitle>
                <DollarSign className="h-5 w-5 text-green-500" />
              </CardHeader>
              {monthlyCardsData?.incomeStats?.percentChange !== undefined && (
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(
                      monthlyCardsData?.incomeStats?.currentMonth,
                      user
                    )}
                  </div>
                  <p
                    className={cn("text-xs flex items-center gap-1 mt-1", [
                      monthlyCardsData?.incomeStats?.percentChange === 0 &&
                        "text-gray-500",
                      monthlyCardsData?.incomeStats?.percentChange < 0 &&
                        "text-red-600",
                      monthlyCardsData?.incomeStats?.percentChange > 0 &&
                        "text-green-600",
                    ])}
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
                    {monthlyCardsData?.incomeStats?.percentChange ?? 0}% from
                    last month
                  </p>
                </CardContent>
              )}
            </Card>

            <Card className="hover:shadow-lg transition-shadow gap-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="font-medium text-gray-600">
                  Monthly Spending
                </CardTitle>
                <CreditCard className="h-5 w-5 text-red-500" />
              </CardHeader>
              {monthlyCardsData?.spendingStats?.percentChange !== undefined && (
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(
                      monthlyCardsData?.spendingStats?.currentMonth,
                      user
                    )}
                  </div>
                  <p
                    className={cn("text-xs flex items-center gap-1 mt-1", [
                      monthlyCardsData?.spendingStats?.percentChange === 0 &&
                        "text-gray-500",
                      monthlyCardsData?.spendingStats?.percentChange > 0 &&
                        "text-red-600",
                      monthlyCardsData?.spendingStats?.percentChange < 0 &&
                        "text-green-600",
                    ])}
                  >
                    {monthlyCardsData?.spendingStats?.percentChange && (
                      <>
                        {monthlyCardsData?.spendingStats?.percentChange > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                      </>
                    )}
                    {monthlyCardsData?.spendingStats?.percentChange < 0
                      ? monthlyCardsData?.spendingStats?.percentChange * -1
                      : monthlyCardsData?.spendingStats?.percentChange}
                    % from last month
                  </p>
                </CardContent>
              )}
            </Card>
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Spending Trend</CardTitle>
              <CardDescription>
                Your spendings this {spendTrendChartTimeline}
              </CardDescription>
            </div>
            <ToggleGroup
              value={spendTrendChartTimeline}
              type="single"
              onValueChange={(value) => setSpendTrendChartTimeline(value)}
              disabled={spendTrendChartLoading}
            >
              <ToggleGroupItem
                value="month"
                className="p-4 border cursor-pointer"
              >
                Month
              </ToggleGroupItem>
              <ToggleGroupItem
                value="year"
                className="p-4 border cursor-pointer"
              >
                Year
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent>
            {spendTrendChartLoading ? (
              <Skeleton className="h-76" />
            ) : spendTrendChartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-6 text-gray-600/50 text-2xl py-24">
                No Expenses Added Yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={spendTrendChartData}>
                  <defs>
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `${formatCurrency(Number(value), user)}`,
                      "Amount",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>
                This {pieChartTimeline}'s expense breakdown
              </CardDescription>
            </div>
            <ToggleGroup
              value={pieChartTimeline}
              type="single"
              onValueChange={(value) => setPieChartTimeline(value)}
              disabled={pieChartLoading}
            >
              <ToggleGroupItem
                value="month"
                className="p-4 border cursor-pointer"
              >
                Month
              </ToggleGroupItem>
              <ToggleGroupItem
                value="year"
                className="p-4 border cursor-pointer"
              >
                Year
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent>
            {pieChartLoading ? (
              <Skeleton className="h-76" />
            ) : categoryPieChartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-6 text-gray-600/50 text-2xl py-24">
                No Expenses Added Yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryPieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryPieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          pieChartColors[pieChartColors.length % (index + 1)]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `${formatCurrency(Number(value), user)}`,
                      "Amount",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
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
          {budgetChartLoading ? (
            <Skeleton className="h-76" />
          ) : budgetChartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-6 text-gray-600/50 text-2xl py-24">
              No Budgets Set
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="budgetAmount" fill="green" name="Budget" />
                <Bar dataKey="spentAmount" fill="red" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryView;
