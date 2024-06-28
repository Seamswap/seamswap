import type { NextPage } from 'next';
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel,
  SortingState,
  VisibilityState,
} from '@tanstack/table-core';
import { useReactTable, Table } from '@tanstack/react-table';
import { TableElement } from '@src/components/ui/Table';


export interface Explorer {
  id: number;
  ilmName: string;
  TVL: number;
  EstimatedAPY: number;
  performance: number;
  oraclePrice: number;
  position: number;
  actions: string;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
});
const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
});

export const columns: ColumnDef<Explorer>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'TVL',
    header: 'TVL',
  },
  {
    accessorKey: 'EstimatedAPY',
    header: 'Est. % Yield',
  },
  {
    accessorKey: 'performance',
    header: 'Performance',
  },
  {
    accessorKey: 'oraclePrice',
    header: 'Oracle Price',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    header: 'Add watchlist',
    cell: (row) => (
      <button className="bg-blue-500 text-white p-2 rounded">Star</button>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
];
const Page: NextPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="px-12 py-14">
      <h2 className="text-4xl">Seamless Explorer</h2>
      <p className="w-7/12 mb-6">Track important data across seamless protocol and swapped assets. This page shows data about transactions,
        assets etc.</p>
      <TableElement columns={columns} table={table} />
    </div>
  );
};
export default Page;
