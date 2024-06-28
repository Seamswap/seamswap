import * as React from "react";
import { Skeleton } from "./Skeleton";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./Table";
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  flexRender,
} from "@tanstack/react-table";

export interface ITableLoaderProps {
  rows?: number;
  className?: string;
  columns: ColumnDef<any>[];
}

const TableLoader: React.FC<ITableLoaderProps> = ({
  rows = 5,
  columns,
  className,
}) => {
  const data = React.useMemo(
    () =>
      Array(rows)
        .fill({})
        .map((_, i) => ({ id: i })),
    [rows]
  );
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 40,
    });
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  const table = useReactTable({
    data,
    columns,
    pageCount: 40,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });
  return (
    <Table>
      <TableHeader className="rounded-t-lg overflow-hidden">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="bg-primary-900 text-white text-xs uppercase"
          >
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="text-grey-550">
                  <Skeleton className="w-24 h-3" />
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="border-b-grey-195 border-b">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell colSpan={1} key={cell.id}>
                    <Skeleton className="w-24 h-2" />
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns?.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default TableLoader;
