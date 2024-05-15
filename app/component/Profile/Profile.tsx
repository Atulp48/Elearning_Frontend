"use client";
import React, { FC, useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./Profileinfo";
import ChangePassword from "./ChangePassword";
import {
  courseApi,
  useGetAllcourseQuery,
} from "@/redux/features/courses/coursesAPi";
import CourseCard from "../Course/CourseCard";
// import { redirect } from 'next/navigation'

type Props = {
  user: any;
  setRoute?: any;
};

const Profile: FC<Props> = ({ user, setRoute }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCouses] = useState([]);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const { data } = useGetAllcourseQuery(undefined, {});

  const logOutHandler = async () => {
    setLogout(true);
    setRoute("/");
    await signOut();
  };
  console.log(data)
  console.log(user)

  useEffect(() => {
    if (data) {
      const fildata = user.courses
        .map((item: any) =>
          data.courses.find((course: any) => course._id === item.courseId)
        )
        .filter((i: any) => i != undefined);
      setCouses(fildata);
    }
  }, [data]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#ffffff13] rounded-[5px] shadow-xl dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } letf-[30px]`}
      >
        <SidebarProfile
          user={user}
          setActive={setActive}
          active={active}
          logOutHandler={logOutHandler}
          avatar={avatar}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
            {courses &&
              courses.map((item: any, index: number) => (
                <div key={index}>
                  <CourseCard item={item} isProfile={true} />
                </div>
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins  py-10">
              You do not have any purchased course!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
