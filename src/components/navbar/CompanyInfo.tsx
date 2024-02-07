import Image from "next/image";
import { compnayData } from "./Navbar";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { icons } from "../icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CompanyInfo() {
  return (
    <div className="flex justify-normal items-center pt-4 w-full gap-3 pl-1.5">
      <Image
        src={compnayData.logo}
        alt=""
        width={40}
        height={40}
        className="rounded w-10 h-10"
      />
      <div className="w-[120px] ">
        <p className="text-xl font-medium ">{compnayData.name}</p>
       
      </div>{" "}
      <div className=""> </div>
    
    </div>
  );
}
