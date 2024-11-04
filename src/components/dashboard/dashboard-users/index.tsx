'use client';
import { useEffect, useState } from 'react';
import { IPaginationRes } from '@/interfaces/pagination-respones.interface';
import { IUsers } from '@/interfaces/users.interface';
import UsersTableData from '@/components/dashboard/dashboard-users/users-table-data';
import { Card } from '@/components/ui/card';
import FilterUsersHeader from '@/components/dashboard/dashboard-users/filter-header/filter-users-header';
import CommonPagination from '@/components/common/pagination';

interface SearchParams {
  searchText: string;
  selectedType: string;
  sortCriteria: Record<string, number>;
}

const DashboardUsers = () => {
  const [pagination, setPagination] = useState<IPaginationRes<IUsers> | null>(
    null
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchText: '',
    selectedType: 'all',
    sortCriteria: {},
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const { searchText, selectedType, sortCriteria } = searchParams;

      const queryParams = new URLSearchParams({
        searchBy: searchText,
        sort: JSON.stringify(sortCriteria),
        filter: selectedType,
      });

      queryParams.append('page', pageNumber.toString());
      queryParams.append('perPage', perPage.toString());

      const response = await fetch(
        `/api/users/get-users-pagination?${queryParams}`
      );
      if (!response.ok) throw new Error('Failed to fetch data');
      const data: IPaginationRes<IUsers> = await response.json();
      setPagination(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, perPage, searchParams]);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setPageNumber(1);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const totalPages = pagination ? Math.ceil(pagination.count / perPage) : 1;

  return (
    <div>
      <FilterUsersHeader onSearch={handleSearch} />
      <div className="mt-4 flex justify-end items-center">
        <CommonPagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Card className="w-auto mt-5">
        <UsersTableData users={pagination?.records || []} isLoading={loading} />
      </Card>
    </div>
  );
};

export default DashboardUsers;
