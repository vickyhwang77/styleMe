import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Home() {
    const [weather, setWeather] = useState(null);
    const [outfitImage1, setOutfitImage1] = useState(null);
    const [outfitImage2, setOutfitImage2] = useState(null);
    const [loading, setLoading] = useState(true);
    const [umbrellaMessage, setUmbrellaMessage] = useState(null);
    const [season, setSeason] = useState(null);

    const apiKey = 'f024fc3e6c4533d76d2b2af2aa9f4138';
    const searchKey = 'AIzaSyAxVT41lWbqfEPkFVdPK7qc7ZZYOFQWlv0';
    const searchEngineId = '5258205347cad49d4';

    const location = useLocation();
    const user = location.state.user;

    useEffect(() => {
        // Fetch weather data when the component mounts
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${user.city}&units=imperial&appid=${apiKey}`)
            .then(response => {
                setWeather(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            });
    }, [user.city, apiKey]);

    useEffect(() => {
        // Determine the current season based on the month
        const getSeason = (month) => {
            if (month >= 3 && month <= 5) {
                return 'spring';
            } else if (month >= 6 && month <= 8) {
                return 'summer';
            } else if (month >= 9 && month <= 11) {
                return 'fall';
            } else {
                return 'winter';
            }
        };

        const currentMonth = new Date().getMonth() + 1; // January is 0
        const currentSeason = getSeason(currentMonth);
        setSeason(currentSeason);

        // Only make the Google Custom Search API request if both weather and user are available
        if (weather && user) {
            // Specify the site restriction to Google
            const siteRestriction = 'site:pinterest.com OR site:polyvore.com';

            // Modify the search queries based on temperature, user's style, gender, season, and the term "outfit"
            for (let i = 1; i <= 2; i++) {
                let searchQuery = `${user.style} ${user.gender === 'female' ? 'women' : 'men'} ${season} fashion outfit${i} ${siteRestriction}`;

                // Check if the temperature is below 32 degrees Fahrenheit
                if (weather.main.temp < 32) {
                    searchQuery = `cold weather ${searchQuery}`;
                } else if (weather.main.temp > 75) {
                    searchQuery = `hot weather ${searchQuery}`;
                }

                // Check if the weather description includes "rain" or "snow"
                if (weather.weather[0].description.includes('rain')) {
                    searchQuery = `rainy weather ${searchQuery}`;
                    setUmbrellaMessage('Don\'t forget your umbrella!');
                } else if (weather.weather[0].description.includes('snow')) {
                    searchQuery = `snowy weather ${searchQuery}`;
                    setUmbrellaMessage('Enjoy the snowy weather!');
                } else {
                    setUmbrellaMessage(null);
                }

                // Fetch images related to the updated search queries from the Google Custom Search API
                axios.get(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&cx=${searchEngineId}&key=${searchKey}&searchType=image`)
                    .then(response => {
                        console.log(`Google API response ${i}:`, response.data);

                        if (response.data.items && response.data.items.length > 0) {
                            const randomIndex = Math.floor(Math.random() * response.data.items.length);
                            const imageLink = response.data.items[randomIndex].link;
                            console.log(`Image link ${i}:`, imageLink);

                            // Update the respective outfitImage state variable
                            if (i === 1) {
                                setOutfitImage1(imageLink);
                            } else if (i === 2) {
                                setOutfitImage2(imageLink);
                            }
                        } else {
                            console.error(`No items found in the API response ${i}.`);
                        }
                    })
                    .catch(error => {
                        console.error(`Error fetching outfit${i} image:`, error);
                    });
            }
        }
    }, [user, weather, searchEngineId, searchKey]);

    const handleDislike = () => {
        // Handle dislike action here
        window.location.reload();
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: 'lavender' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ fontSize: '2em', color: '#FF69B4', margin: '10px 0' }}>{`Welcome, ${user.name}! Here are your outfits of the day!`}</h1>
                <p style={{ fontSize: '1.2em', color: '#333' }}></p>
              </div>
            {loading ? (
                <p>Loading weather data...</p>
            ) : (
                <div className="text-center">
                    <h3>Weather in {user.city}</h3>
                    <p>Temperature: {weather && weather.main.temp}°F</p>
                    <p>Today's weather is {weather && weather.weather[0].description}!</p>

                    {/* Display the umbrella message if available */}
                    {umbrellaMessage && (
                        <p>{umbrellaMessage}</p>
                    )}

                    {/* Display the outfit images if available */}
                    {(outfitImage1 || outfitImage2) && (
                        <div className="d-flex justify-content-between">
                            {outfitImage1 && (
                                <div style={{ marginRight: '5px', width: '200px', maxHeight: '300px', overflow: 'hidden' }}>
                                    <h3>Outfit 1</h3>
                                    <img src={outfitImage1} alt={`${user.style} Outfit 1`} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
                                </div>
                            )}
                            {outfitImage2 && (
                                <div style={{ width: '200px', maxHeight: '300px', overflow: 'hidden' }}>
                                    <h3>Outfit 2</h3>
                                    <img src={outfitImage2} alt={`${user.style} Outfit 2`} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Display the dislike button */}
                    <button
                        type="button"
                        className="btn btn-success rounded mt-3"
                        style={{ backgroundColor: '#FF69B4', border: 'none' }}
                        onClick={handleDislike}
                    >
                        I don't like these outfits
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;
