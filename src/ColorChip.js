import React from "react";
import lightOrDark from "./utils/lightOrdark";

export default function ColorChip({ color }) {
  const isLight = lightOrDark(color) === "light";
  return (
    <div className="flex items-center w-full">
      <p
        className={`font-bold text-center w-full ${
          isLight ? "text-gray-900" : "text-gray-200"
        }`}
      >
        {color}
      </p>
    </div>
  );
}
