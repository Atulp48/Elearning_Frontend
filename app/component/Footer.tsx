import React from "react";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border-[#000000e] dark:border-[#ffffff1e] bg-emerald-950">
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
                    href="/policy "
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
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-gray-300 dark:hover:text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
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
                    href="/courses"
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
                    href="https://www.youtube.com"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    You Tube
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/atul-kumar-patel-997337226/"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Linked In
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Face Book
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
                Mail US: Jack@gmail.com
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
