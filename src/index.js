import "normalize.css";
import "./style.css";
import { getWeatherData } from "./api";

const elements = {
  locationInput: document.querySelector("#locationInput"),
  searchButton: document.querySelector("#searchButton"),
  locationName: document.querySelector("#locationName"),
  currentWeather: document.querySelector("#currentWeather"),
  currentTemp: document.querySelector("#currentTemp"),
  feelsLike: document.querySelector("#feelsLike"),
  forecastWrapper: document.querySelector("#forecastWrapper"),
};

const clearInfoWrapper = () => {
  while (elements.infoWrapper.hasChildNodes()) {
    const lis = elements.infoWrapper.childNodes;
    for (const li of lis) {
      elements.infoWrapper.removeChild(li);
    }
  }
};

const appendCurrentWeatherInfo = (info) => {
  elements.locationName.textContent = info.location;
  elements.currentWeather.textContent = info.currentWeather.conditions;
  elements.currentTemp.textContent = info.currentWeather.temp;
  elements.feelsLike.textContent = info.currentWeather.feelslike;
};

const showLocationWeather = (location) => {
  getWeatherData(location)
    .then((result) => {
      appendCurrentWeatherInfo(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

elements.searchButton.addEventListener("click", () => {
  const value = elements.locationInput.value;
  if (value) {
    showLocationWeather(value);
  }
});
