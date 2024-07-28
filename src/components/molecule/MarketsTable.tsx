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
import { IlmNameRow, TableButton } from '../atoms/TableUIs';

type Props = {
  data: Explorer[];
  tableOptions: any;
};

const MarketsTable = ({ data, tableOptions }: Props) => {
  // const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  // const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = React.useState({});

  // const tableOptions = {
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  // };

  const table = useReactTable({
    data: data,
    columns: marketsColumns,
    ...tableOptions,
  });

  return (
    <>
      <TableElement columns={marketsColumns} table={table} />
    </>
  );
};

export const marketsColumns: ColumnDef<Explorer>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ getValue }) => <span className="text-grey-700">{getValue() as number}</span>,
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
      <span className="text-grey-700">{Number(getValue()).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'watchlisted',
    header: 'Add watchlist',
    cell: ({ getValue }) => {
      const watchlisted = getValue() as boolean;
      return (
        <div className="flex justify-center" onClick={() => console.log('watchlisted')}>
          {watchlisted ? (
            <Star className="text-[#FFBB0B]" fill="#FFBB0B" />
          ) : (
            <Star className="text-grey-700" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      console.log('row 2442564');
      return <TableButton onClick={() => console.log('swap')} text="Swap" />;
    },
  },
];

export default MarketsTable;
