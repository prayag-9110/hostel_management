import React from "react";

function BlockInfo({ block }) {
  return (
    <div>
      <div className="bg-white border-2 p-6 w-fit">
        <div className="text-red-500 font-semibold text-lg uppercase">
          Block {block.name}
        </div>
      </div>
    </div>
  );
}

export default BlockInfo;
