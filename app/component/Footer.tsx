import React from "react";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border-[#000000e] dark:border-[#ffffff1e] bg-slate-500">
        <br />
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-gray-300 dark:hover:text-white">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pravicy policy "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Pravicy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-gray-300 dark:hover:text-white">
                Qucick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/course "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-gray-300 dark:hover:text-white">
                Social Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://www.youtube.com/watch?v=dKw7bdk6hQ8&ab_channel=OggyHindi-%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80 "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    You Tube
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/watch?v=dKw7bdk6hQ8&ab_channel=OggyHindi-%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80 "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Face Book
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/watch?v=dKw7bdk6hQ8&ab_channel=OggyHindi-%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80 "
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Insta Gram
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[20px] font-[600] text-black dark:text-gray-300 dark:hover:text-white">
                Contact information
              </h3>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Contact Us:5684-5489-65
              </p>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Address: electric Plole ke peeche,purana talab,prayagraj
              </p>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Mail Us: dayaram@gmail.com
              </p>
            </div>
          </div>
          <br />
          <p className="text-center rext-black dark:text-white">
            Copyright All rights reserved
          </p>
        </div>
        <br />
      </div>
    </footer>
  );
};
export default Footer;
