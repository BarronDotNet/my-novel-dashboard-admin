'use client';

import { IBanner } from '@/interfaces/banner.interface';
import { PositionContentEnum } from '@/components/dashboard/dashboard-banner/index';
import CommonLoading from '@/components/common/loading';
import GridPositionContent from '@/components/dashboard/dashboard-banner/position-content/grid-position-content';
import RowPositionContent from '@/components/dashboard/dashboard-banner/position-content/row-position-content';
import TablePositionContent from '@/components/dashboard/dashboard-banner/position-content/table-position-content';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IProductNovels } from '@/interfaces/product-novels.interface';

interface IProp {
  banner?: IBanner[];
  positionContent: PositionContentEnum | string;
  isLoading: boolean;
}

const BannerDataContent = ({ banner, positionContent, isLoading }: IProp) => {
  const [ids, setIds] = useState<string[]>([]);
  const [books, setBooks] = useState<IProductNovels[] | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (banner) {
      const collectedIds = banner
        .map((item) => item.FkProductId)
        .filter(Boolean) as string[];
      setIds(collectedIds);
    }
  }, [banner]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const query = await createQueryString(ids);
      const response = await fetch(`/api/novels/find-products-by-ids?${query}`);

      if (!response.ok) throw new Error('Failed to fetch data');
      const data: IProductNovels[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ids?.length > 0) {
      fetchData();
    }
  }, [ids]);

  const enrichedBanner = banner?.map((item) => {
    if (!item.ImageUrl) {
      const matchingBook = books?.find(
        (book) => book?.migrationDocumentId === item.FkProductId
      );
      return {
        ...item,
        ImageUrl: matchingBook?.ImageUrl,
      };
    }
    return item;
  });

  if (isLoading && loading) {
    return (
      <div>
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="mt-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={positionContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {positionContent === PositionContentEnum.GRID && (
            <GridPositionContent banner={enrichedBanner} />
          )}
          {positionContent === PositionContentEnum.ROW && (
            <RowPositionContent banner={enrichedBanner} />
          )}
          {positionContent === PositionContentEnum.TABLE && (
            <TablePositionContent banner={enrichedBanner} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BannerDataContent;

const createQueryString = async (ids: string[]) => {
  const encodedIds = await Promise.all(
    ids.map(async (id) => `ids=${encodeURIComponent(id)}`)
  );
  return encodedIds.join('&');
};
