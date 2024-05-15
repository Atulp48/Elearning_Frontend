"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../component/Header";
import Policy from "../component/Policy/Policy";
import Footer from "../component/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItems] = useState(3);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Policy"
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

      <Policy />
      <Footer />
    </div>
  );
};

export default Page;
