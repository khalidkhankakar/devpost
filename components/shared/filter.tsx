"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";

interface Props {
  filters: {
    name: string,
    value: string,
  }[];
}

const Filter = ({ filters }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const paramFilter = searchParams.get('filter');

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const handleUpdateParams = useCallback(
      (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('filter', value)
   
        router.push(pathname + '?' + params.toString(), {scroll:false})
        return
      },
      [searchParams]
    )

  return (
    <div className="flex items-center justify-evenly gap-5 flex-wrap">
        {
            filters.map((item)=>(
                <Button onClick={()=>handleUpdateParams(item.value)} variant={paramFilter===item.value?'default':'secondary'} key={item.value}>{item.name}</Button>
            ))
        }
    </div>
  )
}

export default Filter