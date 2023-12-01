import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface ExpenseState {
    expenses?: [ExpenseModel]
}

const initialState: ExpenseState = {
    expenses: undefined
}

const slice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses: (state, action) => {
            state.expenses = action.payload
        },
        addExpense: (state, action) => {
            state.expenses?.push(action.payload)
        },
        editExpense: (state, action) => {
            state.expenses?.map((expense) => {
                if (expense.id === action.payload.id) {
                    expense.type = action.payload.type
                    expense.moneyAmount = action.payload.moneyAmount
                }
            })
        }
    },
})

const getExpenses = (id: number) => async (dispatch: any) => {

    const options = {
        method: "get",
        url: 'https://budget-tracker-service.onrender.com/api/getExpensesByUser?userId=' + id,
    }

    try {
        const response = await axios.request(options);
        const expensesResponse: [ExpenseModel] = response.data
        dispatch(setExpenses(expensesResponse))

    } catch (error) {
        console.log(error);
    }
}

const handleAddExpense = (userId: number, type: string, moneyAmount: number) => async (dispatch: any) => {

    const options = {
        method: "post",
        url: 'https://budget-tracker-service.onrender.com/api/addExpense',
        data: {
            "userId": userId,
            "type": type,
            "moneyAmount": moneyAmount
        }
    }

    try {
        const response = await axios.request(options);
        const expensesResponse: [ExpenseModel] = response.data
        dispatch(addExpense(expensesResponse))

    } catch (error) {
        console.log(error);
    }
}

const handleEditExpense = (id: number, type: string, moneyAmount: number) => async (dispatch: any) => {

    const options = {
        method: "put",
        url: 'https://budget-tracker-service.onrender.com/api/updateService',
        data: {
            "id": id,
            "moneyAmount": moneyAmount,
            "type": type,
        }
    }

    try {
        const response = await axios.request(options);
        const expensesResponse: [ExpenseModel] = response.data
        dispatch(editExpense(expensesResponse))

    } catch (error) {
        console.log(error);
    }
}

const handleSearchedExpenses = (id: number, startDate: string, endDate: string) => async (dispatch: any) => {

    const options = {
        method: "post",
        url: 'https://budget-tracker-service.onrender.com/api/searchExpense?startDate=' + startDate + '&endDate=' + endDate + '&userId=' + id,
    }
    console.log(startDate + ' - ' + endDate)
    try {
        const response = await axios.request(options);
        const expensesResponse: [ExpenseModel] = response.data
        console.log(expensesResponse)
        dispatch(setExpenses(expensesResponse))

    } catch (error) {
        console.log(error);
    }
}

export const { setExpenses, addExpense, editExpense } = slice.actions

export default {
    reducer: slice.reducer,
    getExpenses,
    handleAddExpense,
    handleEditExpense,
    handleSearchedExpenses
}