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
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Transaction } from "../types/transactions.types";

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
    accessorKey: "merchant",
    header: "Merchant",
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
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-right font-medium">
          <span
            className={
              amount < 0
                ? "text-red-600 font-semibold"
                : "text-green-700 font-semibold"
            }
          >
            {formatted}
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
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
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
}: {
  data: Transaction[];
  columns: ColumnDef<Transaction>[];
}) => {
  return <DataTable columns={columns} data={data} />;
};

export default TransactionsTable;
