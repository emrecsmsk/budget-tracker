"use client"

import BalanceCard from "../components/BalanceCard";
import BudgetGraphic from "../components/BudgetGraphic";
import BudgetTable from "../components/BudgetTable";
import SearchCard from "../components/SearchCard";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { redirect } from "next/navigation";
import ExpensesReducer from "../redux/reducers/ExpensesReducer";

const Home = () => {

    const { isLoggedIn, user } = useSelector((state: RootState) => state.login)
    const { expenses } = useSelector((state: RootState) => state.expenses)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        const handleisLoggedIn = () => {
            isLoggedIn
                ?
                null
                :
                redirect("/login")
        }
        handleisLoggedIn()
    }, [isLoggedIn])

    useEffect(() => {
        const getExpenses = () => {
            dispatch(ExpensesReducer.getExpenses(user!.id))
        }
        getExpenses()
    }, [])

    return (
        <div
            className="m-10"
        >
            <NavBar />
            {
                expenses &&
                <div className="flex gap-5">
                    <div
                        className="flex-1 flex flex-col gap-5"
                    >
                        <BalanceCard expenses={expenses} />
                        <BudgetGraphic expenses={expenses} />
                    </div>
                    <div
                        className="flex-1 flex flex-col gap-5"
                    >
                        <SearchCard />
                        <BudgetTable expenses={expenses} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Home