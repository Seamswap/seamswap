/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TableElement } from '../ui/Table';
import { ColumnDef } from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import { Explorer } from '@src/pages/explorer';
import Badge from '../ui/Badge';
import { IlmNameRow } from '../atoms/TableUIs';

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
    cell: ({ getValue }) => <div className="text-grey-700">{getValue() as number}</div>,
  },
  {
    accessorKey: 'time',
    header: 'Time',
    cell: ({ getValue }) => (
      <div className="text-black min-w-[90px]">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'from',
    header: 'Swap from',
    cell: ({ getValue }) => {
      return <IlmNameRow value={getValue() as string} />;
    },
  },
  {
    accessorKey: 'to',
    header: 'Swap to',
    cell: ({ getValue }) => {
      return <IlmNameRow value={getValue() as string} />;
    },
  },
  {
    accessorKey: 'quantity_swapped',
    header: 'Quantity swapped',
    cell: ({ getValue, row }) => (
      <div className="text-black min-w-[120px]">
        {getValue() as string} {row.original.from}
      </div>
    ),
  },
  {
    accessorKey: 'quantity_received',
    header: 'Quantity received',
    cell: ({ getValue, row }) => (
      <div className="text-black min-w-[120px]">
        {getValue() as string} {row.original.to}
      </div>
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
