import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import Ratings from "../../utils/reating";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CoursePlayer from "../Admin/Course/CoursePlayer";
import Link from "next/link";
import { styles } from "@/app/styles/style";
import CourseContentList from "../../component/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import PayForm from "../Payment/PayForm";
import { useLoaduserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails: FC<Props> = ({ data, stripePromise, clientSecret }) => {
  // const { user } = useSelector((state: any) => state.auth);
  const { data: userData } = useLoaduserQuery(undefined, {});
  const user = userData?.user;
  const [open, setOpen] = useState(false);
  // console.log(data);
  // console.log(user);

  const discountPrecetage =
    ((data?.estiMatedPrice - data.price) / data?.estiMatedPrice) * 100;

  const discountPrecetentagePrice = discountPrecetage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item.courseId === data._id);

  const OrderHndl = (e: any) => {
    setOpen(true);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.rating} />
                <h5 className="text-black dark:text-white ">
                  {data.reviews?.length} Reveiws
                </h5>
              </div>
              <h5 className="text-black dark:text-white ">
                {data.purchased} Students
              </h5>
            </div>
            <br />

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What include in this course
            </h1>
            <div>
              {data.benifit?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the Requirement for this Course
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:item-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />

            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Overviews
              </h1>
              {/* written some time after */}
              <CourseContentList data={data?.courseContent} isDemo={true} />
            </div>
            <br />
            <br />

            {/* written some time */}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px]mt-[120px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />

            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.rating} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.rating)
                    ? data?.rating.toFixed(1)
                    : data?.rating.toFixed(2)}
                  ★ Course Rating | {data.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                          <h1 className="uppercase text-[18px] text-black dark:text-white">
                            {item.user.name.slice(0, 2)}
                          </h1>
                        </div>
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item?.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-black dark:text-white">
                          {format(item.createdAt)}
                        </small>
                      </div>
                      <div className="pl-2  flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item?.rating} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[120px] left-0 z-50 w-full">
              <CoursePlayer title={data?.title} VideoUrl={data?.demoUrl} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data?.price === 0 ? "Free" : data.price + "₹"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {data.estiMatedPrice}₹
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  {discountPrecetentagePrice}% off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-green-800`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-green-800`}
                    onClick={OrderHndl}
                  >
                    Buy in {data.price} ₹
                  </div>
                )}
              </div>
              <br />
              <li className="pb-1 text-black dark:text-white">
                Source code include
              </li>
              <li className="pb-1 text-black dark:text-white">
                One year access
              </li>
              <li className="pb-1 text-black dark:text-white">
                Certification privided
              </li>
            </div>
          </div>
        </div>
      </div>

      <div>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center ">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PayForm setOpen={setOpen} data={data} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
