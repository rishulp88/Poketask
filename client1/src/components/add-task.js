import React, { useState } from 'react';
import apiService from './../apiService';
import { useNavigate } from 'react-router-dom';



export default function AddTask({tasks, setTasks }){
  let navigate = useNavigate();
  const [state, setState] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTasks = [];
    for(let task of Object.values(tasks)){
      newTasks.push(task)
    }

    const index = newTasks.length;
    const newTask = {index: index, text: state.task, done: false};
    const res = await apiService.addTask(newTask);

    if (res.error) {
      alert(`${res.message}`);
      setState('');
    } else {
      const userInfo = await apiService.profile();
      setTasks((prevstate) => ({
        ...prevstate,
        ...userInfo
      }));
      navigate('/profile');
    }
  }

  const validateForm = () => {
    return !state.task;
  };

  return(
    <section className='container main' >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323"></link>

    <h2 className='h2'>New task</h2>

    <form action="submit" onSubmit={handleSubmit}>
      <label>New task:
        <input type="text"
          placeholder="Write a new task"
          name="task"
          value={state.task}
          onChange={handleChange} />
      </label>
      <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;confirm&nbsp;
        </button>
    </form>
    </section>
  )
}
