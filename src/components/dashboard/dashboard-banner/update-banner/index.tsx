import React, { useState } from 'react';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { IBanner } from '@/interfaces/banner.interface';
import ChangeImageBannerContent from '@/components/dashboard/dashboard-banner/update-banner/change-image-banner-content';

interface IProps {
  banner: IBanner;
}

const UpdateBanner = ({ banner }: IProps) => {
  const [formData, setFormData] = useState<IBanner>({
    FkProductId: banner?.FkProductId || '',
    Type: banner?.Type || '',
    ImageUrl: banner?.ImageUrl || '',
    TypeSet: banner?.TypeSet || '',
    Section: banner?.Section || '',
    isActive: banner?.isActive || false,
    titlename: banner?.titlename || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      isActive: !prevData.isActive,
    }));
  };

  return (
    <div>
      <DialogTrigger asChild>
        <Button variant="outline">แก้ไข Banner</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[670px]">
        <DialogHeader>
          <DialogTitle>แก้ไข Banner</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center">
            <ChangeImageBannerContent imageUrl={formData.ImageUrl} />
          </div>

          {/* FkProductId Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="FkProductId" className="text-right">
              FkProductId
            </Label>
            <Input
              id="FkProductId"
              value={formData.FkProductId}
              onChange={handleInputChange}
              placeholder="Enter FkProductId"
              className="col-span-3"
              required
            />
          </div>

          {/* Type Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Type" className="text-right">
              Type
            </Label>
            <Input
              id="Type"
              value={formData.Type}
              onChange={handleInputChange}
              placeholder="Enter Type"
              className="col-span-3"
              required
            />
          </div>

          {/* TypeSet Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="TypeSet" className="text-right">
              Type Set
            </Label>
            <Input
              id="TypeSet"
              value={formData.TypeSet}
              onChange={handleInputChange}
              placeholder="Enter Type Set"
              className="col-span-3"
              required
            />
          </div>

          {/* Section Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Section" className="text-right">
              Section
            </Label>
            <Input
              id="Section"
              value={formData.Section}
              onChange={handleInputChange}
              placeholder="Enter Section"
              className="col-span-3"
              required
            />
          </div>

          {/* isActive Checkbox */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isActive" className="text-right">
              Active Status
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium leading-none"
              >
                เปิดใช้งาน
              </label>
            </div>
          </div>

          {/* Title Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="titlename" className="text-right">
              Title Name
            </Label>
            <Input
              id="titlename"
              value={formData.titlename}
              onChange={handleInputChange}
              placeholder="Enter Title Name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">บันทึก</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default UpdateBanner;
