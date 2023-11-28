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
        setStatus(false);
      }
    }


  return (
    <div className='addTask'>
      <h2>Add New Task:</h2>
       <form onSubmit={handleSubmit}>
        {/* <input type="checkbox" id='status' checked={status} onChange={()=>setStatus(!status)}  /> */}
        <input type="text" name="title" id="title" onChange={handleInputChange} value={title} />
        <button type="submit" className='add-btn'>Add</button>
        </form> 
      <div className='line'></div>
    </div>
  )
}

export default AddTask
