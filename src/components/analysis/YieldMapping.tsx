import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Upload, FileText, MapPin, BarChart3, Download, Eye, Layers } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface YieldData {
  production: number;
  area: number;
  yield: number;
  latitude: number;
  longitude: number;
  crop?: string;
  region?: string;
  year?: string;
  [key: string]: any;
}

export function YieldMapping() {
  const [yieldData, setYieldData] = useState<YieldData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [mapGenerated, setMapGenerated] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('CSV file must contain header and data rows');
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      // Check for required columns
      const requiredColumns = ['production', 'area', 'latitude', 'longitude'];
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
      }

      const data: YieldData[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length !== headers.length) continue;

        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });

        const production = parseFloat(row.production);
        const area = parseFloat(row.area);
        const latitude = parseFloat(row.latitude);
        const longitude = parseFloat(row.longitude);
        
        // Skip invalid rows
        if (isNaN(production) || isNaN(area) || isNaN(latitude) || isNaN(longitude) || area === 0) {
          continue;
        }

        const yield_value = production / area;

        const dataPoint: YieldData = {
          production,
          area,
          yield: yield_value,
          latitude,
          longitude,
          ...row
        };

        data.push(dataPoint);
      }

      if (data.length === 0) {
        throw new Error('No valid data rows found');
      }

      setYieldData(data);
      setMapGenerated(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing file');
    } finally {
      setLoading(false);
    }
  };

  const getYieldColor = (yield_value: number, avgYield: number) => {
    const ratio = yield_value / avgYield;
    if (ratio < 0.5) return 'bg-red-500';
    if (ratio < 0.8) return 'bg-orange-500';
    if (ratio < 1.2) return 'bg-yellow-500';
    if (ratio < 1.5) return 'bg-lime-500';
    return 'bg-green-500';
  };

  const getYieldLabel = (yield_value: number, avgYield: number) => {
    const ratio = yield_value / avgYield;
    if (ratio < 0.5) return 'Very Low';
    if (ratio < 0.8) return 'Low';
    if (ratio < 1.2) return 'Average';
    if (ratio < 1.5) return 'High';
    return 'Very High';
  };

  const stats = yieldData.length > 0 ? {
    total: yieldData.length,
    avgYield: yieldData.reduce((sum, d) => sum + d.yield, 0) / yieldData.length,
    maxYield: Math.max(...yieldData.map(d => d.yield)),
    minYield: Math.min(...yieldData.map(d => d.yield)),
    totalProduction: yieldData.reduce((sum, d) => sum + d.production, 0),
    totalArea: yieldData.reduce((sum, d) => sum + d.area, 0)
  } : null;

  const downloadMap = () => {
    // Simulate map download
    const element = document.createElement('a');
    const mapData = {
      type: 'FeatureCollection',
      features: yieldData.map(item => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.longitude, item.latitude]
        },
        properties: {
          yield: item.yield,
          production: item.production,
          area: item.area,
          crop: item.crop || 'Unknown',
          popup: `${item.crop || 'Crop'}: Yield ${item.yield.toFixed(2)}`
        }
      }))
    };
    
    const file = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'yield_map_data.geojson';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <MapPin className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yield Map Visualization</h1>
              <p className="text-gray-600 dark:text-gray-400">Generate interactive maps from crop yield data</p>
            </div>
          </div>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Yield Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="yield-csv-upload"
                  />
                  <label htmlFor="yield-csv-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Click to upload yield data CSV
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Required: Production, Area, Latitude, Longitude (Optional: Crop, Region, Year)
                    </p>
                  </label>
                </div>
                
                {fileName && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>Uploaded: {fileName}</span>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span>Processing yield data and generating map...</span>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
                    <FileText className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-700 dark:text-red-300">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {mapGenerated && (
                  <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="text-green-700 dark:text-green-300">
                      Interactive yield map generated successfully! {yieldData.length} data points plotted.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Data Points', value: stats.total, unit: '', color: 'blue' },
                { label: 'Avg Yield', value: stats.avgYield.toFixed(2), unit: 't/ha', color: 'green' },
                { label: 'Max Yield', value: stats.maxYield.toFixed(2), unit: 't/ha', color: 'emerald' },
                { label: 'Min Yield', value: stats.minYield.toFixed(2), unit: 't/ha', color: 'red' },
                { label: 'Total Production', value: (stats.totalProduction / 1000).toFixed(1), unit: 'K tons', color: 'purple' },
                { label: 'Total Area', value: (stats.totalArea / 1000).toFixed(1), unit: 'K ha', color: 'indigo' }
              ].map((stat, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {stat.value} <span className="text-sm font-normal text-gray-500">{stat.unit}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interactive Map */}
        {mapGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5" />
                    <span>Interactive Yield Map</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={downloadMap}>
                      <Download className="w-4 h-4 mr-2" />
                      Download GeoJSON
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Full Screen
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg flex flex-col items-center justify-center border border-blue-200 dark:border-blue-800 relative overflow-hidden">
                  {/* Mock Map Visualization */}
                  <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-1 opacity-20">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="bg-blue-300 dark:bg-blue-700 rounded-sm" />
                    ))}
                  </div>
                  
                  {/* Simulated Data Points */}
                  <div className="absolute inset-0">
                    {yieldData.slice(0, 20).map((point, index) => {
                      const x = ((point.longitude + 180) / 360) * 100;
                      const y = ((90 - point.latitude) / 180) * 100;
                      return (
                        <motion.div
                          key={index}
                          className={`absolute w-3 h-3 rounded-full ${getYieldColor(point.yield, stats?.avgYield || 1)} opacity-80 border-2 border-white shadow-lg`}
                          style={{ 
                            left: `${Math.min(Math.max(x, 5), 95)}%`, 
                            top: `${Math.min(Math.max(y, 5), 95)}%` 
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.5 }}
                          title={`${point.crop || 'Crop'}: ${point.yield.toFixed(2)} t/ha`}
                        />
                      );
                    })}
                  </div>

                  <div className="text-center relative z-10">
                    <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Yield Distribution Map</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Interactive map with {yieldData.length} yield data points
                    </p>
                    
                    {/* Legend */}
                    <div className="inline-flex items-center space-x-4 bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span>Very Low</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                        <span>Low</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <span>Average</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-lime-500 rounded-full" />
                        <span>High</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span>Very High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Data Table */}
        {yieldData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Yield Data Table</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Coordinates</TableHead>
                        <TableHead>Production</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Yield (t/ha)</TableHead>
                        <TableHead>Performance</TableHead>
                        {yieldData[0]?.crop && <TableHead>Crop</TableHead>}
                        {yieldData[0]?.region && <TableHead>Region</TableHead>}
                        {yieldData[0]?.year && <TableHead>Year</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {yieldData.slice(0, 100).map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">
                            {row.latitude.toFixed(4)}, {row.longitude.toFixed(4)}
                          </TableCell>
                          <TableCell>{row.production.toFixed(1)} t</TableCell>
                          <TableCell>{row.area.toFixed(1)} ha</TableCell>
                          <TableCell className="font-medium">{row.yield.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={`${getYieldColor(row.yield, stats?.avgYield || 1)} text-white`}>
                              {getYieldLabel(row.yield, stats?.avgYield || 1)}
                            </Badge>
                          </TableCell>
                          {row.crop && <TableCell>{row.crop}</TableCell>}
                          {row.region && <TableCell>{row.region}</TableCell>}
                          {row.year && <TableCell>{row.year}</TableCell>}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {yieldData.length > 100 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                      Showing first 100 rows of {yieldData.length} total entries
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}