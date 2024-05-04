'use client'
import React from 'react'
import AdminSidebar from "../../component/Admin/sidebar/AdminSidebar"
import Heading from "../../../app/utils/Heading"
import CreateCourese from "../../component/Admin/Course/CreateCourese"
import DashboardHeader from '../../../app/component/Admin/DashboardHeader'



type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <Heading
                title='Adimin Elearing'
                description='this is admin page'
                keywords='data structures'

            />
            <div className='flex'>
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar/>
                </div>
                <div className='w-[85%]'>
                    <DashboardHeader/>
                    <CreateCourese/>
                </div>

            </div>
        </div>
    )
}

export default Page;