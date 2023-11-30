import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { taskAdded } from "./tasksSlice";

const AddTask = () => {
  // Using useState hook to control state of title and completed
  const [title, setTitle] = useState("");

  const [completed, setCompleted] = useState(false);

  const dispatch = useDispatch();

  //Function created to handle change in input
  const handleInputChange = (e) => {
    setTitle(e.target.value); //sets title to input provided by the user
  };

  //Function created to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents page from reloading
    // Updating state by using dispatch method and calling taskAdded function inside it in order to add new tasks
    if (title) {
      dispatch(taskAdded(title, completed));
      setTitle("");
      setCompleted(false);
    }
  };

  return (
    <div className="addTask">
      <h2>Add New Task:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleInputChange}
          value={title}
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
      <div className="line"></div>
    </div>
  );
};

export default AddTask;
