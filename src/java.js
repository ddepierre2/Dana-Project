function formatDate (timestamp){
let date = new Date(timestamp);
 let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let currentDay = days[date.getDay()];
let hours = date.getHours();
if (hours <10){
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes <10){
  minutes = `0${minutes}`;
}
return `${currentDay} ${hours}:${minutes}`;
}



function displayTemperature(response){
console.log(response.data);
let temperatureElement = document.querySelector("#now-temp");
let cityElement = document.querySelector("#searched-city");
let weatherDescriptionElement = document.querySelector("#now-weather-description")
let humidityElement = document.querySelector("#now-humidity");
let windSpeedElement = document.querySelector("#now-wind-speed");
let dateElement = document.querySelector("#current-date");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
humidityElement.innerHTML = response.data.main.humidity;
windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
weatherDescriptionElement.innerHTML = response.data.weather[0].description;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "ed8ab9018735ed237ff0af3c6f9509f3"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Laval&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);


