import { createSlice } from '@reduxjs/toolkit'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../shared/utils/firebase'

interface UserState {
  tasks: []
  starred: []
  completed: []
}

const initialState: UserState = {
  tasks: [],
  starred: [],
  completed: []
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state: any, action: any) => {
      let exists = false
      state.tasks.map((item: any) => {
        if (item.title === action.payload.title) {
          exists = true
        } else {
          null
        }
      })
      !exists && state.tasks.push(action.payload)
    },
    setStarred: (state: any, action: any) => {
      const StarredItems =
        state.starred && state.starred.find((item: any) => item.uid === action.payload.uid)
      if (StarredItems) {
        console.log(StarredItems, 'StarredItems')
      } else {
        state.starred.push(action.payload)
      }
      const docRef = doc(db, 'starred', action.payload.uid)
      setDoc(docRef, {
        starred: state.starred,
        uid: action.payload.uid
      })
    },
    setCompleted: (state: any, action: any) => {
      const CompletedItems =
        state.completed && state.completed.find((item: any) => item.uid === action.payload.uid)
      if (CompletedItems) {
        console.log(CompletedItems, 'StarredItems')
      } else {
        state.completed.push(action.payload)
      }
      const docRef = doc(db, 'completed', action.payload.uid)
      setDoc(docRef, {
        completed: state.starred
      })
    },
    clearTasks: (state: any) => {
      state.tasks = []
      state.starred = []
      state.completed = []
    }
  }
})
export const { setTasks, setStarred, setCompleted, clearTasks } = tasksSlice.actions
export default tasksSlice.reducer

export const selectTasks = (state: any) => state.tasks.tasks
export const selectStarred = (state: any) => state.tasks.starred
export const selectCompleted = (state: any) => state.tasks.completed
