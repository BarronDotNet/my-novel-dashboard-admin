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
import AddImageBannerContent from '@/components/dashboard/dashboard-banner/create-banner/add-image-banner-content';
import { Checkbox } from '@/components/ui/checkbox';

const CreateBanner = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <DialogTrigger asChild>
        <Button variant="outline">เพิ่ม Banner</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[670px]">
        <DialogHeader>
          <DialogTitle>เพิ่ม Banner</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center">
            <AddImageBannerContent />
          </div>

          {/* FkProductId Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="FkProductId" className="text-right">
              FkProductId
            </Label>
            <Input
              id="FkProductId"
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
                checked={isChecked}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium leading-none"
              ></label>
            </div>
          </div>

          {/* Title Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="titlename" className="text-right">
              Title Name
            </Label>
            <Input
              id="titlename"
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

export default CreateBanner;
