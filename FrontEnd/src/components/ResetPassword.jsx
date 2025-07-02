import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const { toast } = useToast();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await axios
        .post(`/reset-password/${token}`, {
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            alert(
              "Password reset successfully. You will be redirect to the login page"
            );
            setRedirect(true);
          }
        });
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Link expired!! Please Request again.",
        });
      }
      if (error.response.status === 500) {
        toast({
          variant: "destructive",
          title: "Request failed. Server error",
        });
      }
    }
  };

  return (
    <>
      <div className="landing_background h-screen">
        <Header />
        <div className="flex justify-center items-center mt-24 text-bg_white_font font-semibold text-sm">
          <form
            onSubmit={handleResetPassword}
            className="login_bg text-bg_dark_font rounded-md shadow-lg border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
          >
            <div className="text-xl mb-4">Reset Password</div>

            <div className="w-full">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                className="mt-1 mb-2 w-[300px]"
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
                name="password"
                placeholder="Enter the password"
              />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                className="mt-1 mb-2 w-[300px]"
                onChange={(ev) => {
                  setConfirmPassword(ev.target.value);
                }}
                name="confirmPassword"
                placeholder="Repeat the password"
              />
            </div>

            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
