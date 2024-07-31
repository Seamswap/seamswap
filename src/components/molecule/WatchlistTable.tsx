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
import { IlmNameRow, TableButton } from '../atoms/TableUIs';

type Props = {
  data: Explorer[];
  tableOptions: any;
};

const WatchlistTable = ({ data, tableOptions }: Props) => {
  const table = useReactTable({
    data: data,
    columns: watchlistColumns,
    ...tableOptions,
  });

  return (
    <>
      <TableElement columns={watchlistColumns} table={table} />
    </>
  );
};

export const watchlistColumns: ColumnDef<Explorer>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ getValue }) => <span className="text-gray-500">{getValue() as number}</span>,
  },
  {
    accessorKey: 'ilmName',
    header: 'ILM Name',
    cell: ({ getValue }) => {
      return <IlmNameRow value={getValue() as string} />;
    },
  },
  {
    accessorKey: 'TVL',
    header: 'TVL',
    cell: ({ getValue }) => (
      <span className="text-black">
        ${compactNumberFormatter.format(getValue() as number)}
      </span>
    ),
  },
  {
    accessorKey: 'EstimatedAPY',
    header: 'Est. % Yield',
    cell: ({ getValue }) => (
      <div className="text-[#00B25D] min-w-[70px]">{getValue() as string}%</div>
    ),
  },
  {
    accessorKey: 'performance',
    header: 'Performance',
    cell: ({ getValue }) => (
      <span className="">{getValue() as string}% cap remaining</span>
    ),
  },
  {
    accessorKey: 'oraclePrice',
    header: 'Oracle Price',
    cell: ({ getValue }) => (
      <span className="">{compactNumberFormatter.format(getValue() as number)}</span>
    ),
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ getValue }) => (
      <span className="text-gray-500">{Number(getValue()).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <TableButton onClick={() => console.log('swap')} text="Swap" />;
    },
  },
];

export default WatchlistTable;
