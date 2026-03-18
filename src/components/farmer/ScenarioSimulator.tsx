import React, { useState } from 'react';
import { RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function ScenarioSimulator() {
  const [rainfallChange, setRainfallChange] = useState([0]);
  const [temperatureChange, setTemperatureChange] = useState([0]);
  const [fertilizerChange, setFertilizerChange] = useState([0]);
  const [baseYield] = useState(24.5);

  // Calculate impact based on changes
  const calculateYieldImpact = () => {
    let impact = 0;
    impact += (rainfallChange[0] / 100) * 0.3; // 30% weight for rainfall
    impact += (temperatureChange[0] / 100) * -0.2; // negative impact for temperature increase
    impact += (fertilizerChange[0] / 100) * 0.4; // 40% weight for fertilizer
    return baseYield * (1 + impact);
  };

  const currentYield = calculateYieldImpact();
  const yieldChange = ((currentYield - baseYield) / baseYield) * 100;

  // Generate scenario data for chart
  const scenarioData = [
    { name: 'Drought (-30% rain)', yield: baseYield * 0.75, change: -25 },
    { name: 'Normal Conditions', yield: baseYield, change: 0 },
    { name: 'Good Rain (+20%)', yield: baseYield * 1.15, change: 15 },
    { name: 'Optimal (+fert)', yield: baseYield * 1.25, change: 25 },
    { name: 'Current Scenario', yield: currentYield, change: yieldChange },
  ];

  const monthlyProjection = [
    { month: 'Nov', baseline: 22, scenario: 22 + (yieldChange * 0.2) },
    { month: 'Dec', baseline: 23, scenario: 23 + (yieldChange * 0.4) },
    { month: 'Jan', baseline: 24, scenario: 24 + (yieldChange * 0.6) },
    { month: 'Feb', baseline: 24.5, scenario: 24.5 + (yieldChange * 0.8) },
    { month: 'Mar', baseline: 24.5, scenario: currentYield },
  ];

  const resetAll = () => {
    setRainfallChange([0]);
    setTemperatureChange([0]);
    setFertilizerChange([0]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RotateCcw className="h-5 w-5 text-purple-600" />
            <span>What-If Scenario Simulator</span>
          </CardTitle>
          <CardDescription>Test different conditions and see their impact on your crop yield</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Scenario Display */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl">
            <div className="text-center space-y-2">
              <h3 className="text-lg">Predicted Yield Under Current Scenario</h3>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {currentYield.toFixed(1)} Quintal/Acre
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Badge 
                  variant="secondary" 
                  className={`${yieldChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {yieldChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {yieldChange >= 0 ? '+' : ''}{yieldChange.toFixed(1)}% vs baseline
                </Badge>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <span>🌧️</span>
                  <span>Rainfall Change</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {rainfallChange[0] >= 0 ? '+' : ''}{rainfallChange[0]}%
                  </span>
                </div>
                <Slider
                  value={rainfallChange}
                  onValueChange={setRainfallChange}
                  max={50}
                  min={-50}
                  step={5}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground text-center">
                  -50% (Drought) to +50% (Flood)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <span>🌡️</span>
                  <span>Temperature Change</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <span className="text-2xl font-bold text-orange-600">
                    {temperatureChange[0] >= 0 ? '+' : ''}{temperatureChange[0]}°C
                  </span>
                </div>
                <Slider
                  value={temperatureChange}
                  onValueChange={setTemperatureChange}
                  max={10}
                  min={-10}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground text-center">
                  -10°C (Colder) to +10°C (Hotter)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <span>🌿</span>
                  <span>Fertilizer Change</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-600">
                    {fertilizerChange[0] >= 0 ? '+' : ''}{fertilizerChange[0]}%
                  </span>
                </div>
                <Slider
                  value={fertilizerChange}
                  onValueChange={setFertilizerChange}
                  max={50}
                  min={-50}
                  step={5}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground text-center">
                  -50% (Reduce) to +50% (Increase)
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Scenario Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={scenarioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="yield" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Monthly Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="baseline" stroke="#8884d8" strokeDasharray="5 5" name="Baseline" />
                    <Line type="monotone" dataKey="scenario" stroke="#82ca9d" strokeWidth={2} name="Your Scenario" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={resetAll} className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
              💾 Save Scenario
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}