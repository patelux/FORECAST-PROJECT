import React from "react";
import { useSyncExternalStore } from 'react';
import { useState, useEffect } from 'react';
import { weatherStore  } from '../../store/weather.js';
import { weatherDailyStore  } from '../../store/weatherDaily.js';
import DailyWeatherItem from "../DailyWeatherItem";
import CurrentWeatherItem from "../CurrentWeatherItem/index.js";

export default function DailyWeatherList(){
    const weatherStoreCurrent = useSyncExternalStore(weatherStore.subscribe, weatherStore.getSnapshot);
    const weatherStoreDaily = useSyncExternalStore(weatherDailyStore.subscribe, weatherDailyStore.getSnapshot);
    const [containerClassName, setContainerClassName] = useState('wr-day-container');
    const [timeOfDay, setTimeOfDay] = useState('day');


// класс для бекграунда секции
    useEffect(() => {
        setTimeOfDay(timeOfDay);
        setContainerClassName(containerClassName);
      }, [containerClassName,timeOfDay]);

    return(
        <>
        <div className="wr-forecast" id="wr-forecast" lang="en">
        <div className={`${containerClassName} ${timeOfDay}`}>
        
        { Object.keys(weatherStoreCurrent).length > 0 ? <CurrentWeatherItem  setContainerClassNameLocal={setContainerClassName} setTimeOfDayLocal={setTimeOfDay}/> : <p>Current Forecast not found!!</p> }     

        { (weatherStoreDaily).length > 0 ? <DailyWeatherItem containerClassName={containerClassName} timeOfDay={timeOfDay} /> : <p>5-days Forecast not found!!</p> }
          </div>
         </div>
        </>
    )
}