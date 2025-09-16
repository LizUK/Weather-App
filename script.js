const 
    search = document.getElementById("keyword"),
    submitBtn = document.getElementById("submit-button"),
    form = document.querySelector("#search form"),
    cityName = document.getElementById("city"),
    showDate = document.getElementById("date"),
    showTime = document.getElementById("time"),
    showWeather = document.querySelector("#weather h1"),
    weatherImg = document.querySelector("#weather div img"),
    weatherPic = document.querySelector("#weather div"),
    temperature = document.querySelector("#temperature"),
    feelsLike = document.querySelector("#feels-like"),
    humidity = document.querySelector("#humidity span"),
    precipitation = document.querySelector("#precipitation span"),
    windSpeed = document.querySelector("#wind-speed span");

function getTime() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var date = new Date().toLocaleDateString("en-IN");
    var today = new Date();

    let day = weekday[today.getDay()];
    var h = today.getHours();
    var m = today.getMinutes();

    showDate.innerHTML = day + " " + date;
    showTime.innerHTML = h + ":" + m;
}
setInterval(getTime, 1000);

async function getWeather(e) {

    e.preventDefault();
    
    const keyword = document.querySelector("#keyword").value;
    const apiKey = "0ee82ee6fda955a1527443dccdcd8c59";
    
    console.log(keyword);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=${apiKey}&units=metric`, { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);

    //const city = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    //const country = weatherData.location.country;

    cityName.innerHTML = `${weatherData.name}, <span>${weatherData.sys.country}</span>`;

    // weather description + icon
    showWeather.innerText = weatherData.weather[0].description;
    weatherImg.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    // temperature values
    temperature.innerHTML = `${weatherData.main.temp}&deg;C`;
    feelsLike.innerHTML = `Feels like: ${weatherData.main.feels_like}&deg;C`;

    // humidity + wind
    humidity.innerHTML = `${weatherData.main.humidity}&#37;`;
    windSpeed.innerText = `${weatherData.wind.speed} m/s`;

    // --- precipitation (rain/snow if available) ---
        let precipitation = "0 mm";
        if (weatherData.rain && weatherData.rain["1h"]) {
            precipitation = `${weatherData.rain["1h"]} mm (last 1h)`;
        } else if (weatherData.snow && weatherData.snow["1h"]) {
            precipitation = `${weatherData.snow["1h"]} mm (last 1h)`;
        }
        precipation.innerHTML = precipitation;
    }
  
    weatherPic.appendChild(weatherImg);

};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather(e);
});

console.log("CHANGED2");













