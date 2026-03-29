import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Switch } from './components/ui/switch';
import { Bell, User, Search, Sun, Moon, Globe, Award, TrendingUp, BarChart3, Leaf, Shield, Users, HelpCircle, Sparkles, Zap, Brain, MapPin, AlertCircle, Wheat, Tractor, Sprout, TreePine } from 'lucide-react';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ProfileManager } from './components/ProfileManager';
import { HelpSupport } from './components/HelpSupport';
import { UpdatesNews } from './components/UpdatesNews';
import { VegetationAnalysis } from './components/analysis/VegetationAnalysis';
import { PestMonitoring } from './components/analysis/PestMonitoring';
import { YieldMapping } from './components/analysis/YieldMapping';
import { YieldSimulation } from './components/analysis/YieldSimulation';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userType, setUserType] = useState('farmer');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(3);
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState('Bronze Farmer');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const languages = {
    en: { label: 'English', flag: '🇺🇸' },
    hi: { label: 'हिंदी', flag: '🇮🇳' },
    te: { label: 'తెలుగు', flag: '🇮🇳' },
    ta: { label: 'தமிழ்', flag: '🇮🇳' },
    bn: { label: 'বাংলা', flag: '🇧🇩' },
    mr: { label: 'मराठी', flag: '🇮🇳' },
    pa: { label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    gu: { label: 'ગુજરાતી', flag: '🇮🇳' },
    kn: { label: 'ಕನ್ನಡ', flag: '🇮🇳' },
    ml: { label: 'മലയാളം', flag: '🇮🇳' },
    or: { label: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    ur: { label: 'اردو', flag: '🇵🇰' },
    es: { label: 'Español', flag: '🇪🇸' },
    fr: { label: 'Français', flag: '🇫🇷' },
    pt: { label: 'Português', flag: '🇧🇷' },
    de: { label: 'Deutsch', flag: '🇩🇪' },
    zh: { label: '中文', flag: '🇨🇳' },
    ja: { label: '日本語', flag: '🇯🇵' },
    ar: { label: 'العربية', flag: '🇸🇦' },
    ru: { label: 'Русский', flag: '🇷🇺' },
    id: { label: 'Bahasa Indonesia', flag: '🇮🇩' },
    vi: { label: 'Tiếng Việt', flag: '🇻🇳' },
    th: { label: 'ไทย', flag: '🇹🇭' },
    sw: { label: 'Kiswahili', flag: '🇰🇪' }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 relative overflow-hidden perspective-3d">
      {/* Premium Animated Background with multi-layer orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none preserve-3d">
        {/* Top right gradient orb */}
        <motion.div
          className="absolute -top-52 -right-52 w-96 h-96 bg-gradient-to-br from-emerald-300/15 via-teal-300/10 to-cyan-300/5 rounded-full blur-3xl"
          animate={{ 
            rotate: 360,
            z: [0, 80, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bottom left gradient orb */}
        <motion.div
          className="absolute -bottom-52 -left-52 w-96 h-96 bg-gradient-to-tr from-teal-300/15 via-emerald-300/10 to-green-300/5 rounded-full blur-3xl"
          animate={{ 
            rotate: -360,
            z: [0, -80, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Center accent orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-200/5 to-teal-200/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Premium Header with professional branding */}
      <motion.div 
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-emerald-200/30 dark:border-emerald-800/30 sticky top-0 z-50 shadow-lg shadow-emerald-500/5"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Premium Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(5, 150, 105, 0.3)',
                    '0 0 40px rgba(5, 150, 105, 0.5)',
                    '0 0 20px rgba(5, 150, 105, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Premium Agricultural SVG Logo */}
                <svg className="w-8 h-8 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10 Q70 30 60 50 Q50 60 40 50 Q30 30 50 10" fill="currentColor" opacity="0.9"/>
                  <path d="M30 50 Q20 60 15 75 Q30 85 50 85 Q70 85 85 75 Q80 60 70 50" fill="currentColor" opacity="0.7"/>
                  <circle cx="50" cy="50" r="8" fill="white" opacity="0.6"/>
                </svg>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                  Yieldly
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Precision Farming Platform</p>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsDarkMode(!isDarkMode)} 
                  className="rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
                </Button>
              </motion.div>

              <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  {notifications > 0 && (
                    <motion.div 
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                      animate={{ scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {notifications}
                    </motion.div>
                  )}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentView('profile')} 
                  className="rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        className="px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="text-center mb-8 relative">
          {/* Animated Trees - Left Side */}
          <motion.div 
            className="absolute left-0 bottom-0 w-24 h-32 opacity-20"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
          >
            <svg viewBox="0 0 100 140" className="w-full h-full">
              {/* Tree trunk */}
              <motion.rect 
                x="42" 
                y="90" 
                width="16" 
                height="50" 
                fill="#8B4513"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{ originY: 1 }}
              />
              {/* Tree leaves - bottom layer */}
              <motion.circle 
                cx="50" 
                cy="80" 
                r="25" 
                fill="#22c55e"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
              />
              {/* Tree leaves - middle layer */}
              <motion.circle 
                cx="50" 
                cy="60" 
                r="22" 
                fill="#16a34a"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
              />
              {/* Tree leaves - top layer */}
              <motion.circle 
                cx="50" 
                cy="45" 
                r="18" 
                fill="#15803d"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, duration: 0.6, type: "spring" }}
              />
            </svg>
          </motion.div>

          {/* Animated Trees - Right Side */}
          <motion.div 
            className="absolute right-0 bottom-0 w-28 h-36 opacity-20"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, type: "spring" }}
          >
            <svg viewBox="0 0 100 140" className="w-full h-full">
              <motion.rect 
                x="40" 
                y="85" 
                width="20" 
                height="55" 
                fill="#8B4513"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{ originY: 1 }}
              />
              <motion.circle 
                cx="50" 
                cy="75" 
                r="28" 
                fill="#22c55e"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
              />
              <motion.circle 
                cx="50" 
                cy="52" 
                r="24" 
                fill="#16a34a"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, duration: 0.6, type: "spring" }}
              />
              <motion.circle 
                cx="50" 
                cy="35" 
                r="20" 
                fill="#15803d"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
              />
            </svg>
          </motion.div>

          {/* Floating Leaves Animation */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 10}%`,
              }}
              initial={{ y: 0, rotate: 0, opacity: 0 }}
              animate={{
                y: [0, -20, -40, -20, 0],
                rotate: [0, 10, -10, 5, 0],
                opacity: [0, 0.6, 0.8, 0.6, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              <Wheat className="w-5 h-5 text-green-500/40" />
            </motion.div>
          ))}

          {/* Decorative Dots Pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-green-400/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1, 0],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="mb-4 relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200/50 dark:border-green-800/50">
              <Wheat className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">AI-Powered Agriculture</span>
            </div>
          </div>
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-3 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Smart Farming for
            <br />
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent">
              Better Yields
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Maximize your crop potential with AI-driven insights and real-time monitoring
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search crops, weather, farm tips..."
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 shadow-lg text-lg"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Settings */}
      <motion.div 
        className="px-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/20 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  aria-label="Select language"
                  className="bg-transparent text-sm focus:outline-none font-medium"
                >
                  {Object.entries(languages).map(([code, lang]) => (
                    <option key={code} value={code}>{lang.flag} {lang.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Dark Mode</span>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Progress */}
      <motion.div 
        className="px-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-lime-400/10 dark:from-green-600/20 dark:via-emerald-600/20 dark:to-lime-600/20 backdrop-blur-xl border border-green-200/30 dark:border-green-800/30 shadow-xl shadow-green-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{userLevel}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{userPoints} points • 750 to Silver</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-medium">
                Level 3
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress to next level</span>
                <span className="font-medium text-gray-900 dark:text-white">62%</span>
              </div>
              <div className="w-full bg-green-200/50 dark:bg-green-900/20 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '62%' }}
                  transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div
        className="px-6 mb-8 preserve-3d"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Access</h3>
        <div className="grid grid-cols-2 gap-4 perspective-3d">
          {[
            { icon: Wheat, title: "Crop Predictions", subtitle: "AI-powered forecasts", gradient: "from-green-500 to-emerald-600", action: () => setCurrentView('farmer') },
            { icon: BarChart3, title: "Farm Analytics", subtitle: "Yield insights", gradient: "from-emerald-500 to-lime-600", action: () => setCurrentView('admin') },
            { icon: User, title: "Farm Profile", subtitle: "Manage account", gradient: "from-lime-500 to-yellow-600", action: () => setCurrentView('profile') },
            { icon: Tractor, title: "Farm Support", subtitle: "Expert guidance", gradient: "from-amber-500 to-orange-600", action: () => setCurrentView('help') }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.0 + (index * 0.1), duration: 0.6, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                rotateX: -5,
                z: 50,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95, rotateY: 0, rotateX: 0 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card 
                className={`bg-gradient-to-br ${item.gradient} border-0 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300`}
                onClick={item.action}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <CardContent className="p-6 text-center" style={{ transform: 'translateZ(20px)' }}>
                  <motion.div
                    whileHover={{ rotateY: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-10 h-10 text-white mx-auto mb-3" />
                  </motion.div>
                  <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-white/80 text-sm">{item.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analysis Tools */}
      <motion.div 
        className="px-6 preserve-3d"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Analysis Tools</h3>
        <div className="grid grid-cols-2 gap-4 perspective-3d">
          {[
            { icon: Sprout, title: "Crop Health", subtitle: "NDVI monitoring", gradient: "from-green-500 to-emerald-600", action: () => setCurrentView('vegetation') },
            { icon: AlertCircle, title: "Pest Control", subtitle: "Early warnings", gradient: "from-red-500 to-orange-600", action: () => setCurrentView('pest') },
            { icon: MapPin, title: "Field Mapping", subtitle: "Yield visualization", gradient: "from-emerald-500 to-teal-600", action: () => setCurrentView('yield-map') },
            { icon: Brain, title: "Smart Planning", subtitle: "Crop scenarios", gradient: "from-lime-500 to-green-600", action: () => setCurrentView('simulation') }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.2 + (index * 0.1), duration: 0.6, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: -5,
                rotateX: 5,
                z: 50,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95, rotateY: 0, rotateX: 0 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card 
                className={`bg-gradient-to-br ${item.gradient} border-0 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300`}
                onClick={item.action}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <CardContent className="p-6 text-center" style={{ transform: 'translateZ(20px)' }}>
                  <motion.div
                    whileHover={{ rotateY: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-10 h-10 text-white mx-auto mb-3" />
                  </motion.div>
                  <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-white/80 text-sm">{item.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Latest Updates */}
      <motion.div 
        className="px-6 mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Latest Updates</h3>
        <div className="space-y-4">
          {[
            {
              icon: Bell,
              iconColor: "text-green-600",
              bgColor: "bg-green-100 dark:bg-green-900/30",
              borderColor: "border-green-200/50 dark:border-green-800/50",
              title: "Smart Weather Alerts",
              subtitle: "Real-time weather monitoring for better farm planning",
              time: "2 hours ago"
            },
            {
              icon: Users,
              iconColor: "text-emerald-600",
              bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
              borderColor: "border-emerald-200/50 dark:border-emerald-800/50",
              title: "MSP Rates Updated",
              subtitle: "New pricing for Kharif crops - maximize your profits",
              time: "1 day ago"
            }
          ].map((update, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 + (index * 0.1), duration: 0.6 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <Card className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border ${update.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${update.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <update.icon className={`w-6 h-6 ${update.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">{update.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{update.subtitle}</p>
                      <Badge variant="outline" className="text-xs">
                        {update.time}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-white/20 dark:border-gray-800/20 z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.8 }}
      >
        <div className="px-6 py-3">
          <div className="flex justify-around items-center">
            {[
              { icon: "🏡", label: "Farm Home", action: () => setCurrentView('home'), active: currentView === 'home' },
              { icon: "🌾", label: "Crops", action: () => setCurrentView('farmer'), active: currentView === 'farmer' },
              { icon: "📈", label: "Reports", action: () => setCurrentView('admin'), active: currentView === 'admin' },
              { icon: "🔬", label: "Tools", action: () => setCurrentView('vegetation'), active: ['vegetation', 'pest', 'yield-map', 'simulation'].includes(currentView) }
            ].map((item, index) => (
              <Button 
                key={index}
                variant="ghost" 
                size="sm" 
                onClick={item.action}
                className={`flex-col space-y-1 relative px-4 py-3 rounded-2xl transition-all duration-300 ${
                  item.active 
                    ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Mobile Phone Frame Container */}
      <div className="mobile-phone-frame mobile-container bg-black rounded-3xl shadow-2xl overflow-hidden border-[14px] border-gray-900 mx-auto">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-50" />
        
        {/* Screen Content */}
        <div className="w-full h-full overflow-y-auto bg-background">
          {currentView === 'home' && renderHome()}
          {currentView === 'farmer' && <FarmerDashboard userPoints={userPoints} setUserPoints={setUserPoints} />}
          {currentView === 'admin' && <AdminDashboard />}
          {currentView === 'profile' && <ProfileManager userType={userType} setUserType={setUserType} userPoints={userPoints} userLevel={userLevel} />}
          {currentView === 'help' && <HelpSupport />}
          {currentView === 'updates' && <UpdatesNews />}
          {currentView === 'vegetation' && <VegetationAnalysis />}
          {currentView === 'pest' && <PestMonitoring />}
          {currentView === 'yield-map' && <YieldMapping />}
          {currentView === 'simulation' && <YieldSimulation />}
          
          {/* Home Button for Non-Home Views */}
          {currentView !== 'home' && (
            <div className="absolute top-4 right-4 z-50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('home')}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
              >
                🏠 Home
              </Button>
            </div>
          )}
        </div>
        
        {/* Safe Area - Navigation Buttons at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20 px-4 py-2 flex justify-center items-center gap-2">
          <Button 
            variant={currentView === 'home' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentView('home')}
            className="flex-1 rounded-lg text-xs"
          >
            🏠
          </Button>
          <Button 
            variant={currentView === 'farmer' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentView('farmer')}
            className="flex-1 rounded-lg text-xs"
          >
            👨‍🌾
          </Button>
          <Button 
            variant={currentView === 'admin' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentView('admin')}
            className="flex-1 rounded-lg text-xs"
          >
            📊
          </Button>
          <Button 
            variant={currentView === 'help' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentView('help')}
            className="flex-1 rounded-lg text-xs"
          >
            ❓
          </Button>
        </div>
      </div>
    </div>
  );
}