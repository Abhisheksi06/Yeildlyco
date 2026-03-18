// Location Service for real-time location and geolocation data
export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  district: string;
}

export interface NearbyPlace {
  name: string;
  type: string;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export class LocationService {
  private static instance: LocationService;
  
  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  // Get current location using browser's geolocation API
  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get address from coordinates using reverse geocoding
            const locationData = await this.reverseGeocode(latitude, longitude);
            resolve(locationData);
          } catch (error) {
            // Fallback to mock data if geocoding fails
            resolve({
              latitude,
              longitude,
              address: 'Mock Address, Mock City',
              city: 'Delhi',
              state: 'Delhi',
              country: 'India',
              pincode: '110001',
              district: 'Central Delhi'
            });
          }
        },
        (error) => {
          // Return mock location data if geolocation fails
          resolve({
            latitude: 28.6139,
            longitude: 77.2090,
            address: 'New Delhi, India',
            city: 'New Delhi',
            state: 'Delhi',
            country: 'India',
            pincode: '110001',
            district: 'Central Delhi'
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  // Reverse geocoding to get address from coordinates
  async reverseGeocode(lat: number, lng: number): Promise<LocationData> {
    try {
      // For demonstration, return mock data
      // In production, use a geocoding service like Google Maps API or OpenStreetMap
      /*
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=YOUR_API_KEY`
      );
      const data = await response.json();
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock location data based on coordinates
      const mockLocations = [
        {
          latitude: lat,
          longitude: lng,
          address: 'Farm Road, Rural Area',
          city: 'Gurgaon',
          state: 'Haryana',
          country: 'India',
          pincode: '122001',
          district: 'Gurgaon'
        },
        {
          latitude: lat,
          longitude: lng,
          address: 'Agricultural Land, Village',
          city: 'Faridabad',
          state: 'Haryana',
          country: 'India',
          pincode: '121001',
          district: 'Faridabad'
        }
      ];
      
      return mockLocations[Math.floor(Math.random() * mockLocations.length)];
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      throw error;
    }
  }

  // Forward geocoding to get coordinates from address
  async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    try {
      // For demonstration, return mock coordinates
      // In production, use a geocoding service
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock coordinates for common Indian cities
      const mockCoordinates: { [key: string]: { lat: number; lng: number } } = {
        'delhi': { lat: 28.6139, lng: 77.2090 },
        'mumbai': { lat: 19.0760, lng: 72.8777 },
        'bangalore': { lat: 12.9716, lng: 77.5946 },
        'chennai': { lat: 13.0827, lng: 80.2707 },
        'kolkata': { lat: 22.5726, lng: 88.3639 },
        'hyderabad': { lat: 17.3850, lng: 78.4867 },
        'pune': { lat: 18.5204, lng: 73.8567 },
        'ahmedabad': { lat: 23.0225, lng: 72.5714 }
      };
      
      const city = address.toLowerCase().split(',')[0].trim();
      return mockCoordinates[city] || { lat: 28.6139, lng: 77.2090 };
    } catch (error) {
      console.error('Error in geocoding:', error);
      return { lat: 28.6139, lng: 77.2090 }; // Default to Delhi
    }
  }

  // Get nearby agricultural facilities
  async getNearbyFacilities(lat: number, lng: number): Promise<NearbyPlace[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Mock nearby facilities
      const facilities: NearbyPlace[] = [
        {
          name: 'Agricultural Supply Store',
          type: 'supply_store',
          distance: 2.5,
          coordinates: { lat: lat + 0.01, lng: lng + 0.01 }
        },
        {
          name: 'Krishi Vigyan Kendra',
          type: 'research_center',
          distance: 5.2,
          coordinates: { lat: lat + 0.02, lng: lng - 0.01 }
        },
        {
          name: 'Fertilizer Depot',
          type: 'fertilizer_store',
          distance: 3.8,
          coordinates: { lat: lat - 0.015, lng: lng + 0.02 }
        },
        {
          name: 'Veterinary Clinic',
          type: 'veterinary',
          distance: 4.1,
          coordinates: { lat: lat + 0.018, lng: lng - 0.015 }
        },
        {
          name: 'Agricultural Market',
          type: 'market',
          distance: 6.3,
          coordinates: { lat: lat - 0.025, lng: lng - 0.02 }
        }
      ];
      
      return facilities;
    } catch (error) {
      console.error('Error fetching nearby facilities:', error);
      return [];
    }
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private toRadians(degree: number): number {
    return degree * (Math.PI / 180);
  }

  // Get location suggestions for autocomplete
  async getLocationSuggestions(query: string): Promise<string[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Mock location suggestions
      const suggestions = [
        'Delhi, India',
        'Mumbai, Maharashtra',
        'Bangalore, Karnataka',
        'Chennai, Tamil Nadu',
        'Kolkata, West Bengal',
        'Hyderabad, Telangana',
        'Pune, Maharashtra',
        'Ahmedabad, Gujarat',
        'Jaipur, Rajasthan',
        'Lucknow, Uttar Pradesh'
      ];
      
      return suggestions.filter(location => 
        location.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      return [];
    }
  }

  // Get soil and climate data for location
  async getLocationAgriData(lat: number, lng: number): Promise<any> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock agricultural data for the location
      return {
        soilType: 'Alluvial Soil',
        soilPH: 6.8,
        climateZone: 'Semi-Arid',
        averageRainfall: 650, // mm per year
        averageTemperature: { min: 15, max: 35 }, // Celsius
        growingSeason: 'Kharif and Rabi',
        recommendedCrops: ['Wheat', 'Rice', 'Sugarcane', 'Cotton', 'Maize'],
        irrigationSource: 'Canal and Tube well',
        majorThreats: ['Drought', 'Flood', 'Pest attacks']
      };
    } catch (error) {
      console.error('Error fetching agricultural data:', error);
      return null;
    }
  }
}