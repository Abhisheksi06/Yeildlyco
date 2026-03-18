import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Satellite, MapPin, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface NDVIMonitorProps {
  onCheck?: () => void;
}

export function NDVIMonitor({ onCheck }: NDVIMonitorProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [ndviData, setNdviData] = useState({
    current: 0.75,
    trend: 'improving',
    lastUpdated: '2 hours ago',
    healthStatus: 'Healthy',
    recommendation: 'Continue current practices'
  });

  const handleScan = () => {
    setIsScanning(true);
    onCheck?.();
    
    setTimeout(() => {
      const randomNdvi = 0.3 + Math.random() * 0.6; // Random NDVI between 0.3-0.9
      setNdviData({
        current: randomNdvi,
        trend: randomNdvi > 0.65 ? 'improving' : randomNdvi > 0.45 ? 'stable' : 'declining',
        lastUpdated: 'Just now',
        healthStatus: randomNdvi > 0.65 ? 'Healthy' : randomNdvi > 0.45 ? 'Moderate' : 'Needs Attention',
        recommendation: randomNdvi > 0.65 ? 'Excellent crop health!' : randomNdvi > 0.45 ? 'Monitor closely' : 'Consider intervention'
      });
      setIsScanning(false);
    }, 3000);
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'Needs Attention': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthBadge = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Needs Attention': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const ndviRanges = [
    { range: '0.8 - 1.0', status: 'Excellent', description: 'Dense, healthy vegetation', color: 'bg-green-600' },
    { range: '0.6 - 0.8', status: 'Good', description: 'Healthy crop growth', color: 'bg-green-400' },
    { range: '0.4 - 0.6', status: 'Moderate', description: 'Average vegetation', color: 'bg-yellow-500' },
    { range: '0.2 - 0.4', status: 'Poor', description: 'Sparse vegetation', color: 'bg-orange-500' },
    { range: '0.0 - 0.2', status: 'Critical', description: 'Very poor/no vegetation', color: 'bg-red-600' }
  ];

  const historicalData = [
    { month: 'Nov', ndvi: 0.45 },
    { month: 'Dec', ndvi: 0.58 },
    { month: 'Jan', ndvi: 0.67 },
    { month: 'Feb', ndvi: 0.72 },
    { month: 'Mar', ndvi: ndviData.current }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Satellite className="h-5 w-5 text-green-600" />
            <span>NDVI Crop Health Monitor</span>
          </CardTitle>
          <CardDescription>Satellite-based vegetation health analysis using NDVI (Normalized Difference Vegetation Index)</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl">
            <div className="text-center mb-4">
              <h3 className="text-lg text-gray-900 dark:text-white mb-2">Current Crop Health</h3>
              <div className="text-4xl font-bold mb-2" style={{ color: ndviData.current > 0.65 ? '#16a34a' : ndviData.current > 0.45 ? '#eab308' : '#dc2626' }}>
                {ndviData.current.toFixed(2)}
              </div>
              <Badge className={getHealthBadge(ndviData.healthStatus)}>
                {ndviData.healthStatus === 'Healthy' ? <CheckCircle className="w-3 h-3 mr-1" /> : 
                 ndviData.healthStatus === 'Needs Attention' ? <AlertTriangle className="w-3 h-3 mr-1" /> :
                 <TrendingUp className="w-3 h-3 mr-1" />}
                {ndviData.healthStatus}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <Calendar className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                <p className="font-medium">{ndviData.lastUpdated}</p>
              </div>

              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-600" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Trend</p>
                <p className={`font-medium capitalize ${getHealthColor(ndviData.healthStatus)}`}>{ndviData.trend}</p>
              </div>

              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <MapPin className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Coverage</p>
                <p className="font-medium">5.2 acres</p>
              </div>
            </div>
          </div>

          {/* Scan Button */}
          <div className="text-center">
            <Button 
              onClick={handleScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-green-600 to-blue-600"
              size="lg"
            >
              {isScanning ? (
                <>
                  <Satellite className="w-4 h-4 mr-2 animate-pulse" />
                  Scanning Satellite Data...
                </>
              ) : (
                <>
                  <Satellite className="w-4 h-4 mr-2" />
                  🛰️ Get Latest NDVI Data
                </>
              )}
            </Button>
            {isScanning && (
              <div className="mt-4">
                <Progress value={66} className="w-full" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Analyzing satellite imagery...</p>
              </div>
            )}
          </div>

          {/* NDVI Scale Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">NDVI Health Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ndviRanges.map((range, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${range.color}`}></div>
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm">{range.range}</span>
                        <span className="text-xs text-gray-500 ml-2">{range.status}</span>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{range.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Historical Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Historical NDVI Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {historicalData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm w-12">{data.month}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                      <div 
                        className="h-4 rounded-full transition-all"
                        style={{ 
                          width: `${data.ndvi * 100}%`,
                          backgroundColor: data.ndvi > 0.65 ? '#16a34a' : data.ndvi > 0.45 ? '#eab308' : '#dc2626'
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12">{data.ndvi.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{ndviData.recommendation}</p>
              <div className="space-y-2">
                {ndviData.current > 0.65 ? (
                  <>
                    <p className="text-sm text-green-700 dark:text-green-300">✅ Continue current fertilization schedule</p>
                    <p className="text-sm text-green-700 dark:text-green-300">✅ Maintain irrigation timing</p>
                    <p className="text-sm text-green-700 dark:text-green-300">✅ Monitor for pest activity</p>
                  </>
                ) : ndviData.current > 0.45 ? (
                  <>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">⚠️ Consider increasing fertilizer application</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">⚠️ Check irrigation efficiency</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">⚠️ Monitor weather patterns closely</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-red-700 dark:text-red-300">🚨 Immediate intervention required</p>
                    <p className="text-sm text-red-700 dark:text-red-300">🚨 Check for disease/pest infestation</p>
                    <p className="text-sm text-red-700 dark:text-red-300">🚨 Consult agriculture expert</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}