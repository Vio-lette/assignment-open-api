import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    // Endpoint to get weather by city
    @Get('city')
    async getWeatherByCity(@Query('city') city: string) {
        if (!city) {
            return {
                message: 'City is required',
            };
        }

        const weatherData = await this.weatherService.getWeatherByCity(city);
        return {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            weather: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
        };
    }
}
    