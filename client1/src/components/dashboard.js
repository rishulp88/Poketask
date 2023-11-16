import { React, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import apiService from '../apiService';
import Register from './register';
import Login from './login';
import Logout from './logout';
import Profile from './profile';
import AddTask from './add-task';



const Dashboard = ({ setIsAuthenticated }) => {
  const [tasks, setTasks] = useState([]);



  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile();
      if (userInfo) {
        setTasks((prevState) => {
          return {
            ...prevState,
            ...userInfo,
          };
        });
      } else {
        console.log('No tasks found');
      }
    };
    getProfile();
  }, []);

  return (
    <div className="dashboard">
      <Routes>
        <Route
          path="/"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/profile" element={<Profile tasks={tasks} setTasks={setTasks}  />} />
        <Route path="/addTask" element={< AddTask tasks={tasks} setTasks={setTasks}  />} />
      </Routes>
    </div>
  )
}

export default Dashboard;
