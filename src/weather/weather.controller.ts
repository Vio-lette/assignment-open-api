import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    // Endpoint to get weather by city with detailed information
    @Get('city')
    async getWeatherByCity(@Query('city') city: string) {
        if (!city) {
            return {
                message: 'City is required',
            };
        }

        const weatherData = await this.weatherService.getWeatherByCity(city);
        return {
            city: weatherData.city,
            temperature: weatherData.temperature,
            description: weatherData.description,
            humidity: weatherData.humidity,
            pressure: weatherData.pressure,
            windSpeed: weatherData.windSpeed,
            windDirection: weatherData.windDirection,
            sunrise: weatherData.sunrise,
            sunset: weatherData.sunset,
            coordinates: weatherData.coordinates,
            icon: weatherData.icon,
        };
    }
}
    