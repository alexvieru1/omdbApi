import NavBar from "@/components/NavBar";
import React from "react";

const MovieLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <NavBar />
      {children}
    </div>
  );
};

export default MovieLayout;
