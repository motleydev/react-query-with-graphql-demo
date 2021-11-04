import React from "react";

export default function ColorChip({ color }) {
  return (
    <div className="flex items-center w-full">
      <p className="font-bold text-center w-full">{color}</p>
    </div>
  );
}
