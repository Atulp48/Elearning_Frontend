"use client";
import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  active,
  setActive,
  setCourseInfo,
  courseInfo,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categroies, setCatogries] = useState([]);

  useEffect(() => {
    if (data) {
      setCatogries(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, ThumbNail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const HandleDraggerOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const HandleDraggerLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const HandleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, ThumbNail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) => {
              setCourseInfo({ ...courseInfo, name: e.target.value });
            }}
            id="name"
            placeholder="Please enter the course name"
            className={`${styles.input}`}
          />
        </div>
        <br />

        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="write course description here"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) => {
              setCourseInfo({ ...courseInfo, description: e.target.value });
            }}
          ></textarea>
        </div>
        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, price: e.target.value });
              }}
              id="price"
              placeholder="enter course price"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Estimate Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estiMatedPrice}
              onChange={(e: any) => {
                setCourseInfo({
                  ...courseInfo,
                  estiMatedPrice: e.target.value,
                });
              }}
              id="price"
              placeholder="enter course price"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="">
              Course Tags
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, tags: e.target.value });
              }}
              id="name"
              placeholder="Enter the course tags"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
              Course Categroies
            </label>
            <select
              name=""
              id=""
              className={`${styles.seletct}`}
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value=""> select Categroies</option>
              {categroies.map((item: any) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, level: e.target.value });
              }}
              id="level"
              placeholder="enter course Level"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo URL</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value });
              }}
              id="demoUrl"
              placeholder="ente the course demo URL"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />

        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 
          border rounded  flex items-center justify-center ${
            dragging ? "bg-blue-500" : "bg-transparent"
          }`}
            onDragOver={HandleDraggerOver}
            onDragLeave={HandleDraggerLeave}
            onDrop={HandleDrop}
          >
            {courseInfo.ThumbNail ? (
              <img
                src={courseInfo.ThumbNail}
                alt=""
                className="max-h-full w-full object-cover border rounded"
              />
            ) : (
              <span className="tex-black dark:text-white">
                upload or drag and drop your thumbnail image
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
