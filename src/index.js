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

function formatDay(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}`;
}
function searchCity(city) {
  let apiKey = "c60106tff65a6314cc5047o4d15bbc2a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiURL).then(updateWeather);
  axios.get(forecastURL).then(updateForecast);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function updateForecast(response) {
  let days = response.data.daily;
  console.log(days);
  let forecastHTML = "";

  days.slice(1, 6).forEach(function (day) {
    let day_of_week = formatDay(new Date(day.time * 1000));
    let icon = `<img src="${day.condition.icon_url}" class="forecast-icon" />`;
    let high = Math.round(day.temperature.maximum);
    let low = Math.round(day.temperature.minimum);

    forecastHTML += `
        <div class="forecast-day">
        <div class="forecast-date">${day_of_week}</div>
        <div class="forecast-icon">${icon}</div>
        <div class="forecast-temperature">
            <strong><span class="high">${high}°</span></strong
            ><span class="low"> ${low}°</span>
        </div>
        </div>
        `;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHTML;
}

searchCity("Paris");
