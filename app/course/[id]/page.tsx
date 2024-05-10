"use client";
import React, { FC } from "react";
import CourseDetailsPage from "../../component/Course/CourseDetailsPage";

type Props = {};

const page: FC<Props> = ({ params }: any) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default page;
