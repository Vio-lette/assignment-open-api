import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
    private readonly apiKey = 'fccd5210b451194270e2b16791394d62'; // Replace with your OpenWeatherMap API key
    private readonly baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

    // Method to fetch weather by city name
    async getWeatherByCity(city: string): Promise<any> {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    q: city, // City name
                    appid: this.apiKey, // Your API key
                    units: 'metric', // To get temperature in Celsius
                },
            });
            return response.data;
        } catch (error) {
            throw new HttpException('Failed to fetch weather data', HttpStatus.BAD_REQUEST);
        }
    }
}
