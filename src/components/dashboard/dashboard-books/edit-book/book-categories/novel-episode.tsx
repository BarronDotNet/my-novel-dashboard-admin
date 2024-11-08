import { Card } from '@/components/ui/card';
import UploadBookCover from '@/components/dashboard/dashboard-books/edit-book/upload-book-cover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import EditBookOptions from '@/components/dashboard/dashboard-books/edit-book/edit-book-options';
import { Textarea } from '@/components/ui/textarea';
import EditBookTextEditorContent from '@/components/dashboard/dashboard-books/edit-book/edit-book-text-editor-content';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import { useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface TagOption {
  value: string;
  label: string;
}

const initialTagsOption: TagOption[] = [
  { value: 'ต่างโลก', label: 'ต่างโลก' },
  { value: 'กลับชาติมาเกิด', label: 'กลับชาติมาเกิด' },
  { value: 'ผู้กล้า', label: 'ผู้กล้า' },
];

const novelTypeOptions: TagOption[] = [
  { value: 'นิยายแต่ง', label: 'นิยายแต่ง' },
  { value: 'นิยายแปล', label: 'นิยายแปล' },
];

interface IProps {
  book?: IProductNovels | null;
  loading: boolean;
}

const NovelEpisode = ({ book, loading }: IProps) => {
  const [mainCategory, setMainCategory] = useState('');
  const [secondaryCategory, setSecondaryCategory] = useState('');
  const [rate, setRate] = useState('');
  const [productName, setProductName] = useState('');
  const [productAuthor, setProductAuthor] = useState('');
  const [translator, setTranslator] = useState('');
  const [productIntro, setProductIntro] = useState('');
  const [fanClubTranslate, setFanClubTranslate] = useState('');
  const [productDetail, setProductDetail] = useState('');
  const [isPublish, setIsPublish] = useState(false);

  useEffect(() => {
    if (book) {
      setMainCategory(book.ProductGroup || '');
      setSecondaryCategory(book.ProductType || '');
      setRate(book.ProductRate || '');
      setProductName(book.ProductName || '');
      setProductIntro(book.ProductIntro || '');
      setProductDetail(book.ProductDetail || '');
      setFanClubTranslate(book.fanClubTranslate || '');
      setIsPublish(book.isPublish || false);
      setProductAuthor(book.ProductAuthor || 'ไม่มีชื่อผู้แต่ง');
      setTranslator(book.Translator || 'ไม่มีชื่อผู้แปล');
    }
  }, [book]);

  const handlePublishToggle = () => {
    setIsPublish((prev) => !prev);
  };

  return (
    <div>
      <h2 className="w-full font-bold size-16">อัพเดทนิยายรายตอน</h2>

      <Card className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-5">
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

          <div className="w-full grid gap-4 mb-3">
            <div>
              <Label htmlFor="novelType">ประเภทนิยาย</Label>
              <Select
                value={fanClubTranslate}
                onValueChange={setFanClubTranslate}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือกประเภทนิยาย" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>ประเภทนิยาย</SelectLabel>
                    {novelTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="publishStatus">การเผยแพร่</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="publishStatus"
                  checked={isPublish}
                  onCheckedChange={handlePublishToggle}
                />
                <label
                  htmlFor="publishStatus"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {isPublish ? 'เผยแพร่แล้ว' : 'ไม่แพร่'}
                </label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="w-full mt-6">
        <EditBookTextEditorContent
          content={productDetail}
          onContentChange={setProductDetail}
        />
      </div>
    </div>
  );
};

export default NovelEpisode;
