import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Briefcase, 
  Building, 
  Shield, 
  Leaf, 
  Sprout,
  Eye,
  EyeOff,
  UserPlus,
  LogIn
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: any) => void;
}

interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  location: string;
  farmSize?: string;
  cropTypes?: string;
  department?: string;
  designation?: string;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState('farmer');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    location: '',
    farmSize: '',
    cropTypes: '',
    department: '',
    designation: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        type: activeTab,
        phone: formData.phone,
        location: formData.location,
        ...(activeTab === 'farmer' ? {
          farmSize: formData.farmSize,
          cropTypes: formData.cropTypes,
          level: 'Bronze Farmer',
          points: 1250
        } : {
          department: formData.department,
          designation: formData.designation,
          accessLevel: 'Regional'
        })
      };

      // Save to localStorage (simulating database)
      const users = JSON.parse(localStorage.getItem('yieldly_users') || '[]');
      if (!isLogin) {
        users.push(userData);
        localStorage.setItem('yieldly_users', JSON.stringify(users));
      }
      localStorage.setItem('yieldly_current_user', JSON.stringify(userData));

      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const farmAnimations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/4 right-20 w-16 h-16 bg-blue-200/30 rounded-full"
          animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-200/30 rounded-full"
          animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.div
        className="w-full max-w-lg z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          {...farmAnimations}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-3"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Leaf className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl text-gray-900 dark:text-white">Yieldly</h1>
              <p className="text-sm text-green-600 dark:text-green-400">Smart Farming Solutions</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? 'Welcome back to your agricultural dashboard' : 'Join the future of smart farming'}
          </p>
        </motion.div>

        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </CardTitle>
                <CardDescription>
                  {isLogin ? 'Access your farming dashboard' : 'Start your smart farming journey'}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                🌱 Free
              </Badge>
            </div>

            {/* User Type Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="farmer" className="flex items-center space-x-2">
                  <Sprout className="w-4 h-4 text-green-600" />
                  <span>Farmer</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Government</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="bg-white dark:bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                      className="bg-white dark:bg-gray-800 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Full Name</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="bg-white dark:bg-gray-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>Phone</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="bg-white dark:bg-gray-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>Location</span>
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="City, State"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          required
                          className="bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    {/* Role-specific fields */}
                    {activeTab === 'farmer' ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="farmSize" className="flex items-center space-x-2">
                            <Leaf className="w-4 h-4 text-green-500" />
                            <span>Farm Size (acres)</span>
                          </Label>
                          <Input
                            id="farmSize"
                            type="text"
                            placeholder="e.g., 5.5"
                            value={formData.farmSize}
                            onChange={(e) => handleInputChange('farmSize', e.target.value)}
                            className="bg-white dark:bg-gray-800"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cropTypes" className="flex items-center space-x-2">
                            <Sprout className="w-4 h-4 text-green-500" />
                            <span>Main Crops</span>
                          </Label>
                          <Input
                            id="cropTypes"
                            type="text"
                            placeholder="e.g., Rice, Wheat"
                            value={formData.cropTypes}
                            onChange={(e) => handleInputChange('cropTypes', e.target.value)}
                            className="bg-white dark:bg-gray-800"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department" className="flex items-center space-x-2">
                            <Building className="w-4 h-4 text-blue-500" />
                            <span>Department</span>
                          </Label>
                          <Input
                            id="department"
                            type="text"
                            placeholder="Agriculture Ministry"
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            className="bg-white dark:bg-gray-800"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="designation" className="flex items-center space-x-2">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            <span>Designation</span>
                          </Label>
                          <Input
                            id="designation"
                            type="text"
                            placeholder="Agricultural Officer"
                            value={formData.designation}
                            onChange={(e) => handleInputChange('designation', e.target.value)}
                            className="bg-white dark:bg-gray-800"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Separator />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Please wait...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  </div>
                )}
              </Button>

              {/* Toggle Login/Register */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-600 hover:text-green-700"
                >
                  {isLogin ? (
                    <>Don't have an account? <strong>Sign up</strong></>
                  ) : (
                    <>Already have an account? <strong>Sign in</strong></>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Join thousands of farmers using smart agriculture technology
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>AI Predictions</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Weather Alerts</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Market Insights</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}