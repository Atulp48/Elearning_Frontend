"use client";
import { useGetOrderAnalyticQuery } from "@/redux/features/analytic/analysApi";
import React, { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  LabelList,
  AreaChart,
  Tooltip,
  Area,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetOrderAnalyticQuery({});

  //   const analyticsData = [
  //     { name: "jan 2023", Count: 500 },
  //     { name: "feb 2023", Count: 700 },
  //     { name: "mar 2023", Count: 200 },
  //     { name: "apr 2023", Count: 500 },
  //     { name: "may 2023", Count: 800 },
  //     { name: "Jun 2023", Count: 400 },
  //     { name: "Jul 2023", Count: 300 },
  //     { name: "Aug 2023", Count: 565 },
  //     { name: "Sept 2023", Count: 855 },
  //     { name: "Oct 2023", Count: 156 },
  //     { name: "Nov 2023", Count: 258 },
  //     { name: "Dec 2023", Count: 800 },
  //   ];

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, Count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isDashboard ? "h-[30vh]" : "h-screen"}`}>
          <div
            className={`${
              isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"
            }`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Order Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
