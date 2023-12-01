"use client"

import { RiUser3Line } from "react-icons/ri";
import { GoLock } from "react-icons/go";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import LoginReducer from "../redux/reducers/LoginReducer";
import { RootState } from "../redux/store";
import { redirect } from "next/navigation";
import { useTranslation } from "react-i18next";
import '../i18n'

const Login = () => {

    const { t } = useTranslation()
    const { isLoggedIn } = useSelector((state: RootState) => state.login)
    const dispatch = useDispatch<any>()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (isLoggedIn) {
            redirect("/home")
        }
    }, [isLoggedIn])

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {
        dispatch(LoginReducer.handleLogin(userName, password))
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
                    {t('welcome')}
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
                <div className="flex flex-row items-center  w-[80%] ">
                    <GoLock
                        className="relative left-7 text-[#D9D9D9] "
                        size={20}
                    />
                    <input
                        className=" border-[#D9D9D9] border-[1px] rounded-[10px] h-14 w-[100%] pl-10"
                        placeholder={t('password')}
                        type="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    className="h-14 w-[80%] bg-[#EC8F5E] rounded-[10px] text-white"
                    onClick={handleLogin}
                >
                    {t('login')}
                </button>
                <div className="flex w-[80%]">
                    <p
                        className="text-lg"
                    >
                        {t('newUser')}
                    </p>
                    <p
                        className="text-lg text-[#EC8F5E]"
                    >
                        <Link href={"/register"}>
                            &nbsp; {t('signUp')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login