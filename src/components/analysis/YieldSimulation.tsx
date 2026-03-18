import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Brain, Play, Plus, Trash2, Download, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface ScenarioFeatures {
  temperature?: number;
  rainfall?: number;
  humidity?: number;
  soil_ph?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  crop_type?: string;
  irrigation?: string;
  fertilizer?: string;
  area?: number;
  [key: string]: any;
}

interface ScenarioResult {
  id: string;
  name: string;
  features: ScenarioFeatures;
  predicted_yield?: number;
  error?: string;
  confidence?: number;
  model_type: string;
}

export function YieldSimulation() {
  const [scenarios, setScenarios] = useState<ScenarioResult[]>([]);
  const [currentScenario, setCurrentScenario] = useState<ScenarioFeatures>({});
  const [scenarioName, setScenarioName] = useState('');
  const [selectedModel, setSelectedModel] = useState('xgboost');
  const [loading, setLoading] = useState(false);
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);

  const modelTypes = [
    { value: 'xgboost', label: 'XGBoost (Recommended)', description: 'Advanced ensemble method' },
    { value: 'linear', label: 'Linear Regression', description: 'Simple linear model' },
    { value: 'random_forest', label: 'Random Forest', description: 'Tree-based ensemble' },
    { value: 'neural_network', label: 'Neural Network', description: 'Deep learning model' }
  ];

  const featureFields = [
    { key: 'temperature', label: 'Temperature (°C)', type: 'number', min: -10, max: 50, step: 0.1 },
    { key: 'rainfall', label: 'Rainfall (mm)', type: 'number', min: 0, max: 2000, step: 1 },
    { key: 'humidity', label: 'Humidity (%)', type: 'number', min: 0, max: 100, step: 1 },
    { key: 'soil_ph', label: 'Soil pH', type: 'number', min: 3, max: 10, step: 0.1 },
    { key: 'nitrogen', label: 'Nitrogen (kg/ha)', type: 'number', min: 0, max: 300, step: 1 },
    { key: 'phosphorus', label: 'Phosphorus (kg/ha)', type: 'number', min: 0, max: 100, step: 1 },
    { key: 'potassium', label: 'Potassium (kg/ha)', type: 'number', min: 0, max: 200, step: 1 },
    { key: 'area', label: 'Farm Area (ha)', type: 'number', min: 0.1, max: 1000, step: 0.1 }
  ];

  const cropTypes = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Soybean', 'Groundnut', 'Barley'];
  const irrigationTypes = ['Drip', 'Sprinkler', 'Flood', 'None'];
  const fertilizerTypes = ['Organic', 'Chemical', 'Mixed', 'None'];

  const runSingleSimulation = async () => {
    if (!scenarioName.trim()) {
      alert('Please enter a scenario name');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock prediction logic
      const mockPredict = (features: ScenarioFeatures) => {
        const baseYield = 3.5;
        let yieldModifier = 1;
        
        // Temperature effect
        if (features.temperature !== undefined) {
          const optimalTemp = 25;
          const tempDiff = Math.abs(features.temperature - optimalTemp);
          yieldModifier *= Math.max(0.5, 1 - (tempDiff * 0.02));
        }
        
        // Rainfall effect
        if (features.rainfall !== undefined) {
          const optimalRain = 800;
          const rainDiff = Math.abs(features.rainfall - optimalRain);
          yieldModifier *= Math.max(0.6, 1 - (rainDiff * 0.0005));
        }
        
        // Soil pH effect
        if (features.soil_ph !== undefined) {
          const optimalPH = 6.5;
          const phDiff = Math.abs(features.soil_ph - optimalPH);
          yieldModifier *= Math.max(0.7, 1 - (phDiff * 0.1));
        }
        
        // Nutrient effects
        if (features.nitrogen !== undefined) {
          yieldModifier *= Math.min(1.3, 1 + (features.nitrogen * 0.002));
        }
        if (features.phosphorus !== undefined) {
          yieldModifier *= Math.min(1.2, 1 + (features.phosphorus * 0.003));
        }
        if (features.potassium !== undefined) {
          yieldModifier *= Math.min(1.15, 1 + (features.potassium * 0.002));
        }
        
        // Add some randomness for realism
        const randomFactor = 0.9 + Math.random() * 0.2;
        
        return baseYield * yieldModifier * randomFactor;
      };

      const predictedYield = mockPredict(currentScenario);
      const confidence = Math.random() * 20 + 75; // 75-95% confidence
      
      const newScenario: ScenarioResult = {
        id: Date.now().toString(),
        name: scenarioName,
        features: { ...currentScenario },
        predicted_yield: predictedYield,
        confidence,
        model_type: selectedModel
      };

      setScenarios(prev => [...prev, newScenario]);
      setCurrentScenario({});
      setScenarioName('');
      
    } catch (error) {
      const errorScenario: ScenarioResult = {
        id: Date.now().toString(),
        name: scenarioName,
        features: { ...currentScenario },
        error: 'Simulation failed: Invalid input parameters',
        model_type: selectedModel
      };
      setScenarios(prev => [...prev, errorScenario]);
    } finally {
      setLoading(false);
    }
  };

  const runBulkSimulation = async () => {
    if (!bulkInput.trim()) {
      alert('Please enter bulk scenario data');
      return;
    }

    setLoading(true);
    
    try {
      // Parse JSON input
      const bulkScenarios = JSON.parse(bulkInput);
      
      if (!Array.isArray(bulkScenarios)) {
        throw new Error('Input must be an array of scenarios');
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      const results = bulkScenarios.map((scenario, index) => {
        const mockYield = 2 + Math.random() * 4; // 2-6 tons/ha
        return {
          id: `${Date.now()}_${index}`,
          name: `Bulk Scenario ${index + 1}`,
          features: scenario,
          predicted_yield: mockYield,
          confidence: Math.random() * 20 + 75,
          model_type: selectedModel
        };
      });

      setScenarios(prev => [...prev, ...results]);
      setBulkInput('');
      setShowBulkInput(false);
      
    } catch (error) {
      alert('Error parsing bulk input: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteScenario = (id: string) => {
    setScenarios(prev => prev.filter(s => s.id !== id));
  };

  const exportResults = () => {
    const csvContent = [
      ['Scenario Name', 'Model', 'Predicted Yield', 'Confidence', 'Temperature', 'Rainfall', 'Humidity', 'Soil pH', 'Nitrogen', 'Phosphorus', 'Potassium', 'Crop Type', 'Error'].join(','),
      ...scenarios.map(s => [
        s.name,
        s.model_type,
        s.predicted_yield?.toFixed(2) || 'N/A',
        s.confidence?.toFixed(1) || 'N/A',
        s.features.temperature || '',
        s.features.rainfall || '',
        s.features.humidity || '',
        s.features.soil_ph || '',
        s.features.nitrogen || '',
        s.features.phosphorus || '',
        s.features.potassium || '',
        s.features.crop_type || '',
        s.error || ''
      ].join(','))
    ].join('\n');

    const element = document.createElement('a');
    const file = new Blob([csvContent], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = 'yield_simulation_results.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const stats = scenarios.length > 0 ? {
    total: scenarios.length,
    successful: scenarios.filter(s => s.predicted_yield !== undefined).length,
    avgYield: scenarios
      .filter(s => s.predicted_yield !== undefined)
      .reduce((sum, s) => sum + (s.predicted_yield || 0), 0) / 
      scenarios.filter(s => s.predicted_yield !== undefined).length,
    maxYield: Math.max(...scenarios.filter(s => s.predicted_yield !== undefined).map(s => s.predicted_yield || 0)),
    minYield: Math.min(...scenarios.filter(s => s.predicted_yield !== undefined).map(s => s.predicted_yield || 0))
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-indigo-950/30">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yield Simulation</h1>
              <p className="text-gray-600 dark:text-gray-400">Run scenarios to predict crop yields using ML models</p>
            </div>
          </div>
        </motion.div>

        {/* Model Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Model Selection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {modelTypes.map(model => (
                  <motion.div
                    key={model.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all ${
                        selectedModel === model.value 
                          ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/30' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                      onClick={() => setSelectedModel(model.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{model.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{model.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scenario Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Scenario</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBulkInput(!showBulkInput)}
                  >
                    Bulk Input
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!showBulkInput ? (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="scenario-name">Scenario Name</Label>
                    <Input
                      id="scenario-name"
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                      placeholder="e.g., High Rainfall Scenario"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featureFields.map(field => (
                      <div key={field.key}>
                        <Label htmlFor={field.key}>{field.label}</Label>
                        <Input
                          id={field.key}
                          type={field.type}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={currentScenario[field.key] || ''}
                          onChange={(e) => setCurrentScenario(prev => ({
                            ...prev,
                            [field.key]: e.target.value ? parseFloat(e.target.value) : undefined
                          }))}
                          className="mt-1"
                        />
                      </div>
                    ))}

                    <div>
                      <Label htmlFor="crop-type">Crop Type</Label>
                      <Select 
                        value={currentScenario.crop_type || ''} 
                        onValueChange={(value) => setCurrentScenario(prev => ({...prev, crop_type: value}))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          {cropTypes.map(crop => (
                            <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="irrigation">Irrigation</Label>
                      <Select 
                        value={currentScenario.irrigation || ''} 
                        onValueChange={(value) => setCurrentScenario(prev => ({...prev, irrigation: value}))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select irrigation" />
                        </SelectTrigger>
                        <SelectContent>
                          {irrigationTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="fertilizer">Fertilizer</Label>
                      <Select 
                        value={currentScenario.fertilizer || ''} 
                        onValueChange={(value) => setCurrentScenario(prev => ({...prev, fertilizer: value}))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select fertilizer" />
                        </SelectTrigger>
                        <SelectContent>
                          {fertilizerTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={runSingleSimulation} 
                    disabled={loading || !scenarioName.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Running Simulation...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Run Simulation</span>
                      </div>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bulk-input">Bulk Scenario JSON</Label>
                    <Textarea
                      id="bulk-input"
                      value={bulkInput}
                      onChange={(e) => setBulkInput(e.target.value)}
                      placeholder={`[
  {"temperature": 25, "rainfall": 800, "soil_ph": 6.5, "crop_type": "Rice"},
  {"temperature": 30, "rainfall": 600, "soil_ph": 7.0, "crop_type": "Wheat"}
]`}
                      rows={8}
                      className="mt-1 font-mono text-sm"
                    />
                  </div>
                  <Button 
                    onClick={runBulkSimulation} 
                    disabled={loading || !bulkInput.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    {loading ? 'Processing...' : 'Run Bulk Simulation'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Total Scenarios', value: stats.total, color: 'purple' },
                { label: 'Successful', value: stats.successful, color: 'green' },
                { label: 'Avg Yield', value: `${stats.avgYield.toFixed(2)} t/ha`, color: 'blue' },
                { label: 'Max Yield', value: `${stats.maxYield.toFixed(2)} t/ha`, color: 'emerald' },
                { label: 'Min Yield', value: `${stats.minYield.toFixed(2)} t/ha`, color: 'red' }
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
        {scenarios.length > 0 && (
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
                    <span>Simulation Results ({scenarios.length})</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={exportResults}>
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
                        <TableHead>Scenario</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Predicted Yield</TableHead>
                        <TableHead>Confidence</TableHead>
                        <TableHead>Key Features</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scenarios.map(scenario => (
                        <TableRow key={scenario.id}>
                          <TableCell className="font-medium">{scenario.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{scenario.model_type}</Badge>
                          </TableCell>
                          <TableCell>
                            {scenario.predicted_yield ? (
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="font-medium">{scenario.predicted_yield.toFixed(2)} t/ha</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {scenario.confidence ? (
                              <Badge className="bg-blue-500 text-white">
                                {scenario.confidence.toFixed(1)}%
                              </Badge>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                            {Object.entries(scenario.features)
                              .filter(([_, value]) => value !== undefined && value !== '')
                              .slice(0, 3)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(', ')}
                          </TableCell>
                          <TableCell>
                            {scenario.error ? (
                              <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm">Error</span>
                              </div>
                            ) : (
                              <Badge className="bg-green-500 text-white">Success</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteScenario(scenario.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {scenarios.some(s => s.error) && (
                  <Alert className="mt-4 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30">
                    <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                      Some scenarios failed. Check your input parameters and try again.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}