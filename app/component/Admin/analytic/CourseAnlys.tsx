import { useGetCourseAnalyticQuery } from "@/redux/features/analytic/analysApi";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";

type Props = {};

const CourseAnlys = (props: Props) => {
  const { data, isLoading } = useGetCourseAnalyticQuery({});

  const analyticData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticData.push({ name: item.month, uv: item.count });
    });

  //   const analyticData = [
  //     { name: "Jun 2023", uv: 3 },
  //     { name: "July 2023", uv: 2 },
  //     { name: "August 2023", uv: 5 },
  //     { name: "Sept 2023", uv: 8 },
  //     { name: "Oct 2023", uv: 1 },
  //     { name: "Nov 2023", uv: 2 },
  //     { name: "Dec 2023", uv: 8 },
  //   ];
  const minVal = 0;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Course Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticData}>
                <XAxis dataKey={"name"}>
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minVal, "auto"]} />
                <Bar dataKey="uv" fill="#8B008B">
                  <LabelList dataKey="uv" position={"top"} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnlys;
