import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

function MainTabList() {
  return (
    <div>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList
          className={cn(
            "ml-auto justify-start bg-transparent border-b h-auto pb-0 pl-0"
          )}
        >
          <TabsTrigger
            className={cn(
              "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-300 text-bg_dark_section transition-none"
            )}
            value="personal"
          >
            Personal Leave
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-300 text-bg_dark_section transition-none"
            )}
            value="bulk"
          >
            Bulk Leave
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-300 text-bg_dark_section transition-none"
            )}
            value="student"
          >
            On Leave Students
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-300 text-bg_dark_section transition-none"
            )}
            value="log"
          >
            Leave Log
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default MainTabList;
