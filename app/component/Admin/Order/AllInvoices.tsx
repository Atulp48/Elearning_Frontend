import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllcourseQuery } from "@/redux/features/courses/coursesAPi";
import Loader from "@/app/component/Loader/Loader";
import { format } from "timeago.js";
import { useGetAllordersQuery } from "@/redux/features/orders/ordersApi";
import { useGetALLusersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { data: orderData, isLoading } = useGetAllordersQuery({});
  const { data: courseData } = useGetAllcourseQuery({});
  const { data: userData } = useGetALLusersQuery({});

  const [orderedData, setOrderedData] = useState<any>([]);

  useEffect(() => {
    if (orderData) {
      const temp = orderData.orders.map((item: any) => {
        const user = userData?.users.find(
          (user: any) => user._id === item.userId
        );

        const course = courseData?.courses.find(
          (course: any) => course._id === item.courseId
        );

        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "₹" + course?.price,
        };
      });
      setOrderedData(temp);
    }
  }, [orderData, userData, courseData]);

  const columns: any = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "userName",
      headerName: "Name",
      flex: isDashboard ? 0.6 : 0.5,
    },
    ...(isDashboard
      ? []
      : [
          {
            field: "userEmail",
            headerName: "Email",
            flex: 1,
          },
          {
            field: "title",
            headerName: "Course Title",
            flex: 1,
          },
        ]),
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
    ...(isDashboard
      ? [
          {
            field: "created_at",
            headerName: "Created At",
            flex: 0.5,
          },
        ]
      : [
          {
            field: "",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [
    {
      id: "57917438178",
      userName: "kingo",
      userEmail: "kingo@gmail.com",
      title: "React Js",
      price: "₹ 20",
      created_at: "4 days ago",
    },
    {
      id: "57917438178",
      userName: "kingo",
      userEmail: "kingo@gmail.com",
      title: "React Js",
      price: "₹ 20",
      created_at: "4 days ago",
    },
    {
      id: "57917438178",
      userName: "kingo",
      userEmail: "kingo@gmail.com",
      title: "React Js",
      price: "₹ 20",
      created_at: "4 days ago",
    },
    {
      id: "57917438178",
      userName: "kingo",
      userEmail: "kingo@gmail.com",
      title: "React Js",
      price: "₹ 20",
      created_at: "4 days ago",
    },
    {
      id: "57917438178",
      userName: "kingo",
      userEmail: "kingo@gmail.com",
      title: "React Js",
      price: "₹ 20",
      created_at: "4 days ago",
    },
    {
      id: "57917438178",
      userName: "kingo",
      userEmail: "kingo@gmail.com",
      title: "React Js",
      price: "₹ 20",
      created_at: "4 days ago",
    },

    {
      id: "57917438178",
      userName: "kingo",
      userEmail: "kingo@gmail.com",
      title: "React Js",
      price: "₹ 20",
      created_at: "4 days ago",
    },
  ];

  orderedData &&
    orderedData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px] " : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#7F00FF" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#7F00FF" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#7F00FF" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#7F00FF" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#7F00FF" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#7F00FF" : "#000",
              },
              "& .MuiDataGrid-virtualscrollbar": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#7F00FF" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckBox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#7F00FF !important",
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              //   components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
