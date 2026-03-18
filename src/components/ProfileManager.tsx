import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, Settings, Shield, Award, Bell, Globe, Edit, Camera, Save, Check, Star, Trophy, Target, Zap, LogOut, LogIn, UserCheck, Wheat, Tractor, Sprout, TreePine } from 'lucide-react';

interface ProfileManagerProps {
  userType: string;
  setUserType: (type: string) => void;
  userPoints: number;
  userLevel: string;
}

export function ProfileManager({ userType, setUserType, userPoints, userLevel }: ProfileManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentTab, setCurrentTab] = useState('farmer');
  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    yieldUpdates: true,
    mspChanges: true,
    systemUpdates: false
  });

  const [profile, setProfile] = useState({
    name: userType === 'farmer' ? 'Ramesh Kumar' : 'Dr. Priya Sharma',
    email: userType === 'farmer' ? 'ramesh.kumar@gmail.com' : 'priya.sharma@gov.in',
    phone: '+91 98765 43210',
    location: userType === 'farmer' ? 'Kanpur, UP' : 'New Delhi',
    farmSize: userType === 'farmer' ? '5.2 acres' : 'N/A',
    crops: userType === 'farmer' ? 'Wheat, Rice, Sugarcane' : 'All Crops',
    department: userType === 'admin' ? 'Ministry of Agriculture' : 'N/A'
  });

  const achievements = [
    { name: 'Early Adopter', icon: '🌱', description: 'First 100 users to join Yieldly', unlocked: true, points: 50 },
    { name: 'Data Pioneer', icon: '📊', description: 'Shared crop data for 5 seasons', unlocked: true, points: 100 },
    { name: 'Weather Wise', icon: '🌤️', description: 'Used weather alerts for 30 days', unlocked: true, points: 75 },
    { name: 'Yield Master', icon: '🏆', description: 'Achieved 95% prediction accuracy', unlocked: false, points: 200 },
    { name: 'Community Helper', icon: '🤝', description: 'Helped 10+ farmers with advice', unlocked: false, points: 150 },
    { name: 'Sustainability Champion', icon: '🌍', description: 'Reduced water usage by 20%', unlocked: false, points: 300 }
  ];

  const verificationBadges = [
    { name: 'Identity Verified', icon: '✅', verified: true },
    { name: 'Land Records Verified', icon: '📄', verified: userType === 'farmer' },
    { name: 'Government Official', icon: '🏛️', verified: userType === 'admin' },
    { name: 'Data Quality Badge', icon: '🎯', verified: true }
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profile);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-lime-950/30 relative overflow-hidden">
        {/* 3D Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-lime-400/20 to-yellow-400/20 rounded-full blur-3xl"
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, 40, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {/* Floating farm elements */}
          <motion.div
            className="absolute top-20 left-20 w-16 h-16 opacity-10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Wheat className="w-full h-full text-green-600" />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-20 w-20 h-20 opacity-10"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -15, 15, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Tractor className="w-full h-full text-amber-600" />
          </motion.div>
        </div>

        <div className="flex items-center justify-center min-h-screen px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-green-500/10">
              <CardHeader className="text-center space-y-4">
                <motion.div
                  className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25"
                  whileHover={{ scale: 1.1, rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sprout className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Welcome to Yieldly
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Smart Agriculture Platform
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Type Tabs */}
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-green-100/50 dark:bg-green-900/20 rounded-xl">
                    <TabsTrigger value="farmer" className="rounded-lg">
                      🌾 Farmer
                    </TabsTrigger>
                    <TabsTrigger value="government" className="rounded-lg">
                      🏛️ Government
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="farmer" className="space-y-4 mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="farmer-email">Farmer ID / Email</Label>
                          <Input
                            id="farmer-email"
                            type="email"
                            placeholder="farmer@example.com"
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="farmer-password">Password</Label>
                          <Input
                            id="farmer-password"
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <Button 
                          onClick={() => {
                            setUserType('farmer');
                            handleLogin();
                          }}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl"
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Login as Farmer
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="government" className="space-y-4 mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="gov-email">Official Email</Label>
                          <Input
                            id="gov-email"
                            type="email"
                            placeholder="official@gov.in"
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="gov-password">Password</Label>
                          <Input
                            id="gov-password"
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <Button 
                          onClick={() => {
                            setUserType('admin');
                            handleLogin();
                          }}
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Login as Official
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account? 
                  <Button variant="link" className="p-0 ml-1 text-green-600 dark:text-green-400">
                    Register here
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-lime-950/30 pb-20" style={{ perspective: '1500px' }}>
      {/* Header with 3D effect */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/20 sticky top-0 z-50"
        initial={{ opacity: 0, y: -30, rotateX: -20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -2, boxShadow: '0 25px 80px rgba(0,0,0,0.15)' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Profile
            </motion.h1>
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant={isEditing ? "default" : "outline"} 
                  size="sm"
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                  className={`rounded-xl ${isEditing ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}`}
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-xl text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/30"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-6 py-8 space-y-8 pb-24">
        {/* Hero Profile Card with 3D effects */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-green-500/10">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Enhanced Avatar Section with 3D hover */}
                <motion.div 
                  className="relative"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 15,
                    z: 50
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl shadow-green-500/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500 text-white text-3xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <motion.div
                        initial={{ scale: 0, rotateZ: -180 }}
                        animate={{ scale: 1, rotateZ: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      >
                        <Button 
                          size="sm" 
                          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full p-0 bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Profile Info with staggered animations */}
                <div className="space-y-3">
                  <motion.h2
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {profile.name}
                  </motion.h2>
                  
                  <motion.div
                    className="flex items-center justify-center space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-medium">
                      {userType === 'farmer' ? '🌾 Farmer' : '🏛️ Official'}
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 rounded-xl border-green-200 text-green-700 dark:border-green-800 dark:text-green-300">
                      📍 {profile.location}
                    </Badge>
                  </motion.div>

                  {/* User Type Toggle */}
                  <motion.div
                    className="flex items-center justify-center mt-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <Tabs value={userType} onValueChange={setUserType} className="w-full max-w-sm">
                      <TabsList className="grid w-full grid-cols-2 bg-green-100/50 dark:bg-green-900/20 rounded-xl">
                        <TabsTrigger value="farmer" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                          🌾 Farmer
                        </TabsTrigger>
                        <TabsTrigger value="admin" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                          🏛️ Government
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </motion.div>

                  {/* Stats Row with 3D hover effects */}
                  <motion.div
                    className="flex items-center justify-center space-x-6 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.1, z: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userPoints}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                    </motion.div>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.1, z: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Level 3</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{userLevel}</div>
                    </motion.div>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.1, z: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="text-2xl font-bold text-lime-600 dark:text-lime-400">{achievements.filter(a => a.unlocked).length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Badges</div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Verification Badges with enhanced 3D effects */}
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Verification Status</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {verificationBadges.map((badge, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${
                          badge.verified 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800' 
                            : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
                        }`}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -2,
                          rotateY: 5,
                          z: 10
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <span className="text-2xl">{badge.icon}</span>
                        <span className={`text-sm font-medium ${
                          badge.verified 
                            ? 'text-green-700 dark:text-green-300' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {badge.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Tabs with 3D effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-2 border border-white/20 dark:border-gray-700/20">
              <TabsTrigger value="personal" className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Personal</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Settings</TabsTrigger>
              <TabsTrigger value="achievements" className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Awards</TabsTrigger>
              <TabsTrigger value="security" className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <motion.div 
                        className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <User className="w-5 h-5 text-white" />
                      </motion.div>
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {[
                        { label: "Full Name", value: profile.name, key: "name", type: "text" },
                        { label: "Email", value: profile.email, key: "email", type: "email" },
                        { label: "Phone Number", value: profile.phone, key: "phone", type: "tel" },
                        { label: "Location", value: profile.location, key: "location", type: "text" }
                      ].map((field, index) => (
                        <motion.div
                          key={field.key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Label htmlFor={field.key} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {field.label}
                          </Label>
                          <Input
                            id={field.key}
                            type={field.type}
                            value={field.value}
                            onChange={(e) => setProfile({...profile, [field.key]: e.target.value})}
                            disabled={!isEditing}
                            className="mt-2 rounded-xl border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                          />
                        </motion.div>
                      ))}
                      
                      {userType === 'farmer' ? (
                        <>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <Label htmlFor="farmSize" className="text-sm font-medium text-gray-700 dark:text-gray-300">Farm Size</Label>
                            <Input
                              id="farmSize"
                              value={profile.farmSize}
                              onChange={(e) => setProfile({...profile, farmSize: e.target.value})}
                              disabled={!isEditing}
                              className="mt-2 rounded-xl border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <Label htmlFor="crops" className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary Crops</Label>
                            <Input
                              id="crops"
                              value={profile.crops}
                              onChange={(e) => setProfile({...profile, crops: e.target.value})}
                              disabled={!isEditing}
                              className="mt-2 rounded-xl border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                            />
                          </motion.div>
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.6 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Label htmlFor="department" className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</Label>
                          <Input
                            id="department"
                            value={profile.department}
                            onChange={(e) => setProfile({...profile, department: e.target.value})}
                            disabled={!isEditing}
                            className="mt-2 rounded-xl border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                          />
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <motion.div 
                        className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Bell className="w-5 h-5 text-white" />
                      </motion.div>
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notifications).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <Label htmlFor={key} className="flex-1 font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                        <Switch
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) => setNotifications({...notifications, [key]: checked})}
                        />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <motion.div 
                        className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Trophy className="w-5 h-5 text-white" />
                      </motion.div>
                      <span>Achievements & Badges</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          className={`relative overflow-hidden rounded-2xl border transition-all ${
                            achievement.unlocked 
                              ? 'bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20 border-green-200 dark:border-green-800' 
                              : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                          whileHover={{ 
                            scale: 1.02, 
                            y: -2,
                            rotateY: 2,
                            z: 10
                          }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="flex items-center space-x-4 p-5">
                            <motion.div 
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                                achievement.unlocked 
                                  ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                                  : 'bg-gray-200 dark:bg-gray-700 grayscale'
                              }`}
                              whileHover={achievement.unlocked ? { rotate: 360, scale: 1.1 } : {}}
                              transition={{ duration: 0.6 }}
                            >
                              {achievement.icon}
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className={`font-bold ${
                                  achievement.unlocked 
                                    ? 'text-gray-900 dark:text-white' 
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {achievement.name}
                                </h3>
                                {achievement.unlocked && (
                                  <div className="flex items-center space-x-2">
                                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs">
                                      +{achievement.points} pts
                                    </Badge>
                                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                                  </div>
                                )}
                              </div>
                              <p className={`text-sm ${
                                achievement.unlocked 
                                  ? 'text-gray-600 dark:text-gray-300' 
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}>
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                          {achievement.unlocked && (
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                              <div className="absolute transform rotate-45 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[170px] text-center">
                                UNLOCKED
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <motion.div 
                        className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Shield className="w-5 h-5 text-white" />
                      </motion.div>
                      <span>Security Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button variant="outline" className="w-full rounded-xl">
                        <Shield className="w-4 h-4 mr-2" />
                        Enable Two-Factor Authentication
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}