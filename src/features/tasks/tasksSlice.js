import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos'

const initialState={
    tasks:[],
    status:'idle',
    error:null,
}


// Fetching posts from mock API using AsyncThunk since redux store doesn't know anything about aysnc logic and only using asyncthunk allows us to make asynchronous calls and wait for data.
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () =>{
    const response = await axios.get(TASKS_URL);
    return response.data
})



export const tasksSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        // Function created for adding task
        taskAdded:{
            reducer(state, action){
                state.tasks = [action.payload,...state.tasks];
            },
            // This allows us to directly pass the required arguments when dispatching 
            prepare(title, status){
                return{
                    payload:{
                        id: nanoid(),
                        title,
                        status
                    }
                }
            }
        },
        taskToggled:{
            reducer(state, action){
                // Searching the id of the task to be toggled
                const toggledTask = state.tasks.find((task)=> task.id === action.payload);
                // If there exists the toggledTask, changing its boolean status from true to false or false to true
                if(toggledTask){
                    toggledTask.status = !toggledTask.status;
                }
            }
        },
        taskDeleted:{
            reducer(state,action){
                state.tasks = state.tasks.filter(task => task.id !== action.payload)
            }
        },
        taskUpdated:{
            reducer(state,action){
                state.tasks = state.tasks.map((task)=>{
                    if(task.id === action.payload.id){
                        return action.payload;
                    }else{
                        return task;
                    }
                })
            }
        }
    },

    extraReducers: (builder) =>{
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload // Update tasks state with fetched data
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });     
    }
   
})


export const selectAllTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;
export const getErrors = (state) => state.tasks.error;

export const {taskAdded, taskDeleted, taskToggled} = tasksSlice.actions;

export default tasksSlice.reducer;