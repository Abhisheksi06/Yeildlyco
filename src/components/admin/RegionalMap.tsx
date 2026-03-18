import React, { useState } from 'react';
import { MapPin, Maximize2, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface RegionalMapProps {
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
}

export function RegionalMap({ selectedRegion, onRegionSelect }: RegionalMapProps) {
  const [mapView, setMapView] = useState<'yield' | 'risk' | 'msp'>('yield');

  const regionData = {
    'Punjab': { 
      yield: 28.5, 
      status: 'excellent', 
      risk: 'low', 
      msp: 64.8, 
      farmers: 1250, 
      area: 15000,
      color: 'green'
    },
    'Haryana': { 
      yield: 26.2, 
      status: 'good', 
      risk: 'low', 
      msp: 58.3, 
      farmers: 980, 
      area: 12500,
      color: 'green'
    },
    'Uttar Pradesh': { 
      yield: 22.8, 
      status: 'moderate', 
      risk: 'medium', 
      msp: 156.7, 
      farmers: 3200, 
      area: 28000,
      color: 'yellow'
    },
    'Madhya Pradesh': { 
      yield: 21.5, 
      status: 'moderate', 
      risk: 'medium', 
      msp: 89.2, 
      farmers: 2100, 
      area: 22000,
      color: 'yellow'
    },
    'Rajasthan': { 
      yield: 18.2, 
      status: 'concern', 
      risk: 'high', 
      msp: 45.6, 
      farmers: 850, 
      area: 18000,
      color: 'red'
    },
    'Maharashtra': { 
      yield: 20.1, 
      status: 'moderate', 
      risk: 'medium', 
      msp: 78.9, 
      farmers: 1800, 
      area: 20000,
      color: 'yellow'
    },
  };

  const getColorByView = (region: any) => {
    switch (mapView) {
      case 'yield':
        return region.yield >= 25 ? 'bg-green-500' : region.yield >= 20 ? 'bg-yellow-500' : 'bg-red-500';
      case 'risk':
        return region.risk === 'low' ? 'bg-green-500' : region.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
      case 'msp':
        return region.msp >= 80 ? 'bg-green-500' : region.msp >= 60 ? 'bg-yellow-500' : 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const legends = {
    yield: [
      { label: 'High (>25 Q/A)', color: 'bg-green-500' },
      { label: 'Medium (20-25 Q/A)', color: 'bg-yellow-500' },
      { label: 'Low (<20 Q/A)', color: 'bg-red-500' }
    ],
    risk: [
      { label: 'Low Risk', color: 'bg-green-500' },
      { label: 'Medium Risk', color: 'bg-yellow-500' },
      { label: 'High Risk', color: 'bg-red-500' }
    ],
    msp: [
      { label: 'High MSP (>₹80Cr)', color: 'bg-green-500' },
      { label: 'Medium MSP (₹60-80Cr)', color: 'bg-yellow-500' },
      { label: 'Low MSP (<₹60Cr)', color: 'bg-red-500' }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Interactive Regional Map</span>
              </CardTitle>
              <CardDescription>Click on regions to view detailed analytics</CardDescription>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                Full Screen
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Map View Controls */}
          <Tabs value={mapView} onValueChange={(v) => setMapView(v as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="yield">Yield Prediction</TabsTrigger>
              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              <TabsTrigger value="msp">MSP Requirement</TabsTrigger>
            </TabsList>

            <TabsContent value={mapView} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map Area */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-8" style={{minHeight: '400px'}}>
                        {/* Simplified India Map with Regions */}
                        <div className="relative w-full h-full">
                          {/* Punjab */}
                          <div 
                            className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${getColorByView(regionData.Punjab)} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                            style={{ top: '20%', left: '25%' }}
                            onClick={() => onRegionSelect('Punjab')}
                          >
                            PB
                          </div>
                          
                          {/* Haryana */}
                          <div 
                            className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${getColorByView(regionData.Haryana)} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                            style={{ top: '25%', left: '30%' }}
                            onClick={() => onRegionSelect('Haryana')}
                          >
                            HR
                          </div>
                          
                          {/* Uttar Pradesh */}
                          <div 
                            className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${getColorByView(regionData['Uttar Pradesh'])} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                            style={{ top: '35%', left: '45%' }}
                            onClick={() => onRegionSelect('Uttar Pradesh')}
                          >
                            UP
                          </div>
                          
                          {/* Madhya Pradesh */}
                          <div 
                            className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${getColorByView(regionData['Madhya Pradesh'])} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                            style={{ top: '50%', left: '40%' }}
                            onClick={() => onRegionSelect('Madhya Pradesh')}
                          >
                            MP
                          </div>
                          
                          {/* Rajasthan */}
                          <div 
                            className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${getColorByView(regionData.Rajasthan)} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                            style={{ top: '40%', left: '20%' }}
                            onClick={() => onRegionSelect('Rajasthan')}
                          >
                            RJ
                          </div>
                          
                          {/* Maharashtra */}
                          <div 
                            className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${getColorByView(regionData.Maharashtra)} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                            style={{ top: '65%', left: '35%' }}
                            onClick={() => onRegionSelect('Maharashtra')}
                          >
                            MH
                          </div>

                          {/* Map Labels */}
                          {Object.entries(regionData).map(([name, data]) => (
                            <div
                              key={name}
                              className="absolute text-xs font-medium bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded shadow-sm"
                              style={{
                                top: name === 'Punjab' ? '12%' : 
                                     name === 'Haryana' ? '17%' :
                                     name === 'Uttar Pradesh' ? '27%' :
                                     name === 'Madhya Pradesh' ? '42%' :
                                     name === 'Rajasthan' ? '32%' : '57%',
                                left: name === 'Punjab' ? '20%' : 
                                      name === 'Haryana' ? '25%' :
                                      name === 'Uttar Pradesh' ? '50%' :
                                      name === 'Madhya Pradesh' ? '45%' :
                                      name === 'Rajasthan' ? '10%' : '40%'
                              }}
                            >
                              {name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Side Panel */}
                <div className="space-y-4">
                  {/* Legend */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Legend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {legends[mapView].map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className={`w-4 h-4 rounded ${item.color}`}></div>
                            <span>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Region Details */}
                  {selectedRegion && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center space-x-2">
                          <Info className="h-4 w-4" />
                          <span>{selectedRegion} Details</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {(() => {
                          const data = regionData[selectedRegion as keyof typeof regionData];
                          return (
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Yield Prediction:</span>
                                <span className="font-bold">{data.yield} Q/A</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Risk Level:</span>
                                <Badge 
                                  variant="secondary" 
                                  className={`${data.risk === 'low' ? 'bg-green-100 text-green-800' : 
                                              data.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                              'bg-red-100 text-red-800'}`}
                                >
                                  {data.risk.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">MSP Requirement:</span>
                                <span className="font-bold">₹{data.msp}Cr</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Active Farmers:</span>
                                <span className="font-bold">{data.farmers.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Total Area:</span>
                                <span className="font-bold">{data.area.toLocaleString()} acres</span>
                              </div>
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  )}

                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">National Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Yield States:</span>
                        <Badge className="bg-green-100 text-green-800">2</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Medium Yield States:</span>
                        <Badge className="bg-yellow-100 text-yellow-800">3</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Risk States:</span>
                        <Badge className="bg-red-100 text-red-800">1</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total MSP Budget:</span>
                        <span className="font-bold">₹492.5Cr</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}