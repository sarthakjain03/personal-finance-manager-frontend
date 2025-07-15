import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CalendarIcon, XCircle, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TransactionsTable from "../components/transactions-table";
import useTransactions from "../hooks/use-transactions";
import AddEditTransactionDialog from "../components/add-edit-transactions-dialog";
import DeleteConfirmDialog from "../components/delete-confirm-dialog";

const TransactionsView = () => {
  const {
    transactions,
    setIsTransactionDialogOpen,
    isTransactionDialogOpen,
    selectedTransaction,
    tableColumns,
    setDeleteTransactionOpen,
    deleteTransactionOpen,
    isLoading,
    createOrEditTransaction,
    hasMoreData,
    setPage,
    deleteTransactionFromId,
    setFilters,
    filters,
    initialFilters,
  } = useTransactions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-gray-600">
            View and manage your transaction history
          </p>
        </div>
        <Button
          onClick={() => setIsTransactionDialogOpen("new")}
          className="cursor-pointer bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>
      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            All your incoming and outgoing transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10"
                  value={filters?.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  autoFocus={false}
                />
              </div>
              {/* Transaction Type */}
              <div className="flex-1 relative max-w-[150px]">
                <Select
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, type: value }))
                  }
                  value={filters?.type}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Date Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="outline"
                      className={cn(
                        "flex gap-2 justify-start text-left font-normal"
                      )}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {filters?.dateRange?.from && filters?.dateRange?.to
                        ? `${format(
                            filters?.dateRange.from,
                            "MMM d, yyyy"
                          )} - ${format(filters?.dateRange.to, "MMM d, yyyy")}`
                        : filters?.dateRange.from
                        ? `${format(filters?.dateRange.from, "MMM d, yyyy")}`
                        : "Select Date Range"}
                    </Button>
                    {/* {filters?.dateRange?.from && filters?.dateRange?.to && (
                      <XCircle
                        className="h-4 w-4 cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            dateRange: { from: undefined, to: undefined },
                          }))
                        }
                      />
                    )} */}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={filters?.dateRange}
                    onSelect={(date) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateRange: { from: date?.from, to: date?.to },
                      }))
                    }
                    className={cn("p-3 pointer-events-auto")}
                    numberOfMonths={1}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button
                onClick={() => setFilters(initialFilters)}
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                size="sm"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <TransactionsTable
              data={transactions || []}
              columns={tableColumns || []}
              isLoading={isLoading}
              hasMoreData={hasMoreData}
              setPage={setPage}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Transaction Dialog */}
      {isTransactionDialogOpen !== "" && (
        <AddEditTransactionDialog
          open={isTransactionDialogOpen !== ""}
          transaction={selectedTransaction}
          onOpenChange={setIsTransactionDialogOpen}
          action={isTransactionDialogOpen === "new" ? "New" : "Edit"}
          handleSave={createOrEditTransaction}
        />
      )}

      {deleteTransactionOpen && selectedTransaction && (
        <DeleteConfirmDialog
          open={deleteTransactionOpen}
          onOpenChange={setDeleteTransactionOpen}
          title={"Transaction"}
          description={selectedTransaction?.description || ""}
          onConfirm={() => deleteTransactionFromId(selectedTransaction?.id)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default TransactionsView;
