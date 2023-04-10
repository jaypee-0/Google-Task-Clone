import { createSlice } from "@reduxjs/toolkit";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../shared/utils/firebase";
interface UserState {
    tasks: [];
}

export const gettasks: any = createAsyncThunk(
    "tasks/gettasks",
    async (uid: any, thunkAPI) => {
        const docRef = doc(db, "tasks", uid);
        return getDoc(docRef)
            .then((res: any) => {
                return [...res.data().tasks];
            })
            .catch((res) => []);
    }
);
const initialState: any = {
    tasks: []
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTotasks: (state: any, action) => {
            let exists = false;
            state.tasks.map((item: any) => {
                if (
                    item.productName ===
                    action.payload.data.productName
                ) {
                    exists = true;
                } else {
                    null;
                }
            });
            !exists &&
                state.tasks.push(action.payload.data);
            
            localStorage.setItem(
                "tasks",
                JSON.stringify(state.tasks)
            );
            const docRef = doc(
                db,
                "tasks",
                action.payload.uid
            );
            setDoc(docRef, {
                tasks: state.tasks,
                uid: action.payload.uid
            });
        },
        removeFromtasks: (state: any, action) => {
            state.tasks.splice(action.payload.index, 1);
            const docRef = doc(
                db,
                "tasks",
                action.payload.uid
            );
            setDoc(docRef, {
                tasks: state.tasks,
                uid: action.payload.uid
            });
        },
        removeAlltasks: (state: any, action) => {
            state.tasks.length = 0;
            localStorage.removeItem("tasks");
            const docRef = doc(
                db,
                "tasks",
                action.payload.uid
            );
            setDoc(docRef, {
                tasks: state.tasks,
                uid: action.payload.uid
            });
        }
    },
    extraReducers: {
        [gettasks.pending]: (state: any) => {
            // state.loading = true;
        },
        [gettasks.fulfilled]: (
            state: any,
            action: any
        ) => {
            state.tasks = action.payload;
            // state.loading = false;
        },
        [gettasks.pending]: (state: any) => {
            // state.loading = false;
        }
    }
});
export const {
    addTotasks,
    removeFromtasks,
    removeAlltasks
} = tasksSlice.actions;
export default tasksSlice.reducer;
