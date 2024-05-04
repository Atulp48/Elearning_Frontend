import React, { FC } from "react";
import CoursePlayer from "./CoursePlayer";
import { styles } from "@/app/styles/style";
import Ratings from "../../../utils/reating";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCreate: any;
  isEdit: boolean;
};

const CoursPrievew: FC<Props> = ({
  courseData,
  setActive,
  handleCreate,
  active,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estiMatedPrice - courseData?.price) /
      courseData?.estiMatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const PrvPage = () => {
    setActive(active - 1);
  };

  const CreateCourseFun = () => {
    handleCreate();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            VideoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "₹"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2  line-through opacity-80">
            {courseData?.estiMatedPrice}₹
          </h5>

          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice}% off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crismon] cursor-not-allowed`}
          >
            Buy Now in {courseData?.price} ₹
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code"
            className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60px] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">lecture notes available</p>
        <p className="pb-1">lecture pdf available</p>
        <p className="pb-3 800px:pb-1">discussion hour</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={4} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            what you will learn from this course
          </h1>
        </div>

        {courseData?.benifit?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}

        <br />
        <br />

        <h1 className="text-[25px] font-Poppins font-[600]">
          what prequreties from this course
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />

        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            course Details
          </h1>
          {courseData?.description}
        </div>
        <br />
        <br />
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
          onClick={() => CreateCourseFun()}
        >
          {!isEdit ? "Create course" : "Update course"}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CoursPrievew;
