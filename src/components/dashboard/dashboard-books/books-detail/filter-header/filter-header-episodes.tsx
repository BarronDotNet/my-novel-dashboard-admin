'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';

interface FilterHeaderEpisodesProps {
  onFilterChange: (params: { searchBy: string }) => void;
}

const FilterHeaderEpisodes = ({
  onFilterChange,
}: FilterHeaderEpisodesProps) => {
  const [searchBy, setSearchBy] = useState('');

  const handleSearch = () => {
    onFilterChange({
      searchBy,
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
    </div>
  );
};

export default FilterHeaderEpisodes;
