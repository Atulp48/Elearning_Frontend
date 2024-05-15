"use client";
import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  useGetALLusersQuery,
  useDeleteUserMutation,
} from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isTeam: boolean;
};

const Allusers: FC<Props> = ({ isTeam }) => {
  const [deleteUser, { isSuccess, error }] = useDeleteUserMutation();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetALLusersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "EMAIL", flex: 0.5 },
    { field: "role", headerName: "ROLE", flex: 0.3 },
    { field: "courses", headerName: "COURSES PURCHASED", flex: 0.5 },
    { field: "created_at", headerName: "REGISTERED AT", flex: 0.5 },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete
                size={20}
                className="dark:text-white text-black"
              />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "EMAIL",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail
                size={20}
                className="dark:text-white text-black my-4"
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];
  if (isTeam) {
    {
      const newData =
        data && data.users.filter((item: any) => item.role === "admin");

      newData &&
        newData.forEach((item: any) => {
          rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            courses: item.courses.length,
            created_at: format(item.createdAt),
          });
        });
    }
  } else {
    const newData =
      data && data.users.filter((item: any) => item.role === "user");

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleDelete = async () => {
    await deleteUser(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setOpen(false);
      toast.success("User deleted successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={"20px"}>
          {isTeam && (
            <div className={`w-full flex justify-end`}>
              <div
                className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border-[#ffffff6c]`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!imprtant"
                    : "1px solid #ccc!imprtant",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "#0A0A0A" : "#0A0A0A",
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiDataGrid-virtualScroller": {
                color: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#b7ebde!important" : "#000!imprtant",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 dark:bg-[#201f1f] p-9 rounded-sm">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this User
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-5 ">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7c5]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d13131]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default Allusers;
