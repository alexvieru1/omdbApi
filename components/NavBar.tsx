import { Clapperboard, Popcorn } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <div className="flex flex-row justify-between items-center border-slate-800 dark:border-slate-300 border-b-2">
      <div className="flex flex-row justify-center items-center mt-2 ml-2">
        <Clapperboard className="w-8 h-8 text-slate-800 dark:text-slate-300" />
        <p className="text-slate-800 dark:text-slate-300 text-4xl font-extrabold ml-1">OMDb</p>
      </div>
      <div className="my-2 mr-2"><ModeToggle/></div>
    </div>
  );
};

export default NavBar;
