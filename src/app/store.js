import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';

// Configuring the Redux store for managing state of whole application using configureStore from Redux Toolkit
const store = configureStore({
    reducer:{
    tasks: tasksReducer // Assigning tasksReducer to manage the 'tasks' state in the store
    }
})

export default store;