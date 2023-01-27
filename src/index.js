function showDate(date) {
   let currentHours = date.getHours();
   if (currentHours < 10) {
      currentHours = `0${currentHours}`;
   }
   let currentMinutes = date.getMinutes();
   if (currentMinutes < 10) {
      currentMinutes = `0${currentMinutes}`;
   }
   let dayIndex = date.getDay();
   let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];
   let day = days[dayIndex];
   return `${day} ${currentHours}:${currentMinutes}`;
}

let currentDate = document.querySelector("#currentDay");
let currentTime = new Date();
currentDate.innerHTML = showDate(currentTime);

function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let day = date.getDay();
   
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   return days[day];
   }

function displayForecast(response) {
   let forecast = response.data.daily;
   let forecastElement = document.querySelector("#forecast");
   let forecastHTML = `<div class="row">`;
  
   forecast.forEach(function(forecastDay, index) { 
       if (index < 6) {
   forecastHTML = forecastHTML + `
   
   <div class="col-2">
       <div class="weather-forecast-date">
       ${formatDay(forecastDay.dt)}
   </div>
   <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="80">
   <div class="weather-forecast-temperature">
       <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
   <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span> 
</div>
</div>
`;}
       }
)
       
  
   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;

   
}

function getForecast(coordinates) {

let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}



function showTemp(response) {
   console.log(response.data);
   let temperatureElement = document.querySelector("#temp");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let iconElement = document.querySelector("#current-weather-icon");
   document.querySelector("#city").innerHTML = response.data.name;
   // document.querySelector("#temp").innerHTML = Math.round(
   //    response.data.main.temp
   // );
   document.querySelector("#description").innerHTML = response.data.weather[0].main;
   celsiusTemperature = Math.round(response.data.main.temp);
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
   humidityElement.innerHTML = response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", response.data.weather[0].description);

   getForecast(response.data.coord);
}


function search(city) {
   let apiKey = "a78425defdca5077e5f0280ae5c6e2db";
   let units = "metric";
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
   axios.get(url).then(showTemp);
}


function showCity(event) {
   event.preventDefault();
   let city = document.querySelector("#city-input").value;
   search(city);
   document.querySelector("#city-input").value = ("Enter a city")
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", showCity);


function changeToFahrenheit(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temp");
   celsiusLink.classList.remove("active");
   fahrenheitLink.classList.add("active");
   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 +32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsius(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temp");
   celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");  
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

search("Dnipro");
displayForecast();


function handlePosition(position) {
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiKey = "a78425defdca5077e5f0280ae5c6e2db";
let units = "metric";
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(url).then(showTemp);
 }

function getCurrentLocation(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);


