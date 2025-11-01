"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Search() {
  const [search, setSearch] = useState();
  let router = useRouter();

  function searchHandler() {
    let music = new Audio("/music/jojo.mp3");
    music.currentTime = 0;
    if (search == "salamat" || search == "سلامت") {
      alert("اقای سلامت بهترین دبیر دنیا");
    } else if (
      search == "robert" ||
      search == "رابرت" ||
      search == "marcus" ||
      search == "مارکوس"
    ) {
      alert("من این سنگو دوست ندارم🪨🪨");
    }
    if (search == "jojo" || search == "جوجو") {
      music.play().catch((err) => {
        alert("پخش صدا مجاز نیست:", err);
        console.log("پخش صدا مجاز نیست:", err);
      });
    }
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
