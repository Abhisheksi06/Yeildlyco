import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { User, Lock, Mail, Phone, MapPin, Tractor, Building, Eye, EyeOff, LogIn, UserPlus, Shield, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  userType: 'farmer' | 'admin';
  farmSize?: string;
  crops?: string;
  department?: string;
  createdAt: string;
}

interface AuthManagerProps {
  onLoginSuccess: (user: User) => void;
  onClose: () => void;
  targetUserType?: 'farmer' | 'admin';
}

export function AuthManager({ onLoginSuccess, onClose, targetUserType = 'farmer' }: AuthManagerProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'farmer' | 'admin'>(targetUserType);
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    farmSize: '',
    crops: '',
    department: ''
  });

  // Mock database
  const getUsers = (): User[] => {
    const stored = localStorage.getItem('yieldly_users');
    return stored ? JSON.parse(stored) : [];
  };

  const saveUser = (user: User) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('yieldly_users', JSON.stringify(users));
  };

  const findUser = (email: string, password: string): User | null => {
    const users = getUsers();
    return users.find(u => u.email === email && password === 'password123') || null;
  };

  useEffect(() => {
    // Add some demo users if none exist
    const users = getUsers();
    if (users.length === 0) {
      const demoUsers: User[] = [
        {
          id: '1',
          name: 'Ramesh Kumar',
          email: 'ramesh@farmer.com',
          phone: '+91 98765 43210',
          location: 'Kanpur, UP',
          userType: 'farmer',
          farmSize: '5.2 acres',
          crops: 'Wheat, Rice, Sugarcane',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Dr. Priya Sharma',
          email: 'priya@gov.in',
          phone: '+91 98765 43211',
          location: 'New Delhi',
          userType: 'admin',
          department: 'Ministry of Agriculture',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Suresh Patel',
          email: 'suresh@farmer.com',
          phone: '+91 98765 43212',
          location: 'Ahmedabad, Gujarat',
          userType: 'farmer',
          farmSize: '8.5 acres',
          crops: 'Cotton, Groundnut',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('yieldly_users', JSON.stringify(demoUsers));
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = findUser(loginData.email, loginData.password);
    
    if (user && user.userType === userType) {
      toast.success(`Welcome back, ${user.name}!`);
      onLoginSuccess(user);
    } else if (user && user.userType !== userType) {
      toast.error(`This account is registered as ${user.userType === 'farmer' ? 'Farmer' : 'Government Official'}`);
    } else {
      toast.error('Invalid credentials. Use password: password123');
    }
    
    setIsLoading(false);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const existingUsers = getUsers();
    if (existingUsers.find(u => u.email === registerData.email)) {
      toast.error('Email already registered');
      setIsLoading(false);
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      location: registerData.location,
      userType,
      ...(userType === 'farmer' ? {
        farmSize: registerData.farmSize,
        crops: registerData.crops
      } : {
        department: registerData.department
      }),
      createdAt: new Date().toISOString()
    };

    saveUser(newUser);
    toast.success(`Account created successfully! Welcome, ${newUser.name}!`);
    onLoginSuccess(newUser);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-800/20 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 20 }}
              className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-sky-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25"
            >
              {userType === 'farmer' ? (
                <Tractor className="w-8 h-8 text-white" />
              ) : (
                <Building className="w-8 h-8 text-white" />
              )}
            </motion.div>
            
            <CardTitle className="text-2xl bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Join Yieldly'}
            </CardTitle>
            
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Badge className={`${userType === 'farmer' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                {userType === 'farmer' ? '🌾 Farmer Portal' : '🏛️ Government Portal'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Type Switcher */}
            <div className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
              <span className="text-sm font-medium">Account Type</span>
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${userType === 'farmer' ? 'text-emerald-600 font-medium' : 'text-gray-400'}`}>
                  Farmer
                </span>
                <Switch
                  checked={userType === 'admin'}
                  onCheckedChange={(checked) => setUserType(checked ? 'admin' : 'farmer')}
                />
                <span className={`text-xs ${userType === 'admin' ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                  Official
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={userType === 'farmer' ? 'ramesh@farmer.com' : 'priya@gov.in'}
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="password123"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="pl-10 pr-10 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleLogin}
                    disabled={isLoading || !loginData.email || !loginData.password}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reg-email" className="text-sm font-medium">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reg-password" className="text-sm font-medium">Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="reg-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          className="pl-10 pr-10 rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="location"
                          placeholder="City, State"
                          value={registerData.location}
                          onChange={(e) => setRegisterData({...registerData, location: e.target.value})}
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    {userType === 'farmer' ? (
                      <>
                        <div>
                          <Label htmlFor="farmSize" className="text-sm font-medium">Farm Size</Label>
                          <Input
                            id="farmSize"
                            placeholder="e.g., 5.2 acres"
                            value={registerData.farmSize}
                            onChange={(e) => setRegisterData({...registerData, farmSize: e.target.value})}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="crops" className="text-sm font-medium">Primary Crops</Label>
                          <Input
                            id="crops"
                            placeholder="e.g., Wheat, Rice, Cotton"
                            value={registerData.crops}
                            onChange={(e) => setRegisterData({...registerData, crops: e.target.value})}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                      </>
                    ) : (
                      <div>
                        <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                        <Input
                          id="department"
                          placeholder="Ministry of Agriculture"
                          value={registerData.department}
                          onChange={(e) => setRegisterData({...registerData, department: e.target.value})}
                          className="mt-1 rounded-xl"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleRegister}
                    disabled={isLoading || !registerData.name || !registerData.email || !registerData.password}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-medium"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Login/Register */}
            <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </span>
              </button>
            </div>

            {/* Demo Credentials */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Demo Credentials</span>
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                <div>Farmer: ramesh@farmer.com</div>
                <div>Admin: priya@gov.in</div>
                <div>Password: password123</div>
              </div>
            </div>

            {/* Close Button */}
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full rounded-xl"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}