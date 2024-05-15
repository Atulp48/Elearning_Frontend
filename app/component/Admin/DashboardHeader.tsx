"use client";
import React, { FC, useEffect, useState } from "react";
import ThemeSwitcher from "@/app/utils/themeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import {
  useUpdataNotificationMutation,
  useGetAllnotificationQuery,
} from "@/redux/features/notifications/notificationsApi";
import { format } from "timeago.js";
const ENDPOINT = process.env.SOCKET_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllnotificationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updataNotification, { isSuccess, error }] =
    useUpdataNotificationMutation();

  const [notification, setNotification] = useState<any>([]);

  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dvdh3ihsv/video/upload/v1715520137/o0xlba95pl1cnlmtruru.wav"
    )
  );

  const playerNotification = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotification(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }

    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playerNotification();
    });
  }, []);

  const handleNotificationUpdate = async (id: string) => {
    await updataNotification(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[99999999]">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2  bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notification && notification.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] overflow-y-scroll dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notification &&
            notification.map((item: any, index: number) => (
              <div
                key={index}
                className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#000000f]
                           border-b-[#0000000f]"
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">{item.title}</p>
                  <p
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => handleNotificationUpdate(item._id)}
                  >
                    Mark as read
                  </p>
                </div>

                <p className="px-2 text-black dark:text-white">
                  {item.message}
                </p>
                <p className="text-black dark:text-white cursor-pointer">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
