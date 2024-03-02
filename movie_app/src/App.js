import React, { useState,useEffect } from 'react';
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=3d3f135b';

const App = () => {
    const [searchTerm,SetSearchTerm] = useState("");
    const [movies,SetMovies]=useState([]);  //array to store
    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            SetMovies(data.Search);
        }
        catch (error) {
                console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        searchMovies('Interstellar');
    }, []);

    return (
        <div className="app">
            <h1>MovieWorld</h1>
            <div className="search">
                <input placeholder="Search Movies" value={searchTerm} onClick={() => searchMovies(searchTerm)} onChange={(e) => SetSearchTerm(e.target.value)} />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>
            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => ( 
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;
