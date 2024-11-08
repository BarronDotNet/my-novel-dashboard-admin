'use client';

import {
  IProductNovels,
  ProductTypeSetEnum,
} from '@/interfaces/product-novels.interface';
import CommonLoading from '@/components/common/loading';
import NovelEpisode from '@/components/dashboard/dashboard-books/edit-book/book-categories/novel-episode';

interface IProps {
  book?: IProductNovels | null;
  loading: boolean;
}

const EditBookContent = ({ book, loading }: IProps) => {
  if (loading) return <CommonLoading />;

  if (book?.ProductTypeSet === ProductTypeSetEnum.NOVEL) {
    return (
      <div>
        <NovelEpisode book={book} loading={loading} />
      </div>
    );
  }
};

export default EditBookContent;
