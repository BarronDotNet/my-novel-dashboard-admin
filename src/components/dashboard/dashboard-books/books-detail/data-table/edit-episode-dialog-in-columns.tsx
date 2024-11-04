import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface IProps {
  currentEp: number;
  totalEp: number;
}

const EditEpisodeDialogInColumns = ({ currentEp, totalEp }: IProps) => {
  const [episodeName, setEpisodeName] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState(currentEp);
  const [targetEpisode, setTargetEpisode] = useState<number | null>(null);

  const handleSave = () => {
    console.log('Saved:', { episodeNumber, episodeName, targetEpisode });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LiaExchangeAltSolid />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>แก้ไขตอนที่ {currentEp}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="episode-number" className="text-right">
              ตอนปัจจุบัน
            </Label>
            <Input
              id="episode-number"
              type="text"
              value={`ตอนที่ ${episodeNumber}`}
              onChange={(e) => setEpisodeNumber(Number(e.target.value))}
              className="col-span-3"
              min={1}
              max={totalEp}
              disabled
            />
          </div>

          <div className="flex justify-center items-center">
            <LiaExchangeAltSolid className="size-7 text-gray-600" />
          </div>

          {/* Align Label and CommandInput in the same row */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target-episode" className="text-right col-span-1">
              ตอนที่
            </Label>
            <div className="col-span-3">
              <Command>
                <CommandInput placeholder="ค้นหาตอนที่ต้องการ..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="ตอนทั้งหมด">
                    {Array.from({ length: totalEp }, (_, i) => i + 1).map(
                      (ep) => (
                        <CommandItem
                          key={ep}
                          onSelect={() => setTargetEpisode(ep)}
                        >
                          ตอนที่ {ep}
                        </CommandItem>
                      )
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
              {targetEpisode && (
                <div className="mt-2 text-gray-600">
                  ตอนที่เลือก: ตอนที่ {targetEpisode}
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEpisodeDialogInColumns;
