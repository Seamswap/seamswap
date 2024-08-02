import * as React from 'react';
import { cn } from '@src/lib/utils';
import { type Explorer } from '@src/pages/explorer';
import { flexRender, Table as TableType } from '@tanstack/react-table';
import TableLoader from '@src/components/ui/TableLoader';
import { Button } from '@src/components/ui/Button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { ColumnDef } from '@tanstack/table-core';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-[64px] px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'pb-[22px] px-3 align-middle [&:has([role=checkbox])]:pr-0 text-[15.5px] border-0',
      className,
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

interface DataTableProps<TData, TValue> {
  table: TableType<Explorer>;
}

function padArray(arr: number[], hostArr: number[]): number[] {
  arr?.unshift(hostArr[hostArr?.indexOf(arr[0] ?? hostArr.length - 2) - 1]);
  return arr?.length >= 3 ? arr : padArray(arr, hostArr);
}

const TableElement = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement> & {
    table: TableType<any>;
    hide?: boolean;
    tableClass?: string;
  columns_length: number;
    isLoading?: boolean;
  }
>(
  (
    {
      table,
      children: header,
      className,
      hide,
      tableClass,
      columns_length,

      isLoading,
      ...props
    },
    ref,
  ) => {
    const tablePageArrays = Array.from(
      {
        length: table.getPageCount(),
      },
      (_, i) => i + 1,
    );
    const currentIndex = table.getState().pagination.pageIndex + 1;

    const lastIndexes: number[] = tablePageArrays.slice(-3);

    const firstIndexes: number[] =
      tablePageArrays
        ?.slice(
          currentIndex === 1 ? currentIndex - 1 : currentIndex - 2,
          currentIndex === 1 ? currentIndex + 2 : currentIndex + 1,
        )
        ?.filter((index) => !lastIndexes.includes(index)) ?? [];
    const currentIndexesArr: number[] =
      firstIndexes.length >= 3
        ? firstIndexes
        : [...new Set([...padArray(firstIndexes, tablePageArrays)])];
    const options = React.useMemo(() => [10, 20, 30, 40, 50, 75, 100], []);
    return (
      <div
        className={cn(
          'flex flex-col rounded-[10px] border-primary bg-white overflow-hidden',
          className,
        )}
        // ref={ref}
      >
        <div className="">
          {header}
          {!hide &&
            (isLoading ? (
              <TableLoader columns={columns} rows={20} />
            ) : (
              <Table className={tableClass}>
                <TableHeader className="rounded-t-lg overflow-hidden">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="bg-white text-black !border-0 text-xs capitalize"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="text-black font-medium lg:text-[16px]"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody className="">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => {
                      return (
                        <TableRow
                          className="!border-0"
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell colSpan={1} key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns_length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            ))}
        </div>
        {!hide && !isLoading && (
          <div className="flex items-center justify-between px-4 md:px-6 w-full bg-white py-4 md:space-x-6">
            <Button
              variant="outline"
              className="px-3.5 py-2 flex gap-x-2 items-center text-grey-650 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border-grey-375 transition-colors duration-300 ease-in"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeftIcon className="h-5 w-5 transition-colors duration-300 ease-in" />
              <span className="transition-colors duration-300 ease-in hidden md:block">
                Previous
              </span>
              <span className="sr-only">Go to previous page</span>
            </Button>
            <div className="flex space-x-2">
              {tablePageArrays?.length > 3 ? (
                <div className="flex items-center space-x-0.5 text-sm font-medium basis-7/12">
                  {currentIndexesArr?.map((val, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => table.setPageIndex(val - 1)}
                      data-true={currentIndex === val}
                    >
                      {val}
                    </Button>
                  ))}
                  <span className="px-3">{'...'}</span>
                  {lastIndexes?.map((val, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => table.setPageIndex(val - 1)}
                      data-true={currentIndex === val}
                    >
                      {val}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center space-x-0.5 text-sm font-medium">
                  {tablePageArrays?.map((val, index) => (
                    <Button
                      key={index}
                      // variant="label"
                      className="h-8 w-8 p-0"
                      onClick={() => table.setPageIndex(val - 1)}
                      data-true={currentIndex === val}
                    >
                      {val}
                    </Button>
                  ))}
                </div>
              )}
              {/*<SelectInput*/}
              {/*  onValueChange={(value) => {*/}
              {/*    table.setPageSize(Number(value));*/}
              {/*  }}*/}
              {/*  value={table.getState().pagination.pageSize.toString()}*/}
              {/*  name="wager_category"*/}
              {/*  id="wager_category"*/}
              {/*  placeholder={`${table.getState().pagination.pageSize}`}*/}
              {/*  options={options}*/}
              {/*  className="w-[70px]"*/}
              {/*/>*/}
            </div>
            <Button
              variant="outline"
              className="px-3.5 py-2 flex gap-x-2 items-center text-grey-650 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border-grey-375 transition-colors duration-300 ease-in"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <span className="transition-colors duration-300 ease-in hidden md:block">
                Next
              </span>
              <ArrowRightIcon className="h-5 w-5 transition-colors duration-300 ease-in" />
            </Button>
          </div>
        )}
      </div>
    );
  },
);
TableElement.displayName = 'TableElement';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableElement,
};
