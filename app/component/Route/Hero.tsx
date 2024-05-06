import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data } = useGetHeroDataQuery("Banner", {});
//   console.log(data);

  return (
    <div className="w-full 1000px:flex items-center">
      <div
        className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[500px] 1500px:w-[500px] 
            1100px:h-[450px] 1100px:w-[450px] h-[50vh] w-[50vh] hero_animation rounded-full left-[auto]"
      ></div>

      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          src={data?.layout?.banner?.image?.url}
          width={400}
          height={400}
          alt="hero"
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-10"
        />
      </div>
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] text-[20px] px-3 w-full 1000px:text-[50px] font-[600] font-Josefin py-2 1000px:leading-[68px] capitalize 1500px:!w-[55%] 1100px:!w-[78%]">
          {/* improve your online learning method */}
          {data?.layout?.banner?.title}
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
        {data?.layout?.banner?.subTitle}
        </p>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="text"
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#000004e] dark:text-[#ffffffed] text-[20px] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>

        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image
            src={require("../../../public/assets/client-2.jpg")}
            alt="client"
            className="rounded-full border-white border-2 bg-blue-200"
          />
          <Image
            src={require("../../../public/assets/client-2.jpg")}
            alt="client"
            className="rounded-full ml-[-30px] border-white border-2 bg-yellow-200"
          />
          <Image
            src={require("../../../public/assets/client-2.jpg")}
            alt="client"
            className="rounded-full ml-[-30px] border-white border-2 bg-green-200"
          />
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
            10 people already trust us.{""}
            <Link
              href={"/courses"}
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// import Image from "next/image"
// import Link from "next/link"
// import React, { FC } from "react"
// import { BiSearch } from "react-icons/bi"

// type Props = {};

// const Hero: FC<Props> = (props) => {
//     return (
//         <div className="w-full 100px:flex items-center">
//             <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] hero_animation">
//                 <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
//                     <Image
//                         src={"../../../public/assets/check.jpg"}
//                         alt=""
//                         className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
//                     />
//                 </div>
//                 <div className="1000px:w-[60%] flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
//                     <h2 className="dark:text-white  text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60px]">
//                         improve your online learning method
//                     </h2>
//                     <br />
//                     <p className="dark:text-[#edfff4] text-[#000000ac]  font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
//                         we have  some courses
//                     </p>
//                     <br/>
//                     <br/>
//                     <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50%] bg-transparent relative">
//                         <input
//                             type="search"
//                             placeholder="search courses"
//                             className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[20px] font-Josef "
//                         />
//                         <div className="absolute flex items-center justify-center w=[50px] cursor-pointer h-[50px] right-0 bg-[#39c1f3] rounded-r-[5px]">
//                             <BiSearch className="text-white" size={30} />
//                         </div>
//                     </div>
//                     <br />
//                     <br />
//                     <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
//                         <Image
//                             src={"../../../public/assets/check.jpg"}
//                             alt=""
//                             className="rounded-full"
//                         />
//                         <Image
//                             src={"../../../public/assets/check.jpg"}
//                             alt=""
//                             className="rounded-full ml-[-20px]"
//                         />
//                         <Image
//                             src={"../../../public/assets/check.jpg"}
//                             alt=""
//                             className="rounded-full ml-[-20px]"
//                         />
//                         <p className="font-Josefin dark:text-[#edfff4] text-[#00000b3] 1000px:pl-3 text-[18px] font-[600]">
//                             10 people already trust us.{""}
//                             <Link href="/courses"
//                                 className="dark:text-[#46e256] text-[crimson]">
//                                 view our courses
//                             </Link>
//                         </p>
//                     </div>
//                     <br />
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Hero;
