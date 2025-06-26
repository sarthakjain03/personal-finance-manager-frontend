import useResponsive from "@/hooks/use-responsive";
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
import { Search, CalendarIcon, XCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TransactionsTable from "../components/transactions-table";
import useTransactions from "../hooks/use-transactions";
import AddEditTransactionDialog from "../components/add-edit-transactions-dialog";
import DeleteConfirmDialog from "../components/delete-confirm-dialog";

const TransactionsView = () => {
  const { isMobile } = useResponsive();
  const {
    setSearch,
    search,
    setDateRange,
    dateRange,
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
    availableCategories,
    page,
    setPage,
    deleteTransactionFromId,
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus={false}
                />
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
                      {dateRange?.from && dateRange?.to
                        ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(
                            dateRange.to,
                            "MMM d, yyyy"
                          )}`
                        : dateRange.from
                        ? `${format(dateRange.from, "MMM d, yyyy")}`
                        : "Select Date Range"}
                    </Button>
                    {dateRange?.from && dateRange?.to && (
                      <XCircle
                        className="h-4 w-4 cursor-pointer"
                        onClick={() =>
                          setDateRange({ from: undefined, to: undefined })
                        }
                      />
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange as any}
                    className={cn("p-3 pointer-events-auto")}
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <TransactionsTable
              data={transactions || []}
              columns={tableColumns || []}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Transaction Dialog */}
      {isTransactionDialogOpen !== "" && selectedTransaction && (
        <AddEditTransactionDialog
          open={isTransactionDialogOpen !== ""}
          transaction={selectedTransaction}
          onOpenChange={setIsTransactionDialogOpen}
          action={isTransactionDialogOpen === "new" ? "New" : "Edit"}
          handleSave={createOrEditTransaction}
          availableCategories={availableCategories}
        />
      )}

      {deleteTransactionOpen && selectedTransaction && (
        <DeleteConfirmDialog
          open={deleteTransactionOpen}
          onOpenChange={setDeleteTransactionOpen}
          title={"Transaction"}
          description={selectedTransaction?.description || ""}
          onConfirm={() => deleteTransactionFromId(selectedTransaction?.id)}
        />
      )}
    </div>
  );
};

export default TransactionsView;
