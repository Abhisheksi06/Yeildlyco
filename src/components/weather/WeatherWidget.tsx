import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { motion } from 'motion/react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset,
  AlertTriangle,
  RefreshCw,
  MapPin
} from 'lucide-react';
import { WeatherService, WeatherData, WeatherForecast } from '../../services/weatherService';

interface WeatherWidgetProps {
  location?: { lat: number; lng: number };
  compact?: boolean;
}

export function WeatherWidget({ location, compact = false }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const weatherService = WeatherService.getInstance();

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const [weather, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(location?.lat, location?.lng),
        weatherService.getWeatherForecast(location?.lat, location?.lng)
      ]);
      
      setWeatherData(weather);
      setForecast(forecastData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherAnimation = () => {
    if (!weatherData) return {};
    
    const icon = weatherData.icon;
    if (icon.includes('01')) { // Clear sky
      return {
        animate: { rotate: [0, 360] },
        transition: { duration: 20, repeat: Infinity, ease: "linear" }
      };
    } else if (icon.includes('09') || icon.includes('10')) { // Rain
      return {
        animate: { y: [0, 5, 0] },
        transition: { duration: 1, repeat: Infinity }
      };
    } else if (icon.includes('11')) { // Thunderstorm
      return {
        animate: { scale: [1, 1.1, 1] },
        transition: { duration: 0.5, repeat: Infinity }
      };
    }
    return {};
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return 'text-red-500';
    if (temp >= 25) return 'text-orange-500';
    if (temp >= 15) return 'text-yellow-500';
    if (temp >= 5) return 'text-blue-500';
    return 'text-blue-600';
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity >= 80) return 'text-blue-600';
    if (humidity >= 60) return 'text-blue-500';
    if (humidity >= 40) return 'text-green-500';
    return 'text-yellow-500';
  };

  if (compact && weatherData) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="text-2xl"
                {...getWeatherAnimation()}
              >
                {weatherService.getWeatherIcon(weatherData.icon)}
              </motion.div>
              <div>
                <p className={`text-2xl ${getTemperatureColor(weatherData.temperature)}`}>
                  {weatherData.temperature}°C
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {weatherData.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchWeatherData}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Current Weather */}
      <Card className="bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-sky-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="w-5 h-5 text-blue-600" />
                <span>Current Weather</span>
              </CardTitle>
              <CardDescription className="flex items-center space-x-1 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{weatherData?.location || 'Fetching location...'}</span>
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchWeatherData}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {weatherData ? (
            <>
              {/* Main Weather Display */}
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-2"
                  {...getWeatherAnimation()}
                >
                  {weatherService.getWeatherIcon(weatherData.icon)}
                </motion.div>
                <h2 className={`text-4xl mb-2 ${getTemperatureColor(weatherData.temperature)}`}>
                  {weatherData.temperature}°C
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 capitalize">
                  {weatherData.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 text-center">
                  <Droplets className={`w-6 h-6 mx-auto mb-1 ${getHumidityColor(weatherData.humidity)}`} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
                  <p className="text-lg">{weatherData.humidity}%</p>
                  <Progress value={weatherData.humidity} className="h-1 mt-1" />
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 text-center">
                  <Wind className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</p>
                  <p className="text-lg">{weatherData.windSpeed} km/h</p>
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 text-center">
                  <Gauge className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
                  <p className="text-lg">{weatherData.pressure} hPa</p>
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 text-center">
                  <Eye className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Visibility</p>
                  <p className="text-lg">{weatherData.visibility} km</p>
                </div>
              </div>

              {/* Sun Times */}
              <div className="flex justify-between bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Sunrise className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sunrise</p>
                    <p className="text-lg text-amber-700 dark:text-amber-300">{weatherData.sunrise}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sunset className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sunset</p>
                    <p className="text-lg text-orange-700 dark:text-orange-300">{weatherData.sunset}</p>
                  </div>
                </div>
              </div>

              {/* Weather Alerts */}
              {weatherData.alerts && weatherData.alerts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span>Weather Alerts</span>
                  </h4>
                  {weatherData.alerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'extreme' ? 'bg-red-50 border-red-500 dark:bg-red-900/20' :
                      alert.severity === 'severe' ? 'bg-orange-50 border-orange-500 dark:bg-orange-900/20' :
                      'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20'
                    }`}>
                      <h5 className="text-sm text-gray-900 dark:text-gray-100">{alert.title}</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{alert.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Agricultural Advice */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="text-sm text-green-800 dark:text-green-300 mb-2">🌾 Agricultural Advice</h4>
                <div className="space-y-1">
                  {weatherService.getWeatherAdvice(weatherData).map((advice, index) => (
                    <p key={index} className="text-xs text-green-700 dark:text-green-400">
                      {advice}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm">5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {forecast.map((day, index) => (
                <motion.div
                  key={day.date}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      {weatherService.getWeatherIcon(day.icon)}
                    </span>
                    <div>
                      <p className="text-sm">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                        {day.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      <span className="text-gray-900 dark:text-gray-100">{day.temperature.max}°</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">{day.temperature.min}°</span>
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <Droplets className="w-3 h-3" />
                      <span>{day.precipitation}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}