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
import Export from '@src/components/icons/Export.icon';
import Container from '@src/components/ui/Container';
import { IlmNameRow, TableButton } from '@src/components/atoms/TableUIs';
import MarketsTable from '@src/components/molecule/MarketsTable';
import TransactionsTable from '@src/components/molecule/TransactionsTable';

export interface Explorer {
  id: number;
  ilmName: string;
  TVL: number;
  EstimatedAPY: number;
  performance: number;
  oraclePrice: number;
  position: number;
  actions: string;
  [key: string]: any;
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
  const [transactionType, setTransactionType] = React.useState('personal');
  const [currentTab, setCurrentTab] = React.useState('watchlist');

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
      <Tabs defaultValue={currentTab} onValueChange={(val) => setCurrentTab(val)}>
        <h2 className="text-3xl md:text-4xl font-[500] mb-3">Seamless Explorer</h2>
        <p className="max-w-[490px] mb-8 text-grey-700">
          Track important data across seamless protocol and swapped assets. This page
          shows data about transactions, assets etc.
        </p>

        <TabHeader currentTab={currentTab} />

        <TabsContent value="watchlist">
          <TableElement columns={watchlistColumns} table={watchlistTable} />
        </TabsContent>

        <TabsContent value="markets">
          <MarketsTable data={demoData} tableOptions={tableOptions} />
        </TabsContent>

        <TabsContent value="transaction">
          <div className="mb-3 flex justify-between items-center">
            <p className="md:text-lg font-medium hidden md:block">
              {transactionType == 'personal'
                ? 'Personal history'
                : 'Protocol wide history'}
            </p>

            <div className="px-2 py-[6px] bg-white rounded-[10px] justify-center items-center gap-[8px] flex *:cursor-pointer">
              <div
                onClick={() => setTransactionType('personal')}
                data-state={transactionType === 'personal' ? 'active' : 'inactive'}
                className="py-[7px] px-4 rounded-[10px] data-[state=active]:bg-primary-50 data-[state=active]:text-primary-900"
              >
                <div className="text-[#00b7a1] text-sm font-medium">Personal</div>
              </div>
              <div
                onClick={() => setTransactionType('protocol_wide')}
                data-state={transactionType === 'protocol_wide' ? 'active' : 'inactive'}
                className="py-[7px] px-4 rounded-[10px] data-[state=active]:bg-primary-50 data-[state=active]:text-primary-900"
              >
                <div className="text-[#868686] text-sm font-medium">Protocol wide</div>
              </div>
            </div>
          </div>

          <TransactionsTable data={demoHistoryData} tableOptions={tableOptions} />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

const TabHeader = ({ currentTab }: { currentTab: string }) => {
  return (
    <div className="flex justify-between items-center mb-6 flex-wrap gap-y-4">
      <TabsList>
        <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        <TabsTrigger value="markets">Markets</TabsTrigger>
        <TabsTrigger value="transaction">Transactions History</TabsTrigger>
      </TabsList>

      <div className="flex gap-x-5 xl:gap-x-8 items-center md:basis-3/12">
        <div className="inline-flex items-center">
          <span className="text-sm font-medium lg:text-[17px]">Lend</span>
          <Export className="ml-2.5 w-4" />
        </div>

        <div className="inline-flex items-center">
          <span className="text-sm font-medium lg:text-[17px]">Borrow</span>
          <Export className="ml-2.5 w-4" />
        </div>

        <span className="relative w-full min-w-[120px] lg:w-[24vw] max-w-[320px]">
          <svg
            className="w-[16px] lg:w-[20px] absolute inset-y-0 my-auto left-3"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="#00B8A1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="#00B8A1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Input
            className="bg-transparent text-primary-900 placeholder:text-primary-900 pl-9 pr-1.5 py-[13px] lg:pl-[42px] text-sm w-full"
            placeholder={
              currentTab == 'transaction'
                ? ' Search transaction by Address'
                : 'Search by Asset name'
            }
          />
        </span>
      </div>
    </div>
  );
};

const demoData = [
  {
    id: 1,
    ilmName: 'Boost wstETH',
    TVL: 16350,
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

const demoHistoryData: any[] = [
  {
    id: 1,
    time: '3 secs ago',
    from: 'Boost wstETH',
    to: 'Boost wstETH',
    quantity_swapped: 0.001,
    quantity_received: 0.001,
    status: 'Successful',
  },
  {
    id: 2,
    time: '2 hours ago',
    from: 'Multiply ETH Long',
    to: 'Multiply ETH Long',
    quantity_swapped: 0.001,
    quantity_received: 0.001,
    status: 'Confirming',
  },
  {
    id: 2,
    time: '2 hours ago',
    from: 'Boost wstETH',
    to: 'Boost wstETH',
    quantity_swapped: 0.001,
    quantity_received: 0.001,
    status: 'Failed',
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
      console.log('row', row.id);
      return <TableButton onClick={() => console.log('swap')} text="Swap" />;
    },
  },
];

export default Page;
