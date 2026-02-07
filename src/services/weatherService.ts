const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEOCODING_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
}

export const getCoordinates = async (
  cityName: string
): Promise<Coordinates> => {
  try {
    const response = await fetch(
      `${GEOCODING_URL}?q=${encodeURIComponent(
        cityName
      )}&limit=1&appid=${API_KEY}`
    );

    console.log("getCoordinates Response:", response);
    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data: Coordinates[] = await response.json();

    if (data.length === 0) {
      throw new Error("Coordinates not found");
    }

    return data[0];
  } catch (error) {
    console.error("getCoordinates Error:", error);
    throw error;
  }
};

export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    );

    if (!response.ok) {
      throw new Error("Weather could not be fetched");
    }

    return response.json();
  } catch (error) {
    console.error("getWeatherByCoords Error:", error);
    throw error;
  }
};

export const getWeatherByCity = async (
  cityName: string
): Promise<WeatherData> => {
  try {
    const coords = await getCoordinates(cityName);
    const weather = await getWeatherByCoords(coords.lat, coords.lon);

    return weather;
  } catch (error) {
    console.error("getWeatherByCity Error:", error);
    throw error;
  }
};

// export const getWeatherByCity = async (): //cityName: string
// Promise<WeatherData> => {
//   return {
//     temp: 18,
//     feels_like: 16,
//     humidity: 65,
//     description: "Clouds",
//   };
// };
