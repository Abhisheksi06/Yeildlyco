import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { History, Download, Calendar, TrendingUp, BarChart3, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function FarmHistory() {
  const [selectedYear, setSelectedYear] = useState('2024');

  // Mock historical data
  const historicalData = [
    {
      season: 'Kharif 2023',
      crop: 'Rice',
      predictedYield: 28.5,
      actualYield: 26.8,
      accuracy: 94,
      profit: 45000,
      date: '2023-06-15'
    },
    {
      season: 'Rabi 2023-24',
      crop: 'Wheat',
      predictedYield: 24.2,
      actualYield: 25.1,
      accuracy: 96,
      profit: 42000,
      date: '2023-11-20'
    },
    {
      season: 'Zaid 2024',
      crop: 'Maize',
      predictedYield: 22.0,
      actualYield: 21.5,
      accuracy: 98,
      profit: 38000,
      date: '2024-03-10'
    },
    {
      season: 'Kharif 2024',
      crop: 'Cotton',
      predictedYield: 18.5,
      actualYield: null,
      accuracy: null,
      profit: null,
      date: '2024-07-25'
    }
  ];

  const yearlyStats = {
    2024: {
      totalSeasons: 2,
      avgAccuracy: 95,
      totalProfit: 80000,
      bestCrop: 'Maize',
      improvement: '+12%'
    },
    2023: {
      totalSeasons: 2,
      avgAccuracy: 95,
      totalProfit: 87000,
      bestCrop: 'Wheat',
      improvement: '+8%'
    }
  };

  const monthlyPredictions = [
    { month: 'Jan', predictions: 2, accuracy: 96 },
    { month: 'Feb', predictions: 1, accuracy: 94 },
    { month: 'Mar', predictions: 3, accuracy: 98 },
    { month: 'Apr', predictions: 2, accuracy: 92 },
    { month: 'May', predictions: 1, accuracy: 95 },
    { month: 'Jun', predictions: 2, accuracy: 97 },
    { month: 'Jul', predictions: 3, accuracy: 95 },
    { month: 'Aug', predictions: 2, accuracy: 93 },
    { month: 'Sep', predictions: 1, accuracy: 96 },
    { month: 'Oct', predictions: 2, accuracy: 94 },
    { month: 'Nov', predictions: 3, accuracy: 97 },
    { month: 'Dec', predictions: 2, accuracy: 95 }
  ];

  const cropPerformance = [
    { crop: 'Wheat', seasons: 4, avgYield: 24.8, avgProfit: 43000, accuracy: 96 },
    { crop: 'Rice', seasons: 3, avgYield: 27.2, avgProfit: 46000, accuracy: 94 },
    { crop: 'Maize', seasons: 2, avgYield: 21.8, avgProfit: 39000, accuracy: 97 },
    { crop: 'Cotton', seasons: 1, avgYield: 18.5, avgProfit: 35000, accuracy: 95 }
  ];

  const getAccuracyColor = (accuracy: number | null) => {
    if (accuracy === null) return 'text-gray-400';
    if (accuracy >= 95) return 'text-green-600';
    if (accuracy >= 90) return 'text-blue-600';
    if (accuracy >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBadge = (accuracy: number | null) => {
    if (accuracy === null) return 'bg-gray-100 text-gray-600';
    if (accuracy >= 95) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (accuracy >= 90) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (accuracy >= 85) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5 text-indigo-600" />
            <span>Farm History & Analytics</span>
          </CardTitle>
          <CardDescription>Track your farming decisions and prediction accuracy over time</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="crops">Crops</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Yearly Stats */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg text-gray-900 dark:text-white">2024 Performance Summary</h3>
                  <div className="flex space-x-2">
                    <Button variant={selectedYear === '2024' ? 'default' : 'outline'} size="sm" onClick={() => setSelectedYear('2024')}>
                      2024
                    </Button>
                    <Button variant={selectedYear === '2023' ? 'default' : 'outline'} size="sm" onClick={() => setSelectedYear('2023')}>
                      2023
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Calendar className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Seasons</p>
                    <p className="text-xl font-bold text-blue-600">{yearlyStats[selectedYear as keyof typeof yearlyStats].totalSeasons}</p>
                  </div>

                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Target className="w-6 h-6 mx-auto mb-1 text-green-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Accuracy</p>
                    <p className="text-xl font-bold text-green-600">{yearlyStats[selectedYear as keyof typeof yearlyStats].avgAccuracy}%</p>
                  </div>

                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <TrendingUp className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Profit</p>
                    <p className="text-xl font-bold text-purple-600">₹{(yearlyStats[selectedYear as keyof typeof yearlyStats].totalProfit / 1000).toFixed(0)}K</p>
                  </div>

                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <BarChart3 className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Best Crop</p>
                    <p className="text-xl font-bold text-orange-600">{yearlyStats[selectedYear as keyof typeof yearlyStats].bestCrop}</p>
                  </div>
                </div>
              </div>

              {/* Recent History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Recent Predictions</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {historicalData.map((record, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{record.season} - {record.crop}</h4>
                            <p className="text-xs text-gray-500">{new Date(record.date).toLocaleDateString()}</p>
                          </div>
                          {record.accuracy && (
                            <Badge className={getAccuracyBadge(record.accuracy)}>
                              {record.accuracy}% Accurate
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Predicted Yield</p>
                            <p className="font-medium">{record.predictedYield} q/acre</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Actual Yield</p>
                            <p className="font-medium">{record.actualYield ? `${record.actualYield} q/acre` : 'Pending'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Accuracy</p>
                            <p className={`font-medium ${getAccuracyColor(record.accuracy)}`}>
                              {record.accuracy ? `${record.accuracy}%` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Profit</p>
                            <p className="font-medium text-green-600">
                              {record.profit ? `₹${(record.profit / 1000).toFixed(0)}K` : 'Pending'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              {/* Monthly Prediction Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Monthly Prediction Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyPredictions}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="predictions" fill="#8884d8" name="Predictions Made" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Accuracy Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Prediction Accuracy Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={monthlyPredictions}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis domain={[85, 100]} fontSize={12} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Accuracy (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crops" className="space-y-6">
              {/* Crop Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Crop Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropPerformance.map((crop, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{crop.crop}</h4>
                          <Badge variant="outline">{crop.seasons} seasons</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Avg Yield</p>
                            <p className="font-medium text-blue-600">{crop.avgYield} q/acre</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Avg Profit</p>
                            <p className="font-medium text-green-600">₹{(crop.avgProfit / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Prediction Accuracy</p>
                            <p className={`font-medium ${getAccuracyColor(crop.accuracy)}`}>{crop.accuracy}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Insights & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-sm">🎯 Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-green-700 dark:text-green-300">✅ Wheat shows most consistent performance</p>
                    <p className="text-sm text-green-700 dark:text-green-300">✅ Prediction accuracy improved by 8% this year</p>
                    <p className="text-sm text-green-700 dark:text-green-300">✅ Rice generates highest profit margins</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">📈 Best prediction months: March, November</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                  <CardHeader>
                    <CardTitle className="text-sm">📝 Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-orange-700 dark:text-orange-300">⚠️ Consider more rice cultivation</p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">⚠️ Monitor cotton performance closely</p>
                    <p className="text-sm text-red-700 dark:text-red-300">🎯 Focus on cost optimization for maize</p>
                    <p className="text-sm text-red-700 dark:text-red-300">🎯 Plan more predictions in peak months</p>
                  </CardContent>
                </Card>
              </div>

              {/* Learning Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">🧠 AI Model Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Accuracy</span>
                        <span>95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Data Quality Score</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Recommendation Relevance</span>
                        <span>88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}