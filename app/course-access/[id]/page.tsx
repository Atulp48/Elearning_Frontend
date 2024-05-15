"use client";
import Loader from "@/app/component/Loader/Loader";
import { useLoaduserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { FC, useEffect } from "react";
import CourseContent from "../../component/Course/CourseContent"

type Props = {
  params: any;
};

const Page: FC<Props> = ({ params }) => {
  const id = params.id;

  const { isLoading, error, data } = useLoaduserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item.courseId === id
      );
      if (!isPurchased) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data, error,id]);

  return <div>
        {
            isLoading?(<Loader/>):(
                <div>
                    <CourseContent user={data?.user} id={id}/>
                </div>
            )
        }

  </div>;
};

export default Page;
