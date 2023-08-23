let currentDate = document.querySelector("#current-date");
let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes().toString().padStart(2, "0");
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
currentDate.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;

function searchedCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input").value;
  let apiKey = "fcb0c227d832d0bd1bb3bf0a58cfe6a9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  console.log(response.data);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let displayTemp = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  displayTemp.innerHTML = `${temperature}°C`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `${response.data.main.pressure} mb`;

  function toFahrenheit() {
    let fahrenheit = Math.round(temperature * 1.8 + 32);
    displayTemp.innerHTML = `${fahrenheit}°F`;
  }
  let fahrenheitButton = document.querySelector("#btnradio3");
  fahrenheitButton.addEventListener("click", toFahrenheit);

  function toCelsius() {
    displayTemp.innerHTML = `${temperature}°C`;
  }
  let celsiusButton = document.querySelector("#btnradio1");
  celsiusButton.addEventListener("click", toCelsius);
}
let findCity = document.querySelector("#navigation");
findCity.addEventListener("submit", searchedCity);

function gps() {
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "fcb0c227d832d0bd1bb3bf0a58cfe6a9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", gps);
