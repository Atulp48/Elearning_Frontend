"use client";
import React from "react";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../component/Admin/sidebar/AdminSidebar";
import Allusers from "../../component/Admin/users/Allusers";
import DashboardHeor from "@/app/component/Admin/DashboardHeor";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`admin dashboard`}
          description="this site for education"
          keywords="datastructure"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[60%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeor />
            <Allusers isTeam={false} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};
export default Page;
