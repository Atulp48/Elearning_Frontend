"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/navitems";
import ThemeSwitcher from "../utils/themeSwitcher";
import { HiOutlineMenu, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../component/Auth/Login";
import SignUp from "../component/Auth/SignUp";
import Varification from "../component/Auth/Varification";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  // console.log(data);

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }

    if (data === null && isSuccess) {
      toast.success("Login successfully done");
    }

    // if (data === null) {
    //     setLogout(true)
    // }
  }, [data, user]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };
  // console.log(user);
  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b  dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 80px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px]  flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                Education
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              <div className="800px:hidden">
                <HiOutlineMenu
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715781297/e9c1rshesooj9nce1rtf.jpg"
                    }
                    alt=""
                    height={40}
                    width={40}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    style={{
                      border: activeItem == 5 ? "2px solid #ffc107" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715781297/e9c1rshesooj9nce1rtf.jpg"}
                    alt=""
                    height={40}
                    width={40}
                    className="w-[30px] ml-[25px] h-[30px] rounded-full cursor-pointer"
                    style={{
                      border: activeItem == 5 ? "2px solid #ffc107" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                COPYRIGHT RESERVED
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Login}
              activeItem={activeItem}
            />
          )}
        </>
      )}

      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={SignUp}
              activeItem={activeItem}
            />
          )}
        </>
      )}

      {route === "Varification" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Varification}
              activeItem={activeItem}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
