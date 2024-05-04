"use client";
import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benifit: { title: string }[];
  setBenifit: (benifit: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benifit,
  setBenifit,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenifitChange = (index: number, value: any) => {
    const updataBenifit = [...benifit];
    updataBenifit[index].title = value;
    setBenifit(updataBenifit);
  };

  const handleAddBenfits = () => {
    setBenifit([...benifit, { title: "" }]);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updataPrerequisites = [...prerequisites];
    updataPrerequisites[index].title = value;
    setPrerequisites(updataPrerequisites);
  };

  const NxtPage = () => {
    if (
      benifit[benifit.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("all created box fill Up mendetory");
    }
  };

  const PrvPage = () => {
    setActive(active - 1);
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          what content provide for student
        </label>
        <br />

        {benifit.map((items: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benifit"
            placeholder="enter benifits for course"
            required
            value={items.title}
            className={`${styles.input} my-2`}
            onChange={(e) => {
              handleBenifitChange(index, e.target.value);
            }}
          />
        ))}

        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenfits}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          what prerequisites for this course
        </label>
        <br />

        {prerequisites.map((items: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="enter prerequisites for course"
            required
            value={items.title}
            className={`${styles.input} my-2`}
            onChange={(e) => {
              handlePrerequisitesChange(index, e.target.value);
            }}
          />
        ))}

        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
      </div>

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
    </div>
  );
};

export default CourseData;
