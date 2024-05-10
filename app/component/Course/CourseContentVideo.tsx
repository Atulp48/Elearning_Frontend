import React, { FC, useEffect, useState } from "react";
import CoursePlayer from "../Admin/Course/CoursePlayer";
import { styles } from "@/app/styles/style";
import Answer from "../../component/Course/Anwer";

import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";
import client from "../../../public/assets/client-1.jpg";
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
} from "@/redux/features/courses/coursesAPi";
import toast from "react-hot-toast";

type Props = {
  data: any;
  activeVideo: number;
  setactiveVideo: (actiVideo: number) => void;
  id: string;
  user: any;
  refetch: any;
};

const CourseContentVideo: FC<Props> = ({
  data,
  activeVideo,
  setactiveVideo,
  user,
  id,
  refetch,
}) => {
  // console.log(data);
  // console.log(user);

  const isReviews = data?.reviews?.find((item: any) => item._id === user._id);
  const [Question, setQuestion] = useState("");
  const [reviews, setReviews] = useState("");
  const [activebar, setActivbar] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionId, SetQuestionId] = useState("");
  const [rating, setRating] = useState(0);
  const [addQuestion, { isSuccess, isLoading, error }] =
    useAddQuestionMutation();
  const [
    addAnswer,
    { isSuccess: AnsSuccess, isLoading: AnsLoading, error: AnsError },
  ] = useAddAnswerMutation();

  const handleQuestion = () => {
    if (Question.length === 0) {
      toast.error("please fill the question box");
    } else {
      addQuestion({
        courseId: id,
        question: Question,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswer = () => {
    addAnswer({
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
      answer: answer,
    });
  };
  // console.log(questionId, "dafdf");

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
    }
    if (AnsSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    if (AnsError) {
      if ("data" in AnsError) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, AnsError, AnsSuccess]);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        VideoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo == 0 && "!cursor-not-allowed opacity-[0.8]"
          }`}
          onClick={() =>
            setactiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>

        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo &&
            "!cursor-not-allowed opacity-[1.8]"
          }`}
          onClick={() =>
            setactiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>

      <h1 className=" text-black dark:text-white pt-2 text-[25px] font-[600] ">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Question & Answer", "resources", "Reviews"].map(
          (item, index) => (
            <h5
              key={index}
              className={`800px:text-[20px] text-black dark:text-white cursor-pointer ${
                activebar === index && "!text-green-500"
              }`}
              onClick={() => setActivbar(index)}
            >
              {item}
            </h5>
          )
        )}
      </div>
      <br />
      {activebar === 0 && (
        <p className="text-[18px] text-black dark:text-white whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}

      {activebar === 1 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : client}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={Question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="write Question here"
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            />
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                isLoading && "cursor-not-allowed"
              }`}
              onClick={isLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <Answer
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswer={handleAnswer}
              user={user}
              setQuestionId={SetQuestionId}
              isLoading={isLoading}
              AnsLoading={AnsLoading}
            />
          </div>
        </>
      )}

      {activebar === 2 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div key={index} className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activebar === 3 && (
        <div className="w-full">
          <>
            {!isReviews && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar.url : client}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] text-black dark:text-white">
                      Give Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={reviews}
                      onChange={(e) => setReviews(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="write Reviews here"
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${styles.button} !w-[120px] !h-[40] text-[18px] mt-5 800px:mr-0 mr-2`}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};
export default CourseContentVideo;
