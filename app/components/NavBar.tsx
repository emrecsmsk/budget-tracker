import { RiUser3Line } from "react-icons/ri";
import { PiSignOutLight } from "react-icons/pi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LoginReducer from "../redux/reducers/LoginReducer";


const NavBar = () => {

    const { user } = useSelector((state: RootState) => state.login)
    const dispatch = useDispatch<any>()

    return (
        <div className="flex h-20 justify-end gap-10 items-center">
            <Link
                href={"#"}
                className="flex items-center"
            >
                <RiUser3Line
                    className=" text-[#D9D9D9]"
                    size={40}
                />
                <h1>
                    {user?.username}
                </h1>
            </Link>
            <Link
                href={"#"}
            >
                <PiSignOutLight
                    className=" text-[#D9D9D9] "
                    size={40}
                    onClick={() => {
                        dispatch(LoginReducer.handleLogout())
                    }}
                />
            </Link>
        </div>
    )
}

export default NavBar