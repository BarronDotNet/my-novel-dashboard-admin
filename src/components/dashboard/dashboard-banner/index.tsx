'use client';

import BannerDataContent from '@/components/dashboard/dashboard-banner/banner-data-content';
import BannerHeader from '@/components/dashboard/dashboard-banner/banner-header/banner-header';
import { useEffect, useState } from 'react';
import { IPaginationRes } from '@/interfaces/pagination-respones.interface';
import { IBanner } from '@/interfaces/banner.interface';

export enum PositionContentEnum {
  TABLE = 'table',
  GRID = 'grid',
  ROW = 'row',
}

const DashboardBanner = () => {
  const [pagination, setPagination] = useState<IPaginationRes<IBanner> | null>(
    null
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage] = useState<number | null>();
  const [loading, setLoading] = useState(true);
  const [positionContent, setPositionContent] = useState<
    PositionContentEnum | string
  >(PositionContentEnum.GRID);
  const [searchBy, setSearchBy] = useState<{ FkProductId: string } | null>(
    null
  );
  const [filterBy, setFilterBy] = useState<{
    Type?: string | null;
    TypeSet?: string | null;
    isActive?: boolean;
  } | null>(null);

  const handlePositionChange = (position: PositionContentEnum | string) => {
    setPositionContent(position);
  };

  const handleSearch = (searchValue: string) => {
    setSearchBy({ FkProductId: searchValue });
  };

  const handleFilter = (type?: string, typeSet?: string) => {
    setFilterBy({ Type: type, TypeSet: typeSet });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `/api/banner/get-banner-pagination?page=${pageNumber}&perPage=${perPage}`;

      if (filterBy) {
        if (filterBy.Type) url += `&filterBy[Type]=${filterBy.Type}`;
        if (filterBy.TypeSet) url += `&filterBy[TypeSet]=${filterBy.TypeSet}`;
      }

      if (searchBy && searchBy.FkProductId) {
        url += `&searchBy[FkProductId]=${searchBy.FkProductId}`;
      }

      const response = await fetch(url);

      if (!response.ok) throw new Error('Failed to fetch data');
      const data: IPaginationRes<IBanner> = await response.json();
      setPagination(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, perPage, searchBy, filterBy]);

  return (
    <div>
      <div>
        <BannerHeader
          onPositionChange={handlePositionChange}
          onSearch={handleSearch}
          onFilter={handleFilter}
        />
      </div>
      <div>
        <BannerDataContent
          banner={pagination?.records}
          positionContent={positionContent}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default DashboardBanner;
