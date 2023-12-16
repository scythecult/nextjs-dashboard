'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const debouncedReplace = useDebouncedCallback(replace, 800);
  const params = new URLSearchParams(searchParams);

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;

    params.set('page', '1');

    if (inputValue) {
      params.set('query', inputValue);
    } else {
      params.delete('query');
    }

    debouncedReplace(`${pathname}?${params.toString()}`);

    setSearchTerm(inputValue);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={handleSearch}
        value={searchTerm}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
