import React from 'react';
import { Lightbulb, Droplets, Leaf, Sun, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export function RecommendationsCard() {
  const recommendations = [
    {
      category: 'Fertilizer',
      icon: Leaf,
      color: 'green',
      priority: 'high',
      title: 'Increase Urea Application',
      description: 'Use 15% more urea fertilizer for better nitrogen content',
      impact: '+3.2 quintals/acre expected increase',
      action: 'Apply 45kg urea per acre instead of 40kg',
      timeframe: 'Within next 7 days'
    },
    {
      category: 'Irrigation',
      icon: Droplets,
      color: 'blue',
      priority: 'medium',
      title: 'Optimize Irrigation Schedule',
      description: 'Shift irrigation timing to early morning hours',
      impact: '20% water savings, better absorption',
      action: 'Water between 5-7 AM instead of afternoon',
      timeframe: 'Immediate implementation'
    },
    {
      category: 'Timing',
      icon: Sun,
      color: 'orange',
      priority: 'medium',
      title: 'Optimal Harvesting Window',
      description: 'Best harvesting time based on weather forecast',
      impact: 'Minimize post-harvest losses',
      action: 'Plan harvest between March 15-25',
      timeframe: 'Plan ahead for 2 months'
    },
    {
      category: 'Pest Control',
      icon: AlertTriangle,
      color: 'red',
      priority: 'high',
      title: 'Preventive Pest Management',
      description: 'High risk of aphid infestation detected',
      impact: 'Prevent up to 15% yield loss',
      action: 'Apply neem-based pesticide spray',
      timeframe: 'Within next 3 days'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <span>Smart Recommendations</span>
          </CardTitle>
          <CardDescription>Personalized farming advice based on your crop and conditions</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Optimization Summary</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Potential Yield Increase</p>
                  <p className="font-bold text-green-600">+12.5%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expected Additional Revenue</p>
                  <p className="font-bold text-blue-600">₹8,500</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Implementation Cost</p>
                  <p className="font-bold text-purple-600">₹2,100</p>
                </div>
              </div>
            </div>

            {/* Recommendations List */}
            <div className="space-y-4">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`bg-${rec.color}-100 dark:bg-${rec.color}-900 p-2 rounded-lg`}>
                              <Icon className={`h-5 w-5 text-${rec.color}-600 dark:text-${rec.color}-400`} />
                            </div>
                            <div>
                              <h4 className="font-semibold">{rec.title}</h4>
                              <p className="text-sm text-muted-foreground">{rec.description}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className={getPriorityColor(rec.priority)}>
                            {rec.priority.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Expected Impact</p>
                            <p className="font-medium text-green-600">{rec.impact}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Action Required</p>
                            <p className="font-medium">{rec.action}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Timeframe</p>
                            <p className="font-medium text-orange-600">{rec.timeframe}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Action Buttons */}
            <Separator />
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">
                📋 Save Recommendations
              </Button>
              <Button variant="outline" className="flex-1">
                📱 Set Reminders
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600">
                ✅ Mark as Implemented
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}