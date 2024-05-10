import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesAPi";
import React, { FC, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentVideo from "../Course/CourseContentVideo";
import Header from "../Header";
import CourseContentList from "../CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent: FC<Props> = ({ id, user }) => {
  const { data, isLoading, refetch } = useGetCourseDetailsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeItem, setActiveItem] = useState(1);
  // console.log();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
            activeItem={activeItem}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data?.content[activeVideo]?.title}
              description={data?.content[activeVideo]?.description}
              keywords={data?.content[activeVideo]?.tags}
            />

            <div className="col-span-7">
              <CourseContentVideo
                data={data?.content}
                activeVideo={activeVideo}
                setactiveVideo={setActiveVideo}
                id={id}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="800px:col-span-3 800:block">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data.content}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseContent;
