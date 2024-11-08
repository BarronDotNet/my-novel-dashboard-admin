import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IProductNovels } from '@/interfaces/product-novels.interface';
import { MdModeEditOutline, MdDeleteOutline } from 'react-icons/md';
import CommonLoading from '@/components/common/loading';
import Link from 'next/link';
import PageUrls from '@/constants/page-urls';
import DeleteBookDialog from '@/components/dashboard/dashboard-users/dialog/delete-book-dialog';

interface IProps {
  books?: IProductNovels[];
  isLoading: boolean;
}

const headerTable = [
  { label: 'ชื่อ', value: 'ProductName' },
  { label: 'ประเภท', value: 'ProductType' },
  { label: 'ยอดการดู', value: 'ProductView' },
  { label: 'ตอน', value: 'EpCount' },
  { label: 'การเผยแพร่', value: 'isPublish' },
  { label: 'การจัดการ', value: 'action' },
];

const BooksTableData = ({ books, isLoading }: IProps) => {
  if (isLoading) {
    return <CommonLoading />;
  }
  return (
    <div>
      <Table className="p-5">
        <TableHeader>
          <TableRow>
            {headerTable.map((header) => (
              <TableHead key={header.value} className="text-left p-4">
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {books && books.length > 0 ? (
            books.map((book) => (
              <TableRow key={book._id}>
                <TableCell className="p-4">
                  <Link
                    className="font-bold size-12"
                    href={`${PageUrls.MANAGE_BOOKS}/${book._id}`}
                  >
                    {book.ProductName}
                  </Link>
                </TableCell>
                <TableCell className="p-4">{book.ProductType}</TableCell>
                <TableCell className="p-4">{book.ProductView}</TableCell>
                <TableCell className="p-4">{book.EpCount}</TableCell>
                <TableCell className="p-4">
                  {book.isPublish ? 'เผยแพร่แล้ว' : 'ยังไม่เผยแพร่'}
                </TableCell>
                <TableCell className="p-4 flex space-x-2">
                  <Link
                    href={`/dashboard/dashboard-books/update/${book._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdModeEditOutline size={20} />
                  </Link>
                  <DeleteBookDialog
                    id={book.migrationDocumentId}
                    bookName={book.ProductName}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headerTable.length}
                className="text-center p-4"
              >
                No books available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BooksTableData;
