"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type sortingBoxProps = {
    defaultValue : string,
    options : { label : string , value : string}[]
}
const SortingBox = ({defaultValue,options} : sortingBoxProps) => {

      const searchParams = useSearchParams();
      const pathname = usePathname();
    
      const { replace } = useRouter();

    const handleSelect = (value : string) => {
        const params = new URLSearchParams(searchParams);

        if(value){
          params.set("sort",value);
        }else{
          params.delete("sort");
        };
    
        replace(`${pathname}?${params.toString()}`,{
          scroll : false
        })
    }
    
  return (
    <div className="my-5">
      <Select onValueChange={handleSelect} defaultValue={searchParams.get("sort")?.toString() || defaultValue} >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue  />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
                options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortingBox;
