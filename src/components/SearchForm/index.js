import axios from "axios";

import {
    // Box,
    Grid,
    Button,
    // Select,
    // Toolbar,
    // Tooltip,
    // MenuItem,
    Container,
    TextField,
    // InputLabel,
    // FormControl,
    InputAdornment
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from 'react';
import { weatherStore } from '../../store/weather.js';
import SearchIcon from '@mui/icons-material/Search';
const MY_API_KEY = '5be78af818ee7dcfc981e54df16594ea';
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

// const url = 'http://www.omdbapi.com/?apikey=88150c8c';

export default function SearchForm({ userObj = {} }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {...userObj}
    });
    const inputRef = useRef(null);
    const [searchVal, setSearchVal] = useState('');
    // const [searchType, setSearchType] = useState('');

    useEffect(() => {
        weatherStore.resetStore();
        // getResults();
    }, [])

    const onSubmitHandler = (e, data) => {
        console.log(data);
        e.preventDefault();
        if (searchVal) {
            getResults();
        }
    }

    const getResults = () => {
        axios.get(`${API_URL}?appid=${MY_API_KEY}&q=${searchVal}`).then((response) => {
            console.log(response)
            if(response.status === 200) {
                weatherStore.addCurrentWeather(response.data);
                // weatherStore.setTotalResults(response.data.totalResults)
            }
            response.status === 200 ? weatherStore.addCurrentWeather({}) : console.log("Forecast not found!")
            .catch(error => console.error('Error fetching weather data:', error));
        });
    }

    return (
        <div className="search">
            <Container>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={{ xs: 2, md: 3 }} mt={{ xs: 0, md: 0}} className="search-list">
                            <Grid item sx={{display: { xs: 'none', sm: 'inline' }}} sm={{ display: 'inline-block' }} className="search-item" >
                            <p className="search-title">weather</p>
                            </Grid>
                            <Grid item xs={12} sm={8} className="search-item" id="input-wrapper">
                                <TextField
                                    className="search-input"
                                    {...register("city_name", { minLength: 3 })}
                                    ref={inputRef}
                                    id="outlined-basic" 
                                    placeholder="Enter a city"
                                    fullWidth
                                    onChange={(event) => setSearchVal(event.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment className="search-btn-wrapper" position="end">
                                                <Button className="search-btn" type='submit' variant="contained" endIcon={<SearchIcon className="search-btn-icon"/>}>    
                                                </Button>       
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                                 {<span className='error' role="alert">{errors.city_name?.type}</span>}
                            </Grid>
                        </Grid>
                </form>
            </Container>
        </div>

    )
}