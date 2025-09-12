export const getWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=GYF63P52G9MSB9RPDQJGURN3H`
    );
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    const result = await response.json();
    const processedResult = processWeatherData(result);
    return processedResult;
  } catch (error) {
    throw new Error(error.message);
  }
};

const processWeatherData = (data) => {
  const necessaryInfo = [
    "datetime",
    "temp",
    "feelslike",
    "humidity",
    "conditions",
    "icon",
    "precipprob",
    "windspeed",
    "winddir",
    "sunrise",
    "sunset",
    "uvindex",
  ];
  const currentWeather = {};
  data.currentConditions.forEach((info) => {
    if (necessaryInfo.includes(info)) {
      currentWeather[info] = data.currentConditions[info];
    }
  });
  return {
    location: data.resolvedAddress,
    timezone: data.timezone,
    description: data.description,
    currentWeather: currentWeather,
    forecast: data.days,
  };
};
