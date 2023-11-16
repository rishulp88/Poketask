import {React, useState, useEffect } from 'react';
import apiService from '../apiService';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/icons8-trash-24.png';


export default function Task({ task, setTasks, tasks, points, setPoints }){
  let navigate = useNavigate();

  const [state, setState] = useState(task);
  const [checked, setChecked] = useState(false);

  // useeffect to check db for task status after new render of the page
  useEffect(() => {
    const sec = async () => {
      const status = await apiService.getTaskStatus(task);
      setChecked(status)

    }
    sec();
  }, [])




  const handleClick = async (e) => {
    e.target = state;
    const res = await apiService.remove(state);
    if (res.error) {
      alert(`${res.message}`);
      setState('');
    } else {
      const userInfo = await apiService.profile();
      setTasks(() => ({
        ...userInfo
      }));
      navigate('/profile');
    }
  }


  const handleCheck = async (e) => {
    e.target = state;
    const res = await apiService.check(state);
    const response = await res[0].done;
    // callback for setstate only when using prevstate
    setChecked(response);


    const newPoints = await apiService.getUserPoints();

    if (res.error) {
      alert(`${res.message}`);
      setState('');
    } else {
      setPoints(() => {
        return {
          newPoints
        };
      });
      navigate('/profile');
    }
  }

  return (
    <div className='task-item'>
          <label className='task'>{task.text}
            <input checked={checked} type="checkbox" onClick={handleCheck}/>
            <span type="checkbox" className="checkmark" onClick={handleCheck}></span>
          </label>
          <button className='btn' onClick={handleClick}><img src={icon} alt="" /></button>

    </div>
  )
}
