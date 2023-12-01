import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Login from "./reducers/LoginReducer"
import Expenses from "./reducers/ExpensesReducer"

const reducer = combineReducers({
    login: Login.reducer,
    expenses: Expenses.reducer

})

export const store = configureStore({
    reducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch