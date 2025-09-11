import "normalize.css";
import "./style.css";
import { getWeatherData } from "./api";

const elements = {
  locationInput: document.querySelector("#locationInput"),
  searchButton: document.querySelector("#searchButton"),
  infoWrapper: document.querySelector("#displayInfo"),
};

const clearInfoWrapper = () => {
  while (elements.infoWrapper.hasChildNodes()) {
    const lis = elements.infoWrapper.childNodes;
    for (const li of lis) {
      elements.infoWrapper.removeChild(li);
    }
  }
};

const showLocationWeather = (location) => {
  getWeatherData(location)
    .then((result) => {
      clearInfoWrapper();
      for (const info in result) {
        const li = document.createElement("li");
        li.textContent = result[info];
        elements.infoWrapper.appendChild(li);
      }
    })
    .catch((error) => {
      clearInfoWrapper();
      console.log(error);
      const li = document.createElement("li");
      li.textContent = error.message;
      elements.infoWrapper.appendChild(li);
    });
};

elements.searchButton.addEventListener("click", () => {
  const value = elements.locationInput.value;
  if (value) {
    showLocationWeather(value);
  }
});
