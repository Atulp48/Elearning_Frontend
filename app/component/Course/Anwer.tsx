import React, { FC } from "react";
import AnswerItem from "./AnswerItem";

type Props = {
  data: any;
  activeVideo: any;
  answer: any;
  setAnswer: any;
  handleAnswer: any;
  user: any;
  setQuestionId: any;
  isLoading:boolean,
  AnsLoading:boolean
};

const Anwer: FC<Props> = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  setQuestionId,
  user,
  handleAnswer,
  isLoading,
  AnsLoading
}) => {
//   console.log("answersection");
//   console.log(data[activeVideo].questions);
  return (
    <div>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: number) => (
              <AnswerItem
              key={index}
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswer={handleAnswer}
              user={user}
              setQuestionId={setQuestionId}
              item={item}
              isLoading={isLoading}
              AnsLoading={AnsLoading}
            />
        //   <div key={index}> {item.question}</div>
        ))}
      </div>
    </div>
  );
};

export default Anwer;
