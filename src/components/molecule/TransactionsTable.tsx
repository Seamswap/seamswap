/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TableElement } from '../ui/Table';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
} from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import { compactNumberFormatter, Explorer } from '@src/pages/explorer';
import ilmwstETHLogo from '@assets/tokens/ilmEthUsdc.svg';
import { Star } from 'lucide-react';
import { TableButton } from '../atoms/TableUIs';

type Props = {
  data: Explorer[];
  tableOptions: any;
};

const TransactionsTable = ({ data, tableOptions }: Props) => {
  const table = useReactTable({
    data: data,
    columns: transactionsColumns,
    ...tableOptions,
  });

  return (
    <>
      <TableElement columns={transactionsColumns} table={table} />
    </>
  );
};

export const transactionsColumns: ColumnDef<Explorer>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ getValue }) => <span className="text-gray-500">{getValue() as number}</span>,
  },
  {
    accessorKey: 'time',
    header: 'Time',
    cell: ({ getValue }) => <span className="text-gray-500">{getValue() as string}</span>,
  },
  {
    accessorKey: 'from',
    header: 'Swap from',
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center gap-x-2">
          <img src={ilmwstETHLogo.src} className="w-[26px]" alt="ilmwstETHLogo" />
          <span className="text-black font-normal">{getValue() as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'to',
    header: 'Swap to',
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center gap-x-2">
          <img src={ilmwstETHLogo.src} className="w-[26px]" alt="ilmwstETHLogo" />
          <span className="text-black font-normal">{getValue() as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity swapped',
    cell: ({ getValue }) => <span className="text-gray-500">{getValue() as string}</span>,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity received',
    cell: ({ getValue }) => <span className="text-gray-500">{getValue() as string}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },
];

export default TransactionsTable;
