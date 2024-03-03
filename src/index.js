function updateWeather(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#weather-app-city");
  let conditionDescription = document.querySelector("#condition-description");
  let condition = response.data.condition;
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentDate = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  let currentIcon = document.querySelector("#icon");

  currentIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon-image" />`;
  currentTemperature.innerHTML = Math.round(temperature);
  city.innerHTML = response.data.city;
  conditionDescription.innerHTML = condition.description;
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentWind.innerHTML = `${response.data.wind.speed}km/h`;
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

function displayForecast() {
  // insert loop of forecast days of the week, icons, and temperature (high and low)
  let days = ["Mon", "Tues", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML += `
        <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class="forecast-icon">☁️</div>
        <div class="forecast-temperature">
            <strong><span class="high">19°</span></strong
            ><span class="low"> 16°</span>
        </div>
        </div>
        `;
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHTML;
}

searchCity("Paris");
displayForecast();
