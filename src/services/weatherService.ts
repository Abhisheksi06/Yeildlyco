// Weather Service for real-time weather data
import { OPENWEATHER_CONFIG } from '../config/api.config';

const WEATHER_API_KEY = OPENWEATHER_CONFIG.API_KEY;
const WEATHER_BASE_URL = OPENWEATHER_CONFIG.BASE_URL;

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  icon: string;
  alerts?: Array<{
    title: string;
    description: string;
    severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  }>;
}

export interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  precipitation: number;
}

// Mock weather data for demonstration (replace with real API calls)
export const mockWeatherData: WeatherData = {
  location: 'Delhi, India',
  temperature: 28,
  description: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  pressure: 1013,
  visibility: 10,
  uvIndex: 6,
  sunrise: '06:30 AM',
  sunset: '06:45 PM',
  icon: '02d',
  alerts: [
    {
      title: 'High Temperature Alert',
      description: 'Temperature expected to rise above 35°C tomorrow. Ensure adequate irrigation.',
      severity: 'moderate'
    }
  ]
};

export const mockForecastData: WeatherForecast[] = [
  {
    date: '2024-03-20',
    temperature: { min: 22, max: 30 },
    description: 'Sunny',
    icon: '01d',
    humidity: 60,
    precipitation: 0
  },
  {
    date: '2024-03-21',
    temperature: { min: 24, max: 32 },
    description: 'Partly Cloudy',
    icon: '02d',
    humidity: 65,
    precipitation: 10
  },
  {
    date: '2024-03-22',
    temperature: { min: 20, max: 28 },
    description: 'Light Rain',
    icon: '10d',
    humidity: 80,
    precipitation: 60
  },
  {
    date: '2024-03-23',
    temperature: { min: 19, max: 26 },
    description: 'Thunderstorm',
    icon: '11d',
    humidity: 85,
    precipitation: 80
  },
  {
    date: '2024-03-24',
    temperature: { min: 21, max: 29 },
    description: 'Partly Cloudy',
    icon: '02d',
    humidity: 70,
    precipitation: 20
  }
];

export class WeatherService {
  private static instance: WeatherService;
  
  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  async getCurrentWeather(lat?: number, lon?: number): Promise<WeatherData> {
    try {
      // For demonstration, return mock data
      // In production, make actual API call:
      /*
      const response = await fetch(
        `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      return this.transformWeatherData(data);
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock data with some randomization
      return {
        ...mockWeatherData,
        temperature: Math.round(mockWeatherData.temperature + (Math.random() - 0.5) * 10),
        humidity: Math.round(mockWeatherData.humidity + (Math.random() - 0.5) * 20),
        windSpeed: Math.round(mockWeatherData.windSpeed + (Math.random() - 0.5) * 8)
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return mockWeatherData;
    }
  }

  async getWeatherForecast(lat?: number, lon?: number): Promise<WeatherForecast[]> {
    try {
      // For demonstration, return mock data
      // In production, make actual API call:
      /*
      const response = await fetch(
        `${WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      return this.transformForecastData(data);
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return mockForecastData;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      return mockForecastData;
    }
  }

  async getWeatherAlerts(lat?: number, lon?: number): Promise<any[]> {
    try {
      // Mock alerts for demonstration
      return [
        {
          title: 'Heavy Rainfall Warning',
          description: 'Heavy rainfall expected in the next 24 hours. Protect crops and ensure proper drainage.',
          severity: 'moderate',
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      ];
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      return [];
    }
  }

  getWeatherIcon(iconCode: string): string {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  }

  getWeatherAdvice(weather: WeatherData): string[] {
    const advice: string[] = [];
    
    if (weather.temperature > 35) {
      advice.push('🌡️ High temperature detected. Increase irrigation frequency.');
    }
    
    if (weather.humidity > 80) {
      advice.push('💧 High humidity may increase disease risk. Monitor crops closely.');
    }
    
    if (weather.windSpeed > 20) {
      advice.push('💨 Strong winds detected. Secure loose farm structures.');
    }
    
    if (weather.alerts && weather.alerts.length > 0) {
      advice.push('⚠️ Weather alerts active. Check alerts section for details.');
    }
    
    return advice.length > 0 ? advice : ['✅ Current weather conditions are favorable for farming.'];
  }

  // Helper method to transform API response (for real implementation)
  private transformWeatherData(apiData: any): WeatherData {
    return {
      location: `${apiData.name}, ${apiData.sys.country}`,
      temperature: Math.round(apiData.main.temp),
      description: apiData.weather[0].description,
      humidity: apiData.main.humidity,
      windSpeed: Math.round(apiData.wind.speed * 3.6), // Convert m/s to km/h
      pressure: apiData.main.pressure,
      visibility: Math.round(apiData.visibility / 1000),
      uvIndex: 0, // UV Index requires separate API call
      sunrise: new Date(apiData.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(apiData.sys.sunset * 1000).toLocaleTimeString(),
      icon: apiData.weather[0].icon
    };
  }

  private transformForecastData(apiData: any): WeatherForecast[] {
    return apiData.list.slice(0, 5).map((item: any) => ({
      date: item.dt_txt.split(' ')[0],
      temperature: {
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max)
      },
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      precipitation: item.rain ? Math.round((item.rain['3h'] || 0) * 100) : 0
    }));
  }
}