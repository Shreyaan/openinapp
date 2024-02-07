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
import { Data } from "@/pages/dashboard";

const DataTable = ({ data }: { data: Data }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Links</TableHead>
          <TableHead>Prefix</TableHead>
          <TableHead className="text-right">Selected Tags</TableHead>
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

const TableRowWithDropdown = ({ item }: { item: Data[number] }) => {
  const [selectedTag, setSelectedTag] = useState("");

  const handleTagChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedTag(e.target.value);
  };

  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>{item.links}</TableCell>
      <TableCell>{item.prefix}</TableCell>
      <TableCell className="text-right">
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="">Select Tag</option>
          {item.selectTags.map(
            (tag: { text: string }, index: React.Key | null | undefined) => (
              <option key={index} value={tag.text}>
                {tag.text}
              </option>
            )
          )}
        </select>
      </TableCell>
    </TableRow>
  );
};
