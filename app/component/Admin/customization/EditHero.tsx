import React, { FC, useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {};

const EditHero: FC<Props> = ({}) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubtitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner.image.url);
    }

    if (isSuccess) {
      refetch();
      toast.success("hero updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div
          className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[500px] 1500px:w-[500px] 
            1100px:h-[450px] 1100px:w-[450px] h-[50vh] w-[50vh] hero_animation rounded-full left-[auto]"
        ></div>

        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt="image hero"
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />

            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />

            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className=" text-black size-10 text-[18px] cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <textarea
            className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70%] bg-transparent font-josefin font-[600]"
            placeholder="improve your learning experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={2}
          />
          <br />

          <textarea
            placeholder="we have 2 online courses which is not  work"
            value={subTitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="dark:text-[#edfff4] text-[#000000ac] font-josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent"
          ></textarea>
          <br />
          <br />
          <br />

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34]
          ${
            data?.layout?.banner?.title != title ||
            data?.layout?.banner?.subTitle != subTitle ||
            data?.layout?.banner?.image?.url != image
              ? "!cursor-pointer !bg-[#42d383"
              : "cursor-not-allowed"
          }
          !rounded absolute bottom-12 right-12
          `}
            onClick={
              data?.layout?.banner?.title != title ||
              data?.layout?.banner?.subTitle != subTitle ||
              data?.layout?.banner?.image?.url != image
                ? handleEdit
                : () => null
            }
          >
            save
          </div>
        </div>
      </div>
    </>
  );
};
export default EditHero;
