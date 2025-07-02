// Libraries
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../contexts/UserContext";
import { motion, useInView, useAnimation } from "framer-motion";

// Components
import logo from "../assets/logo.png";
import index from "../assets/Index.jpg";
import { EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import Loader from "@/components/Loader";

function UserLogin() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isLoginLoding, setIsLoginLoding] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  

  const ref = useRef(null);
  const isInViewPage = useInView(ref, { once: true });
  const controlsPage = useAnimation();

  useEffect(() => {
    if (isInViewPage) {
      controlsPage.start("visible");
    }
  }, [isInViewPage, controlsPage]);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) {
    if (user.role === "Student") {
      navigate("/student/profile");
    } else if (user.role === "Manager") {
      navigate("/manager/dashboard");
    } else if (user.role === "Accountant") {
      navigate("/accountant/dashboard");
    } else if (user.role === "Admin") {
      navigate("/admin/dashboard");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required*"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required*"),
    }),
    onSubmit: async (values) => {
      if (values.email === "" || values.password === "") {
        toast({
          variant: "destructive",
          title: "Please fill all fields !!",
        });
      } else {
        setIsLoginLoding(true);
        try {
          await axios
            .post(
              "/login",
              {
                email: values.email,
                password: values.password,
              },
              { withCredentials: true }
            )
            .then((res) => {
              if (res.status === 201) {
                setUser(res.data);
                setIsLoginLoding(false);
                if (user) {
                  if (user.role === "Student") {
                    navigate("/student/profile");
                  } else if (user.role === "Manager") {
                    navigate("/manager/dashboard");
                  } else if (user.role === "Accountant") {
                    navigate("/accountant/dashboard");
                  } else if (user.role === "Admin") {
                    navigate("/admin/dashboard");
                  }
                }
              }
            });
        } catch (err) {
          if (err.response.status === 401)
            toast({
              variant: "destructive",
              title: "Provide correct credentials !!",
            });
          else if (err.response.status === 404)
            toast({
              variant: "destructive",
              title: "User does not exists !!",
            });
          if (err.response.status === 400)
            toast({
              variant: "destructive",
              title: "Failed !!",
            });
          setIsLoginLoding(false);
        }
      }
    },
  });

  async function handleForgotPassword(ev) {
    ev.preventDefault();
    setLoading(true);
    const email = formik.values.email;
    console.log(email);
    if (email === "") {
      toast({
        variant: "destructive",
        title: "Please enter your email !!",
      });
      setLoading(false);
    } else {
      try {
        await axios.post("/forgot-password", { email: email }).then((res) => {
          if (res.status === 200) {
            setLoading(false);
            toast({
              title: "Password reset link sent to your email.",
            });
          }
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast({
          variant: "destructive",
          title: "Could not send link !!",
        });
      }
    }
  }

  return (
    <>
      <div className="h-[calc(100vh-104px)] mt-10">
        {/* <Header /> */}
        <div className="container h-full lg:px-20">
          <motion.div
            ref={ref}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={controlsPage}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="justify-center lg:my-10 overflow-x-hidden flex rounded-2xl login_bg gradient-box-shadow"
          >
            <>
              <motion.div
                ref={ref}
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate={controlsPage}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="hidden lg:block lg:flex-grow lg:object-cover "
              >
                <img
                  src={index}
                  className="h-full object-cover rounded-r-full shadow-[0_0_15px_0_rgba(0,0,0,0.3)]"
                  alt="Background"
                />
              </motion.div>
              <div className="flex flex-col item-center lg:ml-16 lg:mr-4 mt-8 mb-4 lg:w-4/5 ">
                <motion.div
                  ref={ref}
                  variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  initial="hidden"
                  animate={controlsPage}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="flex flex-row justify-center items-center gap-3"
                >
                  <img src={logo} width={40} />
                  <Link
                    to="/"
                    className="text-3xl font-semibold protest-riot-regular"
                  >
                    APC&nbsp;Nadiad
                  </Link>
                </motion.div>
                <div className="w-full px-2 py-10 lg:px-16 rounded-2xl">
                  <motion.div
                    ref={ref}
                    variants={{
                      hidden: { opacity: 0, x: 100 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    initial="hidden"
                    animate={controlsPage}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="items-center justify-center flex flex-col"
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl text-black font-normal playfair mb-2">
                      Welcome
                    </div>
                    <p className="mb-4 px-1 text-center text-zinc-600 text-sm">
                      Enter your email and password to access your account
                    </p>
                  </motion.div>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="px-4 py-3 flex flex-col justify-center items-center gap-2"
                  >
                    <motion.div
                      ref={ref}
                      variants={{
                        hidden: { opacity: 0, x: 100 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      initial="hidden"
                      animate={controlsPage}
                      transition={{ duration: 0.5, delay: 0.35 }}
                      className="w-full"
                    >
                      <Label
                        variant="default"
                        className="text-sm lg:text-base md:text-base"
                      >
                        Email
                      </Label>
                      <div className="flex flex-row items-center justify-center gap-x-2">
                        <Input
                          type="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          className={`mt-1 mb-1 ${
                            formik.touched.email && formik.errors.email
                              ? "outline outline-1 outline-red-500 "
                              : ""
                          }`}
                          name="email"
                          placeholder="Enter your email "
                          {...formik.getFieldProps("email")}
                        />
                        <MailIcon color="rgb(1 1 1/0.5)" size={25} />
                      </div>

                      <div>
                        {formik.touched.email && formik.errors.email ? (
                          <div className="ml-1 text-xs text-red-600 font-medium">
                            {formik.errors.email}
                          </div>
                        ) : (
                          <div className="ml-1 text-xs text-blue-100/70 font-medium">
                            *
                          </div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      ref={ref}
                      variants={{
                        hidden: { opacity: 0, x: 100 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      initial="hidden"
                      animate={controlsPage}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="w-full"
                    >
                      <Label variant="default">Password</Label>
                      <div className="grid grid-cols-2 grid-rows-2">
                        <div className="col-span-2 flex flex-row justify-center items-center gap-x-2">
                          <Input
                            type={showPassword ? "text" : "password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`mt-1 mb-1 ${
                              formik.touched.password && formik.errors.password
                                ? "outline outline-1 outline-red-500"
                                : ""
                            }`}
                            name="password"
                            placeholder="Enter the password"
                            {...formik.getFieldProps("password")}
                          />
                          {showPassword ? (
                            <EyeIcon
                              color="rgb(1 1 1/0.5)"
                              className="hover:cursor-pointer"
                              size={25}
                              onClick={() => setshowPassword(!showPassword)}
                            />
                          ) : (
                            <EyeOffIcon
                              color="rgb(1 1 1/0.5)"
                              className="hover:cursor-pointer"
                              size={25}
                              onClick={() => setshowPassword(!showPassword)}
                            />
                          )}
                        </div>
                        <div className="row-start-2 mr-3">
                          {formik.touched.password && formik.errors.password ? (
                            <div className="ml-1 text-xs text-red-600 font-medium">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="row-start-2">
                          <div className="flex justify-end items-center">
                            <p
                              className="text-blue-500 flex items-center cursor-pointer text-right hover:underline text-sm mr-8"
                              onClick={handleForgotPassword}
                            >
                              {loading && (
                                <>
                                  <Loader height="h-1" width="w-6" />
                                </>
                              )}
                              Forgot&nbsp;Password?
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      ref={ref}
                      variants={{
                        hidden: { opacity: 0, x: 100 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      initial="hidden"
                      animate={controlsPage}
                      transition={{ duration: 0.5, delay: 0.45 }}
                      className="w-full pr-7"
                    >
                      <Button type="submit" className="w-full">
                        {isLoginLoding ? (
                          <>
                            <Loader height="h-1" width="w-8" />
                          </>
                        ) : (
                          <>
                            <p>Login</p>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
