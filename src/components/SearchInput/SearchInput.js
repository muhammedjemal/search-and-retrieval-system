"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (e.target.value) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
      params.delete("page");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="relative">
      <form action="" className="w-full">
        <input
          // name="searchTerm"
          type="text"
          autoFocus
          autoComplete="off"
          placeholder="Search for documents..."
          onChange={handleChange}
          className="w-full py-2 px-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-emerald-500 focus:border-emerald-500 transition duration-300 ease-in-out bg-white text-gray-700 placeholder-gray-400"
        />
      </form>
    </div>
  );
};
