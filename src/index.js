function updateWeather(response) {
  console.log(response.data);
  let temperature = response.data.temperature.current;
  let currentTemperature = document.querySelector("#weather-app-temperature");
  currentTemperature.innerHTML = Math.round(temperature);
  let city = document.querySelector("#weather-app-city");
  city.innerHTML = response.data.city;
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
