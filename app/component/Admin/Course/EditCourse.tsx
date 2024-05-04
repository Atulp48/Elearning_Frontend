`use client`;
import React, { FC, useState, useEffect } from "react";
import CourseInformation from "./CourseInformation";
import COurseOption from "./COurseOption";
import CourseData from "./CourseData";
import CoursContenteData from "./CoursContenteData";
import CoursPrievew from "./CoursPrievew";
import {
  useEditCourseMutation,
  useGetAllcourseQuery,
} from "@/redux/features/courses/coursesAPi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const { data, refetch } = useGetAllcourseQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const [active, setActive] = useState(0);

  const editcourseData = data && data.courses.find((i: any) => i._id === id);
  // console.log(editcourseData);

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
  const [updatedData, setUpdatedData] = useState({});

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
    setUpdatedData(data);
    // console.log(data);
  };

  useEffect(() => {
    if (editcourseData) {
      setCourseInfo({
        name: editcourseData?.name,
        description: editcourseData?.description,
        price: editcourseData?.price,
        categories: editcourseData?.categories,
        estiMatedPrice: editcourseData?.estiMatedPrice,
        ThumbNail: editcourseData?.ThumbNail?.url,
        tags: editcourseData?.tags,
        level: editcourseData?.level,
        demoUrl: editcourseData?.demoUrl,
      });
      setBenifit(editcourseData?.benifit);
      setPrerequisites(editcourseData?.prerequisites);
      setCourseContentData(editcourseData?.courseContent);
    }
  }, [editcourseData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("course updated successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const handlEdit = async (e: any) => {
    // console.log("hello data ji")
    // console.log(updatedData);
    await editCourse({ data: updatedData, id: id });
    // console.log(updatedData)
  };
  // console.log(CoursContenteData);

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
            handleCreate={handlEdit}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <COurseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
