import React, { FC, useState, useEffect } from 'react'
import { styles } from '@/app/styles/style'
import { toast } from "react-hot-toast"
import { useUpdataUserPasswordMutation } from '@/redux/features/user/userApi'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"




type Props = {}

const ChangePassword: FC<Props> = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [show,setShow] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [updataUserPassword, { isSuccess, error }] = useUpdataUserPasswordMutation()

    const Passwordhndl = async (e: any) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("new password and confirm password does not match")
        }
        await updataUserPassword({
            oldPassword, newPassword
        })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("password changed successfully")
        }
        if (error) {
            if ("data" in error) {
                const errodata = error as any;
                toast.error(errodata.data.message)
            }
        }
    }, [isSuccess, error]);

    return (
        <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
            <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2'>
                Change Password
            </h1>
            <div className='w-full'>
                <form onSubmit={Passwordhndl} className='flex flex-col items-center  text-black dark:text-[#fff]'>
                    <div className='w-[100%] 800px:w-[60%] mt-5  text-black dark:text-[#fff]'>
                        <label className='block pb-2  text-black dark:text-[#fff]'>
                            Enter old password
                        </label>
                        <input
                           type={!show ? "password" : "text"} className={`${styles.input} !w-[95%] mb-4 800px:mb-0  text-black dark:text-[#fff]`} required value={oldPassword} placeholder='enter here'
                            onChange={(e) => { setOldPassword(e.target.value) }}
                        />
                    </div>
                    <div className='w-[100%] 800px:w-[60%] mt-2'>
                        <label className='block pb-2  text-black dark:text-[#fff]'>
                            Enter new password
                        </label>
                        <input
                            type={!show ? "password" : "text"} className={`${styles.input} !w-[95%] mb-4 800px:mb-0  text-black dark:text-[#fff]`} required value={newPassword} placeholder='enter here'
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        />

                    </div>
                    <div className='w-[100%] 800px:w-[60%] mt-2'>
                        <label className='block pb-2  text-black dark:text-[#fff]'>
                            RE enter password
                        </label>
                        <input
                            type={!show ? "password" : "text"} className={`${styles.input} !w-[95%] mb-4 800px:mb-0  text-black dark:text-[#fff]`} required value={confirmPassword} placeholder='enter here'
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                        />
                        {
                            !show ? (
                                <AiOutlineEyeInvisible
                                   className={`${styles.input} !w-[95%] mb-4 800px:mb-0  text-black dark:text-[#fff]`}
                                    size={20}
                                    onClick={() => setShow(true)}
                                />
                            )
                                :
                                (
                                    <AiOutlineEye
                                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0  text-black dark:text-[#fff]`}
                                        size={20}
                                        onClick={() => setShow(false)}
                                    />
                                )
                        }
                        <input
                            className={`w-[95%] h-[40px] border border-[#37a39a] text-center  text-black dark:text-[#fff] rounded-full mt-8 cursor-pointer`}
                            required
                            value="SUBMIT"
                            type="submit"
                        />

                    </div>
                </form>

            </div>


        </div>
    )
}

export default ChangePassword;