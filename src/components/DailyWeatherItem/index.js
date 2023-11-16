import { useSyncExternalStore } from 'react';
import { weatherStore  } from '../../store/weather.js';
import { useState, useEffect } from 'react';
import React from "react";
import {
    Container
} from "@mui/material";
import Slider from "react-slick";
import { nanoid } from 'nanoid';

export default function DailyWeatherItem(){
    
    const weatherStoreCurrent = useSyncExternalStore(weatherStore.subscribe, weatherStore.getSnapshot);
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
        lat: null
      });
      const [containerClassName, getContainerClassName] = useState('wr-day-container');
      const [timeOfDay, setTimeOfDay] = useState('');
    const [isClicked, setIsClicked] = useState(false);

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
        getContainerClassName(containerClassName);

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
const currentDayShort = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(formattedDate);
const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(formattedDate);

// парсинг данных

const temperature_max = temperatureInCelcius(weatherData.temp_max);
const temperature_min = temperatureInCelcius(weatherData.temp_min);
// const feelsLike = temperatureInCelcius(feels_like);
const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

const onClickLinkHandler = (e) => {
    e.preventDefault();
    if (!isClicked) {
        setIsClicked(true);
        e.currentTarget.parentElement.classList.add('active');
      } 
    if (isClicked) {
        setIsClicked(false);
        e.currentTarget.parentElement.classList.remove('active');
      }       
};
const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
            breakpoint: 799,
            settings: {
                slidesToShow: 2,
            }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

    return(
        
    <div className="wr-forecast" id="wr-forecast" lang="en">
        <div className={`${containerClassName} ${timeOfDay}`}>
            <Container>
            <div className="wr-location">
            <h1 id="wr-location-name-id" className="wr-location__name">
              {weatherData.currentCity}, {weatherData.country}, {weatherData.lon}, {weatherData.lat}
            </h1>
            <a href="/" className="wr-location__overview">
              5-day forecast, {currentDay}, {currentDate}, {currentMonth}
            </a>
            </div>
           
            <div className="wr-day-carousel"> 
            <Slider {...settings}>
                {/* <div className="wr-day-carousel__list"> */}
                    <div className="wr-day-carousel__item" key={nanoid()}>
                        <a href="/" 
                            className="wr-day__content" onClick={onClickLinkHandler}>
                            <div className="wr-day__title"
                                aria-label="">
                                <div className="wr-date">
                                    <span className="wr-date__long">
                                        {currentDayShort}&nbsp;
                                        <span className="wr-date__light">
                                            <span className="wr-date__long__dotm">
                                                {currentDate}&nbsp;
                                            </span>
                                            <span className="wr-date__long__month">
                                                {currentMonth}
                                            </span>
                                        </span>
                                    </span>
                                    <span className="wr-date__longish">
                                        {currentDayShort}&nbsp;
                                        <span className="wr-date__light">
                                            <span className="wr-date__longish__dotm">
                                                {currentDate}
                                            </span>
                                        </span>
                                    </span>
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
                                        {/* <div className="wr-day__wind-speed">
                                            <div className="wr-wind-speed">
                                                <span className="wr-hide-visually">
                                                    Wind speed
                                                </span>
                                                <span className="wr-wind-speed__description">
                                                    <span className="wr-wind-speed__value ">
                                                        11 mph
                                                    </span>
                                                </span>
                                                <span className="wr-wind-speed__icon">
                                                    <svg>
                                                    </svg>
                                                </span> 
                                            </div>
                                        </div>  */}
                                    </div>
                                </div>
                            </div>

                        </a>
                    </div>
                    <div className="wr-day-carousel__item" key={nanoid()}>
                        <a href="/" 
                            className="wr-day__content" onClick={onClickLinkHandler}>
                            <div className="wr-day__title"
                                aria-label="">
                                <div className="wr-date">
                                    <span className="wr-date__long">
                                        {currentDayShort}&nbsp;
                                        <span className="wr-date__light">
                                            <span className="wr-date__long__dotm">
                                                {currentDate}&nbsp;
                                            </span>
                                            <span className="wr-date__long__month">
                                                {currentMonth}
                                            </span>
                                        </span>
                                    </span>
                                    <span className="wr-date__longish">
                                        {currentDayShort}&nbsp;
                                        <span className="wr-date__light">
                                            <span className="wr-date__longish__dotm">
                                                {currentDate}
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>

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
                                        {/* <div className="wr-day__wind-speed">
                                            <div className="wr-wind-speed">
                                                <span className="wr-hide-visually">
                                                    Wind speed
                                                </span>
                                                <span className="wr-wind-speed__description">
                                                    <span className="wr-wind-speed__value ">
                                                        11 mph
                                                    </span>
                                                </span>
                                                <span className="wr-wind-speed__icon">
                                                    <svg>
                                                    </svg>
                                                </span> 
                                            </div>
                                        </div>  */}
                                    </div>
                                </div>

                        </a>
                    </div>
                    <div className="wr-day-carousel__item" key={nanoid()}>
                        <a href="/" 
                            className="wr-day__content" onClick={onClickLinkHandler}>
                            <div className="wr-day__title"
                                aria-label="">
                                <div className="wr-date">
                                    <span className="wr-date__long">
                                        {currentDayShort}&nbsp;
                                        <span className="wr-date__light">
                                            <span className="wr-date__long__dotm">
                                                {currentDate}&nbsp;
                                            </span>
                                            <span className="wr-date__long__month">
                                                {currentMonth}
                                            </span>
                                        </span>
                                    </span>
                                    <span className="wr-date__longish">
                                        {currentDayShort}&nbsp;
                                        <span className="wr-date__light">
                                            <span className="wr-date__longish__dotm">
                                                {currentDate}
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>

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
                                        {/* <div className="wr-day__wind-speed">
                                            <div className="wr-wind-speed">
                                                <span className="wr-hide-visually">
                                                    Wind speed
                                                </span>
                                                <span className="wr-wind-speed__description">
                                                    <span className="wr-wind-speed__value ">
                                                        11 mph
                                                    </span>
                                                </span>
                                                <span className="wr-wind-speed__icon">
                                                    <svg>
                                                    </svg>
                                                </span> 
                                            </div>
                                        </div>  */}
                                    </div>
                                </div>

                        </a>
                    </div>
                    <div className="wr-day-carousel__item" key={nanoid()}>
                        <a href="/" 
                            className="wr-day__content" onClick={onClickLinkHandler}>
                            <div className="wr-day__title"
                                aria-label="">
                                <div className="wr-date">
                                    <span className="wr-date__long">
                                        {currentDayShort}&nbsp;
                                        <span className="wr-date__light">
                                            <span className="wr-date__long__dotm">
                                                {currentDate}&nbsp;
                                            </span>
                                            <span className="wr-date__long__month">
                                                {currentMonth}
                                            </span>
                                        </span>
                                    </span>
                                    <span className="wr-date__longish">
                                        {currentDayShort}&nbsp;
                                        <span className="wr-date__light">
                                            <span className="wr-date__longish__dotm">
                                                {currentDate}
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>

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
                                        {/* <div className="wr-day__wind-speed">
                                            <div className="wr-wind-speed">
                                                <span className="wr-hide-visually">
                                                    Wind speed
                                                </span>
                                                <span className="wr-wind-speed__description">
                                                    <span className="wr-wind-speed__value ">
                                                        11 mph
                                                    </span>
                                                </span>
                                                <span className="wr-wind-speed__icon">
                                                    <svg>
                                                    </svg>
                                                </span> 
                                            </div>
                                        </div>  */}
                                    </div>
                                </div>

                        </a>
                    </div>
                
                {/* </div> */}
            </Slider>
            </div>
            </Container>
        </div>
    </div>
    )
}

