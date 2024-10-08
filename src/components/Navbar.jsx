import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import burger from "../assets/hamburger.png";
import { useEffect, useState } from "react";
import SlideMenu from "./SlideMenu";
import { axiosInstance } from "../lib/axiosInstance";
import Cookies from "js-cookie";
import { useUserStore } from "../store/store";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const token = Cookies.get("token");

  const { setUser, user, setUserCourses } = useUserStore((state) => state);

  useEffect(() => {
    if (token && token !== "undefined") {
      axiosInstance
        .get("auth/profile")
        .then((res) => {
          setUser(res.data.user);
          setUserCourses(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, setUser, setUserCourses]);

  const navigate = useNavigate();

  const logoutHandler = () => {
    Cookies.remove("token");
    setUser({});
    setUserCourses([]);

    navigate("/");
  };

  console.log(user);

  return (
    <>
      {/* <SlideMenu open={open} setOpen={setOpen} /> */}
      <div className="h-20 w-full sticky top-0  shadow-nav z-30 bg-white ">
        <div className="container flex justify-between items-center max-md:gap-5 h-full m-auto px-5">
          {token ? (
            <div className="flex items-center gap-5">
              {" "}
              <Link
                to={`/profile/${user.id}`}
                className="flex items-center gap-5 "
              >
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img src={user.profile_pic} alt="" className="w-full" />
                </div>
                <div className="max-md:hidden">
                  <p className="text-sm text-slate-600">{user.name}</p>
                </div>
              </Link>
              <button
                onClick={logoutHandler}
                className=" rounded-full  cursor-pointer inline-block"
              >
                <FaSignOutAlt className="text-3xl text-red-600" />
              </button>
              {(user.role === "Admin" || user.role === "Teacher") && (
                <a
                  href={`https://elshamelapi.js-py.me/api/auth/dashboard/${token}`}
                  className=""
                >
                  <TbLayoutDashboardFilled className="text-blue-600 text-3xl" />
                </a>
              )}
            </div>
          ) : (
            <Link to={"/signin"} className="main-btn max-md:hidden">
              سجل
            </Link>
          )}
          <div className="flex items-center gap-5 max-md:hidden">
            <Link className="link" to={"/"}>
              الرئيسية
            </Link>
            <Link className="link" to={"/courses"}>
              دوراتنا
            </Link>
            <Link className="link" to={"/aboutus"}>
              من نحن
            </Link>
          </div>
          <Link
            to={"/"}
            className="h-full  flex items-center py-4 max-md:flex-grow max-md:-order-1 cursor-pointer"
          >
            <img src={logo2} alt="logo" className="w-12" />
            <img src={logo1} alt="logo" className="w-16" />
          </Link>

          {/* <img
            onClick={() => setOpen(true)}
            className="hidden max-md:block cursor-pointer"
            src={burger}
            alt="menu-icon"
          /> */}
        </div>
      </div>
    </>
  );
}
