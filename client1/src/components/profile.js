import React, {  useState } from 'react';
import List from './list';
import { Link } from 'react-router-dom';
import Points from './display-points';
import './task-list.css';


const Profile = ({tasks, setTasks, checked, setChecked}) => {
  const [ points, setPoints ] = useState([]);

  return (
    <section className='profile'>
      <div className='profile1'>
        <Link to="/logout" className='logout pixel' >Logout</Link>
        <List tasks = {tasks} setTasks={setTasks} points = {points} setPoints={setPoints} checked={checked} setChecked={setChecked}  />
        <Link to="/addTask" className='add-task pixel' >Add task</Link>
      </div>
      <div className='profile2'>
        <Points tasks = {tasks} setTasks={setTasks}  points = {points} setPoints={setPoints}/>
      </div>

    </section>
  );
}


export default Profile;
