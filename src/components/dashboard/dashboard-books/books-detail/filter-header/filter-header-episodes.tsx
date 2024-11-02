'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CiSearch } from 'react-icons/ci';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

type SortOption = { label: string; value: Record<string, number | boolean> };

const sortOptions: SortOption[] = [
  { label: 'เรียงตามตัวอักษร (A-Z), (ก-ฮ)', value: { EpName: 1 } },
  { label: 'เรียงตามตัวอักษร (Z-A), (ฮ-ก)', value: { EpName: -1 } },
  { label: 'ยอดวิวมากสุด', value: { EpView: -1 } },
  { label: 'ยอดวิวน้อยสุด', value: { EpView: 1 } },
  { label: 'ใหม่สุด', value: { createDate: -1 } },
  { label: 'เก่าสุด', value: { createDate: 1 } },
  { label: 'เผยแพร่แล้ว', value: { isPublish: -1 } },
  { label: 'ยังไม่เผยแพร่', value: { isPublish: 1 } },
];

interface FilterHeaderEpisodesProps {
  onFilterChange: (params: {
    searchBy: string;
    perPage: number;
    sort: Record<string, number | boolean>;
  }) => void;
}

const FilterHeaderEpisodes = ({
  onFilterChange,
}: FilterHeaderEpisodesProps) => {
  const [searchBy, setSearchBy] = useState('');
  const [perPage, setPerPage] = useState(20);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const handleSearch = () => {
    onFilterChange({
      searchBy,
      perPage,
      sort: selectedSort.value,
    });
  };

  const handlePerPageSubmit = () => {
    onFilterChange({
      searchBy: searchBy || '',
      perPage: perPage || 20,
      sort: selectedSort.value,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
        <Input
          type="text"
          placeholder="ค้นหาตอนของหนังสือ..."
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="border-none focus:ring-0 focus:outline-none focus:border-none w-64 px-4 py-2"
        />
        <Button
          variant="ghost"
          className="px-4 text-gray-500"
          onClick={handleSearch}
        >
          <CiSearch size={20} />
        </Button>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Input
          type="number"
          placeholder="จำนวนการแสดง"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="border-gray-300 rounded-lg w-40 px-4 py-2"
        />
        <Button variant="ghost" onClick={handlePerPageSubmit}>
          Submit
        </Button>
        <Select
          value={selectedSort.label}
          onValueChange={(value) => {
            const sortOption = sortOptions.find(
              (option) => option.label === value
            );
            if (sortOption) {
              setSelectedSort(sortOption);
              handleSearch();
            }
          }}
        >
          <SelectTrigger className="w-64 border-gray-300 rounded-lg">
            <SelectValue placeholder={selectedSort.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ตัวเลือกการจัดเรียง</SelectLabel>
              {sortOptions.map((option, index) => (
                <SelectItem key={index} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterHeaderEpisodes;
