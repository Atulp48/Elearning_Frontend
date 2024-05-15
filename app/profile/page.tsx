"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../component/Header";
import Profile from "../component/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../component/Footer";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItems] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user.name} profile`}
          description="this site for education"
          keywords="datastructure"
        />
        <Header
          setOpen={setOpen}
          activeItem={activeItem}
          open={open}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} setRoute={setRoute} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
