import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { selectAllTasks, fetchTasks, getTasksStatus } from './tasksSlice';
import { taskDeleted } from './tasksSlice';
import axios from 'axios';

const TaskList = () => {
    
    const POSTS_URL = 'https://jsonplaceholder.typicode.com/todos'

    const tasks = useSelector(selectAllTasks);
    const taskStatus = useSelector(getTasksStatus);
    const dispatch = useDispatch();


    useEffect(() => {
        console.log(taskStatus);
        // Fetch tasks when the component mounts
        if(taskStatus === 'idle'){
            dispatch(fetchTasks());
        }
       
      }, [taskStatus, dispatch]); // You might have additional dependencies here

    let content;

    const handleDelete = async(item)=>{
        axios.delete(`${POSTS_URL}/${item.id}`).then(()=>{
            dispatch(taskDeleted(item.id))
        })
        .catch((error)=>console.log(error))
    }

    if(!tasks){
        content = <h1>No Task List Found</h1>
    }else{
        content =  tasks.map((item)=>{
            return (
               <div key={item}>
                <p>{item.id}</p>
                   <h1>{item.title}</h1>
                   <button onClick={()=>handleDelete(item)}>Delete</button>
               </div>
           )
         }
         )
    }

   
 

  return (
    <div>
        {content}
     
    </div>
  )
}

export default TaskList
