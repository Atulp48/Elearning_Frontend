"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../component/Header";
import About from "../component/About/About";
import Footer from "../component/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItems] = useState(2);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="About Us"
        description="this site for education"
        keywords="data structure"
      />
      <Header
        setOpen={setOpen}
        activeItem={activeItem}
        open={open}
        setRoute={setRoute}
        route={route}
      />

      <About />
      <Footer />
    </div>
  );
};

export default Page;
