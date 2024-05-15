import React from "react";
import { styles } from "@/app/styles/style";
import Link from "next/link";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title}`}>
        some information{" "}
        <span className="text-gradient text-green-400">About us</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-18px font font-Poppins">
          Our e-learning platform offers a meticulously crafted curriculum
          covering various programming languages, frameworks, and software
          development methodologies.
          <br />
          <br />
          Engage in hands-on coding exercises, quizzes, and projects designed to
          deepen your understanding and practical skills.
          <br />
          <br />
          Tailor your learning journey according to your skill level and
          interests, whether you are a beginner starting from scratch or an
          experienced developer looking to specialize.
          <br />
          <br />
          Learn from industry professionals and experienced instructors who
          provide clear explanations, tips, and best practices to accelerate
          your learning.
          <br />
          <br />
          Connect with fellow students through forums, discussion boards, and
          live chat sessions to exchange ideas, seek help, and collaborate on
          projects.
          <br />
          <br />
          Track your progress with regular assessments and feedback to identify
          strengths, weaknesses, and areas for improvement.
          <br />
          <br />
        </p>
        <br />
        <span className="font-bold text-[30px] text-green-700">Admin</span>

        <h5 className="text-[18px] font-Poppins font-bold text-indigo-400 cursor-pointer  hover:text-sky-700 !w-56">
          <Link href="https://www.linkedin.com/in/atul-kumar-patel-997337226/">
            Organizer of E learning
          </Link>
        </h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
