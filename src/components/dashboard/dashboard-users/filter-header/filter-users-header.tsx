'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PiInfo } from 'react-icons/pi';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const sortOption = [
  {
    label: 'เรียงตามตัวอักษร (A-Z) (ก-ฮ) (username)',
    value: 'username_asc',
    criteria: { username: -1 },
  },
  {
    label: 'เรียงตามตัวอักษร (Z-A) (ฮ-ก) (username)',
    value: 'username_desc',
    criteria: { username: 1 },
  },
  {
    label: 'เรียงตามตัวอักษร (A-Z) (ก-ฮ) (email)',
    value: 'email_asc',
    criteria: { email: -1 },
  },
  {
    label: 'เรียงตามตัวอักษร (Z-A) (ฮ-ก) (email)',
    value: 'email_desc',
    criteria: { email: 1 },
  },
];

const filterTypeOptions = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'facebook', value: 'facebook' },
  { label: 'email', value: 'email' },
];

interface SearchParams {
  searchText: string;
  selectedType: string;
  sortCriteria: Record<string, number>;
}

interface FilterUsersHeaderProps {
  onSearch: (params: SearchParams) => void;
}

const FilterUsersHeader = ({ onSearch }: FilterUsersHeaderProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('username_asc');

  const handleSearch = () => {
    const sortCriteria =
      sortOption.find((option) => option.value === selectedSort)?.criteria ||
      {};
    onSearch({ searchText, selectedType, sortCriteria });
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    const sortCriteria =
      sortOption.find((option) => option.value === value)?.criteria || {};
    onSearch({ searchText, selectedType, sortCriteria });
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    const sortCriteria =
      sortOption.find((option) => option.value === selectedSort)?.criteria ||
      {};
    onSearch({ searchText, selectedType: value, sortCriteria });
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-start items-center gap-2">
        <Input
          className="w-[280px]"
          type="text"
          placeholder="ค้นหาผู้ใช้....."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="outline" onClick={handleSearch}>
          ค้นหา
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <PiInfo />
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="start"
              className="bg-gray-800 text-white p-2 rounded shadow-lg"
            >
              <p>สามารถค้นหาได้ด้วย</p>
              <ul className="list-disc ml-4">
                <li>username</li>
                <li>email</li>
                <li>id</li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex justify-end items-center gap-2 w-full">
        <Select
          value={selectedSort}
          onValueChange={(value) => handleSortChange(value)}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="เลือกการเรียงลำดับ">
              {sortOption.find((option) => option.value === selectedSort)
                ?.label || 'เลือกการเรียงลำดับ'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>การเรียงลำดับ</SelectLabel>
              {sortOption.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={selectedType}
          onValueChange={(value) => handleTypeChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="เลือกประเภทผู้ใช้">
              {filterTypeOptions.find((option) => option.value === selectedType)
                ?.label || 'ทั้งหมด'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ประเภทผู้ใช้</SelectLabel>
              {filterTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
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

export default FilterUsersHeader;
