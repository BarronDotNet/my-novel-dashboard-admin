import { useEffect, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
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
import {
  MdOutlineHideImage,
  MdOutlinePublish,
  MdOutlineManageSearch,
} from 'react-icons/md';
import { CiTimer, CiViewList } from 'react-icons/ci';
import { LiaCalendarTimes } from 'react-icons/lia';
import { TiDeleteOutline } from 'react-icons/ti';
import MangeEpDialog from '@/components/dashboard/dashboard-books/books-detail/ep-dialog/mange-ep-dialog';
import { IProductEpisodes } from '@/interfaces/product-episodes.interface';
import { Input } from '@/components/ui/input';
import { Popover } from '@/components/ui/popover';
import EpisodeDatePiker from '@/components/dashboard/dashboard-books/books-detail/ep-dialog/episode-date-piker';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Dialog } from '@/components/ui/dialog';

interface DataTableProps {
  columns: ColumnDef<IProductEpisodes>[];
  data: IProductEpisodes[];
  perPage: number;
  isLoading: boolean;
}

const manageOptions = [
  { label: 'การจัดการ', value: 'management', icon: <MdOutlineManageSearch /> },
  { label: 'จัดการตอน', value: 'manageEp', icon: <CiViewList /> },
  {
    label: 'ตั้งราคา',
    value: 'setPrice',
    icon: <img src="/images/M-coin.png" alt="Set Price" className="w-4 h-4" />,
  },
  { label: 'เผยแพร่', value: 'isPublish', icon: <MdOutlinePublish /> },
  { label: 'ตั้งเวลาเผยแพร่', value: 'setIsPublish', icon: <CiTimer /> },
  {
    label: 'ยกเลิกตั้งเวลาเผยแพร่',
    value: 'cancelSetIsPublish',
    icon: <LiaCalendarTimes />,
  },
  { label: 'ปิดเนื้อหา', value: 'hidden', icon: <MdOutlineHideImage /> },
  { label: 'ลบ', value: 'delete', icon: <TiDeleteOutline /> },
];

const EpisodesTableData = ({
  columns,
  data,
  perPage,
  isLoading,
}: DataTableProps) => {
  const [episodeData, setEpisodeData] = useState<IProductEpisodes[]>(data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [areOptionsEnabled, setAreOptionsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('management');
  const [isMangeEpDialogOpen, setIsMangeEpDialogOpen] = useState(false);

  const table = useReactTable({
    data: episodeData,
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
    initialState: { pagination: { pageSize: perPage } },
  });

  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
    if (value === 'manageEp') setIsMangeEpDialogOpen(true);
  };

  const closeMangeEpDialog = () => {
    setIsMangeEpDialogOpen(false);
    setSelectedOption('การจัดการ');
  };

  useEffect(() => {
    const hasSelection = Object.keys(rowSelection).length > 0;
    setAreOptionsEnabled(hasSelection);
    if (!hasSelection) setSelectedOption('การจัดการ');
  }, [rowSelection]);

  if (isLoading) return <CommonLoading />;

  return (
    <div>
      <div className="mt-5 flex items-center gap-2">
        <Select onValueChange={handleSelectOption}>
          <SelectTrigger
            className={`w-[180px] ${
              !areOptionsEnabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!areOptionsEnabled}
          >
            <SelectValue placeholder={selectedOption || 'การจัดการ'} />
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

        {/* แสดง button ของ ตั้งค่าราเพื่อกดยืนยันการตั้งราคา */}
        {selectedOption === 'setPrice' && (
          <div className="flex justify-start items-center gap-2">
            <Input type="number" placeholder="0" />
            <Button variant="outline">ยืนยัน</Button>
          </div>
        )}

        {selectedOption === 'isPublish' && (
          <div className="flex justify-start items-center gap-2">
            <Button variant="outline">ยืนยัน</Button>
          </div>
        )}

        {selectedOption === 'setIsPublish' && (
          <div className="flex justify-start items-center gap-2">
            <Popover>
              <EpisodeDatePiker />
            </Popover>
            <Button variant="outline">ยืนยัน</Button>
          </div>
        )}

        {selectedOption === 'cancelSetIsPublish' && (
          <div className="flex justify-start items-center gap-2">
            <Button variant="outline">ยืนยัน</Button>
          </div>
        )}

        {selectedOption === 'hidden' && (
          <div className="flex justify-start items-center gap-2">
            <Button variant="outline">ยืนยัน</Button>
          </div>
        )}

        {selectedOption === 'delete' && (
          <div className="flex justify-start items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">ยืนยัน</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>คุณแน่ใจหรือว่าต้องการลบ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    การกระทำนี้ไม่สามารถย้อนกลับได้ เมื่อยืนยันแล้ว
                    ข้อมูลของคุณจะถูกลบออกจากระบบอย่างถาวร
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500">
                    ยืนยัน
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
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
                    {!header.isPlaceholder &&
                      flexRender(
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

      {isMangeEpDialogOpen && (
        <Dialog open={isMangeEpDialogOpen} onOpenChange={closeMangeEpDialog}>
          <MangeEpDialog episodes={episodeData} />
        </Dialog>
      )}
    </div>
  );
};

export default EpisodesTableData;
