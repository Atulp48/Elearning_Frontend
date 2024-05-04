"use client";
import DashboardHeader from "@/app/component/Admin/DashboardHeader";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React, { FC } from "react";
import AdminSidebar from "../../component/Admin/sidebar/AdminSidebar";
import AllInvoices from "@/app/component/Admin/Order/AllInvoices";

type Props = {};

const Page: FC<Props> = ({}) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning site"
          description="this is description"
          keywords="this is keywords"
        />

        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <AllInvoices />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
