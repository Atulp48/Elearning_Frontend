'use client'
import React, { FC, useState } from "react"
import Heading from "./utils/Heading";
import Hero from "./component/Route/Hero"
import Header from "./component/Header";

interface Props { }

const Page: FC<Props> = (props) => {

    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItems] = useState(0);
    const [route, setRoute] = useState("Login")

    return (
        <div>
            <Heading
                title="E learning site"
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
            <Hero />
        </div>
    )
};

export default Page;