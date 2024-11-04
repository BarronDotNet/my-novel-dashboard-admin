'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import { IPaginationRes } from '@/interfaces/pagination-respones.interface';
import { IProductEpisodes } from '@/interfaces/product-episodes.interface';
import FilterHeaderEpisodes from '@/components/dashboard/dashboard-books/books-detail/filter-header/filter-header-episodes';
import BooksDetailContent from '@/components/dashboard/dashboard-books/books-detail/books-detail-content';
import EpisodesTableData from '@/components/dashboard/dashboard-books/books-detail/data-table/episodes-table-data';
import { episodeColumns } from '@/components/dashboard/dashboard-books/books-detail/data-table/episodes-columns';

const BooksDetail = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProductNovels | null>(null);
  const [episodesLoading, setEpisodesLoading] = useState(true);
  const [episodes, setEpisodes] =
    useState<IPaginationRes<IProductEpisodes> | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [searchBy, setSearchBy] = useState('');
  const [selectedSort, setSelectedSort] = useState<{
    [key: string]: number | boolean;
  } | null>(null);

  const totalPages = episodes ? Math.ceil(episodes.count / perPage) : 1;

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/novels/get-product-by-id?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: IProductNovels = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodesData = async () => {
    try {
      setEpisodesLoading(true);
      const sortParam = selectedSort ? JSON.stringify(selectedSort) : '{}';
      const response = await fetch(
        `/api/novels/get-episode-pagination-from-product-id?productId=${id}&page=${page}&perPage=${perPage}&sort=${sortParam}&searchBy=${searchBy}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch episodes data');
      }
      const data: IPaginationRes<IProductEpisodes> = await response.json();
      console.log(data);
      setEpisodes(data);
    } catch (error) {
      console.error('Error fetching episodes data:', error);
    } finally {
      setEpisodesLoading(false);
    }
  };

  const handleFilterChange = ({
    searchBy,
    perPage,
    sort,
  }: {
    searchBy: string;
    perPage: number;
    sort: Record<string, number | boolean>;
  }) => {
    setSearchBy(searchBy);
    setPerPage(perPage);
    setSelectedSort(sort);
    setPage(1);
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (!loading && product) {
      fetchEpisodesData();
    }
  }, [loading, product, page, perPage, searchBy, selectedSort]);

  return (
    <div>
      <div>
        <BooksDetailContent />
      </div>

      <div>
        <FilterHeaderEpisodes onFilterChange={handleFilterChange} />
      </div>

      <div>
        <EpisodesTableData
          columns={episodeColumns(episodes?.count || 0)}
          data={episodes?.records || []}
          perPage={perPage}
          isLoading={episodesLoading}
        />
      </div>
    </div>
  );
};

export default BooksDetail;
