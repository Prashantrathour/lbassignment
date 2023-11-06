// SearchBar.js
import React, { useState } from 'react';
import Overlay from './Overlay';
import './searchbar.css'; // Import the searchbar.css file
import {AiOutlineSearch} from "react-icons/ai"
const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        if (!searchValue) {
            setError('Please enter a search value');
            setLoading(false);
            return;
        }
        try {
            const apiKey = "840de593b7028de6e424162454790fe5";
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`
            );
            if (!response.ok) {
                setError('City not found');
                setLoading(false);
                return;
            }
            const data = await response.json();
            setWeatherData(data);
            setError(null);
            setLoading(false);
        } catch (error) {
            setError('Error fetching data');
            setLoading(false);
            console.error('Error fetching data', error);
        }
    };

    return (
        <div className="search-bar-container">
            <div className="searchbox">
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />
            {!loading ? (
                <button onClick={handleSearch} className="search-button">
                    <AiOutlineSearch fill="orange"/>
                </button>
            ) : (
                <button disabled className="search-button loading">
                    Loading...
                </button>
            )}</div>
            {error && <p className="error-message">{error}</p>}
            {weatherData && <Overlay data={weatherData} onClose={() => setWeatherData(null)} />}
        </div>
    );
};

export default SearchBar;
