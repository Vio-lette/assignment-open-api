import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
    private readonly apiKey = 'fccd5210b451194270e2b16791394d62'; // Replace with your OpenWeatherMap API key
    private readonly baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

    // Method to fetch weather by city name with detailed data
    async getWeatherByCity(city: string): Promise<any> {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    q: city, // City name
                    appid: this.apiKey, // Your API key
                    units: 'metric', // Temperature in Celsius
                },
            });

            const weatherData = response.data;

            // Extract required data
            const weatherDetails = {
                city: weatherData.name,
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description,
                humidity: weatherData.main.humidity,
                pressure: weatherData.main.pressure,
                windSpeed: weatherData.wind.speed,
                windDirection: weatherData.wind.deg,
                sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
                coordinates: {
                    latitude: weatherData.coord.lat,
                    longitude: weatherData.coord.lon,
                },
                icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`, // Weather icon URL
            };

            return weatherDetails;
        } catch (error) {
            throw new HttpException('Failed to fetch weather data', HttpStatus.BAD_REQUEST);
        }
    }
}
