import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Upload, FileText, AlertTriangle, Filter, Search, MapPin, Download, Bug } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface PestData {
  pest_level: number;
  crop?: string;
  location?: string;
  date?: string;
  latitude?: number;
  longitude?: number;
  pest_type?: string;
  [key: string]: any;
}

export function PestMonitoring() {
  const [pestData, setPestData] = useState<PestData[]>([]);
  const [alerts, setAlerts] = useState<PestData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [filters, setFilters] = useState({
    crop: '',
    location: '',
    pestType: '',
    threshold: 5
  });
  const [searchTerm, setSearchTerm] = useState('');

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
      
      if (!headers.includes('pest_level')) {
        throw new Error('CSV must contain pest_level column');
      }

      const data: PestData[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length !== headers.length) continue;

        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });

        const pestLevel = parseFloat(row.pest_level);
        if (isNaN(pestLevel)) continue;

        const dataPoint: PestData = {
          pest_level: pestLevel,
          ...row
        };

        // Convert latitude/longitude if present
        if (row.latitude) {
          const lat = parseFloat(row.latitude);
          if (!isNaN(lat)) dataPoint.latitude = lat;
        }
        if (row.longitude) {
          const lng = parseFloat(row.longitude);
          if (!isNaN(lng)) dataPoint.longitude = lng;
        }

        data.push(dataPoint);
      }

      setPestData(data);
      
      // Generate alerts (pest_level > threshold)
      const alertData = data.filter(d => d.pest_level > filters.threshold);
      setAlerts(alertData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing file');
    } finally {
      setLoading(false);
    }
  };

  const getPestLevelColor = (level: number) => {
    if (level <= 2) return 'bg-green-500';
    if (level <= 4) return 'bg-yellow-500';
    if (level <= 6) return 'bg-orange-500';
    if (level <= 8) return 'bg-red-500';
    return 'bg-red-700';
  };

  const getPestLevelLabel = (level: number) => {
    if (level <= 2) return 'Low';
    if (level <= 4) return 'Moderate';
    if (level <= 6) return 'High';
    if (level <= 8) return 'Critical';
    return 'Severe';
  };

  const filteredData = pestData.filter(item => {
    const matchesCrop = !filters.crop || item.crop?.toLowerCase().includes(filters.crop.toLowerCase());
    const matchesLocation = !filters.location || item.location?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesPestType = !filters.pestType || item.pest_type?.toLowerCase().includes(filters.pestType.toLowerCase());
    const matchesSearch = !searchTerm || Object.values(item).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return matchesCrop && matchesLocation && matchesPestType && matchesSearch;
  });

  const filteredAlerts = alerts.filter(item => {
    const matchesCrop = !filters.crop || item.crop?.toLowerCase().includes(filters.crop.toLowerCase());
    const matchesLocation = !filters.location || item.location?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesPestType = !filters.pestType || item.pest_type?.toLowerCase().includes(filters.pestType.toLowerCase());
    const matchesSearch = !searchTerm || Object.values(item).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return matchesCrop && matchesLocation && matchesPestType && matchesSearch;
  });

  const stats = pestData.length > 0 ? {
    total: pestData.length,
    alerts: alerts.length,
    criticalAlerts: alerts.filter(a => a.pest_level > 8).length,
    avgLevel: pestData.reduce((sum, d) => sum + d.pest_level, 0) / pestData.length,
    maxLevel: Math.max(...pestData.map(d => d.pest_level))
  } : null;

  const uniqueCrops = [...new Set(pestData.map(d => d.crop).filter(Boolean))];
  const uniqueLocations = [...new Set(pestData.map(d => d.location).filter(Boolean))];
  const uniquePestTypes = [...new Set(pestData.map(d => d.pest_type).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/30 dark:via-orange-950/30 dark:to-yellow-950/30">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Bug className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pest Alert Monitoring</h1>
              <p className="text-gray-600 dark:text-gray-400">Monitor and track pest outbreak alerts across regions</p>
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
                <span>Upload Pest Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-orange-200 dark:border-orange-800 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pest-csv-upload"
                  />
                  <label htmlFor="pest-csv-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Click to upload pest data CSV
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Required: pest_level (Optional: crop, location, date, coordinates)
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
                      <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                      <span>Processing pest data...</span>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
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
                { label: 'Total Records', value: stats.total, color: 'blue' },
                { label: 'Active Alerts', value: stats.alerts, color: 'orange' },
                { label: 'Critical Alerts', value: stats.criticalAlerts, color: 'red' },
                { label: 'Avg Pest Level', value: stats.avgLevel.toFixed(1), color: 'yellow' },
                { label: 'Max Pest Level', value: stats.maxLevel.toFixed(1), color: 'red' }
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

        {/* Filters */}
        {pestData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters & Search</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Crop</label>
                    <Select value={filters.crop} onValueChange={(value) => setFilters({...filters, crop: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All crops" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All crops</SelectItem>
                        {uniqueCrops.map(crop => (
                          <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All locations</SelectItem>
                        {uniqueLocations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Pest Type</label>
                    <Select value={filters.pestType} onValueChange={(value) => setFilters({...filters, pestType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All pest types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All pest types</SelectItem>
                        {uniquePestTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Alert Threshold</label>
                    <Input
                      type="number"
                      value={filters.threshold}
                      onChange={(e) => setFilters({...filters, threshold: parseFloat(e.target.value) || 5})}
                      min="0"
                      max="10"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search across all fields..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Alert Summary */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Active Pest Alerts ({filteredAlerts.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {filteredAlerts.filter(a => a.pest_level > 8).length}
                    </div>
                    <div className="text-sm text-red-700 dark:text-red-300">Critical (&gt;8)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {filteredAlerts.filter(a => a.pest_level > 6 && a.pest_level <= 8).length}
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">High (6-8)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {filteredAlerts.filter(a => a.pest_level > filters.threshold && a.pest_level <= 6).length}
                    </div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">Moderate (&gt;{filters.threshold}-6)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Data Table */}
        {pestData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Bug className="w-5 h-5" />
                    <span>Pest Data ({filteredData.length} records)</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      View Map
                    </Button>
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
                        <TableHead>Pest Level</TableHead>
                        <TableHead>Status</TableHead>
                        {pestData[0]?.crop && <TableHead>Crop</TableHead>}
                        {pestData[0]?.location && <TableHead>Location</TableHead>}
                        {pestData[0]?.date && <TableHead>Date</TableHead>}
                        {pestData[0]?.pest_type && <TableHead>Pest Type</TableHead>}
                        {pestData[0]?.latitude && <TableHead>Coordinates</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.slice(0, 100).map((row, index) => (
                        <TableRow key={index} className={row.pest_level > filters.threshold ? 'bg-red-50 dark:bg-red-950/20' : ''}>
                          <TableCell className="font-medium">{row.pest_level.toFixed(1)}</TableCell>
                          <TableCell>
                            <Badge className={`${getPestLevelColor(row.pest_level)} text-white`}>
                              {getPestLevelLabel(row.pest_level)}
                            </Badge>
                          </TableCell>
                          {row.crop && <TableCell>{row.crop}</TableCell>}
                          {row.location && <TableCell>{row.location}</TableCell>}
                          {row.date && <TableCell>{row.date}</TableCell>}
                          {row.pest_type && <TableCell>{row.pest_type}</TableCell>}
                          {row.latitude && row.longitude && (
                            <TableCell>{row.latitude.toFixed(4)}, {row.longitude.toFixed(4)}</TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filteredData.length > 100 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                      Showing first 100 rows of {filteredData.length} filtered entries
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