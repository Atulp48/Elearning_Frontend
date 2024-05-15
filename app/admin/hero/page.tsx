'use client'
import React from 'react'
import DashboardHeor from '@/app/component/Admin/DashboardHeor'
import Heading from '@/app/utils/Heading'
import AdminSideBar from "../../component/Admin/sidebar/AdminSidebar"
import EditHero from "../../component/Admin/customization/EditHero"
import AdminProtected from '@/app/hooks/adminProtected'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
            <Heading 
            title='Elearning'
            description='best course'
            keywords='programming courses'
            />
        <div className='flex h-screen'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSideBar/>
            </div>
            <div className='w-[85%]'>
                <DashboardHeor/>
                <EditHero/>
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default Page;