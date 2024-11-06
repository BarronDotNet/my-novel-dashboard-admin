'use client';

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
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { CiEdit } from 'react-icons/ci';
import { TiDeleteOutline } from 'react-icons/ti';
import { IBanner } from '@/interfaces/banner.interface';
import UpdateBanner from '@/components/dashboard/dashboard-banner/update-banner';

interface IProps {
  banner?: IBanner[];
}

const GridPositionContent = ({ banner }: IProps) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {banner && banner.length > 0 ? (
        banner.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full h-40 bg-gray-200">
              <Image
                src={item.ImageUrl || '/images/banner/Banner_HW-01.jpg'}
                alt={item.titlename || 'Banner Image'}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              <div className="absolute top-2 right-2">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      <HiOutlineDotsHorizontal />
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem
                        className="flex items-center gap-2"
                        onClick={() => handleEditClick(item)}
                      >
                        <CiEdit className="w-4 h-4" />
                        แก้ไข
                      </MenubarItem>
                      <MenubarItem
                        className="flex items-center gap-2"
                        onClick={() => handleDeleteClick(item)}
                      >
                        <TiDeleteOutline className="w-4 h-4" />
                        ลบ
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
            <div className="p-4">
              {item.titlename && (
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.titlename}
                </h3>
              )}
              <p className="text-sm text-gray-600 mt-1">Type: {item.Type}</p>
              <p className="text-sm text-gray-600">Section: {item.Section}</p>
              <p className="text-sm text-gray-600">TypeSet: {item.TypeSet}</p>
              {item.isActive ? (
                <span className="mt-2 inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                  Active
                </span>
              ) : (
                <span className="mt-2 inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                  Inactive
                </span>
              )}
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

export default GridPositionContent;
