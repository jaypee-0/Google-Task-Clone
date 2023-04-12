import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from "../slices/userSlice";
import tasksReducer from "../slices/taskSlice";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const reducers = combineReducers({
    user: userReducer,
    tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



export const persistor = persistStore(store)