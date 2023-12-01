import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface LoginState {
    isLoggedIn: boolean,
    user?: UserModel
}

const initialState: LoginState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
})

const handleLogin = (username: string, password: string) => async (dispatch: any) => {

    const options = {
        method: "post",
        url: 'https://budget-tracker-service.onrender.com/api/login',
        data: {
            "username": username,
            "password": password
        }
    }

    try {
        const response = await axios.request(options);
        const loginResponse = response.data

        if (loginResponse.id !== undefined) {
            await dispatch(setUser(loginResponse))
            dispatch(setIsLoggedIn(true))
        } else {
            dispatch(setIsLoggedIn(false))
        }
    } catch (error) {
        console.log(error);
    }
}

const handleSignUp = (username: string, email: string, password: string) => async (dispatch: any) => {

    const options = {
        method: "post",
        url: 'https://budget-tracker-service.onrender.com/api/register',
        data: {
            "username": username,
            "email": email,
            "password": password
        }
    }

    try {
        const response = await axios.request(options);
        const loginResponse = response.data

        if (loginResponse === "User registered successfully") {
            dispatch(handleLogin(username, password))
        } else {
            dispatch(setIsLoggedIn(false))
        }
    } catch (error) {
        console.log(error);
    }
}

const handleLogout = () => (dispatch: any) => {
    dispatch(setIsLoggedIn(false))
}

export const { setIsLoggedIn, setUser } = slice.actions

export default {
    reducer: slice.reducer,
    handleLogin,
    handleSignUp,
    handleLogout
}