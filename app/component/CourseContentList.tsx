import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = ({
  data,
  isDemo,
  activeVideo,
  setActiveVideo,
}) => {
  const [visibleSection, setVisibleSection] = useState<Set<string>>(
    new Set<string>()
  );
  // console.log(data);

  const videoSections: string[] = [
    ...new Set<string>(data?.map((item: any) => item.videoSection)),
  ];

  let totalcount: number = 0;

  const toggleSection = (section: string) => {
    const newvisibleSection = new Set(visibleSection);
    if (newvisibleSection.has(section)) {
      newvisibleSection.delete(section);
    } else {
      newvisibleSection.add(section);
    }
    setVisibleSection(newvisibleSection);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: string, index: number) => {
        const isSectionVisible = visibleSection.has(section);

        const sectionVideos: any[] = data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionvideoCount: number = sectionVideos.length;
        const sectionvideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex: number = totalcount;
        totalcount = totalcount + sectionvideoCount;
        const sectionContentHours: number = sectionvideoLength / 60;
        return (
          <div
            key={section}
            className={`${!isDemo && "border-b border-[#ffffff8e] pb-2"}`}
          >
            <div className="w-full flex">
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[22px]  text-black dark:text-white">
                  {section}
                </h2>
                <button
                  className="mr-4 cursor-pointer text-black dark:text-white"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} /> 
                    // ""
                  ) : (
                    <BsChevronDown size={20} />
                    // ""
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionvideoCount} Lessons{" ⏰"}
              {sectionvideoLength < 60
                ? sectionvideoLength
                : sectionContentHours.toFixed(2)}
              {sectionvideoLength > 60 ? " hours" : " minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      key={index}
                      className={`w-full ${
                        videoIndex === activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2`}
                      onClick={() =>
                        isDemo ? null : setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-start">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                          {item.title}
                        </h1>
                      </div>
                      <h5 className="pl-8 text-black dark:text-white">{"⌛"}
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}
                        {item.videoLength > 60 ? " hours" : " minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default CourseContentList;
