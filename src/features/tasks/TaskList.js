import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { selectAllTasks, fetchTasks, getTasksStatus, getErrors } from './tasksSlice';
import Task from './Task';


const TaskList = () => {
    
    const tasks = useSelector(selectAllTasks);
    const taskStatus = useSelector(getTasksStatus);
    const errors = useSelector(getErrors);
    const dispatch = useDispatch();
    let content;

    useEffect(() => {
        // Fetch tasks when the component mounts
        if(taskStatus === 'idle'){
            dispatch(fetchTasks());
        }
       
      }, [taskStatus, dispatch]); 

   
    if(taskStatus === 'loading'){
        content = <h1>...Loading</h1>
    }else if(taskStatus === 'succeeded'){
        content =  tasks.map((task)=><Task key={task.id} task={task} />
         )
    }
    else if(taskStatus === 'failed'){
        content = <p>{errors}</p>
    }

   
 

  return (
   <>
   <h1 className='tasklist-title'>TaskList</h1>
   <div className='tasklist'>
       
       {content}
   </div>
 
   </>
      
   
  )
}

export default TaskList
