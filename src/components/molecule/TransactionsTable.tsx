/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TableElement } from '../ui/Table';
import { ColumnDef } from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import { Explorer } from '@src/pages/explorer';
import ilmwstETHLogo from '@assets/tokens/ilmEthUsdc.svg';
import Badge from '../ui/Badge';

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
    cell: ({ getValue }) => <span className="text-gray-800">{getValue() as string}</span>,
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
    accessorKey: 'quantity_swapped',
    header: 'Quantity swapped',
    cell: ({ getValue, row }) => (
      <span className="text-gray-800">
        {getValue() as string} {row.original.from}
      </span>
    ),
  },
  {
    accessorKey: 'quantity_received',
    header: 'Quantity received',
    cell: ({ getValue, row }) => (
      <span className="text-gray-800">
        {getValue() as string} {row.original.to}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status =
        getValue() == 'Successful'
          ? 'success'
          : getValue() == 'Confirming'
          ? 'warning'
          : 'error';
      return <Badge variant={status}>{getValue() as string}</Badge>;
    },
  },
];

export default TransactionsTable;
