const weatherInfo = document.getElementById("weatherInfo");
const apiKey = "689e236a04339f8070327de80a2235f8" //// Replace 'YOUR_API_KEY' with your actual API key

function showWeatherDetails(event){
    event.preventDefault();
    //console.log('showWeatherDetails', event);

    const city = document.getElementById("city").value.trim();
    getWeatherByCityName(city);
}

function getWeatherByCityName(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            weatherInfo.innerHTML = `<h2>City Weather in ${data.name}</h2>
                                    <p>Temperature: ${data.main.temp} &#8451;</p>
                                    <p>Weather: ${data.weather[0].description} </p>`;

            setTimeout(() => {
                getWeatherByCoord(data.coord)
            }, 1000);
        }).catch(error => {
            console.log("Error fetching weather: ", error);
            weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
        });
}

function getWeatherByCoord(coord) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            weatherInfo.innerHTML = `<h2>coord Weather in ${data.name}</h2>
                                    <p>Temperature: ${data.main.temp} &#8451;</p>
                                    <p>Weather: ${data.weather[0].description} </p>`;
        }).catch(error => {
            console.log("Error fetching weather: ", error);
            weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
        });
}

document.getElementById("weatherForm").addEventListener("submit", showWeatherDetails);

