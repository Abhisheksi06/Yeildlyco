import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PredictionCard } from './farmer/PredictionCard';
import { RecommendationsCard } from './farmer/RecommendationsCard';
import { ScenarioSimulator } from './farmer/ScenarioSimulator';
import { FarmHistory } from './farmer/FarmHistory';
import { ChatBot } from './farmer/ChatBot';
import { ProfitCalculator } from './farmer/ProfitCalculator';
import { NDVIMonitor } from './farmer/NDVIMonitor';
import { ClimateProjection } from './farmer/ClimateProjection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, Bot, Calculator, Satellite, CloudRain, History, Home, ArrowLeft } from 'lucide-react';

interface FarmerDashboardProps {
  userPoints: number;
  setUserPoints: (points: number) => void;
}

export function FarmerDashboard({ userPoints, setUserPoints }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

  const addPoints = (points: number) => {
    setUserPoints(userPoints + points);
  };

  const features = [
    {
      id: 'prediction',
      title: 'Yield Prediction',
      description: 'AI-powered crop yield forecasting',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      points: 50,
      emoji: '🌾'
    },
    {
      id: 'chatbot',
      title: 'AI Assistant',
      description: 'Multilingual farming chatbot',
      icon: Bot,
      color: 'from-blue-500 to-cyan-600',
      points: 25,
      emoji: '🤖'
    },
    {
      id: 'calculator',
      title: 'Profit Calculator',
      description: 'Calculate expected profits',
      icon: Calculator,
      color: 'from-purple-500 to-pink-600',
      points: 30,
      emoji: '💰'
    },
    {
      id: 'ndvi',
      title: 'Crop Health',
      description: 'Satellite NDVI monitoring',
      icon: Satellite,
      color: 'from-orange-500 to-red-600',
      points: 40,
      emoji: '📡'
    },
    {
      id: 'climate',
      title: 'Climate Projection',
      description: 'Future weather patterns',
      icon: CloudRain,
      color: 'from-indigo-500 to-purple-600',
      points: 35,
      emoji: '🌤️'
    },
    {
      id: 'history',
      title: 'Farm History',
      description: 'Track your farming data',
      icon: History,
      color: 'from-teal-500 to-green-600',
      points: 20,
      emoji: '📊'
    }
  ];

  const renderHome = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02, y: -5 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">👨‍🌾</span>
              </motion.div>
              <div>
                <h2 className="text-xl text-gray-900 dark:text-white">Welcome, Farmer!</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ready to optimize your crop yields with AI?</p>
                <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {userPoints} points earned
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 perspective-3d">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 50, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.5, type: "spring" }}
            whileHover={{ 
              scale: 1.08, 
              y: -15,
              rotateY: index % 2 === 0 ? 8 : -8,
              rotateX: -8,
              z: 50,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.92 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Card 
              className={`bg-gradient-to-br ${feature.color} border-0 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300`}
              onClick={() => setActiveTab(feature.id)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <CardContent className="p-4 text-center" style={{ transform: 'translateZ(20px)' }}>
                <motion.div 
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.3, rotateZ: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="text-white text-sm mb-1">{feature.title}</h3>
                <p className="text-white/80 text-xs mb-2">{feature.description}</p>
                <Badge className="bg-white/20 text-white text-xs">
                  +{feature.points} points
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { emoji: '🌾', title: 'Yield prediction completed', subtitle: 'Expected: 22.5 quintals/acre', points: '+50 pts', delay: 0.9 },
                { emoji: '🤖', title: 'Chat session with AI assistant', subtitle: 'Asked about fertilizer recommendations', points: '+25 pts', delay: 1.0 },
                { emoji: '📡', title: 'NDVI health check', subtitle: 'Crop health: Good (0.75)', points: '+40 pts', delay: 1.1 }
              ].map((activity, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: activity.delay, duration: 0.5 }}
                  whileHover={{ x: 10, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                >
                  <span className="text-lg">{activity.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.subtitle}</p>
                  </div>
                  <Badge variant="outline">{activity.points}</Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  const renderFeatureContent = () => {
    switch (activeTab) {
      case 'prediction':
        return (
          <div className="space-y-4">
            <PredictionCard onPredictionComplete={() => addPoints(50)} />
            <RecommendationsCard />
            <ScenarioSimulator />
          </div>
        );
      case 'chatbot':
        return <ChatBot onInteraction={() => addPoints(5)} />;
      case 'calculator':
        return <ProfitCalculator onCalculation={() => addPoints(30)} />;
      case 'ndvi':
        return <NDVIMonitor onCheck={() => addPoints(40)} />;
      case 'climate':
        return <ClimateProjection onView={() => addPoints(35)} />;
      case 'history':
        return <FarmHistory />;
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-emerald-900/20 pb-20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-200/50 dark:border-green-800/50 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {activeTab !== 'home' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveTab('home')}
                  className="p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div>
                <h1 className="text-xl text-gray-900 dark:text-white">
                  {activeTab === 'home' ? 'Farmer Dashboard' : features.find(f => f.id === activeTab)?.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activeTab === 'home' ? 'AI-powered farming insights' : features.find(f => f.id === activeTab)?.description}
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {userPoints} points
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {renderFeatureContent()}
      </div>

      {/* Bottom Navigation */}
      {activeTab === 'home' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="px-4 py-2">
            <div className="flex justify-around">
              <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => setActiveTab('home')}>
                <Home className="w-4 h-4" />
                <span className="text-xs">Dashboard</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => setActiveTab('prediction')}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs">Predict</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => setActiveTab('chatbot')}>
                <Bot className="w-4 h-4" />
                <span className="text-xs">Assistant</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col space-y-1" onClick={() => setActiveTab('history')}>
                <History className="w-4 h-4" />
                <span className="text-xs">History</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}