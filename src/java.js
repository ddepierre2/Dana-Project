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

return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours <10){
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes <10){
  minutes = `0${minutes}`;
}
return `${hours}:${minutes}`;
}

function displayTemperature(response){
let temperatureElement = document.querySelector("#now-temp");
let cityElement = document.querySelector("#searched-city");
let weatherDescriptionElement = document.querySelector("#now-weather-description")
let humidityElement = document.querySelector("#now-humidity");
let windSpeedElement = document.querySelector("#now-wind-speed");
let dateElement = document.querySelector("#current-date");
let iconElement = document.querySelector("#weather-icon");
let sunriseElement = document.querySelector("#sunrise");
let sunsetElement = document.querySelector("#sunset");

celsiusTemperature = response.data.main.temp;

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
humidityElement.innerHTML = response.data.main.humidity;
windSpeedElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
weatherDescriptionElement.innerHTML = response.data.weather[0].description;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
sunriseElement.innerHTML = formatHours(response.data.sys.sunrise * 1000);
sunsetElement.innerHTML = formatHours(response.data.sys.sunset * 1000);
}

function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="card col transparency">
        <h3>
        ${formatHours(forecast.dt * 1000)}
        </h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          alt="icon"  />
        <div class="weather-forecast-temperature">
          <strong>${Math.round(forecast.main.temp_max)}°C
          </strong> | ${Math.round(forecast.main.temp_min)}°C
        </div>
      </div>
  `;
    }
    
}

function search(city){
let apiKey = "ed8ab9018735ed237ff0af3c6f9509f3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function searchCity(event){
  event.preventDefault();
  let searchInput = document.querySelector("#location-search");
  search(searchInput.value);
}

function showFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#now-temp");
  celsiusSearch.classList.remove("active");
  fahrenheitSearch.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9)/5 +32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#now-temp");
  fahrenheitSearch.classList.remove("active");
  celsiusSearch.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function findLocation (position) {
let apiKey = "ed8ab9018735ed237ff0af3c6f9509f3";
let lat = position.coords.latitude;
let lon = position.coords.longitude;
let unit = `metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayTemperature);
}

function findCurrentPosition(){
navigator.geolocation.getCurrentPosition(findLocation);
}


let celsiusTemperature = null;


let form = document.querySelector("#location-form");
form.addEventListener("submit", searchCity);

let fahrenheitSearch = document.querySelector("#fahrenheit");
fahrenheitSearch.addEventListener("click", showFahrenheitTemp);


let celsiusSearch = document.querySelector("#celsius");
celsiusSearch.addEventListener("click", showCelsiusTemp);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentPosition);

search ("Laval");