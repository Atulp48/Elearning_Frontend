
// import React, { useState, useEffect } from "react";
// import {
//   useGetHeroDataQuery,
//   useEditLayoutMutation,
// } from "@/redux/features/layout/layoutApi";
// import { styles } from "@/app/styles/style";
// import { HiMinus, HiPlus } from "react-icons/hi";
// import { AiOutlineDelete } from "react-icons/ai";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import toast from "react-hot-toast";
// import Loader from "../../Loader/Loader";

// type Props = {};

// const EditFaq = (props: Props) => {
//   const { data, isLoading } = useGetHeroDataQuery("FAQ", {
//     refetchOnMountOrArgChange: true,
//   });

//   const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
//   const [question, setQuestion] = useState<any[]>([]);

//   useEffect(() => {
//     if (data) {
//       setQuestion(data.layout.faq);
//     }
//     if (isSuccess) {
//       toast.success("FAQ updated successfully");
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         toast.error(errorData.data.message);
//       }
//     }
//   }, [data, isSuccess, error]);

//   const toggleQuestion = (id: any) => {
//     setQuestion((prev) =>
//       prev.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
//     );
//   };

//   const handleChangeQuestion = (id: any, value: string) => {
//     setQuestion((prev) =>
//       prev.map((q) => (q._id === id ? { ...q, question: value } : q))
//     );
//   };

//   const handleChangeAnswer = (id: any, value: string) => {
//     setQuestion((prev) =>
//       prev.map((q) => (q._id === id ? { ...q, answer: value } : q))
//     );
//   };

//   const newFaqHandler = () => {
//     setQuestion([
//       ...question,
//       {
//         question: "",
//         answer: "",
//       },
//     ]);
//   };

//   const areQuestionsUnchanged = (
//     originalQuestion: any[],
//     newQuestion: any[]
//   ) => {
//     return JSON.stringify(originalQuestion) === JSON.stringify(newQuestion);
//   };

//   const isAnyQuestionEmpty = (question: any[]) => {
//     return question.some((q) => q.question === "" || q.answer === "");
//   };

//   const handleEdit = async () => {
//     if (
//       !areQuestionsUnchanged(data?.layout.faq, question) &&
//       !isAnyQuestionEmpty(question)
//     ) {
//       await editLayout({ type: "FAQ", faq: question });
//     }
//   };

//   // Render Loader if isLoading is true
//   if (isLoading) {
//     return <Loader />;
//   }

//   // Render main content when data is available
//   if (data) {
//     return (
//       <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
//         <div className="mt-12">
//           <dl className="space-y-8">
//             {question &&
//               question.map((q: any) => (
//                 <div
//                   key={q._id}
//                   className={`${
//                     q._id !== question[0]?._id && "border-t"
//                   } border-gray-200 pt-6`}
//                 >
//                   <dt className="text-lg">
//                     <button
//                       className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
//                       onClick={() => toggleQuestion(q._id)}
//                     >
//                       <input
//                         className={`${styles.input} border-none`}
//                         value={q.question}
//                         onChange={(e: any) =>
//                           handleChangeQuestion(q._id, e.target.value)
//                         }
//                         placeholder="Add your question..."
//                       />
//                       <span>
//                         {q.active ? (
//                           <HiMinus className="h-6 w-6" />
//                         ) : (
//                           <HiPlus className="h-6 w-6" />
//                         )}
//                       </span>
//                     </button>
//                   </dt>
//                   {q.active && (
//                     <dd className="mt-2 pr-12">
//                       <input
//                         className={`${styles.input} border-none`}
//                         value={q.answer}
//                         onChange={(e: any) =>
//                           handleChangeAnswer(q._id, e.target.value)
//                         }
//                         placeholder="Add your Answer..."
//                       />
//                       <span className="ml-6 flex-shrink-0">
//                         <AiOutlineDelete
//                           className="dark:text-white text-black text-[18px] cursor-pointer"
//                           onClick={() =>
//                             setQuestion((prev) =>
//                               prev.filter((item) => item._id !== q._id)
//                             )
//                           }
//                         />
//                       </span>
//                     </dd>
//                   )}
//                 </div>
//               ))}
//           </dl>
//           <br />
//           <br />
//           <IoMdAddCircleOutline
//             className="dark:text-white text-black text-[25px] cursor-pointer"
//             onClick={newFaqHandler}
//           />
//         </div>
//         <div
//           className={`${
//             styles.button
//           } !w-[100px] !min-h-[40px] !h[40px] dark:text-white text-black bg-[#cccccc34] ${
//             areQuestionsUnchanged(data?.layout.faq, question) ||
//             isAnyQuestionEmpty(question)
//               ? "!cursor-not-allowed"
//               : "!cursor-pointer !bg-[#42d383]"
//           } !rounded absolute bottom-12 right-12`}
//           onClick={
//             areQuestionsUnchanged(data?.layout.faq, question) ||
//             isAnyQuestionEmpty(question)
//               ? () => null
//               : handleEdit
//           }
//         >
//           Save
//         </div>
//       </div>
//     );
//   }

//   // Render null if data is still being fetched
//   return null;
// };

// export default EditFaq;



"use client";
import React, { useState, useEffect } from "react";
import {
  useGetHeroDataQuery,
  useEditLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import { styles } from "@/app/styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  // console.log(data);

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [question, setQuestion] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setQuestion(data.layout.faq);
    }
    if (isSuccess) {
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestion((prev) =>
      prev.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleChangeQuestion = (id: any, value: string) => {
    setQuestion((prev) =>
      prev.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleChangeAnswer = (id: any, value: string) => {
    setQuestion((prev) =>
      prev.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestion([
      ...question,
      {
        question: "",
        answer: "",
      },
    ]);
  };
  const areQuestionsUnchanged = (
    originalQuesiton: any[],
    newQuestion: any[]
  ) => {
    return JSON.stringify(originalQuesiton) === JSON.stringify(newQuestion);
  };

  const isAnyQuestionEmpty = (question: any[]) => {
    return question.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data?.layout.faq, question) &&
      !isAnyQuestionEmpty(question)
    ) {
      await editLayout({ type: "FAQ", faq: question });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
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
                        <input
                          className={`${styles.input} border-none`}
                          value={q.question}
                          onChange={(e: any) =>
                            handleChangeQuestion(q._id, e.target.value)
                          }
                          placeholder="Add your question..."
                        />
                        <span>
                          {q.active ? (
                            <HiMinus className="h-6 w-6" />
                          ) : (
                            <HiPlus className="h-6 w-6" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {q.active && (
                      <dd className="mt-2 pr-12">
                        <input
                          className={`${styles.input} border-none`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleChangeAnswer(q._id, e.target.value)
                          }
                          placeholder="Add your Answer..."
                        />
                        <span className="ml-6 flex-shrink-0">
                          <AiOutlineDelete
                            className="dark:text-white text-black text-[18px] cursor-pointer"
                            onClick={() =>
                              setQuestion((prev) =>
                                prev.filter((item) => item._id !== q._id)
                              )
                            }
                          />
                        </span>
                      </dd>
                    )}
                  </div>
                ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h[40px] dark:text-white text-black bg-[#cccccc34] ${
              areQuestionsUnchanged(data?.layout.faq, question) ||
              isAnyQuestionEmpty(question)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            } !rounded absolute bottom-12 right-12`}
            onClick={
              areQuestionsUnchanged(data?.layout.faq, question) ||
              isAnyQuestionEmpty(question)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;

// type Props = {};

// const EditFaq = (props: Props) => {
//   const { data } = useGetHeroDataQuery("FAQ", {
//     refetchOnMountOrArgChange: true,
//   });

//   const [questions, setQuestions] = useState<any[]>([]);
//   const [questions1, setQuestions1] = useState<any[]>([]);

//   useEffect(() => {
//     if (data) {
//       setQuestions(data.layout.faq);
//       setQuestions1(data.layout.faq);
//     }
//   }, [data]);

//   console.log(questions1)

//   const toggleQuestion = (id: any) => {
//     setQuestions((prevQuestion) =>
//       prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
//     );
//   };
//   const handleQuestion = (id: any, value: any) => {
//     setQuestions((prevQuestion) =>
//       prevQuestion.map((q) => (q._id === id ? { ...q, question: value } : q))
//     );
//   };

//   const handleAnswer = (id: any, value: any) => {
//     setQuestions((prevQuestion) =>
//       prevQuestion.map((q) => (q._id === id ? { ...q, answer: value } : q))
//     );
//   };

//   const newFaqHandler = () => {
//     setQuestions([
//       ...questions,
//       {
//         question: "",
//         answer: "",
//       },
//     ]);
//   };

//   const areQuestionsUnchanged = (
//     originalQuestion: any[],
//     newQuestion: any[]
//   ) => {
//     return JSON.stringify(originalQuestion) === JSON.stringify(newQuestion);
//   };

//   const isQuestionEmpty = (question: any[]) => {
//     return question.some((q) => q.question === "" || q.answer === "");
//   };

//   const handleEdit = () => {
//     console.log("edit ho giyo");
//   };

//   return (
//     <div className="w-[90%] 800px:w-[80%] m-auto mt-[120%]">
//       <div className="mt-12">
//         <dl className="space-y-8">
//           {questions.map((q: any) => (
//             <div
//               key={q._id}
//               className={`${
//                 q._id !== questions[0]?._id && "border-t"
//               } border-gray-200 pt-6`}
//             >
//               <dt className="text-lg">
//                 <button
//                   className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
//                   onClick={() => toggleQuestion(q._id)}
//                 >
//                   <input
//                     className={`${styles.input} border-none`}
//                     value={q.question}
//                     onChange={(e: any) => handleQuestion(q._id, e.target.value)}
//                     placeholder="Add your question"
//                   />

//                   <span className="ml-6 flex-shrink-0">
//                     {q.active ? (
//                       <HiMinus className="h-6 w-6" />
//                     ) : (
//                       <HiPlus className="h-6 w-6" />
//                     )}
//                   </span>
//                 </button>
//               </dt>
//               {q.active && (
//                 <dd className="mt-12 pr-12">
//                   <input
//                     className={`${styles.input} border none`}
//                     value={q.answer}
//                     onChange={(e: any) => handleAnswer(q._id, e.target.value)}
//                     placeholder="add your answer"
//                   />
//                   <span className="ml-6 flex-shrink-0">
//                     <AiOutlineDelete
//                       className="dark:text-white text-black text-[18px] cursor-pointer"
//                       onClick={() => {
//                         setQuestions((prevQuestions) =>
//                           prevQuestions.filter((item) => item._id != q._id)
//                         );
//                       }}
//                     />
//                   </span>
//                 </dd>
//               )}
//             </div>
//           ))}
//         </dl>
//         <br />
//         <br />

//         <IoMdAddCircleOutline
//           className="dark:text-white text-black text-[25px] cursor-pointer"
//           onClick={newFaqHandler}
//         />
//       </div>

//       <div
//         className={`${
//           styles.button
//         } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
//       ${
//         areQuestionsUnchanged(questions1, questions) ||
//         isQuestionEmpty(questions)
//           ? "!cursor-not-allowed"
//           : "!cursor-pointer !bg-[#42d383"
//       }
//       !rounded absolute bottom-12 right-12
//       `}
//         onClick={
//           areQuestionsUnchanged(questions1, questions) ||
//           isQuestionEmpty(questions)
//             ? () => null
//             : handleEdit
//         }
//       >
//         Save
//       </div>
//     </div>
//   );
// };

// export default EditFaq;
