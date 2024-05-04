"use client";
import React from "react";
import AdminSidebar from "../../../component/Admin/sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import CreateCourese from "../../../component/Admin/Course/CreateCourese";
import DashboardHeader from "../../../../app/component/Admin/DashboardHeader";
import EditCourse from "../../../../app/component/Admin/Course/EditCourse";

type Props = {};

const Page = ({ params }: any) => {
  const id = params?.id;
  return (
    <div>
      <Heading
        title="Adimin Elearing"
        description="this is admin page"
        keywords="data structures"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
