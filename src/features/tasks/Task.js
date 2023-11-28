import React from 'react'
import { taskDeleted, taskToggled } from './tasksSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// import './Task.css'

const Task = ({task}) => {
 
    const POSTS_URL = 'https://jsonplaceholder.typicode.com/todos'

    const dispatch = useDispatch();

    const handleDelete = async(item)=>{
        axios.delete(`${POSTS_URL}/${item.id}`).then(()=>{
            dispatch(taskDeleted(item.id))
        })
        .catch((error)=>console.log(error))
    }

    console.log(task);

  return (
    <div className='task-item'>
      <div className='checkbox-container'>
      <input
        type="checkbox"
        checked={task.status}
        onChange={() => dispatch(taskToggled(task.id))}
      />
       <span
          className={`checkmark ${task.status ? 'checked' : ''}`}
        ></span>
      </div>
     
          
       <h3 className='task-name' style={{ textDecoration: task.status ? 'line-through' : 'none' }}>{task.title}</h3>
       <button className='delete-btn' onClick={()=>handleDelete(task)}>Delete</button>
   </div>
  )
}

export default Task
