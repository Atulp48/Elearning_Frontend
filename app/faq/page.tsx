"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Faq from "../component/FAQ/faq";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItems] = useState(4);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen">
      <Heading
        title="FAQ"
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

      <Faq />
      <Footer />
    </div>
  );
};

export default Page;
