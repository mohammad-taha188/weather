"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Search() {
  const [search, setSearch] = useState();
  let router = useRouter();

  function searchHandler() {
    router.push(`?s=${search}`);
  }

  return (
    <div className="flex justify-between">
      <input
        type="text"
        className="border border-sky-200 rounded-sm focus:outline-1 focus:outline-sky-400 w-full mx-2 px-3 py-2 text-gray-400 bg-sky-50 "
        placeholder="City | Country"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            searchHandler();
          }
        }}
      />
      <button
        className="btn btn-sky"
        onClick={() => {
          searchHandler();
        }}
      >
        search
      </button>
    </div>
  );
}

export default Search;
