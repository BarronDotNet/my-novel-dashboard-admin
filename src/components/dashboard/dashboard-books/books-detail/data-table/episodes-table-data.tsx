import { useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CommonLoading from '@/components/common/loading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MdOutlinePublish } from 'react-icons/md';
import { CiTimer } from 'react-icons/ci';
import { LiaCalendarTimes } from 'react-icons/lia';
import { MdOutlineHideImage } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  perPage: number;
  isLoading: boolean;
}

const manageOptions = [
  {
    label: 'ตั้งราคา',
    value: 'setPrice',
    icon: <img src="/images/M-coin.png" alt="Set Price" className="w-4 h-4" />,
  },
  {
    label: 'เผยแพร่',
    value: 'isPublish',
    icon: <MdOutlinePublish />,
  },
  {
    label: 'ตั้งเวลาเผยแพร่',
    value: 'setIsPublish',
    icon: <CiTimer />,
  },
  {
    label: 'ยกเลิกตั้งเวลาเผยแพร่',
    value: 'cancelSetIsPublish',
    icon: <LiaCalendarTimes />,
  },
  {
    label: 'ปิดเนื้อหา',
    value: 'hidden',
    icon: <MdOutlineHideImage />,
  },
  {
    label: 'ลบ',
    value: 'delete',
    icon: <TiDeleteOutline />,
  },
];

const EpisodesTableData = <TData, TValue>({
  columns,
  data,
  perPage,
  isLoading,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [areOptionsEnabled, setAreOptionsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('จัดการ');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: { pageSize: perPage },
    },
  });

  useEffect(() => {
    const hasSelection = Object.keys(rowSelection).length > 0;
    setAreOptionsEnabled(hasSelection);
    if (!hasSelection) {
      setSelectedOption('จัดการ');
    }
  }, [rowSelection]);

  if (isLoading) {
    return <CommonLoading />;
  }

  return (
    <div>
      <div className="mt-5">
        <Select>
          <SelectTrigger
            className={`w-[180px] ${!areOptionsEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!areOptionsEnabled}
          >
            <SelectValue placeholder={selectedOption || 'จัดการ'} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>ตัวเลือก</SelectLabel>
              {manageOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={!areOptionsEnabled}
                >
                  <div className="flex items-center space-x-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <div className="mt-4">
        <Button onClick={() => setAreOptionsEnabled(!areOptionsEnabled)}>
          Toggle Options {areOptionsEnabled ? 'Disable' : 'Enable'}
        </Button>
      </div>
    </div>
  );
};

export default EpisodesTableData;
