import { useState, useEffect } from "react";
import apiService from "../apiService";

import firstlvl from "../assets/firstlvl.png";
import secondlvl from "../assets/secondlvl.png";
import thirdlvl from "../assets/thirdlvl.png";
import fourthlvl from "../assets/fourthlvl.png";








export default function Points( {points, setPoints, tasks, setTasks} ){


  useEffect(() => {
    const getPoints = async () => {
      const userPoints = await apiService.getUserPoints();
      
      const newPoints = Object.values(userPoints);
     
      return newPoints;
    };
    getPoints()
  }, []);

  useEffect(() => {
    const sec = async () => {
      const newPoints = await apiService.getUserPoints();

      setPoints(() => {
        return {
          newPoints
        };
      });
    }
    sec();
  }, [])

  let lvl = 0;

  const chooseImg = () => {
    if(points.newPoints <= 20){
      lvl = 1;
      return firstlvl;
    }
    if(points.newPoints <= 50) {
      lvl = 2;
      return secondlvl;
    };
    if(points.newPoints <= 100) {
      lvl = 3;
      return thirdlvl;
    };
    if(points.newPoints <= 160) {
      lvl = 4;
      return fourthlvl;
    };
  }

  return (

    <div className="point-display">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323"></link>
      <p className="point-count">Points: {points.newPoints}</p>
      <img className="dragon" src={chooseImg()} alt="" />
      <p className="point-count" id="lvl">Lvl: {lvl}</p>
    </div>
  )
}
