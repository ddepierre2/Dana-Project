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
 let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
let currentDay = days[date.getDay()];
let currentDate = date.getDate();
let currentMonth = months[date.getMonth()];

let currentYear = date.getFullYear();
let hours = date.getHours();
if (hours <10){
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes <10){
  minutes = `0${minutes}`;
}

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${hours}:${minutes}`;
  return formattedDate;

}

function displayTemperature(response){
console.log(response.data);
let temperatureElement = document.querySelector("#now-temp");
let cityElement = document.querySelector("#searched-city");
let weatherDescriptionElement = document.querySelector("#now-weather-description")
let humidityElement = document.querySelector("#now-humidity");
let windSpeedElement = document.querySelector("#now-wind-speed");
let dateElement = document.querySelector("#current-date");
let iconElement = document.querySelector("#weather-icon");
let sunriseElement = document.querySelector("#sunrise");
let sunsetElement = document.querySelector("#sunset");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
humidityElement.innerHTML = response.data.main.humidity;
windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
weatherDescriptionElement.innerHTML = response.data.weather[0].description;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
sunriseElement.innerHTML = formatDate(response.data.sys.sunrise * 1000);
sunsetElement.innerHTML = formatDate(response.data.sys.sunset * 1000);
}

let apiKey = "ed8ab9018735ed237ff0af3c6f9509f3";
let city = "Montreal";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);


