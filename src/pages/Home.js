// import MovieList from "../components/MovieList";
import SearchForm from "../components/SearchForm";
// import { useSyncExternalStore, useState } from 'react';
// import { moviesStore } from '../store/movies.js';
// import { Pagination } from "@mui/material";

export default function Home() {
    // const [page, setPage] = useState(1);
    // const moviesStoreLocal = useSyncExternalStore(moviesStore.subscribe, moviesStore.getSnapshot);

    // const handleChange = (event, value) => {
    //     setPage(value);
    // };
    return (
        <>
            <SearchForm />
             {/* { moviesStoreLocal.length ? <MovieList/> : <p>Movie not found!!</p> } */}
        </>
    )
}