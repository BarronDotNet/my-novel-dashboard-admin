'use client';

import FilterBooksHeader from '@/components/dashboard/dashboard-books/filter-header/filter-books-header';
import { useEffect, useState } from 'react';
import { IPaginationRes } from '@/interfaces/pagination-respones.interface';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import BooksTableData from '@/components/dashboard/dashboard-books/books-table-data';
import { Card } from '@/components/ui/card';
import CommonPagination from '@/components/common/pagination';

const DashboardBooks = () => {
  const [pagination, setPagination] =
    useState<IPaginationRes<IProductNovels> | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<Record<
    string,
    number
  > | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const sortParam = selectedSort ? JSON.stringify(selectedSort) : '{}';
      const response = await fetch(
        `/api/novels/get-product-pagination?page=${pageNumber}&perPage=${perPage}&searchBy=${searchQuery}&sort=${sortParam}`
      );
      if (!response.ok) throw new Error('Failed to fetch data');
      const data: IPaginationRes<IProductNovels> = await response.json();
      setPagination(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, perPage, searchQuery, selectedSort]);
  const totalPages = pagination ? Math.ceil(pagination.count / perPage) : 1;
  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <div>
      <FilterBooksHeader
        onSearch={setSearchQuery}
        onSortChange={setSelectedSort}
      />

      <div className="flex items-center justify-end mt-4">
        <CommonPagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="mt-5">
        <Card className="w-auto">
          <BooksTableData books={pagination?.records} isLoading={loading} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardBooks;
