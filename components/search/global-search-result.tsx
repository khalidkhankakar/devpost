"use client";
import { GLOBAL_SEARCH_FILTERS } from "@/utils/constant/filters";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { globalSearch } from "@/lib/actions/search.action";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const GlobalSearchResult = ({ debounceVal }: { debounceVal: string }) => {
  const [result, setResult] = useState([]);
  const [type, setType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {

    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        const res = await globalSearch({query:debounceVal, type:type})

        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }

    if(debounceVal) {
      fetchResult();
    }
  }, [debounceVal,type]);

  const renderLink = (type:string,id:string)=>{
    switch (type) {
      case 'user':
        return `/profile/${id}`;
      
      case 'post':
        return `/artical-details/${id}`;
        
      case 'tag':
        return `/tags/${id}`;
      default:
        return `/`;
    }
  }
  return (
    <div className="z-20 p-2 flex flex-col rounded-md w-[150%] md:w-full md:left-0 absolute top-12 -left-[60px]">
      <div className="space-x-2 self-end">
        {GLOBAL_SEARCH_FILTERS.map((item) => (
          <Button
            variant={type === item.value ? "default" : "secondary"}
            onClick={() => setType(item.value)}
            className="text-xs px-2 py-1 "
            key={item.value}
          >
            {item.name}
          </Button>
        ))}
      </div>
      {isLoading ? (
          <div className="flex-center flex-col px-5">
            <LoaderIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />z
          </div>
        ): (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex w-full bg-gray-200 cursor-pointer items-start gap-3 px-5 py-2.5 "
                >
                  <Image 
                    src="/icons/tags.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />

                  <div className='flex flex-col '>
                    <p className="text-lg line-clamp-1">{item.title}</p>
                    <p className="text-sm mt-1 font-bold capitalize">{item.type}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex items-center justify-center flex-col px-5">
                <p className="text-sm px-5 py-2.5">Oops, no results found</p>
              </div>
            )}
          </div>
        )}
      
      {/* <Button variant={'outline'} className="mx-auto w-1/2 ">See more</Button> */}
    </div>
  );
};

export default GlobalSearchResult;
