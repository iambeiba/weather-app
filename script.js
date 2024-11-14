const apiKey = 'af3a0967ebc9027e1b72c700c39d25ff'
const weather = document.getElementById('weather')
const forecast = document.getElementById('forecast')
let prev;
const dayNames = ["Sunday", "Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function inputHandler(event) {
    clearTimeout(prev);

    prev = setTimeout(async () => {
        weather.innerHTML = ''
        forecast.innerHTML = 'Not found :('

        const cityName = event.target.value;
        const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)).json();
        if(data.cod === 200){
            weather.innerHTML = `
                <div class="weather-data">
                    <p class="city">New-York</p>
                    <div class="weather-data-left">
                        <img class="weather-data-img" src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png" alt="">
                        <div class="weather-data-left-text">
                            <p class="temperature"><span>-1 Cº</span></p>
                            <p class="weather-day">Cloudy Thu</p>
                        </div>
                    </div>
                    <div class="weather-data-info">
                        <p class="info-precipitation">Precipitation: 3%</p>
                        <p class="info-humidity">Humidity: 76%</p>
                        <p class="info-wind">Wind: 11 km/h</p>
                    </div>
                </div>
`;

            const secondReq = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`
            const forecastData = await (await fetch(secondReq)).json();

            console.log(forecastData);
            forecast.innerHTML = ''
            for (let i = 0; i < forecastData.list.length; i++) {
                if (i % 8 === 0) {
                    forecast.innerHTML += `
                <div class="day">
                    <p class="weather-day">${dayNames[new Date(forecastData.list[i].dt_txt).getDay()]}</p>
                    <img src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png" alt="" class="weather-img">
                    <div class="day-temp">
                        <p class="max-temp">${forecastData.list[i].main.temp_max}</p>
                        <p class="min-temp">${forecastData.list[i].main.temp_min}</p>
                    </div>
                </div>
             `;
                }
            }
        }


    }, 700)
}
