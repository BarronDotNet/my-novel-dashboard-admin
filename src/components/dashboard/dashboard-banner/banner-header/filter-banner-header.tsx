'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CgViewComfortable } from 'react-icons/cg';
import { PiRowsLight } from 'react-icons/pi';
import { CiGrid41 } from 'react-icons/ci';
import { PositionContentEnum } from '@/components/dashboard/dashboard-banner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FilterBannerHeaderProps {
  onPositionChange: (position: PositionContentEnum | string) => void;
  onSearch: (searchValue: string) => void;
  onFilter: (type: string | undefined, typeSet: string | undefined) => void;
}

const changePositionOptions = [
  {
    label: 'grid',
    value: 'grid',
    icon: CiGrid41,
  },
  {
    label: 'row',
    value: 'row',
    icon: PiRowsLight,
  },
  {
    label: 'table',
    value: 'table',
    icon: CgViewComfortable,
  },
];

const typeOptions = [
  { label: 'ทั้งหมด', value: null },
  { label: 'Banner', value: 'banner' },
  { label: 'Pro', value: 'pro' },
];

const typeSetOptions = [
  { label: 'ทั้งหมด', value: null },
  { label: 'Cartoon', value: 'cartoon' },
  { label: 'EBook', value: 'ebook' },
  { label: 'Fan', value: 'fan' },
  { label: 'Fic', value: 'fic' },
  { label: 'Index', value: 'index' },
  { label: 'PB', value: 'pb' },
];

const FilterBannerHeader = ({
  onPositionChange,
  onFilter,
  onSearch,
}: FilterBannerHeaderProps) => {
  const [selectedType, setSelectedType] = useState(typeOptions[0].value);
  const [selectedTypeSet, setSelectedTypeSet] = useState(
    typeSetOptions[0].value
  );
  const [selectedPosition, setSelectedPosition] = useState(
    changePositionOptions[0].value
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    onFilter(value || undefined, selectedTypeSet || undefined);
  };

  const handleTypeSetChange = (value: string) => {
    setSelectedTypeSet(value);
    onFilter(selectedType || undefined, value || undefined);
  };

  const handlePositionChange = (value: PositionContentEnum | string) => {
    setSelectedPosition(value);
    onPositionChange(value);
  };

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={selectedTypeSet} onValueChange={handleTypeSetChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Type Set" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type Set</SelectLabel>
              {typeSetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center gap-2 mt-5">
        <div className="flex justify-start items-center gap-2">
          <Input
            className="w-[280px]"
            type="text"
            placeholder="ค้นหา banner ......"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button variant="outline" onClick={handleSearchClick}>
            ค้นหา
          </Button>
        </div>
        <div className="flex justify-start items-center gap-2">
          {changePositionOptions.map((option) => (
            <button
              key={option.value}
              className={`flex items-center p-2 border rounded hover:bg-gray-200 ${
                selectedPosition === option.value ? 'bg-gray-300' : ''
              }`}
              title={option.label}
              onClick={() => handlePositionChange(option.value)}
            >
              <option.icon />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBannerHeader;
