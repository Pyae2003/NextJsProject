"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "./ui/input"
import { useDebouncedCallback } from 'use-debounce';

type Props = {
    placeholder : string
}
const SearchInputComponent = ({placeholder} : Props) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((event : React.ChangeEvent<HTMLInputElement> | undefined ) => {

    const value = event?.target.value;

    const params = new URLSearchParams(searchParams);

    if(value){
      params.set("search",value);
    }else{
      params.delete("search");
    };

    replace(`${pathname}?${params.toString()}`,{
      scroll : false
    })
  },300)

  return (
    <div>
        <Input type="text" defaultValue={searchParams.get("search") ?? ""} placeholder={placeholder} onChange={handleSearch} />
    </div>
  )
}

export default SearchInputComponent