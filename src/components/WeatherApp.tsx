import { useState, useEffect } from "react";
import "./WeatherApp.css";
import { getWeatherByCity } from "../services/weatherService";
import type { WeatherData } from "../services/weatherService";

export interface WeatherAppProps {
  city?: string;
}

const WeatherApp = ({ city: initialCity }: WeatherAppProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(initialCity || "");

  const fetchWeather = async (searchCity: string) => {
    if (!searchCity.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(searchCity);
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Oops, something went wrong"
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCity) {
      setInputValue(initialCity);
      fetchWeather(initialCity);
    }
  }, [initialCity]);

  const getWeatherEmoji = (weatherCondition?: string): string => {
    switch (weatherCondition?.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
      case "drizzle":
        return "🌧️";
      case "thunderstorm":
        return "⛈️";
      case "snow":
        return "❄️";
      case "mist":
      case "fog":
        return "🌫️";
      default:
        return "🌤️";
    }
  };

  const formatDate = (): string => {
    return new Date().toLocaleDateString("en-EN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getWeatherClass = (description?: string): string => {
    const condition = description?.toLowerCase() || "";
    if (condition.includes("clear")) return "clear";
    if (condition.includes("cloud")) return "clouds";
    if (condition.includes("rain") || condition.includes("drizzle"))
      return "rain";
    if (condition.includes("thunder")) return "thunderstorm";
    if (condition.includes("snow")) return "snow";
    if (condition.includes("mist") || condition.includes("fog")) return "mist";
    return "default";
  };

  return (
    <div className={`weather-card ${getWeatherClass(weather?.description)}`}>
      {loading && <p className="loading">Laden...</p>}

      {error && <p className="error">{error}</p>}

      {weather && !loading && (
        <>
          <p className="weather-date">{formatDate()}</p>

          <h1 className="weather-city">{inputValue}</h1>

          <div className="weather-icon-container">
            <span className="weather-emoji">
              {getWeatherEmoji(weather.description)}
            </span>
            <p className="weather-description">{weather.description}</p>
          </div>

          <h2 className="weather-temp">{Math.round(weather.temp)}°C</h2>

          <div className="weather-details">
            <div className="weather-detail">
              <p className="weather-detail-label">Sunrise</p>
              <p className="weather-detail-value">
                {weather.sunrise}
              </p>
            </div>
            <div className="weather-detail">
              <p className="weather-detail-label">Sunset</p>
              <p className="weather-detail-value">{weather.sunset}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
