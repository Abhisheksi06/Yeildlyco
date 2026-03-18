import React, { useState } from 'react';
import { 
  Map, 
  BarChart3, 
  Download, 
  Filter, 
  TrendingUp, 
  Users, 
  MapPin,
  Calendar,
  AlertTriangle,
  Target
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function AdminDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<string>('current');

  const kpis = [
    { 
      title: 'Total Predicted Yield', 
      value: '2.4M', 
      unit: 'Quintals', 
      change: '+8.5%', 
      trend: 'up',
      color: 'green'
    },
    { 
      title: 'Active Farmers', 
      value: '15,847', 
      unit: 'Users', 
      change: '+12.3%', 
      trend: 'up',
      color: 'blue'
    },
    { 
      title: 'High-Risk Regions', 
      value: '12', 
      unit: 'Districts', 
      change: '-4.2%', 
      trend: 'down',
      color: 'red'
    },
    { 
      title: 'MSP Requirement', 
      value: '₹5.46B', 
      unit: 'Estimated', 
      change: '+6.8%', 
      trend: 'up',
      color: 'purple'
    },
  ];

  const regions = [
    { name: 'Punjab', yield: 'High', status: 'excellent', color: 'green' },
    { name: 'Haryana', yield: 'High', status: 'good', color: 'green' },
    { name: 'Uttar Pradesh', yield: 'Medium', status: 'moderate', color: 'yellow' },
    { name: 'Madhya Pradesh', yield: 'Medium', status: 'good', color: 'yellow' },
    { name: 'Rajasthan', yield: 'Low', status: 'concern', color: 'red' },
    { name: 'Maharashtra', yield: 'Medium', status: 'moderate', color: 'yellow' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 pb-20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-200/50 dark:border-blue-800/50 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-gray-900 dark:text-white">Government Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Regional crop yield analytics and MSP planning</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="maize">Maize</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <Card key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <Badge 
                    variant={kpi.trend === 'up' ? 'default' : 'secondary'}
                    className={`${kpi.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <div className="flex items-baseline space-x-2">
                  <p className={`text-2xl font-bold text-${kpi.color}-600`}>{kpi.value}</p>
                  <p className="text-sm text-muted-foreground">{kpi.unit}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-1">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Regional Map</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Data Tables</span>
            </TabsTrigger>
            <TabsTrigger value="msp" className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">MSP Planning</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Scenarios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Regional Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Regional Status Overview</span>
                </CardTitle>
                <CardDescription>Current yield predictions across major states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regions.map((region, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedRegion(region.name)}
                    >
                      <div>
                        <p className="font-medium">{region.name}</p>
                        <p className="text-sm text-muted-foreground">{region.status}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary"
                          className={`${
                            region.color === 'green' ? 'bg-green-100 text-green-800' :
                            region.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {region.yield}
                        </Badge>
                        <div className={`w-3 h-3 rounded-full bg-${region.color}-500`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alerts & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span>Priority Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-300">Low Yield Alert - Rajasthan</p>
                      <p className="text-sm text-red-600 dark:text-red-400">15% below expected yield. Requires immediate intervention.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-800 dark:text-orange-300">MSP Budget Alert</p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Projected MSP requirement 8% higher than allocated budget.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-300">Weather Impact</p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">Delayed monsoon may affect 3 districts in MP.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span>Performance Highlights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300">Punjab Performance</p>
                      <p className="text-sm text-green-600 dark:text-green-400">18% above target yield - excellent farming practices.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300">Farmer Adoption</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">25% increase in platform usage across all states.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Target className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-300">Accuracy Improvement</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">AI model accuracy improved to 87% this quarter.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Map className="h-5 w-5" />
                  <span>Regional Map</span>
                </CardTitle>
                <CardDescription>Interactive map showing yield predictions across regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <p className="text-lg text-gray-600 dark:text-gray-400">Interactive Map Component</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Data Tables</span>
                </CardTitle>
                <CardDescription>Detailed crop yield data and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                    <p className="text-lg text-gray-600 dark:text-gray-400">Data Tables & Analytics</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Advanced data visualization coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="msp">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>MSP Planning</span>
                </CardTitle>
                <CardDescription>Minimum Support Price calculations and planning tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                  <p className="text-lg text-gray-600 dark:text-gray-400">MSP Calculator</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Procurement planning tools coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Scenario Planning</span>
                </CardTitle>
                <CardDescription>What-if analysis for policy planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <p className="text-lg text-gray-600 dark:text-gray-400">Scenario Planner</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Advanced scenario modeling coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}