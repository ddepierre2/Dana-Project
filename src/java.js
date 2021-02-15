function showTemperature(response) {
  let citySearch = document.querySelector("#searched-city");
  citySearch.innerHTML = `${response.data.name}`;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#now-temp");
  currentTemperature.innerHTML = `${temperature}`;
}
function showCity(city) {
  let apiKey = "ed8ab9018735ed237ff0af3c6f9509f3";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#location-search");
  showCity(searchInput.value);
}
let form = document.querySelector("#location-form");
form.addEventListener("submit", searchCity);


function findLocation (position) {
let apiKey = "ed8ab9018735ed237ff0af3c6f9509f3";
let lat = position.coords.latitude;
let lon = position.coords.longitude;
let unit = `metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(showTemperature);
}

function findCurrentPosition(){
navigator.geolocation.getCurrentPosition(findLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentPosition);










































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


