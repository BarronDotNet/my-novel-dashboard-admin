import React, { useState } from 'react';
import Image from 'next/image';
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
import { CiEdit } from 'react-icons/ci';
import { TiDeleteOutline } from 'react-icons/ti';
import { IBanner } from '@/interfaces/banner.interface';
import UpdateBanner from '@/components/dashboard/dashboard-banner/update-banner';

interface IProps {
  banner?: IBanner[];
}

const RowPositionContent = ({ banner }: IProps) => {
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
    <div className="grid grid-cols-1 gap-3 p-4">
      {banner && banner.length > 0 ? (
        banner.map((item, index) => (
          <div
            key={index}
            className="flex items-start bg-white rounded-lg shadow-md p-4 gap-4"
          >
            <div className="flex-shrink-0 w-96 h-50 bg-gray-200 overflow-hidden rounded-md">
              <Image
                src={item.ImageUrl || '/images/banner/Banner_HW-01.jpg'}
                alt={item.titlename || 'Banner Image'}
                width={359}
                height={359}
                className="object-cover w-96 h-48"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="mb-2 flex justify-between">
                <div>
                  {item.titlename && (
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.titlename}
                    </h3>
                  )}
                  <p className="text-gray-600">Type: {item.Type}</p>
                  <p className="text-gray-600">Section: {item.Section}</p>
                  <p className="text-gray-600">TypeSet: {item.TypeSet}</p>
                </div>
                {/* Edit and Delete Actions */}
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
              </div>
              <div className="mt-auto">
                {item.isActive ? (
                  <span className="px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No banners available
        </div>
      )}

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

export default RowPositionContent;
