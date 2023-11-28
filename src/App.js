import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './features/tasks/AddTask';
import TaskList from './features/tasks/TaskList';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <BrowserRouter>
  
      <div className="container">
      <Navbar />
      <div className='task-app'>
      <Routes>
        <Route path='/' element={<AddTask />} />
        <Route path='/tasklist' element={<TaskList />} />
      </Routes>
      </div>
      </div>
    </BrowserRouter>
  
    </>
  );
}

export default App;
