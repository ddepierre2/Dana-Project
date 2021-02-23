function displayTemperature(response){
console.log(response.data);
let temperatureElement = document.querySelector("#now-temp");
let cityElement = document.querySelector("#searched-city");
let weatherDescriptionElement = document.querySelector("#now-weather-description")
let humidityElement = document.querySelector("#now-humidity");
let windSpeedElement = document.querySelector("#now-wind-speed");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
humidityElement.innerHTML = response.data.main.humidity;
windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
weatherDescriptionElement.innerHTML = response.data.weather[0].description;
}

let apiKey = "ed8ab9018735ed237ff0af3c6f9509f3"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Laval&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);















let now = new Date();
function formatDate(date) {
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

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
  return formattedDate;
}

let todaysDate = document.querySelector("#current-date");
todaysDate.innerHTML = formatDate(now);

function formatTime(time) {
  let currentHour = time.getHours();
  let currentMinute = time.getMinutes();

  let formattedTime = `${currentHour}:${currentMinute}`;
  return formattedTime;
}

let todaysTime = document.querySelector("#current-time");
todaysTime.innerHTML = formatTime(now);


