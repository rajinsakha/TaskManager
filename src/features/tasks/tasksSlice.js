import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// URL from where data will be fetched
const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos'

// Creating initialState for tasks 
const initialState={
    tasks:[],
    status:'idle',
    error:null,
}


// Fetching posts from mock API using AsyncThunk since redux store doesn't know anything about aysnc logic and only using asyncthunk allows us to make asynchronous calls and wait for data.
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () =>{
    // Using axios to make API calls
    const response = await axios.get(TASKS_URL);
    return response.data
})


// tasksSlice is created using createSlice method from redux toolkit
export const tasksSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        // Function created for adding task
        taskAdded:{
            reducer(state, action){
                state.tasks = [action.payload,...state.tasks]; //The value of tasks is set to value obtained from action.payload  when the method is called and a copy of previous tasks array is created and all these values are added into new array which is provided to state.tasks.
            },
            // This allows us to directly pass the required arguments when dispatching 
            prepare(title, completed){
                return{
                    payload:{
                        id: nanoid(), //nanoid generates a unique id 
                        title,
                        completed
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
                    toggledTask.completed = !toggledTask.completed;
                }
            }
        },
        // Function created for deleting tasks.
        taskDeleted:{
            reducer(state,action){
                state.tasks = state.tasks.filter(task => task.id !== action.payload) //The filter function creates a new array by filtering all of the tasks which id is not equal to id provided when this function is called.
            }
        },

    },
// extra reducers created for handling different action types used in async thunk i.e. for fetching tasks
    extraReducers: (builder) =>{
        // addCase is a method for writing action types and since fetchtasks is an asynchronous logic, it provides three different action types i.e. pending, fulfilled and rejected. So, following cases are written for each type.
    builder
    // When the fetched data is pending, the status of state is set to loading.
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      // When the fetched data is fulfilled, the status of state is set to succeeded and tasks is set to action.payload i.e. data returned by fetchTasks method when it is called.
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload // Update tasks state with fetched data
      })
    //   When the fetched data is rejected, the status is set to failed and it occurs when an error appears while fetching. And the value of error is set to error.message to know what type of error has occured. 
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });     
    }
   
})

//Selects all tasks and stores it in a variable which will be used for getting all the values of tasks array.
export const selectAllTasks = (state) => state.tasks.tasks; 

//Gets status of tasks
export const getTasksStatus = (state) => state.tasks.status;

//Gets Errors
export const getErrors = (state) => state.tasks.error;


// exporting actions by destructuring
export const {taskAdded, taskDeleted, taskToggled} = tasksSlice.actions;


// exporting reducer
export default tasksSlice.reducer;