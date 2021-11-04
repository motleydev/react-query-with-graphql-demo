import React from "react";
import ColorChip from "./ColorChip";

export default function ComplementaryColors({ colors }) {
  return (
    <div className="w-full grid grid-cols-3 h-24 self-end">
      {colors.map(({ color }, key) => {
        return (
          <div
            className="h-full items-center flex"
            key={key}
            style={{
              backgroundColor: color,
            }}
          >
            <ColorChip color={color} />
          </div>
        );
      })}
    </div>
  );
}
