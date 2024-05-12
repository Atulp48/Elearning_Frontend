"use client";
import { useGetUserCoursesQuery } from "@/redux/features/courses/coursesAPi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../component/Loader/Loader";
import Header from "../component/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../component/Course/CourseCard";
import Footer from "../component/Footer";

type Props = {};

const Page = (props: Props) => {
  const searchparams = useSearchParams();
  const search = searchparams?.get("name");
  const { data, isLoading } = useGetUserCoursesQuery(undefined, {});
  const { data: HeroData, isLoading: HeroLoading } = useGetHeroDataQuery(
    "Categories",
    {}
  );

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const catogries = HeroData?.layout.categories;

  console.log("a gays hero ", HeroData);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            activeItem={1}
            route={route}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title="All Courses"
              description="E learning Plateform"
              keywords="Programming keywords"
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category == "All" ? "bg-green-900" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {catogries &&
                catogries.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[25px] ${
                        category === item.title
                          ? "bg-green-900"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>

            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "No courses found"
                  : "No courses found in this catogries "}
              </p>
            )}
            <br />
            <br />

            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard key={index} item={item} />
                ))}
            </div>
          </div>
        </>
      )}
      <Footer/>
    </div>
  );
};
export default Page;
