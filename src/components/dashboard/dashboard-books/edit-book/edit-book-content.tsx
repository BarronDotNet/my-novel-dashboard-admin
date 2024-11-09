'use client';

import {
  IProductNovels,
  ProductTypeSetEnum,
} from '@/interfaces/product-novels.interface';
import CommonLoading from '@/components/common/loading';
import NovelEpisode from '@/components/dashboard/dashboard-books/edit-book/book-categories/novel-episode';
import EditCartoonBook from '@/components/dashboard/dashboard-books/edit-book/book-categories/edit-cartoon-book';
import EditEBook from '@/components/dashboard/dashboard-books/edit-book/book-categories/edit-ebook';

interface IProps {
  book?: IProductNovels | null;
  loading: boolean;
}

const EditBookContent = ({ book, loading }: IProps) => {
  if (loading) return <CommonLoading />;

  if (book?.ProductTypeSet === ProductTypeSetEnum.NOVEL) {
    return (
      <div>
        <NovelEpisode book={book} />
      </div>
    );
  }

  if (book?.ProductTypeSet === ProductTypeSetEnum.CARTOON) {
    return (
      <div>
        <EditCartoonBook book={book} />
      </div>
    );
  }

  if (book?.ProductTypeSet === ProductTypeSetEnum.EBOOK) {
    return (
      <div>
        <EditEBook book={book} />
      </div>
    );
  }
};

export default EditBookContent;
