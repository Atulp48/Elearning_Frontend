import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "@/app/component/Admin/analytic/UserAnlys";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "@/app/component/Admin/analytic/OrderAnlys";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrderAnalyticQuery,
  useGetUserAnalyticQuery,
} from "@/redux/features/analytic/analysApi";
type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        color={value && value > 90 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [compare1, setcompare1] = useState<any>();
  const [compare2, setcompare2] = useState<any>();

  const { data, isLoading } = useGetUserAnalyticQuery({});
  const { data: orderData, isLoading: OrderLoading } = useGetOrderAnalyticQuery(
    {}
  );

  useEffect(() => {
    if (!isLoading && !OrderLoading) {
      if (data && orderData) {
        const usrLst = data.users.last12Months.slice(-2);
        const ordrLst = orderData.orders.last12Months.slice(-2);
        if (usrLst.length === 2 && ordrLst.length === 2) {
          const usrcurr = usrLst[1].count;
          const usrprev = usrLst[0].count;
          const ordrcurr = ordrLst[1].count;
          const ordrprev = ordrLst[0].count;
          const usrPrsantage =
            usrprev !== 0 ? ((usrcurr - usrprev) / usrprev) * 100 : 100;
          const ordrprsantage =
            ordrprev !== 0 ? ((ordrcurr - ordrprev) / ordrprev) * 100 : 100;
          setcompare1({
            currMnth: usrcurr,
            prevMnth: usrprev,
            PercentageChange: usrPrsantage,
            // PercentageChange: ((20-15)/15)*100,
          });
          setcompare2({
            currMnth: ordrcurr,
            prevMnth: ordrprev,
            PercentageChange: ordrprsantage,
          });
        }
      }
    }
  }, [isLoading, OrderLoading, data, orderData]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[70%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-8 ">
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow">
            <div className="flex items-center justify-between p-5">
              <div>
                <BiBorderLeft className="dark:text-[#45cba0] text-black text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px] ">
                  {compare2?.currMnth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45cba0] text-black text-[20px] font-[400] ">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    compare2?.PercentageChange > 0
                      ? compare2?.PercentageChange
                      : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {compare2?.PercentageChange > 0
                    ? "+ " + compare2?.PercentageChange.toFixed(1)
                    : "- " + compare2?.PercentageChange.toFixed(1)}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111c43] rounded-sm shadow my-8">
            <div className="flex items-center justify-between p-5">
              <div>
                <PiUsersFourLight className="dark:text-[#45cba0] text-black text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px] ">
                  {compare1?.currMnth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45cba0] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    compare1?.PercentageChange > 0
                      ? compare1?.PercentageChange
                      : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {compare1?.PercentageChange > 0
                    ? "+ " + compare1?.PercentageChange.toFixed(1)
                    : "- " + compare1?.PercentageChange.toFixed(1)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[65%,35%] mt-[-20px]">
        <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="pb-3 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400] ">
            Recent Transations
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
