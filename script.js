//URL::forceRootUrl(Config::get('app.url'));
//    if (str_contains(Config::get('app.url'), 'https://')) {
 //       URL::forceScheme('https');
 //   }

const 
    search = document.getElementById("keyword"),
    submitBtn = document.getElementById("submit-button"),
    cityName = document.getElementById("city"),
    showDate = document.getElementById("date"),
    showTime = document.getElementById("time"),
    showWeather = document.querySelector("#weather h1"),
    weatherImg = document.querySelector("#weather div img"),
    weatherPic = document.querySelector("#weather div"),
    temperature = document.querySelector("#temperature"),
    feelsLike = document.querySelector("#feels-like"),
    humidity = document.querySelector("#humidity span"),
    precipation = document.querySelector("#precipation span"),
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
    const keyword = document.querySelector("#keyword").value;
    e.preventDefault();
    console.log(keyword);
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=179428b368194d318d421509232011&q=${keyword}`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);

    const city = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    const country = weatherData.location.country;

    cityName.innerHTML = city + ", <span>" + country + "</span>";

    showWeather.innerText = weatherData.current.condition.text;
    weatherImg.src = weatherData.current.condition.icon;

    temperature.innerHTML = weatherData.current.temp_c + "&deg;C";
    feelsLike.innerHTML = "Feels like: " + weatherData.current.feelslike_c + "&deg;C";
  
    weatherPic.appendChild(weatherImg);

    humidity.innerHTML = weatherData.current.humidity + "&#37; ";
    precipation.innerHTML = weatherData.current.precip_in + " inches";
    windSpeed.innerText = weatherData.current.wind_mph    + " mph";
};

submitBtn.addEventListener("click", getWeather);

