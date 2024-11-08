import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdDeleteOutline } from 'react-icons/md';

interface IProps {
  bookName: string;
  id: string;
}

const DeleteBookDialog = ({ id, bookName }: IProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center justify-center">
            <button className="text-red-500 hover:text-red-700">
              <MdDeleteOutline size={20} />
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>คุณต้องการลบหนังสือเรื่อง</DialogTitle>
          </DialogHeader>
          <DialogDescription>{bookName}</DialogDescription>
          <DialogFooter>
            <Button type="submit" variant="destructive">
              ยืนยัน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default DeleteBookDialog;
