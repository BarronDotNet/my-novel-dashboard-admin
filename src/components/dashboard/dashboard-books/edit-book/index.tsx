'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import EditBookContent from '@/components/dashboard/dashboard-books/edit-book/edit-book-content';

const EditBook = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProductNovels | null>(null);
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

  useEffect(() => {
    fetchProductData();
  }, [id]);

  return (
    <div>
      <EditBookContent book={product} loading={loading} />
    </div>
  );
};
export default EditBook;
