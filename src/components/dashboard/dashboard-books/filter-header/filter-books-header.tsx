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
import CommonPagination from '@/components/common/pagination';

type SortOption = { label: string; value: Record<string, number> };

const sortOptions: SortOption[] = [
  { label: 'เรียงตามตัวอักษร (A-Z), (ก-ฮ)', value: { ProductName: 1 } },
  { label: 'เรียงตามตัวอักษร (Z-A), (ฮ-ก)', value: { ProductName: -1 } },
  { label: 'ยอดวิวมากสุด', value: { ProductView: -1 } },
  { label: 'ยอดวิวน้อยสุด', value: { ProductView: 1 } },
  { label: 'ใหม่สุด', value: { timestamp: -1 } },
  { label: 'เก่าสุด', value: { timestamp: 1 } },
  { label: 'เผยแพร่แล้ว', value: { isPublish: -1 } },
  { label: 'ยังไม่เผยแพร่', value: { isPublish: 1 } },
];

const typeBookOptions = [
  { label: 'ทั้งหมด', value: '' },
  { label: 'Novel', value: 'Novel' },
  { label: 'Cartoon', value: 'Cartoon' },
  { label: 'Ebook', value: 'Ebook' },
];

interface FilterBooksHeaderProps {
  onSearch: (query: string) => void;
  onSortChange: (sort: Record<string, number>) => void;
  onTypeBookChange: (typeBook: string) => void;
}

const FilterBooksHeader = ({
  onSearch,
  onSortChange,
  onTypeBookChange,
}: FilterBooksHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [selectedTypeBook, setSelectedTypeBook] = useState(typeBookOptions[0]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleSortChange = (label: string) => {
    const selected = sortOptions.find((option) => option.label === label);
    if (selected) {
      setSelectedSort(selected);
      onSortChange(selected.value);
    }
  };

  const handleTypeBookChange = (label: string) => {
    const selected = typeBookOptions.find((option) => option.label === label);
    if (selected) {
      setSelectedTypeBook(selected);
      onTypeBookChange(selected.value);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center rounded-lg">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
          <Input
            type="text"
            placeholder="ค้นหาหนังสือ..."
            className="border-none focus:ring-0 focus:outline-none focus:border-none w-64 px-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            className="px-4 text-gray-500"
            onClick={handleSearch}
          >
            <CiSearch size={20} />
          </Button>
        </div>

        <div className="flex justify-end items-center gap-2">
          <Select
            value={selectedTypeBook.label}
            onValueChange={handleTypeBookChange}
          >
            <SelectTrigger className="w-64 border-gray-300 rounded-lg">
              <SelectValue placeholder={selectedTypeBook.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ประเภทหนังสือ</SelectLabel>
                {typeBookOptions.map((option, index) => (
                  <SelectItem key={index} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={selectedSort.label} onValueChange={handleSortChange}>
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
    </div>
  );
};

export default FilterBooksHeader;
