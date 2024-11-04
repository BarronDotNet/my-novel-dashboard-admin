'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import FilterHeaderEpisodes from '@/components/dashboard/dashboard-books/books-detail/filter-header/filter-header-episodes';
import BooksDetailContent from '@/components/dashboard/dashboard-books/books-detail/books-detail-content';
import EpisodesTableData from '@/components/dashboard/dashboard-books/books-detail/data-table/episodes-table-data';
import { episodeColumns } from '@/components/dashboard/dashboard-books/books-detail/data-table/episodes-columns';
import CommonLoading from '@/components/common/loading';
import { IUsers } from '@/interfaces/users.interface';

const BooksDetail = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [product, setProduct] = useState<IProductNovels | null>(null);
  const [user, setUser] = useState<IUsers | null>(null);
  const [searchBy, setSearchBy] = useState('');

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

  const fetchUserData = async () => {
    if (!product?.CreateBy?.id) return;
    try {
      setUserLoading(true);
      const response = await fetch(
        `/api/users/get-user-by-id?id=${product.CreateBy.id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data: IUsers = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setUserLoading(false);
    }
  };

  const handleFilterChange = ({ searchBy }: { searchBy: string }) => {
    setSearchBy(searchBy);
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchUserData();
    }
  }, [product]);

  if (loading && userLoading) {
    return (
      <div>
        <CommonLoading />
      </div>
    );
  }

  return (
    <div>
      <div>
        <BooksDetailContent book={product} user={user} isLoading={loading} />
      </div>

      <div className="mt-5">
        <FilterHeaderEpisodes onFilterChange={handleFilterChange} />
      </div>

      <div>
        {product?.EpTopic ? (
          <EpisodesTableData
            columns={episodeColumns(product.EpTopic.length)}
            data={product.EpTopic}
            perPage={product.EpTopic.length}
            isLoading={loading}
          />
        ) : (
          <CommonLoading />
        )}
      </div>
    </div>
  );
};

export default BooksDetail;
