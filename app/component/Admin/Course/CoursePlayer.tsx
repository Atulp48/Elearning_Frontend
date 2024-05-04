"use client";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  VideoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ VideoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVideoCipherOTP`, {
        videoId: VideoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [VideoUrl]);
  

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=YP7PejsdTToSmjM8`}
          style={{
            border: "0",
            maxWidth: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
