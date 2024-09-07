"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import GlobalSearchResult from "./global-search-result";
import useDebounce from "@/hooks/use-debounce";

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleChange = (e:any) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    if (e.target.value === "" && isOpen) setIsOpen(false);
  };
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);


  const devSearchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        devSearchRef.current &&
        event.target instanceof Node && // Ensure event.target is a DOM node
        !devSearchRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative flex-1 " ref={devSearchRef}>
      <Search
        size={22}
        className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
      />
      <Input
        onChange={handleChange}
        value={searchTerm}
        type="search"
        placeholder="Search..."
        className="w-full rounded-md bg-muted pl-8 pr-4 focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {isOpen && <GlobalSearchResult debounceVal={debouncedSearchTerm} />}
    </div>
  );
};

export default GlobalSearch;
