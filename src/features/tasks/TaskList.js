import React from "react";
import { useSelector } from "react-redux";
import { getTasksStatus, getErrors } from "./tasksSlice";
import Task from "./Task";

const TaskList = ({ taskType, taskTitle }) => {
  // useSelector reads the state of the redux store
  const taskStatus = useSelector(getTasksStatus);
  const errors = useSelector(getErrors);

  // Creating a variable named content to display contents
  let content;

  if (taskStatus === "loading") {
    content = <h1>...Loading</h1>;
  } else if (taskStatus === "succeeded") {
    //Tasks array is iterated using map function and for each task, a Task component is created with a unique key and task is provided as props to it.
    content = taskType.map((task) => <Task key={task.id} task={task} />);
  } else if (taskStatus === "failed") {
    content = <p>{errors}</p>;
  }

  return (
    <>
      <h2 className="tasklist-title">{taskTitle} Tasks</h2>
      <div className="tasklist">{content}</div>
    </>
  );
};

export default TaskList;
