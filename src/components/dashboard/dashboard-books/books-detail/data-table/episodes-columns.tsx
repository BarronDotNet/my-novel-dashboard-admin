'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { FaRegEye } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IProductEpisodes } from '@/interfaces/product-episodes.interface';
import EditEpisodeDialogInColumns from '@/components/dashboard/dashboard-books/books-detail/data-table/edit-episode-dialog-in-columns';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const episodeColumns = (
  episodeCount: number
): ColumnDef<IProductEpisodes>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'index',
    header: 'ลำดับ',
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'EpName',
    header: 'ชื่อ',
  },
  {
    accessorKey: 'EpPrice',
    header: 'ราคา',
    cell: ({ getValue }) => (
      <div>
        <span className="flex justify-start items-center gap-1">
          <Image
            width={50}
            height={50}
            className="h-4 w-4"
            src="/images/M-coin.png"
            alt="coin cover"
          />
          {Number(getValue())}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'PublicByTime',
    header: 'เวลาการเผยแพร่',
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? 'เผยแพร่แล้ว' : 'ไม่มีการตั้งเวลา';
    },
  },
  {
    accessorKey: 'isPublish',
    header: 'การเผยแพร่',
    cell: ({ getValue }) => (getValue() ? 'เผยแพร่แล้ว' : 'ยังไม่เผยแพร่'),
  },
  {
    accessorKey: 'EpView',
    header: 'การเข้าชม',
    cell: ({ getValue }) => `${getValue()} ครั้ง`,
  },
  {
    id: 'viewIcon',
    header: '',
    cell: () => (
      <Button variant="outline">
        <FaRegEye className="text-gray-600" />
      </Button>
    ),
  },
  {
    id: 'menuIcon',
    header: '',
    cell: ({ row }) => {
      const currentIndex = row.index + 1;

      return (
        <div className="flex justify-center items-center gap-x-2">
          <EditEpisodeDialogInColumns
            currentEp={currentIndex}
            totalEp={episodeCount}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <HiOutlineDotsHorizontal className="text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              <DropdownMenuGroup>
                <DropdownMenuItem>แก้ไข</DropdownMenuItem>
                <DropdownMenuItem>ลบ</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
