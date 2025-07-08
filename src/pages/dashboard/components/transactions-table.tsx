import { useEffect, useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Transaction } from "../types/transactions.types";
import formatCurrency from "@/utils/currency-formatter";

export const TransactionColumns: ({
  handleEdit,
  handleDelete,
}) => ColumnDef<Transaction>[] = ({ handleEdit, handleDelete }) => [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.getValue("date")), "PP"),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const txnType = row.original.transactionType;

      return (
        <div className="text-right font-medium">
          <span
            className={
              txnType === "Expense"
                ? "text-red-600 font-semibold"
                : "text-green-700 font-semibold"
            }
          >
            {formatCurrency(amount)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          onClick={() => handleEdit(row.original)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(row.original.id)}
          className="cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  hasMoreData: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  hasMoreData,
  setPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && !isLoading && hasMoreData) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMoreData, setPage]);

  return (
    <div
      className="rounded-md border h-[600px] overflow-auto"
      ref={containerRef}
    >
      <Table>
        <TableHeader className="bg-secondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : !isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-12 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Loader2 className="animate-spin" size={28} color="#023447" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const TransactionsTable = ({
  data = [],
  columns,
  isLoading,
  hasMoreData,
  setPage,
}: {
  data: Transaction[];
  columns: ColumnDef<Transaction>[];
  isLoading: boolean;
  hasMoreData: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      hasMoreData={hasMoreData}
      setPage={setPage}
    />
  );
};

export default TransactionsTable;
