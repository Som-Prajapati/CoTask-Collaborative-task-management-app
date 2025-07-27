import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo({ value, onValueChange }) {
  return (
    <Select value={String(value)} onValueChange={(val) => onValueChange(parseInt(val, 10))}>
      <SelectTrigger className="w-[180px] bg-black">
        <SelectValue placeholder="Priority" value={String(value)} />
      </SelectTrigger>
      <SelectContent className="bg-black">
        <SelectGroup>
          <SelectLabel className="bg-black text-white">Priority</SelectLabel>
          <SelectItem value="1" className="bg-black text-white">Low</SelectItem>
          <SelectItem value="2" className="bg-black text-white">Mid</SelectItem>
          <SelectItem value="3" className="bg-black text-white">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectDemo
