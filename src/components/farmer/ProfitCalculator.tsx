import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Calculator, TrendingUp, IndianRupee, BarChart3 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ProfitCalculatorProps {
  onCalculation?: () => void;
}

export function ProfitCalculator({ onCalculation }: ProfitCalculatorProps) {
  const [formData, setFormData] = useState({
    crop: '',
    expectedYield: '',
    farmSize: '',
    costPerAcre: '',
    laborCost: '',
    fertilizerCost: '',
    seedCost: '',
    irrigationCost: ''
  });

  const [calculation, setCalculation] = useState<any>(null);

  const cropMSP = {
    wheat: 2275,
    rice: 2183,
    maize: 1800,
    sugarcane: 340,
    cotton: 6620,
    soybean: 4600
  };

  const handleCalculate = () => {
    if (!formData.crop || !formData.expectedYield || !formData.farmSize) return;

    const mspRate = cropMSP[formData.crop as keyof typeof cropMSP] || 2000;
    const totalYield = parseFloat(formData.expectedYield) * parseFloat(formData.farmSize);
    const grossIncome = totalYield * mspRate;
    
    const totalCosts = 
      (parseFloat(formData.costPerAcre) || 0) * parseFloat(formData.farmSize) +
      (parseFloat(formData.laborCost) || 0) +
      (parseFloat(formData.fertilizerCost) || 0) +
      (parseFloat(formData.seedCost) || 0) +
      (parseFloat(formData.irrigationCost) || 0);

    const netProfit = grossIncome - totalCosts;
    const profitMargin = (netProfit / grossIncome) * 100;

    setCalculation({
      totalYield,
      grossIncome,
      totalCosts,
      netProfit,
      profitMargin,
      mspRate,
      breakeven: totalCosts / mspRate,
      profitPerAcre: netProfit / parseFloat(formData.farmSize)
    });

    onCalculation?.();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-purple-600" />
            <span>Profit & MSP Calculator</span>
          </CardTitle>
          <CardDescription>Calculate expected profits based on MSP rates and farming costs</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="crop">Select Crop</Label>
              <Select value={formData.crop} onValueChange={(value) => setFormData({...formData, crop: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">🌾 Wheat (₹2,275/q)</SelectItem>
                  <SelectItem value="rice">🌾 Rice (₹2,183/q)</SelectItem>
                  <SelectItem value="maize">🌽 Maize (₹1,800/q)</SelectItem>
                  <SelectItem value="sugarcane">🎋 Sugarcane (₹340/q)</SelectItem>
                  <SelectItem value="cotton">🌱 Cotton (₹6,620/q)</SelectItem>
                  <SelectItem value="soybean">🫘 Soybean (₹4,600/q)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="expectedYield">Expected Yield (Quintals/Acre)</Label>
              <Input
                id="expectedYield"
                type="number"
                placeholder="e.g., 25"
                value={formData.expectedYield}
                onChange={(e) => setFormData({...formData, expectedYield: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="farmSize">Farm Size (Acres)</Label>
              <Input
                id="farmSize"
                type="number"
                placeholder="e.g., 5"
                value={formData.farmSize}
                onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="costPerAcre">Basic Cost per Acre (₹)</Label>
              <Input
                id="costPerAcre"
                type="number"
                placeholder="e.g., 15000"
                value={formData.costPerAcre}
                onChange={(e) => setFormData({...formData, costPerAcre: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="laborCost">Labor Cost (₹)</Label>
              <Input
                id="laborCost"
                type="number"
                placeholder="e.g., 8000"
                value={formData.laborCost}
                onChange={(e) => setFormData({...formData, laborCost: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="fertilizerCost">Fertilizer Cost (₹)</Label>
              <Input
                id="fertilizerCost"
                type="number"
                placeholder="e.g., 12000"
                value={formData.fertilizerCost}
                onChange={(e) => setFormData({...formData, fertilizerCost: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="seedCost">Seed Cost (₹)</Label>
              <Input
                id="seedCost"
                type="number"
                placeholder="e.g., 3000"
                value={formData.seedCost}
                onChange={(e) => setFormData({...formData, seedCost: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="irrigationCost">Irrigation Cost (₹)</Label>
              <Input
                id="irrigationCost"
                type="number"
                placeholder="e.g., 5000"
                value={formData.irrigationCost}
                onChange={(e) => setFormData({...formData, irrigationCost: e.target.value})}
              />
            </div>
          </div>

          <Button 
            onClick={handleCalculate}
            disabled={!formData.crop || !formData.expectedYield || !formData.farmSize}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Profit & Returns
          </Button>

          {/* Calculation Results */}
          {calculation && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <div className="text-center mb-4">
                  <h3 className="text-lg text-gray-900 dark:text-white mb-2">💰 Profitability Analysis</h3>
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(calculation.netProfit)}
                  </div>
                  <Badge className={`mt-2 ${
                    calculation.netProfit > 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {calculation.netProfit > 0 ? '✅ Profitable' : '❌ Loss'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <IndianRupee className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gross Income</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(calculation.grossIncome)}</p>
                  </div>

                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <BarChart3 className="w-6 h-6 mx-auto mb-1 text-red-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Costs</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(calculation.totalCosts)}</p>
                  </div>

                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <TrendingUp className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Profit Margin</p>
                    <p className="text-lg font-bold text-purple-600">{calculation.profitMargin.toFixed(1)}%</p>
                  </div>

                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Calculator className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Yield</p>
                    <p className="text-lg font-bold text-orange-600">{calculation.totalYield.toFixed(1)}q</p>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">MSP Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Current MSP Rate:</span>
                      <span className="font-medium">₹{calculation.mspRate}/quintal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Profit per Acre:</span>
                      <span className={`font-medium ${calculation.profitPerAcre > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(calculation.profitPerAcre)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Breakeven Yield:</span>
                      <span className="font-medium">{calculation.breakeven.toFixed(1)}q</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {calculation.profitMargin < 20 && (
                      <p className="text-sm text-orange-600">⚠️ Consider optimizing costs to improve margins</p>
                    )}
                    {calculation.profitMargin > 30 && (
                      <p className="text-sm text-green-600">✅ Excellent profit margins!</p>
                    )}
                    {calculation.netProfit < 0 && (
                      <p className="text-sm text-red-600">🚨 Review costs and yield expectations</p>
                    )}
                    <p className="text-xs text-gray-500">MSP rates updated as per government announcements</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}