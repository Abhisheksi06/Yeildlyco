import React, { useState } from 'react';
import { ArrowLeft, Sprout, MapPin, Thermometer, CloudRain, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface PredictionCardProps {
  onPredictionComplete?: () => void;
}

export function PredictionCard({ onPredictionComplete }: PredictionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [formData, setFormData] = useState({
    crop: '',
    soilType: '',
    location: '',
    rainfall: '',
    temperature: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API response
      const mockResponse = {
        rf_prediction: 24.5,
        xgb_prediction: 23.8,
        confidence: 92,
        regionalAverage: 21.2,
        recommendations: [
          "Use 15% more fertilizer for ~+7% yield increase.",
          "Rainfall is sufficient. Irrigate in early mornings to save water.",
          "Optimal sowing time for wheat is Nov–Dec."
        ],
        scenarios: [
          {"name": "Rainfall -20%", "rf_prediction": 22.1, "xgb_prediction": 21.8},
          {"name": "Rainfall +20%", "rf_prediction": 26.2, "xgb_prediction": 25.7},
          {"name": "Temp +2°C", "rf_prediction": 23.8, "xgb_prediction": 23.1},
          {"name": "Temp -2°C", "rf_prediction": 25.1, "xgb_prediction": 24.6}
        ],
        profitability: {"msp_rate": 2275, "expected_profit": 55737.5},
        crop_recommendation: "For your conditions, wheat may give the highest yield (24.5 q/acre).",
        pest_alerts: [],
        ndvi_status: {"ndvi_value": 0.75, "status": "Healthy"},
        climate_change_projection: [
          {"year": 1, "rainfall": 225.0, "predicted_yield": 23.8},
          {"year": 2, "rainfall": 202.5, "predicted_yield": 23.1},
          {"year": 3, "rainfall": 182.25, "predicted_yield": 22.4},
          {"year": 4, "rainfall": 164.02, "predicted_yield": 21.7},
          {"year": 5, "rainfall": 147.62, "predicted_yield": 21.0}
        ]
      };

      setPrediction(mockResponse);
      onPredictionComplete?.();
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-green-600" />
            <span>AI Yield Prediction</span>
          </CardTitle>
          <CardDescription>Get accurate crop yield forecasts using advanced AI models</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!prediction ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="crop">Crop Type</Label>
                  <Select value={formData.crop} onValueChange={(value) => setFormData({...formData, crop: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">🌾 Wheat</SelectItem>
                      <SelectItem value="rice">🌾 Rice</SelectItem>
                      <SelectItem value="maize">🌽 Maize</SelectItem>
                      <SelectItem value="sugarcane">🎋 Sugarcane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loamy">🟤 Loamy</SelectItem>
                      <SelectItem value="clay">🔴 Clay</SelectItem>
                      <SelectItem value="sandy">🟡 Sandy</SelectItem>
                      <SelectItem value="black">⚫ Black Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="location"
                      placeholder="Enter your location"
                      className="pl-9"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="rainfall">Expected Rainfall (mm)</Label>
                  <div className="relative">
                    <CloudRain className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="rainfall"
                      type="number"
                      placeholder="250"
                      className="pl-9"
                      value={formData.rainfall}
                      onChange={(e) => setFormData({...formData, rainfall: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="temperature">Average Temperature (°C)</Label>
                  <div className="relative">
                    <Thermometer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="temperature"
                      type="number"
                      placeholder="25"
                      className="pl-9"
                      value={formData.temperature}
                      onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading || !formData.crop || !formData.soilType}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                >
                  {isLoading ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Get AI Prediction
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 p-6 rounded-xl">
                  <h3 className="text-2xl mb-2">Predicted Yield</h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {prediction.rf_prediction} Quintal/Acre
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">Random Forest: {prediction.rf_prediction}</Badge>
                    <Badge variant="secondary">XGBoost: {prediction.xgb_prediction}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                      <p className="text-2xl font-bold text-blue-600">{prediction.confidence}%</p>
                      <Progress value={prediction.confidence} className="mt-2" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Regional Average</p>
                      <p className="text-2xl font-bold text-gray-600">{prediction.regionalAverage}</p>
                      <p className="text-sm text-green-600 mt-1">+15.6% above avg</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Potential Revenue</p>
                      <p className="text-2xl font-bold text-purple-600">₹55,725</p>
                      <p className="text-sm text-muted-foreground mt-1">@ ₹2,275/quintal</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={() => setPrediction(null)} variant="outline" className="flex-1">
                  New Prediction
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600">
                  Save & Continue
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}