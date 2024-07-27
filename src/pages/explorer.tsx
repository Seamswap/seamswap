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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@src/components/ui/Tabs';
import Input from '@src/components/ui/Input';
import { Search } from 'lucide-react';
import Export from '@src/components/icons/Export.icon';
import Container from '@src/components/ui/Container';

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
    cell: (row) => (
      <button className="bg-blue-500 text-white p-2 rounded">Star</button>
    ),
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
    <Container>
      <Tabs defaultValue="watchlist" className="">
        <h2 className="text-4xl">Seamless Explorer</h2>
        <p className="lg:w-4/12 mb-6 text-grey-700">
          Track important data across seamless protocol and swapped assets. This
          page shows data about transactions, assets etc.
        </p>

        <div className="flex justify-between mb-6 flex-wrap">
          <TabsList>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="transaction-history">
              Transactions History
            </TabsTrigger>
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
          <TableElement columns={columns} table={table} />
        </TabsContent>
      </Tabs>
    </Container>
  );
};
export default Page;
