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


function showTemp(response) {
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector("#temp").innerHTML = Math.round(
      response.data.main.temp
   );
   document.querySelector("#description").innerHTML = response.data.weather[0].main;
   humidityElement.innerHTML = response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
  
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
   temperatureElement.innerHTML = 66;
}

function changeToCelsius(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temp");
   temperatureElement.innerHTML = 19;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);




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


