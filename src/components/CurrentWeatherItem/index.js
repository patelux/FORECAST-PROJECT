import axios from "axios";
import { useSyncExternalStore } from 'react';
import { weatherStore  } from '../../store/weather.js';
import { weatherDailyStore } from '../../store/weatherDaily.js';
import { useState, useEffect } from 'react';
import React from "react";
import {
    Container
} from "@mui/material";
import sunriseIcon from '../../images/sunrise.svg';
import windIcon from '../../images/wind.svg';

const MY_API_KEY = '6937530a137795579f942882f64a8f1a';
const API_URL = `https:/api.openweathermap.org/data/2.5/forecast`;

export default function CurrentWeatherItem(props){
    
    const weatherStoreCurrent = useSyncExternalStore(weatherStore.subscribe, weatherStore.getSnapshot);
    console.log(weatherStoreCurrent)
    const [weatherData, setWeatherData] = useState({
        currentCity: '',
        country: '',
        icon: '04n',
        main: '',
        description: '',
        temp_max: null,
        temp_min: null,
        feels_like: null,
        sunrise: null,
        sunset: null,
        keyId: null,
        dt: null,
        lon: null,
        lat: null,
        timezone: null
      });
    const [containerClassName, setContainerClassName] = useState('wr-day-container');
    const [timeOfDay, setTimeOfDay] = useState('');
    
    useEffect(() => {
        if (weatherStoreCurrent) {
          setWeatherData({
            currentCity: weatherStoreCurrent.name || '',
            country: weatherStoreCurrent.sys?.country || '',
            icon: weatherStoreCurrent.weather[0]?.icon || '04n',
            main: weatherStoreCurrent.weather[0]?.main || '',
            description: weatherStoreCurrent.weather[0]?.description || '',
            temp_max: weatherStoreCurrent.main?.temp_max || null,
            temp_min: weatherStoreCurrent.main?.temp_min || null,
            feels_like: weatherStoreCurrent.main?.feels_like || null,
            sunrise: weatherStoreCurrent.sys?.sunrise || null,
            sunset: weatherStoreCurrent.sys?.sunset || null,
            keyId: weatherStoreCurrent.id || null,
            dtValue: weatherStoreCurrent.dt || null,
            timezone: weatherStoreCurrent.timezone || null,
            lon: weatherStoreCurrent.coord?.lon || null,
            lat: weatherStoreCurrent.coord?.lat || null
          });
        };
      }, [weatherStoreCurrent]);

    useEffect(() => {
        let containerClassName = 'wr-day-container';
        if (weatherData.main !== '') {
            if (weatherData.main.includes('Clear')) {
                containerClassName = 'wr-day-container sunny';
            } else if (weatherData.main.includes('Clouds') || weatherData.main.includes('Fog')) {
                containerClassName = 'wr-day-container clouds';
            } else if (weatherData.main.includes('Rain') || weatherData.main.includes('Storm') ) {
                containerClassName = 'wr-day-container rain';
            } else if (weatherData.main.includes('Snow') || weatherData.main.includes('Mist')) {
                containerClassName = 'wr-day-container snow';
            }
        }
        const dateTimeMillis = (weatherData.dtValue + weatherData.timezone) * 1000;
        const date = new Date(dateTimeMillis);
        const hours = date.getHours();
        // const minutes = date.getMinutes();
        let timeOfDay;
        if (hours >= 6 && hours < 18) {
          timeOfDay = 'day';
        } else if (hours >= 18 || hours < 6) {
          timeOfDay = 'night';
        }
        setTimeOfDay(timeOfDay);
        setContainerClassName(containerClassName);

      }, [weatherData]);

// кельвін → цельсій
function temperatureInCelcius(temp) {
    return Math.round(temp - 273.15);
}
// расчет даты
const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
  
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

const formattedDate = new Date();

const currentDate =   getOrdinalSuffix(formattedDate.getUTCDate());
const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(formattedDate);
// const currentDayShort = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(formattedDate);
const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(formattedDate);

// парсинг данных

const temperature_max = temperatureInCelcius(weatherData.temp_max);
const temperature_min = temperatureInCelcius(weatherData.temp_min);
// const feelsLike = temperatureInCelcius(feels_like);
const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

// get 5-day forecast
const onClickHandler = (e) => {
    e.preventDefault();
    if (weatherData.lon !== null && weatherData.lat !== null) {
        getDailyResults();
    }
}

const getDailyResults = async () => {
    try {
      const response = await axios.get(`${API_URL}?appid=${MY_API_KEY}&lat=${weatherData.lat}&lon=${weatherData.lon}`);

      if (response.status === 200) {
        weatherDailyStore.addDailyWeather(response.data.list);
      } 
      weatherDailyStore.addDailyWeather([]);
    } catch (error) {
      console.error(error.message)
      }
    }

// get 5-day forecast ↑

    return (  
    <div className="current-forecast" id="current-forecast" lang="en"> 
        <div className={`${containerClassName} ${timeOfDay}`}>
            <Container>
            <div className="wr-location">
            <h1 id="wr-location-name-id" className="wr-location__name">
              {weatherData.currentCity}, {weatherData.country}
              <span className='date'>{currentDay}, {currentDate}, {currentMonth}</span> 
            </h1>
            <a href="/" className="wr-location__overview" onClick={onClickHandler}>
              5-days forecast  
            </a>
            </div>
        
            <div className="wr-day-carousel__item">
                <div
                    className="wr-day__content">
                    <div className="wr-day__title">
                        <div className="wr-date">
                            <span className="wr-date__longish">
                                Today&nbsp;
                            </span>
                        </div>
                        <div className="wr-sunrise">
                                        <div className="wr-weather-type__icon">
                                        <img src={sunriseIcon} alt="wind" className="icon-weather"/>
                                        </div> 
                                        <div className="wr-sunrise__description">
                                            <div className="wr-sunrise__value ">
                                            Sunrise 06:50
                                            </div>
                                            <div className="wr-sunset__value ">
                                            Sunset 15:49
                                            </div>
                                        </div>
                        </div>
                    </div>
                    <div className="wr-day__body">
                        <div className="wr-day__details-container">
                            <div className="wr-day__details">
                                <div className="wr-day__weather-type">
                                    <div className="wr-weather-type--day">
                                        <div className="wr-weather-type__text">
                                        {weatherData.description}
                                        </div>
                                        <div className="wr-weather-type__icon">
                                            <div className="img-wrapper">
                                                <img id="weather-icon" src={iconUrl} alt="Weather Icon"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-day__temperature">
                                    <div className="wr-day-temperature ">
                                        <div className="wr-day-temperature__high">
                                            <span className="wr-day-temperature__high-value">
                                            {temperature_max}°C
                                                </span>
                                        </div>
                                        <div className="wr-day-temperature__low">
                                            <span className="wr-day-temperature__low-value">
                                            {temperature_min}°C
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-day__details__weather-type-description">
                                {weatherData.description}
                                </div>
                                    <div className="wr-wind-speed">
                                        <span className="wr-weather-type__icon">
                                        <img src={windIcon} alt="wind" className="icon-weather"/>
                                        </span> 
                                        <span className="wr-wind-speed__description">
                                            <span className="wr-wind-speed__value ">
                                                11 mph
                                            </span>
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            </Container>
        </div>
    </div>
    )
}

