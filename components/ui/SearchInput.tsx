'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import React, { useState, useEffect } from 'react';

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({ placeholder = "Search..." }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Initial query from URL params
  const initialQuery = searchParams.get('query') || '';

  // Controlled input state
  const [inputValue, setInputValue] = useState(initialQuery);

  // Update local input if searchParams change (e.g. back/forward navigation)
  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // Reset page to 1 on new search

    if (term && term.trim() !== '') {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }

    // Use replace to update URL without adding history entry
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    handleSearch(e.target.value);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0 max-w-md">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm outline-2 placeholder:text-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 peer-focus:text-pink-500" />
    </div>
  );
}
