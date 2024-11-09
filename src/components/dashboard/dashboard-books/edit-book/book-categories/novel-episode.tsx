'use client';
import { Card, CardContent } from '@/components/ui/card';
import UploadBookCover from '@/components/dashboard/dashboard-books/edit-book/upload-book-cover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import EditBookOptions from '@/components/dashboard/dashboard-books/edit-book/edit-book-options';
import { Textarea } from '@/components/ui/textarea';
import EditBookTextEditorContent from '@/components/dashboard/dashboard-books/edit-book/edit-book-text-editor-content';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import { useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { CiSaveDown2 } from 'react-icons/ci';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

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
}

const NovelEpisode = ({ book }: IProps) => {
  const router = useRouter();
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
  const [productTags, setProductTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (book) {
      setMainCategory(book.ProductGroup || '');
      setSecondaryCategory(book.ProductType || '');
      setRate(book.ProductRate || '');
      setProductName(book.ProductName || '');
      setProductIntro(book.ProductIntro || '');
      setProductDetail(book.ProductDetail || '');
      setFanClubTranslate(book.fanClubTranslate || '');
      setProductTags(book.ProductTags || []);
      setIsPublish(book.isPublish || false);
      setProductAuthor(book.ProductAuthor || 'ไม่มีชื่อผู้แต่ง');
      setTranslator(book.Translator || 'ไม่มีชื่อผู้แปล');
    }
  }, [book]);

  const handlePublishToggle = () => {
    setIsPublish((prev) => !prev);
  };

  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard/dashboard-books/');
  };

  const handleAddTag = () => {
    if (newTag && !productTags.includes(newTag)) {
      setProductTags([...productTags, newTag]);
      setNewTag('');
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (tag: string) => {
    if (!productTags.includes(tag)) {
      setProductTags([...productTags, tag]);
    }
    setNewTag('');
    setShowSuggestions(false);
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
            <Label htmlFor="addTag">แท็กนิยาย</Label>
            <div className="relative">
              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  placeholder="เพิ่มแท็กของคุณ"
                  value={newTag}
                  onChange={(e) => {
                    setNewTag(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                <Button variant="outline" onClick={handleAddTag}>
                  เพิ่มแท็ก
                </Button>
              </div>

              {showSuggestions && (
                <Card className="absolute left-0 right-0 mt-1 z-10 shadow-lg">
                  <CardContent className="p-2 relative">
                    <button
                      onClick={() => setShowSuggestions(false)}
                      className="absolute top-1 right-3 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>

                    {initialTagsOption
                      .filter((option) => option.label.includes(newTag))
                      .map((option) => (
                        <div
                          key={option.value}
                          onClick={() => handleSuggestionClick(option.value)}
                          className="p-1 hover:bg-blue-100 cursor-pointer"
                        >
                          {option.label}
                        </div>
                      ))}

                    {initialTagsOption.filter((option) =>
                      option.label.includes(newTag)
                    ).length === 0 &&
                      newTag && (
                        <div
                          onClick={() => handleSuggestionClick(newTag)}
                          className="p-1 hover:bg-blue-100 cursor-pointer text-gray-500 italic"
                        >
                          เพิ่มแท็ก &#34;{newTag}&#34;
                        </div>
                      )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {productTags.map((tag) => (
                <Badge
                  key={tag}
                  className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() =>
                      setProductTags(productTags.filter((t) => t !== tag))
                    }
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </Badge>
              ))}
            </div>
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

      <div className="flex justify-start items-center gap-3 mt-3">
        <Button
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          <CiSaveDown2 /> บันทึก
        </Button>
        <Button variant="outline" onClick={handleCancelButton}>
          <MdOutlineCancelPresentation /> ยกเลิก
        </Button>
      </div>
    </div>
  );
};

export default NovelEpisode;
