import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import axios from "axios";
import { useBlockContext } from "../../../../contexts/BlocksContext";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import BlockPage from "./BlockPage";
import AddBlockPopUp from "./AddBlockPopUp";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigate } from "react-router-dom";

function RoomAllocation() {
  const { user, setUser } = useContext(UserContext);
  // const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { blocks, setBlocks } = useBlockContext();

  useEffect(() => {
    setLoading(true);
    axios.get("/admin/get-blocks").then((res) => {
      if (res.status === 200) {
        setBlocks(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (!user || (user && user.role !== "Admin")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-6 lg:p-6 h-screen md:h-full containerX">
      <div className="w-full">
        {loading && blocks.length === 0 && (
          <>
            <Skeleton className="h-16 flex flex-row justify-between items-center p-4 rounded-none">
              <div className="flex flex-row items-center gap-3">
                <Skeleton className="h-10 w-20 rounded-none" />
                <Skeleton className="h-10 w-20 rounded-none" />
              </div>
              <Skeleton className="h-10 w-28" />
            </Skeleton>
          </>
        )}
        {blocks && blocks.length > 0 && (
          <>
            <Tabs defaultValue={`${blocks[0].name}`} className="w-full">
              <div className="flex bg-white border border-gray-300 overflow-auto ">
                <TabsList
                  className={cn(
                    "ml-auto justify-start bg-white h-auto p-0 w-screen md:w-full"
                  )}
                >
                  {blocks.length > 0 &&
                    blocks.map((block) => (
                      <>
                        <TabsTrigger
                          className={cn(
                            "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-500 text-bg_dark_section transition-none px-6 pb-2 pt-1 text-base flex flex-col rounded-none"
                          )}
                          value={`${block.name}`}
                        >
                          <p>Block {block.name}</p>
                          <p className="text-red-500 text-xs mt-0.5">
                            ({block.filled}/{block.blockCapacity})
                          </p>
                        </TabsTrigger>
                        <Separator
                          orientation="vertical"
                          className="m-0 h-[58px] bg-gray-300"
                        />
                      </>
                    ))}
                </TabsList>
                <AddBlockPopUp />
              </div>
              <div>
                {blocks.length > 0 &&
                  blocks.map((block) => (
                    <>
                      <TabsContent value={`${block.name}`}>
                        <BlockPage blockId={block._id} />
                      </TabsContent>
                    </>
                  ))}
              </div>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}

export default RoomAllocation;
