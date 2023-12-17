import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddTask from "./features/tasks/AddTask";
import TaskList from "./features/tasks/TaskList";
import {
  selectAllTasks,
  fetchTasks,
  getTasksStatus,
  
} from "./features/tasks/tasksSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Menu from "./components/Menu";

function App() {
  const taskStatus = useSelector(getTasksStatus);
  const dispatch = useDispatch();

  // using useEffect hook to make API Calls since data needs to be fetched whenever the component is mount. 
  useEffect(() => {
    // Fetch tasks when the component mounts
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]); //Dependencies for fetching Tasks from API. The useEffect hook runs whenever the taskStatus is idle and dispatch method sends the request for calling fetchTasks.

  const tasks = useSelector(selectAllTasks);

  const completedTasks = tasks.filter((task) => task.completed !== false);

  //created a variable to store all the tasks which are not completed.
  const pendingTasks = tasks.filter((task) => task.completed === false);

  return (
    <>
      <BrowserRouter>
        <div className="container">
        <h1 className="app-title">Task Manager</h1>
          <div className="task-app">
            <AddTask />
            <Routes>
              <Route
                path="/"
                element={<TaskList taskType={tasks} taskTitle="All" />}
              />
              <Route
                path="/pending"
                element={
                  <TaskList taskType={pendingTasks} taskTitle="Pending" />
                }
              />
               <Route
                path="/completed"
                element={
                  <TaskList taskType={completedTasks} taskTitle="Completed" />
                }
              />
            </Routes>
            <Menu />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App