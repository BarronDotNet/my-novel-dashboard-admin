import FilterBannerHeader from '@/components/dashboard/dashboard-banner/banner-header/filter-banner-header';
import { PositionContentEnum } from '@/components/dashboard/dashboard-banner';
import { Dialog } from '@/components/ui/dialog';
import CreateBanner from '@/components/dashboard/dashboard-banner/create-banner';
import React from 'react';

interface BannerHeaderProps {
  onPositionChange: (position: PositionContentEnum | string) => void;
  onSearch: (searchValue: string) => void;
  onFilter: (type: string | undefined, typeSet: string | undefined) => void;
}

const BannerHeader = ({
  onPositionChange,
  onFilter,
  onSearch,
}: BannerHeaderProps) => {
  return (
    <div>
      <div className="flex items-start justify-between mb-3">
        <Dialog>
          <CreateBanner />
        </Dialog>
        <FilterBannerHeader
          onPositionChange={onPositionChange}
          onSearch={onSearch}
          onFilter={onFilter}
        />
      </div>
    </div>
  );
};

export default BannerHeader;
