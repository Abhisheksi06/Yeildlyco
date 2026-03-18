import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CloudRain, Thermometer, Droplets, Wind, TrendingDown, AlertTriangle, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ClimateProjectionProps {
  onView?: () => void;
}

export function ClimateProjection({ onView }: ClimateProjectionProps) {
  const [selectedScenario, setSelectedScenario] = useState('moderate');
  
  // Mock 5-year climate projection data
  const climateData = {
    moderate: [
      { year: '2024', rainfall: 850, temperature: 26.5, yield: 24.5 },
      { year: '2025', rainfall: 825, temperature: 26.8, yield: 23.8 },
      { year: '2026', rainfall: 800, temperature: 27.2, yield: 23.1 },
      { year: '2027', rainfall: 775, temperature: 27.5, yield: 22.4 },
      { year: '2028', rainfall: 750, temperature: 27.8, yield: 21.7 }
    ],
    optimistic: [
      { year: '2024', rainfall: 900, temperature: 26.2, yield: 25.2 },
      { year: '2025', rainfall: 880, temperature: 26.4, yield: 24.8 },
      { year: '2026', rainfall: 860, temperature: 26.6, yield: 24.4 },
      { year: '2027', rainfall: 840, temperature: 26.8, yield: 24.0 },
      { year: '2028', rainfall: 820, temperature: 27.0, yield: 23.6 }
    ],
    pessimistic: [
      { year: '2024', rainfall: 800, temperature: 27.0, yield: 23.5 },
      { year: '2025', rainfall: 760, temperature: 27.5, yield: 22.2 },
      { year: '2026', rainfall: 720, temperature: 28.0, yield: 20.8 },
      { year: '2027', rainfall: 680, temperature: 28.5, yield: 19.4 },
      { year: '2028', rainfall: 640, temperature: 29.0, yield: 18.0 }
    ]
  };

  const currentData = climateData[selectedScenario as keyof typeof climateData];

  const impacts = [
    {
      icon: CloudRain,
      title: 'Rainfall Patterns',
      moderate: 'Gradual decrease of 12% over 5 years',
      optimistic: '8% decrease with better distribution',
      pessimistic: '20% decrease with irregular patterns',
      color: 'text-blue-600'
    },
    {
      icon: Thermometer,
      title: 'Temperature Rise',
      moderate: '+1.3°C average increase',
      optimistic: '+0.8°C with adaptation measures',
      pessimistic: '+2.0°C significant warming',
      color: 'text-red-600'
    },
    {
      icon: TrendingDown,
      title: 'Yield Impact',
      moderate: '11% decrease without adaptation',
      optimistic: '6% decrease with best practices',
      pessimistic: '23% severe yield reduction',
      color: 'text-orange-600'
    }
  ];

  const adaptationStrategies = [
    {
      strategy: 'Drought-Resistant Varieties',
      impact: 'Moderate',
      cost: 'Low',
      timeframe: '1-2 years',
      description: 'Switch to climate-resilient crop varieties'
    },
    {
      strategy: 'Precision Agriculture',
      impact: 'High',
      cost: 'Medium',
      timeframe: '2-3 years',
      description: 'IoT sensors and AI-driven farming'
    },
    {
      strategy: 'Water Conservation',
      impact: 'High',
      cost: 'Medium',
      timeframe: '1-3 years',
      description: 'Drip irrigation and rainwater harvesting'
    },
    {
      strategy: 'Crop Diversification',
      impact: 'Moderate',
      cost: 'Low',
      timeframe: '1 year',
      description: 'Multiple crops to spread climate risk'
    }
  ];

  React.useEffect(() => {
    onView?.();
  }, [onView]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudRain className="h-5 w-5 text-blue-600" />
            <span>Climate Change Impact Projection</span>
          </CardTitle>
          <CardDescription>5-year climate trends and adaptation strategies for your region</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Scenario Selection */}
          <div className="flex space-x-2 mb-6">
            <Button
              variant={selectedScenario === 'optimistic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedScenario('optimistic')}
              className="flex-1"
            >
              🌱 Optimistic
            </Button>
            <Button
              variant={selectedScenario === 'moderate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedScenario('moderate')}
              className="flex-1"
            >
              ⚖️ Moderate
            </Button>
            <Button
              variant={selectedScenario === 'pessimistic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedScenario('pessimistic')}
              className="flex-1"
            >
              ⚠️ Pessimistic
            </Button>
          </div>

          {/* Key Metrics Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-xl">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4 text-center">
              📊 {selectedScenario.charAt(0).toUpperCase() + selectedScenario.slice(1)} Scenario Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {impacts.map((impact, index) => {
                const Icon = impact.icon;
                return (
                  <div key={index} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${impact.color}`} />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{impact.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {impact[selectedScenario as keyof typeof impact] as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rainfall and Temperature Projection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Climate Variables (5-Year Projection)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" fontSize={12} />
                    <YAxis yAxisId="left" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" fontSize={12} />
                    <Tooltip />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="rainfall" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Rainfall (mm)"
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Yield Impact Projection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Crop Yield Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar 
                      dataKey="yield" 
                      fill={selectedScenario === 'optimistic' ? '#10b981' : selectedScenario === 'moderate' ? '#f59e0b' : '#ef4444'}
                      name="Yield (q/acre)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Climate Risks */}
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Climate Risk Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-red-800 dark:text-red-300 mb-2">⚠️ Primary Risks</h4>
                  <ul className="text-sm space-y-1 text-red-700 dark:text-red-300">
                    <li>• Reduced monsoon reliability</li>
                    <li>• Increased heat stress on crops</li>
                    <li>• Higher evapotranspiration rates</li>
                    <li>• Shifting pest and disease patterns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-orange-800 dark:text-orange-300 mb-2">📈 Emerging Challenges</h4>
                  <ul className="text-sm space-y-1 text-orange-700 dark:text-orange-300">
                    <li>• Extreme weather events</li>
                    <li>• Soil moisture stress</li>
                    <li>• Water resource competition</li>
                    <li>• Market price volatility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adaptation Strategies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>Recommended Adaptation Strategies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adaptationStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{strategy.strategy}</h4>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">
                          Impact: {strategy.impact}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Cost: {strategy.cost}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{strategy.description}</p>
                    <p className="text-xs text-gray-500">Timeline: {strategy.timeframe}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Plan */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">🎯 Immediate Action Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-green-800 dark:text-green-300 mb-2">Short-term (1-2 years)</h4>
                <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                  <li>✅ Plant drought-resistant varieties</li>
                  <li>✅ Install water conservation systems</li>
                  <li>✅ Diversify crop portfolio</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm text-blue-800 dark:text-blue-300 mb-2">Long-term (3-5 years)</h4>
                <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                  <li>🔄 Adopt precision agriculture</li>
                  <li>🔄 Enhance soil health programs</li>
                  <li>🔄 Invest in climate monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}