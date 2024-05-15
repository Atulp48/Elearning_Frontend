import React, { useState } from "react";
import { format } from "timeago.js";
import Image from "next/image";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";

const AnswerItem = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  setQuestionId,
  user,
  handleAnswer,
  item,
  isLoading,
  AnsLoading,
  questionId,
}: any) => {
  const [activeReplies, setActiveReplies] = useState(false);

  return (
    <div>
      <div className="my-4">
        <div className="flex mb-4">
          {/* <div className="w-[50px] h-[50px]">
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
              <h1 className="uppercase text-[18px]">
                {item?.user.name.slice(0, 2)}
              </h1>
            </div>
          </div> */}
          <Image
            src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg"}
            width={50}
            height={50}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="pl-3">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="dark:text-[#ffffff83] text-black">
              {!item?.createdAt ? "" : format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-black dark:text-white cursor-pointer mr-2"
            onClick={() => {
              setActiveReplies(!activeReplies), setQuestionId(item._id);
            }}
          >
            {!activeReplies
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Repiles"}
          </span>

          <BiMessage
            size={20}
            className="dark:text-white text-black cursor-pointer"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-black dark:text-white">
            {item.questionReplies.length}
          </span>
        </div>

        {activeReplies && questionId === item._id && (
          <>
            {item.questionReplies.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
              >
                <div>
                  <Image
                    src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg"}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#50c750] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{item.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}

            <>
              <div className="w-full  flex relative text-black dark:text-white">
                <input
                  type="text"
                  placeholder="Enter your answer......."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027]
                   dark:text-white text-black p-[5px] w-[95%] 
                   ${answer === "" || (AnsLoading && "cursor-not-allowed")}`}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswer}
                  disabled={answer === "" || AnsLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerItem;
