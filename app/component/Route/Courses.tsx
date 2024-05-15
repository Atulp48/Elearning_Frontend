import { useGetUserCoursesQuery } from "@/redux/features/courses/coursesAPi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUserCoursesQuery({});
  const [course, setCourse] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setCourse(data.courses);
    }
  }, [data]);

  // console.log(course)

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="Poppins text-[25px] leading-[35px] sm:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          Expand Your Carrier
          <span className="text-gradient"> Opportunity</span>
          <br />
          Opportunity with us
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {course &&
            course.map((item: any, index: number) => (
              <CourseCard key={index} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
