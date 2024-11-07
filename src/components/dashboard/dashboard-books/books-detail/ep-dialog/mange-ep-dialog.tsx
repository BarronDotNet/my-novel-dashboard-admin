'use client';

import { IProductEpisodes } from '@/interfaces/product-episodes.interface';
import { FaGripLines } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CgArrowsExchangeAltV, CgArrowsExchangeV } from 'react-icons/cg';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MangeEpDialogProps {
  episodes: IProductEpisodes[];
}

const MangeEpDialog = ({ episodes }: MangeEpDialogProps) => {
  const [sortedEpisodes, setSortedEpisodes] = useState<IProductEpisodes[]>([]);
  const [isAscending, setIsAscending] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setSortedEpisodes(episodes);
  }, [episodes]);

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
    setSortedEpisodes((prevEpisodes) => [...prevEpisodes].reverse());
  };

  const moveEpisode = (fromIndex: number, toIndex: number) => {
    const updatedEpisodes = [...sortedEpisodes];
    const [movedItem] = updatedEpisodes.splice(fromIndex, 1);
    updatedEpisodes.splice(toIndex, 0, movedItem);
    setSortedEpisodes(updatedEpisodes);
  };

  const handleSave = () => {
    console.log('Sorted Episodes:', sortedEpisodes);
    setIsDialogOpen(false);
  };

  const EpisodeRow = ({
    episode,
    index,
  }: {
    episode: IProductEpisodes;
    index: number;
  }) => {
    const rowRef = useRef<HTMLTableRowElement | null>(null);

    const [, drag] = useDrag({
      type: 'episode',
      item: { index },
    });

    const [, drop] = useDrop({
      accept: 'episode',
      hover: (draggedItem: { index: number }) => {
        if (draggedItem.index !== index) {
          moveEpisode(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });

    useEffect(() => {
      if (rowRef.current) {
        drag(drop(rowRef.current));
      }
    }, [drag, drop]);

    return (
      <tr ref={rowRef} className="border-b last:border-none">
        <td className="text-start p-2">
          {isAscending ? index + 1 : sortedEpisodes.length - index}
        </td>
        <td className="p-2">{episode.EpName}</td>
        <td className="text-end p-2 cursor-move">
          <FaGripLines />
        </td>
      </tr>
    );
  };

  return (
    <div>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          จัดการตอน
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[675px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>จัดการตอน</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              onClick={toggleSortOrder}
              className="flex items-center space-x-1"
            >
              {isAscending ? <CgArrowsExchangeAltV /> : <CgArrowsExchangeV />}
              <span>
                {isAscending ? 'เรียงจากมากไปน้อย' : 'เรียงจากน้อยไปมาก'}
              </span>
            </Button>
          </div>

          <div className="h-96 overflow-y-auto">
            <DndProvider backend={HTML5Backend}>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-1/6 p-2 border-b text-start">#</th>
                    <th className="w-4/6 p-2 border-b text-left">ชื่อตอน</th>
                    <th className="w-1/6 p-2 border-b text-start">จัดเรียง</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEpisodes.map((episode, index) => (
                    <EpisodeRow
                      key={episode.id || `episode-${index}`}
                      episode={episode}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </DndProvider>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} type="submit">
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default MangeEpDialog;
