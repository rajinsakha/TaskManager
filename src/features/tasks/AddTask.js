import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { taskAdded } from './tasksSlice';


const AddTask = () => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = (e)=>{
      setTitle(e.target.value);
    }


    const handleSubmit = (e)=>{
      e.preventDefault();

      // Updating state by using dispatch method and calling taskAdded function inside it in order to add new tasks
      if(title){
        dispatch(taskAdded(title, status));
        setTitle('');
      }
     
    }

  return (
    <div>
       <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title"  onChange={handleInputChange} value={title} />
        
        <button type="submit">Add Task</button>
        </form> 
      
    </div>
  )
}

export default AddTask
