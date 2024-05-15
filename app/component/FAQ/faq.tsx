import React, { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { HiMinus, HiPlus } from "react-icons/hi";
import { styles } from "@/app/styles/style";

type Props = {};

const Faq = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [question, setQuestion] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestion(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
    setQuestion((prev) =>
      prev.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <h1 className={`${styles.title} 800px:text-[40px]`}>
            Frequently asked <span className="text-gradient text-green-400">Questions</span>
          </h1>
          <div className="mt-12">
            <dl className="space-y-8">
              {question &&
                question.map((q: any) => (
                  <div
                    key={q._id}
                    className={`${
                      q._id !== question[0]?._id && "border-t"
                    } border-gray-200 pt-6`}
                  >
                    <dt className="text-lg">
                      <button
                        className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        <span className="font-medium text-black dark:text-white">
                          {q.question}
                        </span>
                        <span>
                          {q.active ? (
                            <HiMinus className="h-6 w-6" />
                          ) : (
                            <HiPlus className="h-6 w-6" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {activeQuestion === q._id && (
                      <dd className="mt-2 pr-12">
                        <p className="text-base font-Poppins text-black dark:text-white">
                          {q.answer}
                        </p>
                      </dd>
                    )}
                  </div>
                ))}
            </dl>
          </div>
          <br />
          <br />
          <br />
        </div>
      )}
    </>
  );
};
export default Faq;
