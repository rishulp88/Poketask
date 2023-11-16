import {React, useEffect} from 'react';
import apiService from '../apiService';
import Task from './task';

export default function List({ tasks, setTasks, points, setPoints, checked, setChecked }){

  useEffect(() => {
    const sec = async () => {
      const tasks = await apiService.profile();
      setTasks(() => {
        return {
          ...tasks
        }
      })

    }
    sec();
  }, [setTasks])

  const newTasks = [];
  for(let task of Object.values(tasks)){
    newTasks.push(task)
  }

  return (
    <div className="list_scroll container">
      <h2 className='h2'>Tasks</h2>
      <div className='list'>
        {newTasks.length > 0 ?
          newTasks.map(task => {
            return (
          <Task setTasks={setTasks} task={task} tasks={tasks} points = {points} setPoints={setPoints} checked={checked} setChecked={setChecked} />
        )
          }) : <p>No tasks yet</p>
        }
      </div>

    </div>
  )
}
