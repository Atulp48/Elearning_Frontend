`use client`;
import React, { FC, useState, useEffect } from "react";
import CourseInformation from "./CourseInformation";
import COurseOption from "./COurseOption";
import CourseData from "./CourseData";
import CoursContenteData from "./CoursContenteData";
import CoursPrievew from "./CoursPrievew";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesAPi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Props = {};

const CreateCourese = (props: Props) => {
  const [active, setActive] = useState(0);

  const [CreateCourese, { isSuccess, error, isLoading }] =
    useCreateCourseMutation();

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estiMatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    ThumbNail: "",
    categories: "",
  });
  const [benifit, setBenifit] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});
  // console.log(courseContentData);

  const handleSubmitdata = async () => {
    const formattedbenifitData = benifit.map((item) => ({ title: item.title }));
    const formattedprequritiesDsta = prerequisites.map((item) => ({
      title: item.title,
    }));
    const formettedCourseContentData = courseContentData.map((item) => ({
      videoUrl: item.videoUrl,
      title: item.title,
      description: item.description,
      videoSection: item.videoSection,
      videoLength: item.videoLength,
      links: item.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: item.suggestion,
    }));

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estiMatedPrice: courseInfo.estiMatedPrice,
      categories: courseInfo.categories,
      ThumbNail: courseInfo.ThumbNail,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      benifit: formattedbenifitData,
      prerequisites: formattedprequritiesDsta,
      totalVideos: CoursContenteData.length,
      courseContent: formettedCourseContentData,
    };
    setCourseData(data);
  };

  const handleCreate = async (e: any) => {
    // console.log(courseData);
    if (!isLoading) {
      await CreateCourese(courseData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("course created successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, isLoading, error]);

  // console.log(courseInfo);

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            setActive={setActive}
            active={active}
          />
        )}

        {active === 1 && (
          <CourseData
            benifit={benifit}
            setBenifit={setBenifit}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CoursContenteData
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmitdata={handleSubmitdata}
          />
        )}

        {active === 3 && (
          <CoursPrievew
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCreate={handleCreate}
            isEdit={false}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <COurseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourese;
