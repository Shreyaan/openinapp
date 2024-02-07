import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";

import { Data } from "@/pages/dashboard";
import { cn } from "@/lib/utils";

const DataTable = ({ data }: { data: Data }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Links</TableHead>
          <TableHead>Prefix</TableHead>
          <TableHead className="text-right">Select Tags</TableHead>
          <TableHead>Selected Tags</TableHead>{" "}
          {/* New column for selected tags */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRowWithDropdown key={item.id} item={item} />
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;

const TableRowWithDropdown = ({ item }: { item: Data[0] }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (value: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(value)) {
        return prevTags.filter((tag) => tag !== value);
      } else {
        return [...prevTags, value];
      }
    });
  };

  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell className="underline text-blue-400">{item.links}</TableCell>
      <TableCell>{item.prefix}</TableCell>
      <TableCell className="text-right">
        {/* <select multiple value={selectedTags} onChange={handleTagChange}>
          {item.selectTags.map((tag, index) => (
            <option key={index} value={tag.text}>
              {tag.text}
            </option>
          ))}
        </select> */}
        <Select onValueChange={handleTagChange}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select Tags" />
          </SelectTrigger>
          <SelectContent>
            {item.selectTags.map((tag, index) => (
              <SelectItem value={tag.text} key={index}>
                {tag.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="flex flex-wrap max-w-md">
        {selectedTags.map((tag, index) => (
          <button
            key={index}
            className={cn("mx-2 ", buttonVariants({ variant: "secondary" }), "bg-violet-500 text-white")}
          >
            {tag}
            {index !== selectedTags.length - 1}
            <span
              className="ml-2 cursor-pointer"
              onClick={() =>
                setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag))
              }
              role="button"
              aria-label="Remove tag"
            >
              X
            </span>
          </button>
        ))}
      </TableCell>
    </TableRow>
  );
};
