import React, { FC, useState, useEffect } from 'react'
import { styles } from "../../../app/styles/style"
import { AiOutlineCamera } from "react-icons/ai"
import avatarIcon from "../../../public/assets/client-1.jpg"
import Image from "next/image"
import { useUpdateAvatarMutation, useUpdataUserNameMutation } from '@/redux/features/user/userApi'
import { useLoaduserQuery } from '@/redux/features/api/apiSlice'
import toast from 'react-hot-toast'



type Props = {
    avatar: string | null;
    user: any
}


const Profileinfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name)
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
    const [updataUserName, { isSuccess: success, error: updataError }] = useUpdataUserNameMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoaduserQuery(undefined, { skip: loadUser ? false : true })

    const imageHandler = async (e: any) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result;
                updateAvatar(
                    avatar,
                );
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (success) {
            toast.success("name changed successfully")
        }

        if (isSuccess || success) {
            setLoadUser(true)
        }

        if (error || updataError) {
            console.log(error)
        }
    }, [isSuccess, error, success, updataError]);



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (name !== "") {
            await updataUserName({
                name
            })
        }
    };



    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='relative'>
                    <Image
                        src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
                        alt=""
                        width={120}
                        height={120}
                        className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
                    />

                    <input
                        type='file'
                        name=''
                        id='avatar'
                        className='hidden'
                        onChange={imageHandler}
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                    />

                    <label htmlFor='avatar'>

                        <div className='w-[30px] bg-slate-900  rounded-full absolute bottom-2  right-2 flex items-center justify-center cursor-pointer'>
                            <AiOutlineCamera size={20} className='z-1' />
                        </div>
                    </label>
                </div>
            </div>

            <br />
            <br />

            <div className='w-full pl-6 800px:pl-10'>
                <form onSubmit={handleSubmit}>
                    <div className='800px:w-[50%] m-auto block pb-4'>
                        <div className='w-[100%]'>
                            <label className='block pb-2  text-black dark:text-[#fff]'>
                                FULL NAME
                            </label>
                            <input
                                type='text'
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='w-[100%] pt-2  text-black dark:text-[#fff]'>
                            <label className='block pb-2'>
                                Email Id
                            </label>
                            <input
                                type='text'
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                required
                                readOnly
                                value={user?.email}

                            />
                        </div>
                        <input
                            className={`w-[95%] h-[40px] border border-[#37a39a] text-center  text-black dark:text-[#fff] rounded-full mt-8 cursor-pointer `}
                            required
                            value="SUBMIT"
                            type="submit"
                        />
                    </div>
                </form>
                <br />
            </div>
        </>
    )
}

export default Profileinfo; 