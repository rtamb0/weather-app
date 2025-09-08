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
  return {
    location: data.resolvedAddress,
    timezone: data.timezone,
    description: data.description,
    currentWeather: data.currentConditions,
    forecast: data.days,
  };
};
