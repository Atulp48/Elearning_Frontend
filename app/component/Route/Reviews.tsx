import React from "react";
import Image from "next/image";
import { styles } from "@/app/styles/style";
import ReviewCard from "../Reivew/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "John Doe",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Web Developer",
    comment: "Great service! Highly recommended Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable. The interactive assignments and practical exercises provided valuable hands-on experience. Overall, a rewarding learning journey that exceeded my expectations.",
    ratings: 4,
  },
  {
    name: "Alice Smith",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Graphic Designer",
    comment: "Fantastic experience. Will definitely use again Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable. The interactive assignments and practical exercises provided valuable hands-on experience. Overall, a rewarding learning journey that exceeded my expectations..",
    ratings: 5,
  },
  {
    name: "Michael Johnson",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Software Engineer",
    comment: "Very professional and efficient Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable. The interactive assignments and practical exercises provided valuable hands-on experience. Overall, a rewarding learning journey that exceeded my expectations..",
    ratings: 3,
  },
  {
    name: "Emily Brown",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Marketing Manager",
    comment: "Outstanding service! Will recommend to friends Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, a rewarding learning journey that exceeded my expectations..",
    ratings: 5,
  },
  {
    name: "David Wilson",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Product Manager",
    comment: "Outstanding service! Will recommend to friends Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable. The interactive assignments and practical exercises provided valuable hands-on experience. Overall, a rewarding learning journey that exceeded my expectations..",
    ratings: 4,
  },
  {
    name: "Sophia Taylor",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "UI/UX Designer",
    comment: "Impressed with the quality of work Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable.",
    ratings: 4,
  },
  {
    name: "Oliver Martinez",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Data Analyst",
    comment: "Great attention to detail. Very satisfied Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable. The interactive assignments and practical exercises provided valuable hands-on experience. Overall, a rewarding learning journey that exceeded my expectations..",
    ratings: 4,
  },
  {
    name: "Emma Harris",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Content Writer",
    comment: "Wonderful experience from start to finish Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable. The interactive assignments and practical exercises provided valuable hands-on experience. Overall, a rewarding learning journey that exceeded my expectations..",
    ratings: 2,
  },
  {
    name: "Daniel Clark",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Project Manager",
    comment: "Professional and courteous. Will use again Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable. The interactive assignments and practical exercises provided valuable hands-on experience. Overall, a rewarding learning journey that exceeded my expectations..",
    ratings: 5,
  },
  {
    name: "Isabella Lee",
    avatar: "https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780591/z8xntjffog8pjqnppvzk.jpg",
    profession: "Financial Analyst",
    comment: "Highly recommended. Exceeded expectations Engaging and comprehensive course material, presented in an accessible format. The instructor's expertise and clear explanations enhanced my understanding, making complex topics manageable. The interactive assignments and practical exercises provided valuable hands-on experience. Overall, a rewarding learning journey that exceeded my expectations..",
    ratings: 5,
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full p-4">
          <Image
            src="https://res.cloudinary.com/dvdh3ihsv/image/upload/v1715780564/fwjenk64brnx38gfxypj.jpg"
            width={500}
            height={600}
            className="rounded-lg "
            alt=""
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students are <span className="text-gradient"> Our Strenth</span>
            <br />
            see what they say about us
          </h3>
          {/* hdfaf */}
          <br />
          {/* <p className={styles.label}>
            Exceptional learning experience! The course content was engaging and
            well-structured, fostering a deeper understanding of complex
            concepts
          </p> */}
        </div>
        <br />
        <br />
      </div>

      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((item, index) => <ReviewCard key={index} item={item} />)}
      </div>
    </div>
  );
};

export default Reviews;
