import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GraduationCap, Home, User } from "lucide-react";
import { Navigate } from "react-router-dom";

import AddStudentPopup from "./AddStudentPopup";
import Loader from "../../../components/Loader";
import { UserContext } from "../../../../contexts/UserContext";
import { useBlockContext } from "../../../../contexts/BlocksContext";
import * as myConstants from "../../../../myConstants";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const BlockPage = ({ blockId }) => {
  // const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { toast } = useToast();
  const [block, setBlock] = useState(null);
  const { blocks, setBlocks } = useBlockContext();
  const [loading, setLoading] = useState(true);
  const [AllocatedRoomStudents, setAllocatedRoomStudents] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [room, setRoom] = useState("");
  const [selectedRoomNumber, setSelectedRoomNumber] = useState("");
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (blockId) {
      axios.get("/admin/get-block/" + blockId).then((res) => {
        if (res.status === 200) {
          setBlock(res.data);
          // setAllocatedRoomStudents(res.data.rooms[0].allocatedStudents);
          // setCapacity(res.data.rooms[0].capacity);
          // setRoom(res.data.rooms[0]);
          // setSelectedRoomNumber(res.data.rooms[0].number);
          setLoading(false);
          setFetch(false);
        }
      });
    }
  }, [fetch]);



  function roomOccupancy(capacity, allocatedStudents) {
    let boxes = [];

    for (let i = 0; i < capacity; i++) {
      if (allocatedStudents.length > i) {
        // If there is an allocated student at this index
        boxes.push(
          <div
            key={i}
            className="w-3 h-3 m-1 rounded-full bg-bg_dark_red"
          ></div>
        );
      } else {
        // Otherwise, the box is empty
        boxes.push(
          <div key={i} className="w-3 h-3 m-1 rounded-full bg-green-500"></div>
        );
      }
    }

    return (
      <div className="flex flex-wrap items-center justify-center">{boxes}</div>
    );
  }

  async function deleteBlock() {
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        await axios.delete("/admin/delete-block/" + blockId).then((res) => {
          if (res.status === 200) {
            setBlocks(res.data.UpdatedBlocks);
            toast({
              title: "Block deleted successfully",
            });
          }
        });
      } catch (error) {
        if (error.response.status === 400) {
          toast({
            variant: "destructive",
            title: "Failed to delete block",
          });
        }
      }
    }
  }

  if (!user || (user && user.role !== "Admin")) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {loading && !block && (
        <>
          <Skeleton className="h-[35vh] p-4 rounded-none">
            <div className="w-full flex justify-center mb-4">
              <Skeleton className="h-10 w-28 justify-center" />
            </div>
            <div className="grid lg:grid-cols-7 grid-cols-2 md:grid-cols-4 gap-5 mb-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </Skeleton>
          <Skeleton className="h-20 rounded-none mt-3" />
        </>
      )}
      {block && (
        <div className="">
          <ScrollArea className="max-h-[35vh] bg-white border border-gray-300 px-4 overflow-auto">
            <div className="flex justify-center mb-4 text-2xl font-bold bg-white w-full relative">
              <p className="pt-2">Block {block.name}</p>
              <button
                variant="destructive"
                className="absolute right-2 -top-2 bg-red-500 text-white text-sm font-normal px-4 pt-3 pb-1 rounded-lg hover:ring-1 hover:ring-red-700 hover:bg-red-500/90"
                onClick={deleteBlock}
              >
                Delete
              </button>
            </div>
            <div className="grid lg:grid-cols-7 grid-cols-2 md:grid-cols-4 gap-5 mb-4">
              {block.rooms.map((room) => (
                <>
                  <div
                    onClick={() => {
                      setAllocatedRoomStudents(room.allocatedStudents);
                      setCapacity(room.capacity);
                      setRoom(room);
                      setSelectedRoomNumber(room.number);
                      window.localStorage.setItem(
                        "SelectedRoomNo",
                        room.number
                      );
                    }}
                    className={`bg-blue-100/60 border border-gray-800 rounded-lg p-2 flex flex-col items-center cursor-pointer h-fit ${
                      selectedRoomNumber &&
                      selectedRoomNumber === room.number &&
                      "bg-gradient-to-t from-blue-200/90 to-blue-50 "
                    } `}
                    key={room.number}
                  >
                    <div
                      className={`${
                        selectedRoomNumber &&
                        selectedRoomNumber === room.number &&
                        "font-bold"
                      }`}
                    >
                      {room.number}
                    </div>
                    <div className="">
                      {roomOccupancy(room.capacity, room.allocatedStudents)}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </ScrollArea>
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 items-center bg-white border border-gray-300 px-5 pt-3 pb-5 mt-3">
            <div className="col-span-1 lg:col-span-2 text-center text-3xl font-semibold mb-2 text-cyan-500">
              {selectedRoomNumber}
            </div>
            {AllocatedRoomStudents &&
              AllocatedRoomStudents.map((student) => (
                <>
                  <div className="bg-blue-50 w-full border rounded-lg border-gray-400 shadow p-3 flex flex-row gap-4">
                    <div>
                      {student.profilePhoto ? (
                        <img
                          className="rounded aspect-square object-cover border-2 border-bg_dark_section w-20"
                          src={
                            myConstants.BACKEND_URL +
                            "/uploads/" +
                            student.profilePhoto
                          }
                        ></img>
                      ) : (
                        <img
                          className="rounded aspect-square object-cover border border-bg_dark_section/50 w-20"
                          src={myConstants.BACKEND_URL + "/uploads/default.png"}
                        ></img>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium text-base mb-1">
                        {student.firstName} {student.fatherFirstName}{" "}
                        {student.lastName}
                      </div>
                      <div className="flex flex-row gap-2 mb-1">
                        <Badge
                          variant="primary_2"
                          className="flex flex-row gap-1 items-center"
                        >
                          <User size={14} />
                          <h6>{student.rollNumber}</h6>
                        </Badge>
                        <Badge
                          variant="primary"
                          className="flex flex-row gap-1 items-center"
                        >
                          <Home size={14} />
                          <h6>{student.roomNumber}</h6>
                        </Badge>
                      </div>
                      <div className="flex flex-row gap-2">
                        <Badge
                          variant="primary_2"
                          className="flex flex-row gap-1 items-center"
                        >
                          <GraduationCap size={18} />
                          <h6>{student.course}</h6>
                        </Badge>
                        <Badge
                          variant="primary"
                          className="flex flex-row gap-1 items-center"
                        >
                          <GraduationCap size={18} />
                          <h6>{student.branch}</h6>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </>
              ))}

            <div className="h-full">
              <AddStudentPopup
                blockId={block._id}
                roomNo={selectedRoomNumber}
                AllocatedRoomStudents={AllocatedRoomStudents}
                capacity={capacity}
                setFetch={setFetch}
                setAllocatedRoomStudents={setAllocatedRoomStudents}
                setCapacity={setCapacity}
                setRoom={setRoom}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockPage;
