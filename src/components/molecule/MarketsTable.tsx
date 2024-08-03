/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react';
import { TableElement } from '../ui/Table';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import { Explorer } from '@src/pages/explorer';
import { IlmNameRow, TableButton } from '../atoms/TableUIs';
import { useFetchAllAssets } from '@src/lib/queries/useFetchAllAssets';
import { AssetTvl } from '@components/ui/AssetTvl';
import { AssetApy } from '@components/ui/AssetApy';
import OraclePrice from '@components/ui/OraclePrice';
import { getIsStrategy } from '@src/lib/utils/configUtils';
import Link from 'next/link';
import WishListStar from '@components/ui/WishListStar';

type Props = {
  tableOptions: any;
};

const MarketsTable = ({ tableOptions }: Props) => {
  const { data: state, isSuccess } = useFetchAllAssets();
  const [data, setData] = useState<Array<Explorer>>([]);

  const columns: ColumnDef<Explorer>[] = useMemo(() => [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ getValue }) => <span className="text-gray-500">{getValue() as number}</span>,
    },
    {
      accessorKey: 'ilmName',
      header: 'ILM Name',
      cell: ({ row }) => {
        return <IlmNameRow {...row.original} />;
      },
    },
    {
      accessorKey: 'TVL',
      header: 'TVL',
      cell: ({ row }) => (
        <AssetTvl {...row.original} />
      ),
    },
    {
      accessorKey: 'EstimatedAPY',
      header: 'Est. % Yield',
      cell: ({ row }) => (
        <AssetApy {...row.original} />
      ),
    },
    // {
    //   accessorKey: 'performance',
    //   header: 'Performance',
    //   cell: ({ getValue }) => (
    //     <span className="">{getValue() as string}% cap remaining</span>
    //   ),
    // },
    {
      accessorKey: 'oraclePrice',
      header: 'Oracle Price',
      cell: ({ row }) => (
        <OraclePrice {...row.original} />
      ),
    },
    // {
    //   accessorKey: 'position',
    //   header: 'Position',
    //   cell: ({ getValue }) => (
    //     <span className="text-gray-500">{Number(getValue()).toLocaleString()}</span>
    //   ),
    // },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const isILM = getIsStrategy(row.original.address);
        return <Link
          href={`/swap?fromToken=${isILM ? row.original?.underlyingAsset?.address : row.original.address}&tab=${isILM ? 'ILMS' : 'Lending'}`}><TableButton
          text="Swap" /></Link>;
      },
    },
    {
      accessorKey: 'watchlisted',
      header: 'Add watchlist',
      cell: ({ row }) => <WishListStar {...row.original} />,
    },
  ], []);

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...tableOptions,
  });
  useEffect(() => {
    if (!state) return;
    console.log(state);
    const data = state.map((item, index) => ({ ...item, id: index + 1 }));
    setData(data as Explorer[]);
  }, [isSuccess]);
  return (
    <>
      <TableElement columns_length={columns.length} table={table} />
    </>
  );
};

export default MarketsTable;
