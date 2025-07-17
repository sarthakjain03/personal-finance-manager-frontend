import { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
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
import {
  Edit,
  Loader2,
  Trash2,
  ArrowDownUp,
  ArrowDownNarrowWide,
  ArrowUpWideNarrow,
} from "lucide-react";
import { format } from "date-fns";
import { Transaction } from "../types/transactions.types";
import formatCurrency from "@/utils/currency-formatter";

export const TransactionColumns: ({
  handleEdit,
  handleDelete,
  user,
}) => ColumnDef<Transaction>[] = ({ handleEdit, handleDelete, user }) => [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:underline cursor-pointer flex items-center gap-2"
      >
        Date
        {column.getIsSorted() === "asc" ? (
          <ArrowUpWideNarrow size={15} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDownNarrowWide size={15} />
        ) : (
          <ArrowDownUp size={15} />
        )}
      </button>
    ),
    cell: ({ row }) => format(new Date(row.getValue("date")), "PP"),
    sortingFn: (a, b) => {
      const dateA = new Date(a.getValue("date")).getTime();
      const dateB = new Date(b.getValue("date")).getTime();
      return dateB - dateA;
    },
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
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:underline cursor-pointer flex items-center gap-2 justify-end w-full"
      >
        Amount
        {column.getIsSorted() === "asc" ? (
          <ArrowUpWideNarrow size={15} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDownNarrowWide size={15} />
        ) : (
          <ArrowDownUp size={15} />
        )}
      </button>
    ),
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
            {formatCurrency(amount, user)}
          </span>
        </div>
      );
    },
    sortingFn: (a, b) => {
      const amountA = parseFloat(a.getValue("amount"));
      const amountB = parseFloat(b.getValue("amount"));
      return amountB - amountA; // descending by default
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
          <Edit className="w-4 h-4 text-blue-700" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(row.original)}
          className="cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-red-700" />
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
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
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
                    className="h-12 text-center pt-6"
                  >
                    No Transactions Added
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
