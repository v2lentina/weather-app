const API_KEY = import.meta.env.VITE_WEATHERBIT_API_KEY;
const WEATHER_URL = "https://api.weatherbit.io/v2.0/current";

export interface WeatherData {
  temp: number;
  sunrise: string;
  sunset: string;
  description: string;
  cityName?: string;
  windSpeed?: number;
}

export const getWeatherByCity = async (
  cityName: string
): Promise<WeatherData> => {
  try {
    console.log("Fetching weather for:", cityName);

    const response = await fetch(
      `${WEATHER_URL}?city=${encodeURIComponent(
        cityName
      )}&key=${API_KEY}&units=M`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`Weather fetch failed: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data[0];

    console.log("Weather data:", data);

    return {
      temp: data.temp,
      sunrise: data.sunrise,
      sunset: data.sunset,
      description: data.weather.description,
      cityName: data.city_name,
      windSpeed: data.wind_spd,
    };
  } catch (error) {
    console.error("getWeatherByCity Error:", error);
    throw error;
  }
};
