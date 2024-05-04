"use client";
import React, { FC } from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../component/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHeor from "../component/Admin/DashboardHeor";

type Props = {};

const Admin = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`admin dashboard`}
          description="this site for education"
          keywords="datastructure"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[60%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeor isDashboard={true} />
          </div>
        </div>  
      </AdminProtected>
    </div>
  );
};

export default Admin;
