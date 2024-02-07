import { CompanyInfo } from "./CompanyInfo";
import { NavItems } from "./NavItems";
import Link from "next/link";
import { icons } from "../icons";

//this is a react server component so no need for state.
export let compnayData = {
  name: "Base",
  logo: "/Subtract.png",
  link: "#",
  AvailableCredits: "222.10",
};

export function Navbar() {
  return (
    <nav className="shrink-0 flex flex-col justify-between  min-h-screen w-60 px-2.5 py-4">
      <div className="">
        <CompanyInfo />
        <NavItems />
      </div>
    </nav>
  );
}
