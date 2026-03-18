/**
 * API Configuration for Yieldly
 * 
 * This file contains all API keys and configuration settings
 * Make sure to add your actual API keys before deploying to production
 */

// ========================================
// OPENWEATHER API CONFIGURATION
// ========================================
// Get your free API key at: https://openweathermap.org/api
// Steps to get API key:
// 1. Visit https://openweathermap.org/api
// 2. Click "Sign Up" and create a free account
// 3. Go to API keys section in your account
// 4. Copy your API key and paste it below
export const OPENWEATHER_CONFIG = {
  API_KEY: '88bf0103781e4dc9e95102188d133865',
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  
  // Default location (Delhi, India)
  DEFAULT_LOCATION: {
    lat: 28.6139,
    lon: 77.2090,
    name: 'Delhi, India'
  },
  
  // API settings
  UNITS: 'metric', // metric for Celsius, imperial for Fahrenheit
  LANGUAGE: 'en',
  
  // Cache settings
  CACHE_DURATION: 10 * 60 * 1000, // 10 minutes in milliseconds
};

// ========================================
// OTHER API CONFIGURATIONS
// ========================================

// Google Maps API Configuration
// Get your API key at: https://console.cloud.google.com/google/maps-apis
// Steps to get API key:
// 1. Visit https://console.cloud.google.com/
// 2. Create a new project or select existing project
// 3. Enable Maps JavaScript API, Geocoding API, and Places API
// 4. Go to "Credentials" and create an API key
// 5. Copy your API key and paste it below
export const GOOGLE_MAPS_CONFIG = {
  API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
  
  // Default map settings
  DEFAULT_CENTER: {
    lat: 28.6139,
    lng: 77.2090
  },
  DEFAULT_ZOOM: 12,
  
  // Map style (optional)
  MAP_ID: '', // For advanced map styling
  
  // Enabled APIs
  APIS: {
    maps: true,
    geocoding: true,
    places: true,
    directions: false
  }
};

// Placeholder for future APIs
export const SUPABASE_CONFIG = {
  URL: '',
  ANON_KEY: ''
};

// Placeholder for satellite imagery APIs (for NDVI monitoring)
// NDVI (Normalized Difference Vegetation Index) for crop health monitoring
// Common providers: Sentinel Hub, NASA EOSDIS, Planet Labs
export const SATELLITE_API_CONFIG = {
  API_KEY: 'fc9c4f860b8ad03909e4cf9a99ad04ed',
  BASE_URL: 'https://services.sentinel-hub.com/api/v1',
  
  // NDVI calculation parameters
  NDVI_SETTINGS: {
    // Vegetation health thresholds
    THRESHOLDS: {
      EXCELLENT: 0.8,  // > 0.8 = Excellent health
      GOOD: 0.6,       // 0.6-0.8 = Good health
      MODERATE: 0.4,   // 0.4-0.6 = Moderate health
      POOR: 0.2,       // 0.2-0.4 = Poor health
      // < 0.2 = Very poor/no vegetation
    },
    
    // Satellite data settings
    RESOLUTION: '10m', // 10 meter resolution
    CLOUD_COVERAGE: 20, // Maximum 20% cloud coverage
    TIME_RANGE: 30, // Days to look back for imagery
  },
  
  // Cache settings
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

// Export a function to check if APIs are configured
export const isApiConfigured = () => {
  return {
    openweather: OPENWEATHER_CONFIG.API_KEY !== 'YOUR_OPENWEATHER_API_KEY_HERE',
    googleMaps: GOOGLE_MAPS_CONFIG.API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
    supabase: SUPABASE_CONFIG.URL !== '' && SUPABASE_CONFIG.ANON_KEY !== '',
    satellite: SATELLITE_API_CONFIG.API_KEY !== ''
  };
};

// Export a helper to get configuration status
export const getConfigStatus = () => {
  const configured = isApiConfigured();
  
  let message = '';
  if (!configured.openweather) {
    message += '⚠️ OpenWeather API key not configured. ';
  }
  if (!configured.googleMaps) {
    message += '⚠️ Google Maps API key not configured. ';
  }
  if (!message) {
    message = '✅ All configured APIs are ready to use.';
  }
  
  return {
    configured,
    message,
    needsSetup: Object.values(configured).some(val => !val)
  };
};