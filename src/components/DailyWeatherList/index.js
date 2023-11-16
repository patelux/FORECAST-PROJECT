import DailyWeatherItem from "../DailyWeatherItem"
import { useSyncExternalStore } from 'react';
import { weatherStore  } from '../../store/weather.js';
export default function DailyWeatherList(){
    const weatherStoreCurrent = useSyncExternalStore(weatherStore.subscribe, weatherStore.getSnapshot);
   

    return(
        <>
        <h2>Daily Forecast !!!!!</h2>
        { Object.keys(weatherStoreCurrent).length !==0 ? <DailyWeatherItem /> : <p>Forecast not found!!</p> }
        </>
    )
}