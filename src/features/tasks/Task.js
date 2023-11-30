import React, {useState} from "react";
import { taskDeleted, taskToggled } from "./tasksSlice";
import axios from "axios";
import { useDispatch } from "react-redux";


const Task = ({ task }) => {
  const POSTS_URL = "https://jsonplaceholder.typicode.com/todos";

  const dispatch = useDispatch();

// Creating state using useState Hook to control animation while deleting task
  const [deleting, setDeleting] = useState(false);

  // Asynchronous function to delete tasks from data coming from POSTS_URL
  const handleDelete = async (item) => {
    setDeleting(true); //Chaging state to true when task is being deleted
    axios
    // Sending delete request to the API
      .delete(`${POSTS_URL}/${item.id}`)
      .then(() => {
        dispatch(taskDeleted(item.id)); //Dispatching action to update redux store
      })
      .catch((error) => console.log(error)); //Logging error if deletion fails
  };

  // Creating function to handle onAnimationEnd event 
  const onAnimationEnd = () => {
    setDeleting(false); // Reset animation state after animation ends
  };

  return (
    // Applying the fade-out animation class based on the 'deleting' state
    <div className={`task-item ${deleting ? 'fade-out' : ''}`} onAnimationEnd={onAnimationEnd}>
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(taskToggled(task.id))}
        />
        <span className={`checkmark ${task.status ? "checked" : ""}`}></span>
      </div>

      <h3
        className="task-name"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </h3>
      <button className="delete-btn" onClick={() => handleDelete(task)}>
        Delete
      </button>
    </div>
  );
};

export default Task;
