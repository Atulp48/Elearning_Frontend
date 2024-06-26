"use client";
import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmitdata: any;
};

const CoursContenteData: FC<Props> = ({
  setActive,
  active,
  courseContentData,
  setCourseContentData,
  handleSubmitdata,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapsedToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapsed(updateCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddlink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("please fill all fields");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("all field fillup mendetory");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled Section",
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const PrvPage = () => {
    setActive(active - 1);
  };

  const NxtPage = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("all field fillup mendetory");
    } else {
      setActive(active + 1);
      handleSubmitdata();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updataData = [...courseContentData];
                          updataData[index].videoSection = e.target.value;
                          setCourseContentData(updataData);
                        }}
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}.{item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor:-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />

                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapsedToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>

                      <input
                        type="text"
                        placeholder="project name"
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updataData = [...courseContentData];
                          updataData[index].title = e.target.value;
                          setCourseContentData(updataData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Url</label>

                      <input
                        type="text"
                        placeholder="project video url"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updataData = [...courseContentData];
                          updataData[index].videoUrl = e.target.value;
                          setCourseContentData(updataData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Length</label>

                      <input
                        type="number"
                        placeholder="project video length in minute"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updataData = [...courseContentData];
                          updataData[index].videoLength = e.target.value;
                          setCourseContentData(updataData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>

                      <textarea
                        rows={5}
                        cols={25}
                        placeholder="project video description"
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updataData = [...courseContentData];
                          updataData[index].description = e.target.value;
                          setCourseContentData(updataData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="source code title"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updataData = [...courseContentData];
                            updataData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updataData);
                          }}
                        />

                        <input
                          type="Url"
                          placeholder="source code URL"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updataData = [...courseContentData];
                            updataData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updataData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => {
                          handleAddlink(index);
                        }}
                      >
                        <BsLink45Deg className="mr-2" />
                        Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white cursor-pointer"
                      onClick={(e) => {
                        newContentHandler(item);
                      }}
                    >
                      <AiOutlinePlusCircle className="mr-2" />
                      Add new content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}

        <br />

        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" />
          add New Section
        </div>
      </form>
      <br />

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => PrvPage()}
        >
          Previous
        </div>

        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => NxtPage()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CoursContenteData;

// import toast from "react-hot-toast";
// import { styles } from "../../../../app/styles/style";
// import React, { FC, useState } from "react";
// import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
// import { BsLink45Deg, BsPencil } from "react-icons/bs";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// type Props = {
//   active: number;
//   setActive: (active: number) => void;
//   courseContentData: any;
//   setCourseContentData: (courseContentData: any) => void;
//   handleSubmitdata: any;
// };

// const Coursecontent: FC<Props> = ({
//   active,
//   setActive,
//   courseContentData,
//   setCourseContentData,
//   handleSubmitdata,
// }) => {
//   const [isCollapsed, setIsCollapsed] = useState(
//     Array(courseContentData.length).fill(false)
//   );

//   const [activeSection, setActiveSection] = useState(1);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//      handleSubmitdata();
//   };

//   const handleCollapse = (index: number) => {
//     const updatedCollapsed = [...isCollapsed];
//     updatedCollapsed[index] = !updatedCollapsed[index];
//     setIsCollapsed(updatedCollapsed);
//   };

//   const handleRemoveLink = (index: number, linkIndex: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index].links.splice(linkIndex, 1);
//     setCourseContentData(updatedData);
//   };

//   const handleAddLink = (index: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index].links.push({ title: "", url: "" });
//     setCourseContentData(updatedData);
//   };

//   const newContentHandler = (item: any) => {
//     if (
//       item.title === "" ||
//       item.description === "" ||
//       item.videoUrl === "" ||
//       item.links[0].title === "" ||
//       item.links[0].url === ""
//     ) {
//       toast.error("Please fill the current section before adding new section");
//     } else {
//       let newVideoSection = "";
//       if (courseContentData.length > 0) {
//         const lastVideoSection =
//           courseContentData[courseContentData.length - 1].videoSection;
//         // use the last video section if available, else use user input
//         if (lastVideoSection) {
//           newVideoSection = lastVideoSection;
//         }
//       }
//       const newContent = {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: newVideoSection,
//         links: [{ title: "", url: "" }],
//       };

//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };
//   const addNewSection = () => {
//     if (
//       courseContentData[courseContentData.length - 1].title === "" ||
//       courseContentData[courseContentData.length - 1].description === "" ||
//       courseContentData[courseContentData.length - 1].videoUrl === "" ||
//       courseContentData[courseContentData.length - 1].links[0].title === "" ||
//       courseContentData[courseContentData.length - 1].links[0].url === ""
//     ) {
//       toast.error("Please fill the current section before adding new section");
//     } else {
//       setActiveSection(activeSection + 1);
//       const newContent = {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: `Untitled Section ${activeSection}`,
//         links: [{ title: "", url: "" }],
//       };
//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };

//   const handlePrev = () => {
//     setActive(active - 1);
//   };
//   const handleNext = () => {
//     if (
//       courseContentData[courseContentData.length - 1].title === "" ||
//       courseContentData[courseContentData.length - 1].description === "" ||
//       courseContentData[courseContentData.length - 1].videoUrl === "" ||
//       courseContentData[courseContentData.length - 1].links[0].title === "" ||
//       courseContentData[courseContentData.length - 1].links[0].url === ""
//     ) {
//       toast.error("Please fill the current section before adding new section");
//     } else {
//       setActive(active + 1);
//        handleSubmitdata();
//     }
//   };
//   return (
//     <div className="w-[80%] m-auto mt-24 p-3">
//       <form onSubmit={handleSubmit}>
//         {courseContentData.map((item: any, index: number) => {
//           const showSectionInput =
//             index === 0 ||
//             item.videoSection !== courseContentData[index - 1].videoSection;

//           return (
//             <>
//               <div
//                 className={`w-full bg-[#cdc8c817] p-4 ${
//                   showSectionInput ? "mt-10" : "mb-0"
//                 }`}
//               >
//                 {showSectionInput && (
//                   <>
//                     <div className="flex w-full items-center">
//                       <input
//                         type="text"
//                         className={`text-[20px] ${
//                           item.videoSection === "Untitled Section"
//                             ? "w-[170px]"
//                             : "w-max"
//                         } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
//                         value={item.videoSection}
//                         onChange={(e: any) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].videoSection = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                       <BsPencil className="cursor-pointer dark:text-white text-black" />
//                     </div>
//                     <br />
//                   </>
//                 )}
//                 <div className="flex w-full items-center justify-between my-0">
//                   {isCollapsed[index] ? (
//                     <>
//                       {item.title ? (
//                         <p className="dark:text-white text-dark font-Poppins">
//                           {index + 1} {item.title}
//                         </p>
//                       ) : (
//                         <></>
//                       )}
//                     </>
//                   ) : (
//                     <div></div>
//                   )}
//                   {/* arrow button for collapsed video content  */}
//                   <div className="flex items-center">
//                     <AiOutlineDelete
//                       className={`dark:text-white text-black text-[20px] mr-2 ${
//                         index > 0 ? "cursor-pointer" : "cursor-no-drop"
//                       }`}
//                       onClick={() => {
//                         if (index > 0) {
//                           const updatedData = [...courseContentData];
//                           updatedData.splice(index, 1);
//                           setCourseContentData(updatedData);
//                         }
//                       }}
//                     />

//                     <MdOutlineKeyboardArrowDown
//                       fontSize={"large"}
//                       className="dark:text-white text-black"
//                       style={{
//                         transform: isCollapsed[index]
//                           ? "rotate(180deg)"
//                           : "rotate(0deg)",
//                       }}
//                       onClick={() => handleCollapse(index)}
//                     />
//                   </div>
//                 </div>
//                 {!isCollapsed[index] && (
//                   <>
//                     <div className="my-3">
//                       <label className={`${styles.label}`}>Video Title</label>
//                       <input
//                         type="text"
//                         placeholder="Project Plan..."
//                         className={`${styles.input}`}
//                         value={item.title}
//                         onChange={(e: any) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].title = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                     </div>
//                     <div className="my-3">
//                       <label className={`${styles.label}`}>Video Url</label>
//                       <input
//                         type="text"
//                         placeholder="https://www.youtube.com/..."
//                         className={`${styles.input}`}
//                         value={item.videoUrl}
//                         onChange={(e: any) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].videoUrl = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                     </div>
//                     <div className="my-3">
//                       <label className={`${styles.label}`}>
//                         Video Length (in minutes)
//                       </label>
//                       <input
//                         type="number"
//                         placeholder="30"
//                         className={`${styles.input}`}
//                         value={item.videoLength}
//                         onChange={(e: any) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].videoLength = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                     </div>
//                     <div className="my-3">
//                       <label className={`${styles.label}`}>
//                         Video Description
//                       </label>
//                       <textarea
//                         rows={8}
//                         cols={3}
//                         placeholder="Write something about the video description"
//                         className={`${styles.input} !h-min py-2`}
//                         value={item.description}
//                         onChange={(e: any) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].description = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                     </div>
//                     <br />
//                     {item?.links.map((link: any, linkIndex: number) => (
//                       <div className="mb-3 block" key={linkIndex}>
//                         <div className="w-full flex items-center justify-between">
//                           <label className={`${styles.label}`}>
//                             Link {linkIndex + 1}{" "}
//                           </label>
//                           <AiOutlineDelete
//                             className={`${
//                               linkIndex === 0
//                                 ? "cursor-no-drop"
//                                 : "cursor-pointer"
//                             } text-black dark:text-white text-[20px]`}
//                             onClick={() => {
//                               linkIndex === 0
//                                 ? null
//                                 : handleRemoveLink(index, linkIndex);
//                             }}
//                           />
//                         </div>
//                         <input
//                           type="text"
//                           placeholder="Source Code...(Link Title)"
//                           className={`${styles.input}`}
//                           value={link.title}
//                           onChange={(e: any) => {
//                             const updatedData = [...courseContentData];
//                             updatedData[index].links[linkIndex].title =
//                               e.target.value;
//                             setCourseContentData(updatedData);
//                           }}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Source Url...(Link Url)"
//                           className={`${styles.input}`}
//                           value={link.url}
//                           onChange={(e: any) => {
//                             const updatedData = [...courseContentData];
//                             updatedData[index].links[linkIndex].url =
//                               e.target.value;
//                             setCourseContentData(updatedData);
//                           }}
//                         />
//                       </div>
//                     ))}
//                     <br />
//                     <div className="inline-block mb-4">
//                       <p
//                         className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
//                         onClick={() => handleAddLink(index)}
//                       >
//                         <BsLink45Deg className="mr-2" /> Add Link
//                       </p>
//                     </div>
//                   </>
//                 )}
//                 <br />
//                 {index === courseContentData.length - 1 && (
//                   <div>
//                     <p
//                       className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
//                       onClick={(e) => newContentHandler(item)}
//                     >
//                       <AiOutlinePlusCircle className="mr-2" /> Add New Content
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </>
//           );
//         })}

//         <br />
//         <div
//           className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
//           onClick={() => addNewSection()}
//         >
//           <AiOutlinePlusCircle className="mr-2" /> Add New Section
//         </div>
//       </form>

//       <br />
//       <div className="w-full flex justify-between items-center">
//         <div
//           className="w-full flex justify-center items-center 800px:w-[180px] h-[40px] bg-[#37a39a] text-white rounded mt-8 cursor-pointer"
//           onClick={handlePrev}
//         >
//           Prev
//         </div>
//         <div
//           className="w-full flex justify-center items-center 800px:w-[180px] h-[40px] bg-[#37a39a] text-white rounded mt-8 cursor-pointer"
//           onClick={handleNext}
//         >
//           Next
//         </div>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default Coursecontent;
