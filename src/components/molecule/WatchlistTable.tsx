/* eslint-disable @next/next/no-img-element */
import React, { memo, useEffect, useState } from 'react';
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
import { AssetApy } from '@components/ui/AssetApy';
import { AssetTvl } from '@components/ui/AssetTvl';
import OraclePrice from '@components/ui/OraclePrice';
import Link from 'next/link';
import { getIsStrategy } from '@src/lib/utils/configUtils';
import { api } from '@src/utils/trpc';
import { Account } from '../ui/ConnectButton';

type Props = {
  tableOptions: any;
  account: Account
};
const columns: ColumnDef<Explorer>[] = [
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
];

const WatchlistTable = ({ tableOptions, account }: Props) => {
  const { data: state, isSuccess } = useFetchAllAssets();
  const [data, setData] = useState<Array<Explorer>>([]);
  const { data: wishlist, isLoading } = api.wishlist.getWishList.useQuery({ wallet_address: account?.address as string }, {
    enabled: !!account?.address,
  });
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
    if (!state || !wishlist) return;
    const data = state.map((item, index) => ({ ...item, id: index + 1 }));
    const filteredData = data.filter((val) => wishlist.some((w) => w.asset_address === val.address));
    setData(filteredData as Explorer[]);
  }, [isSuccess, wishlist]);
  return isLoading ? <span>Loading...</span> : (
    <>
      <TableElement columns_length={columns.length} table={table} />
    </>
  );
};


export default memo(WatchlistTable);
