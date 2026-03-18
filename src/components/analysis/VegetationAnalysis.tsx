import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Upload, FileText, MapPin, TrendingUp, AlertCircle, Download, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface NDVIData {
  latitude?: number;
  longitude?: number;
  nir: number;
  red: number;
  ndvi: number;
}

export function VegetationAnalysis() {
  const [csvData, setCsvData] = useState<NDVIData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [showMap, setShowMap] = useState(false);

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
      
      if (!headers.includes('nir') || !headers.includes('red')) {
        throw new Error('CSV must contain NIR and RED columns');
      }

      const hasCoordinates = headers.includes('latitude') && headers.includes('longitude');
      
      const data: NDVIData[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length !== headers.length) continue;

        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });

        const nir = parseFloat(row.nir);
        const red = parseFloat(row.red);
        
        if (isNaN(nir) || isNaN(red)) continue;

        const ndvi = (nir - red) / (nir + red);
        
        const dataPoint: NDVIData = {
          nir,
          red,
          ndvi
        };

        if (hasCoordinates) {
          const lat = parseFloat(row.latitude);
          const lng = parseFloat(row.longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            dataPoint.latitude = lat;
            dataPoint.longitude = lng;
          }
        }

        data.push(dataPoint);
      }

      setCsvData(data);
      setShowMap(hasCoordinates && data.some(d => d.latitude && d.longitude));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing file');
    } finally {
      setLoading(false);
    }
  };

  const getNDVIColor = (ndvi: number) => {
    if (ndvi < -0.1) return 'bg-red-500';
    if (ndvi < 0.1) return 'bg-yellow-500';
    if (ndvi < 0.3) return 'bg-orange-500';
    if (ndvi < 0.6) return 'bg-lime-500';
    return 'bg-green-500';
  };

  const getNDVILabel = (ndvi: number) => {
    if (ndvi < -0.1) return 'No Vegetation';
    if (ndvi < 0.1) return 'Sparse';
    if (ndvi < 0.3) return 'Moderate';
    if (ndvi < 0.6) return 'Dense';
    return 'Very Dense';
  };

  const stats = csvData.length > 0 ? {
    total: csvData.length,
    avgNDVI: csvData.reduce((sum, d) => sum + d.ndvi, 0) / csvData.length,
    maxNDVI: Math.max(...csvData.map(d => d.ndvi)),
    minNDVI: Math.min(...csvData.map(d => d.ndvi)),
    healthy: csvData.filter(d => d.ndvi > 0.3).length
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vegetation Index Analysis</h1>
              <p className="text-gray-600 dark:text-gray-400">Analyze crop health using NDVI calculations</p>
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
                <span>Upload Satellite Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Click to upload CSV file
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Required columns: NIR, RED (Optional: latitude, longitude)
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
                      <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                      <span>Processing CSV data...</span>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-700 dark:text-red-300">
                      {error}
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Total Points', value: stats.total, color: 'blue' },
                { label: 'Avg NDVI', value: stats.avgNDVI.toFixed(3), color: 'green' },
                { label: 'Max NDVI', value: stats.maxNDVI.toFixed(3), color: 'emerald' },
                { label: 'Min NDVI', value: stats.minNDVI.toFixed(3), color: 'red' },
                { label: 'Healthy Areas', value: `${stats.healthy} (${((stats.healthy/stats.total)*100).toFixed(1)}%)`, color: 'teal' }
              ].map((stat, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results Table */}
        {csvData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>NDVI Results</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    {showMap && (
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        View Map
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {csvData[0]?.latitude && <TableHead>Latitude</TableHead>}
                        {csvData[0]?.longitude && <TableHead>Longitude</TableHead>}
                        <TableHead>NIR</TableHead>
                        <TableHead>RED</TableHead>
                        <TableHead>NDVI</TableHead>
                        <TableHead>Health Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {csvData.slice(0, 100).map((row, index) => (
                        <TableRow key={index}>
                          {row.latitude && <TableCell>{row.latitude.toFixed(4)}</TableCell>}
                          {row.longitude && <TableCell>{row.longitude.toFixed(4)}</TableCell>}
                          <TableCell>{row.nir.toFixed(2)}</TableCell>
                          <TableCell>{row.red.toFixed(2)}</TableCell>
                          <TableCell className="font-medium">{row.ndvi.toFixed(3)}</TableCell>
                          <TableCell>
                            <Badge className={`${getNDVIColor(row.ndvi)} text-white`}>
                              {getNDVILabel(row.ndvi)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {csvData.length > 100 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                      Showing first 100 rows of {csvData.length} total entries
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Map Placeholder */}
        {showMap && csvData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>NDVI Map Visualization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg flex items-center justify-center border border-green-200 dark:border-green-800">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Interactive Map</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Map visualization would show NDVI values with color-coded markers
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      {csvData.filter(d => d.latitude && d.longitude).length} geo-located points available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}