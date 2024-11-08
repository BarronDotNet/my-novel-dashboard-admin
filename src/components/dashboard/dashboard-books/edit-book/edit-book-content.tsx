'use client';

import { useState, useEffect } from 'react';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import UploadBookCover from '@/components/dashboard/dashboard-books/edit-book/upload-book-cover';
import CommonLoading from '@/components/common/loading';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import EditBookOptions from '@/components/dashboard/dashboard-books/edit-book/edit-book-options';
import { Textarea } from '@/components/ui/textarea';
import EditBookTextEditorContent from '@/components/dashboard/dashboard-books/edit-book/edit-book-text-editor-content';

interface IProps {
  book?: IProductNovels | null;
  loading: boolean;
}

const EditBookContent = ({ book, loading }: IProps) => {
  const [mainCategory, setMainCategory] = useState('');
  const [secondaryCategory, setSecondaryCategory] = useState('');
  const [rate, setRate] = useState('');
  const [productName, setProductName] = useState('');
  const [productAuthor, setProductAuthor] = useState('');
  const [translator, setTranslator] = useState('');
  const [productIntro, setProductIntro] = useState('');

  useEffect(() => {
    if (book) {
      setMainCategory(book.ProductGroup || '');
      setSecondaryCategory(book.ProductType || '');
      setRate(book.ProductRate || '');
      setProductName(book.ProductName || '');
      setProductIntro(book.ProductIntro || '');
      setProductAuthor(book.ProductAuthor || 'ไม่มีชื่อผู้แต่ง');
      setTranslator(book.Translator || 'ไม่มีชื่อผู้แปล');
    }
  }, [book]);

  if (loading) return <CommonLoading />;

  return (
    <div>
      <Card className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-3">
        <div className="lg:col-span-1 flex justify-center">
          <UploadBookCover bookCover={book?.ImageUrl} />
        </div>
        <div className="lg:col-span-3">
          <div className="w-full flex flex-col space-y-1.5 mb-3">
            <Label htmlFor="name">ชื่อเรื่อง</Label>
            <Input
              id="name"
              value={productName}
              placeholder="ชื่อของเรื่อง"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <Label htmlFor="author">ผู้แต่ง</Label>
              <Input
                id="author"
                value={productAuthor}
                placeholder="ชื่อผู้แต่ง"
                onChange={(e) => setProductAuthor(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="translator">ผู้แปล</Label>
              <Input
                id="translator"
                value={translator}
                placeholder="ชื่อผู้แปล"
                onChange={(e) => setTranslator(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full mb-3">
            <EditBookOptions
              mainCategory={mainCategory}
              setMainCategory={setMainCategory}
              secondaryCategory={secondaryCategory}
              setSecondaryCategory={setSecondaryCategory}
              rate={rate}
              setRate={setRate}
            />
          </div>

          <div className="w-full flex flex-col space-y-1.5 mb-3">
            <Label htmlFor="productIntro">คำโปรย</Label>
            <Textarea
              id="productIntro"
              placeholder="ระบุเรื่องย่อ"
              rows={6}
              value={productIntro}
              onChange={(e) => setProductIntro(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div>
        <EditBookTextEditorContent />
      </div>
    </div>
  );
};

export default EditBookContent;
