"use client";
import { navIcons } from "../icons";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function NavItems() {
  const [active, setActive] = useState("Upload");
  return (
    <div className="mt-6">
      {Object.keys(navIcons).map((key, index) => {
        return (
          <div
            onClick={() => {
              setActive(key);
            }}
            className={cn(
              "px-4 py-4 text-gray-600  font-medium flex items-center gap-3 opacity-80 rounded-sm cursor-pointer transition-all",
              active === key ? "bg-[#ffffff1a] opacity-100 text-violet-800 " : ""
            )}
            key={index}
          >
            <div className="w-5 h-5 ">{navIcons[key]()}</div>
            <p className="">{key}</p>
          </div>
        );
      })}
    </div>
  );
}
