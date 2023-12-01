"use client"

import { RiUser3Line } from "react-icons/ri";
import { CiMail } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LoginReducer from "../redux/reducers/LoginReducer";
import { redirect } from "next/navigation";
import { useTranslation } from "react-i18next";
import '../i18n'

const Register = () => {

    const { t } = useTranslation()
    const { isLoggedIn } = useSelector((state: RootState) => state.login)
    const dispatch = useDispatch<any>()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rewritePassword, setRewritePassword] = useState("")

    useEffect(() => {
        if (isLoggedIn) {
            redirect("/home")
        }
    }, [isLoggedIn])

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleRewritePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRewritePassword(e.target.value);
    }

    const handleRegister = () => {
        if (password !== rewritePassword) {
            alert("Passwords do not match")
            return
        } else {
            dispatch(LoginReducer.handleSignUp(userName, email, password))
        }
    }

    return (
        <div
            className="h-screen w-screen flex items-center justify-center"
        >
            <div
                className="w-[500px] h-[600px] bg-white shadow-md flex flex-col items-center rounded-[10px] p-16 justify-evenly"
            >
                <h1
                    className=" text-[#FFD28F] text-[40px]"
                >
                    {t('signUp').toUpperCase()}
                </h1>
                <div className="flex flex-row items-center  w-[80%]">
                    <RiUser3Line
                        className="relative left-7 text-[#D9D9D9]"
                        size={20}
                    />
                    <input
                        className="border-[#D9D9D9] border-[1px] rounded-[10px] h-14 w-[100%] pl-10"
                        placeholder={t('userName')}
                        onChange={handleUserNameChange}
                    />
                </div>
                <div className="flex flex-row items-center  w-[80%]">
                    <CiMail
                        className="relative left-7 text-[#D9D9D9]"
                        size={20}
                    />
                    <input
                        className="border-[#D9D9D9] border-[1px] rounded-[10px] h-14 w-[100%] pl-10"
                        placeholder={t('email')}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="flex flex-row items-center  w-[80%] ">
                    <GoLock
                        className="relative left-7 text-[#D9D9D9] "
                        size={20}
                    />
                    <input
                        className=" border-[#D9D9D9] border-[1px] rounded-[10px] h-14 w-[100%] pl-10"
                        placeholder={t('password')}
                        onChange={handlePasswordChange}
                        type="password"
                    />
                </div>
                <div className="flex flex-row items-center  w-[80%] ">
                    <GoLock
                        className="relative left-7 text-[#D9D9D9] "
                        size={20}
                    />
                    <input
                        className=" border-[#D9D9D9] border-[1px] rounded-[10px] h-14 w-[100%] pl-10"
                        placeholder={t('rewritePassword')}
                        onChange={handleRewritePasswordChange}
                        type="password"
                    />
                </div>
                <button
                    className="h-14 w-[80%] bg-[#EC8F5E] rounded-[10px] text-white"
                    onClick={handleRegister}
                >
                    {t('confirm')}
                </button>
            </div>
        </div>
    )
}

export default Register