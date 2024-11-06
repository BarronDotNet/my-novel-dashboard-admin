import { IBanner } from '@/interfaces/banner.interface';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { CiEdit } from 'react-icons/ci';
import { TiDeleteOutline } from 'react-icons/ti';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UpdateBanner from '@/components/dashboard/dashboard-banner/update-banner';

interface IProps {
  banner?: IBanner[];
}

const TablePositionContent = ({ banner }: IProps) => {
  const [selectedBanner, setSelectedBanner] = useState<IBanner | null>(null);
  const [editBanner, setEditBanner] = useState<IBanner | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDeleteClick = (item: IBanner) => {
    setSelectedBanner(item);
  };

  const handleEditClick = (item: IBanner) => {
    setEditBanner(item);
    setIsEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBanner) {
      console.log(`Deleting banner: ${selectedBanner.titlename}`);
      setSelectedBanner(null);
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full">
        <Table>
          <TableCaption>A list of banners.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>TypeSet</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banner && banner.length > 0 ? (
              banner.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.titlename || 'Untitled'}
                  </TableCell>
                  <TableCell>
                    <Image
                      width={259}
                      height={259}
                      src={item.ImageUrl || '/images/banner/Banner_HW-01.jpg'}
                      alt={'banner cover'}
                      className="rounded-md w-56 h-28"
                    />
                  </TableCell>
                  <TableCell>{item.Type}</TableCell>
                  <TableCell>{item.Section}</TableCell>
                  <TableCell>{item.TypeSet}</TableCell>
                  <TableCell>
                    {item.isActive ? (
                      <span className="px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                        Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <CiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TiDeleteOutline className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  No banners available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!selectedBanner}
        onOpenChange={() => setSelectedBanner(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              คุณแน่ใจหรือว่าต้องการลบแบนเนอร์นี้?
            </AlertDialogTitle>
            <AlertDialogDescription>
              การดำเนินการนี้ไม่สามารถยกเลิกได้ แบนเนอร์จะถูกลบอย่างถาวร
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedBanner(null)}>
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500"
            >
              ลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Banner Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[670px]">
          <DialogHeader>
            <DialogTitle>แก้ไข Banner</DialogTitle>
          </DialogHeader>
          {editBanner && <UpdateBanner banner={editBanner} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TablePositionContent;
