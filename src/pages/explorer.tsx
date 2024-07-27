/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import * as React from 'react';
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
import { TableElement } from '@src/components/ui/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@src/components/ui/Tabs';
import Input from '@src/components/ui/Input';
import { Search } from 'lucide-react';
import Export from '@src/components/icons/Export.icon';
import Container from '@src/components/ui/Container';
import { TableButton } from '@src/components/atoms/TableUIs';
import ilmwstETHLogo from '@assets/tokens/ilmEthUsdc.svg';
import MarketsTable from '@src/components/molecule/MarketsTable';

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

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
});
export const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
});

const Page: NextPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const tableOptions = {
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
  };

  const watchlistTable = useReactTable({
    data: [...demoData],
    columns: watchlistColumns,
    ...tableOptions,
  });

  console.log('explorer.tsx');

  return (
    <Container>
      <Tabs defaultValue="watchlist" className="">
        <h2 className="text-4xl">Seamless Explorer</h2>
        <p className="lg:w-4/12 mb-6 text-grey-700">
          Track important data across seamless protocol and swapped assets. This page
          shows data about transactions, assets etc.
        </p>

        <div className="flex justify-between mb-6 flex-wrap">
          <TabsList>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="transaction-history">Transactions History</TabsTrigger>
          </TabsList>

          <div className="flex space-x-4 items-center basis-3/12">
            <div className="inline-flex items-center">
              <span>Lend</span> <Export className="ml-2.5 w-4" />
            </div>
            <div className="inline-flex items-center">
              <span>Borrow</span> <Export className="ml-2.5 w-4" />
            </div>

            <span className="relative w-full">
              <Search className="text-primary-900 absolute inset-y-0 my-auto left-4" />
              <Input
                className="bg-transparent text-primary-900 placeholder:text-primary-900 pl-12 text-sm w-full"
                placeholder="Search by Asset name"
              />
            </span>
          </div>
        </div>

        <TabsContent value="watchlist">
          <TableElement columns={watchlistColumns} table={watchlistTable} />
        </TabsContent>

        <TabsContent value="markets">
          <MarketsTable data={demoData} tableOptions={tableOptions} />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

const demoData = [
  {
    id: 1,
    ilmName: 'Boost wstETH',
    TVL: 150000,
    EstimatedAPY: 55.85,
    performance: 90,
    oraclePrice: 67500.5,
    position: 11500,
    watchlisted: true,
    actions: 'Actions',
  },
  {
    id: 2,
    ilmName: 'Multiply ETH Long',
    TVL: 385000,
    EstimatedAPY: 3.6,
    performance: 90,
    oraclePrice: 67500.5,
    position: 11500,
    watchlisted: true,
    actions: 'Actions',
  },
  {
    id: 3,
    ilmName: 'Boost wstETH',
    TVL: 150000,
    EstimatedAPY: 55.85,
    performance: 90,
    oraclePrice: 67500.5,
    position: 11500,
    actions: 'Actions',
  },
];

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
      return (
        <div className="flex items-center gap-x-2">
          <img src={ilmwstETHLogo.src} className="w-[26px]" alt="ilmwstETHLogo" />
          <span className="text-black font-normal">{getValue() as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'TVL',
    header: 'TVL',
    cell: ({ getValue }) => (
      <span className="">${compactNumberFormatter.format(getValue() as number)}</span>
    ),
  },
  {
    accessorKey: 'EstimatedAPY',
    header: 'Est. % Yield',
    cell: ({ getValue }) => (
      <span className="text-[#00B25D] text-[17px]">{getValue() as string}%</span>
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
      console.log('row', row.id);
      return <TableButton onClick={() => console.log('swap')} text="Swap" />;
    },
  },
];

export default Page;
