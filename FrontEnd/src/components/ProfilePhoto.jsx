import React, { useEffect, useState } from "react";
import axios from "axios";

import * as myConst from "../../myConstants";
import { useToast } from "@/components/ui/use-toast";

import { useStudentContext } from "../../contexts/StudentContext";
import { Camera } from "lucide-react";

function ProfilePhoto() {
  const { student, setStudent } = useStudentContext();
  const { toast } = useToast();
  const [profilePhotoPath, setProfilePhotoPath] = useState("");

  useEffect(
    () => {
      setProfilePhotoPath(
        myConst.BACKEND_URL + "/uploads/" + student.profilePhoto
      );
    },
    [student],
    []
  );

  async function photoHandler(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("profilePhoto", ev.target.files[0]);
    formData.append("studentId", student._id);
    axios
      .put("admin/profile-photo-update", formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Photo Updated successfully.",
          });
          setStudent(res.data.UpdatedStudent);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        <label className="relative group z-0">
          <input
            type="file"
            className="hidden cursor-pointer"
            onChange={photoHandler}
            name="img"
          />
          {student.profilePhoto ? (
            <>
              <img
                src={profilePhotoPath}
                // src={myConst.BACKEND_URL + "/uploads/" + user.profilePhoto}
                alt=""
                className="rounded object-cover border-2 border-gray-300 aspect-square h-[13rem] hover:bg-black hover:opacity-70 cursor-pointer"
              ></img>
              <div className="opacity-50 hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <Camera />
              </div>
            </>
          ) : (
            <>
              <img
                src={myConst.BACKEND_URL + "/uploads/default.png"}
                alt=""
                className="rounded border-2 border-gray-300 object-cover aspect-square h-[13rem] hover:bg-black hover:opacity-70 cursor-pointer"
              />
              <div className="opacity-50 hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Camera />
              </div>
            </>
          )}
        </label>
      </div>
    </>
  );
}

export default ProfilePhoto;
