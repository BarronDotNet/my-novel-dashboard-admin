'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import Image from 'next/image';
import { IUsers } from '@/interfaces/users.interface';
import { Badge } from '@/components/ui/badge';

interface IProps {
  book?: IProductNovels | null;
  user?: IUsers | null;
  isLoading: boolean;
}

const BooksDetailContent = ({ book, user }: IProps) => {
  return (
    <div>
      <Card className="pt-6">
        <div className="flex flex-col md:flex-row lg:grid lg:grid-cols-4 lg:gap-6">
          {/* Left section with 25% width on larger screens and full width on smaller screens */}
          <div className="lg:col-span-1 flex justify-center">
            <CardContent>
              {book?.ImageUrl ? (
                <Image
                  width={259}
                  height={259}
                  src={book.ImageUrl}
                  alt={book.ProductName || 'Book cover image'}
                  className="h-60 w-44 rounded-lg"
                />
              ) : (
                <div className="h-40 w-40 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
            </CardContent>
          </div>

          <div className="lg:col-span-3 mt-6 lg:mt-0">
            <CardContent>
              <CardTitle>{book?.ProductName}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  width={50}
                  height={50}
                  src={user?.imageUrl || '/images/profiles/0029.png'}
                  alt={user?.username || 'user cover image'}
                  className="h-7 w-7"
                />
                <span className="font-bold">
                  {book?.ProductAuthor || user?.username}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                {book?.ProductIntro}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {book?.ProductTags?.map((tag, index) => (
                  <Badge
                    key={index}
                    className="mr-1 bg-blue-100 text-blue-800 hover:bg-blue-300"
                  >
                    {tag}
                  </Badge>
                ))}
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-300">
                  {book?.ProductType}
                </Badge>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BooksDetailContent;
