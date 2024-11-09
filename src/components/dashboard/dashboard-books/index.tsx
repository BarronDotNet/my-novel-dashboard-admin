'use client';

import FilterBooksHeader from '@/components/dashboard/dashboard-books/filter-header/filter-books-header';
import { useEffect, useState } from 'react';
import { IPaginationRes } from '@/interfaces/pagination-respones.interface';
import {
  IProductNovels,
  ProductTypeSetEnum,
} from '@/interfaces/product-novels.interface';
import BooksTableData from '@/components/dashboard/dashboard-books/books-table-data';
import { Card } from '@/components/ui/card';
import CommonPagination from '@/components/common/pagination';
import { Button } from '@/components/ui/button';
import { LiaBookMedicalSolid } from 'react-icons/lia';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import EBooksTableData from '@/components/dashboard/dashboard-books/ebook-table-data';

const addBookOptions = [
  {
    title: 'เพิ่มหนังสือนิยาย',
    description: 'เพิ่มหนังสือนิยาย',
    href: '/dashboard/dashboard-books/create/create-novel',
  },
  {
    title: 'เพิ่มหนังสือการ์ตูน',
    description: 'เพิ่มหนังสือการ์ตูน',
    href: '/dashboard/dashboard-books/create/create-cartoon',
  },
  {
    title: 'เพิ่มอีบุ๊ค',
    description: 'เพิ่มอีบุ๊ค',
    href: '/dashboard/dashboard-books/create/create-ebook',
  },
];

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
  const [selectedTypeBook, setSelectedTypeBook] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const sortParam = selectedSort ? JSON.stringify(selectedSort) : '{}';
      const filterParam = selectedTypeBook
        ? `&filter=${encodeURIComponent(JSON.stringify({ ProductTypeSet: selectedTypeBook }))}`
        : '';
      const response = await fetch(
        `/api/novels/get-product-pagination?page=${pageNumber}&perPage=${perPage}&searchBy=${searchQuery}&sort=${sortParam}${filterParam}`
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
  }, [pageNumber, perPage, searchQuery, selectedSort, selectedTypeBook]);

  const totalPages = pagination ? Math.ceil(pagination.count / perPage) : 1;
  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <div>
      <div className="py-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <LiaBookMedicalSolid className="text-lg" /> เพิ่มหนังสือ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex justify-center items-center">
                <div className="flex items-center gap-2">
                  <LiaBookMedicalSolid />{' '}
                  <span className="text-lg">เพิ่มหนังสือ</span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div>
              {addBookOptions.map((option, index) => (
                <Link
                  key={index}
                  href={option.href}
                  className="block grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0 hover:bg-sky-100 transition-colors duration-200 px-5 py-3 rounded-md"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {option.title}
                    </p>
                    <p className="text-sm text-muted-foreground pb-3">
                      {option.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <FilterBooksHeader
        onSearch={setSearchQuery}
        onSortChange={setSelectedSort}
        onTypeBookChange={setSelectedTypeBook}
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
          {selectedTypeBook === ProductTypeSetEnum.EBOOK ? (
            <EBooksTableData books={pagination?.records} isLoading={loading} />
          ) : (
            <BooksTableData books={pagination?.records} isLoading={loading} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardBooks;
