async function getWeather(e) {
    e.preventDefault();

    const keyword = document.querySelector("#keyword").value;
    const apiKey = "0ee82ee6fda955a1527443dccdcd8c59";

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=${apiKey}&units=metric`
    );
    const weatherData = await response.json();
    console.log(weatherData);
}
