import React, { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useBlockContext } from "../../../../contexts/BlocksContext";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

function AddBlockPopUp() {
  const { toast } = useToast();
  const { setBlocks } = useBlockContext();
  const [name, setName] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [capacity, setCapacity] = useState(0);

  async function addBlock(ev) {
    ev.preventDefault();
    if (start > end) {
      toast({
        variant: "destructive",
        title: "Provide correct range of rooms.",
      });
    } else if (capacity === 0) {
      toast({
        variant: "destructive",
        title: "Please provide the capacity for the rooms.",
      });
    } else {
      try {
        axios
          .post("/admin/allocate-block", { name, start, end, capacity })
          .then((res) => {
            if (res.status === 200) {
              toast({
                title: "Block created successfully",
              });
              setBlocks(res.data.UpdatedBlocks);
              setName("");
              setStart(0);
              setEnd(0);
              setCapacity(0);
            }
          });
      } catch (error) {
        if (error.response.status === 400) {
          toast({
            variant: "destructive",
            title: "Failed to create a block",
          });
        }
      }
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="blue_btn" className="w-fit mr-4 mt-3">
            <p>+ Add new block</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Block</DialogTitle>
          </DialogHeader>
          <form onSubmit={addBlock} className="mt-3">
            <div className="w-full">
              <Label>Block name</Label>
              <Input
                type="text"
                value={name}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
                name="name"
                placeholder="Enter block name"
              />
            </div>
            <div className="w-full">
              <Label>Starting room number</Label>
              <Input
                type="number"
                value={start}
                className="mt-1 mb-2"
                min={0}
                onChange={(ev) => {
                  setStart(ev.target.value);
                }}
                name="name"
                placeholder="Enter room number starting"
              />
            </div>
            <div className="w-full">
              Ending room number
              <Input
                type="number"
                value={end}
                min={0}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setEnd(ev.target.value);
                }}
                name="name"
                placeholder="Enter room number end"
              />
            </div>
            <div className="w-full">
              Default Capacity of room
              <Input
                type="number"
                value={capacity}
                min={0}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setCapacity(ev.target.value);
                }}
                name="name"
                placeholder="Enter room number end"
              />
            </div>
            <DialogFooter>
              <DialogClose>
                <div className="flex justify-center gap-2 w-full">
                  <Button variant="secondary">Close</Button>
                  <Button type="submit" className="hover:bg-red-500">
                    Submit
                  </Button>
                </div>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddBlockPopUp;
