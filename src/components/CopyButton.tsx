"use client";
import React from "react";
import { Button } from "./ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

const CopyButton = ({ links }: any) => {
  return (
    <button onClick={() => navigator.clipboard.writeText(links)} className="flex items-center justify-between w-full px-2">
      Copy URL
      <CopyIcon />
    </button>
  );
};

export default CopyButton;
