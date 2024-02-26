function updateWeather(response) {
  // update weather details:
  console.log(response.data);
  let temperature = response.data.temperature.current;
  // update temperature
  let currentTemperature = document.querySelector("#weather-app-temperature");
  currentTemperature.innerHTML = Math.round(temperature);

  // update city
  let city = document.querySelector("#weather-app-city");
  city.innerHTML = response.data.city;

  // update condition
  let conditionDescription = document.querySelector("#condition-description");
  conditionDescription.innerHTML = response.data.condition.description;

  // update humidity & wind
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentWind.innerHTML = `${response.data.wind.speed}km/h`;

  // update date
  let currentDate = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  currentDate.innerHTML = formatDate(date);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "c60106tff65a6314cc5047o4d15bbc2a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
