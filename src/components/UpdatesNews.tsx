import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, Newspaper, TrendingUp, Calendar, ExternalLink, Share, Bookmark, Eye, Clock, MapPin } from 'lucide-react';

export function UpdatesNews() {
  const [bookmarkedNews, setBookmarkedNews] = useState<number[]>([]);

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Heavy Rainfall Alert',
      message: 'IMD predicts heavy rainfall in Punjab & Haryana for next 3 days. Take preventive measures for standing crops.',
      time: '2 hours ago',
      priority: 'high',
      icon: '🌧️',
      location: 'Punjab, Haryana'
    },
    {
      id: 2,
      type: 'msp',
      title: 'MSP Rates Updated',
      message: 'New MSP rates announced for Kharif crops 2024-25. Wheat: ₹2,275/quintal, Rice: ₹2,183/quintal',
      time: '1 day ago',
      priority: 'medium',
      icon: '💰',
      location: 'Pan India'
    },
    {
      id: 3,
      type: 'feature',
      title: 'New Feature: NDVI Monitoring',
      message: 'Track your crop health with satellite-based NDVI monitoring. Available now in the farmer dashboard.',
      time: '3 days ago',
      priority: 'low',
      icon: '🛰️',
      location: 'All Regions'
    },
    {
      id: 4,
      type: 'policy',
      title: 'PM-KISAN Scheme Update',
      message: 'Next installment of PM-KISAN will be credited by month end. Ensure your KYC is updated.',
      time: '5 days ago',
      priority: 'medium',
      icon: '🏛️',
      location: 'Pan India'
    }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'AI Revolution in Indian Agriculture: How Technology is Transforming Farming',
      excerpt: 'Artificial Intelligence is reshaping Indian agriculture with precision farming, yield prediction, and smart irrigation systems...',
      author: 'Dr. Rajesh Kumar',
      publishedAt: '2024-01-15',
      readTime: '5 min read',
      category: 'Technology',
      image: '🤖',
      views: 1250,
      trending: true
    },
    {
      id: 2,
      title: 'Monsoon 2024: IMD Predicts Normal Rainfall for Most Regions',
      excerpt: 'Indian Meteorological Department forecasts normal monsoon for 2024, bringing relief to farmers across the country...',
      author: 'Weather Bureau',
      publishedAt: '2024-01-14',
      readTime: '3 min read',
      category: 'Weather',
      image: '🌧️',
      views: 890,
      trending: false
    },
    {
      id: 3,
      title: 'Sustainable Farming Practices: Reducing Water Usage by 30%',
      excerpt: 'New techniques in drip irrigation and mulching are helping farmers reduce water consumption while maintaining yields...',
      author: 'Environmental Team',
      publishedAt: '2024-01-13',
      readTime: '7 min read',
      category: 'Sustainability',
      image: '💧',
      views: 567,
      trending: false
    },
    {
      id: 4,
      title: 'Market Analysis: Crop Prices Expected to Rise in Q2 2024',
      excerpt: 'Economic analysts predict a 15-20% increase in crop prices due to global supply chain adjustments and increased demand...',
      author: 'Market Research',
      publishedAt: '2024-01-12',
      readTime: '4 min read',
      category: 'Market',
      image: '📈',
      views: 1100,
      trending: true
    },
    {
      id: 5,
      title: 'Government Launches New Subsidy Scheme for Organic Farming',
      excerpt: 'Ministry of Agriculture announces ₹5000 crore subsidy package to promote organic farming practices across India...',
      author: 'Policy Desk',
      publishedAt: '2024-01-11',
      readTime: '6 min read',
      category: 'Policy',
      image: '🌱',
      views: 2100,
      trending: true
    }
  ];

  const events = [
    {
      id: 1,
      title: 'National Farmers Summit 2024',
      date: '2024-02-15',
      time: '10:00 AM - 5:00 PM',
      location: 'India Gate, New Delhi',
      type: 'Conference',
      description: 'Annual summit bringing together farmers, policymakers, and technology experts.',
      registrationOpen: true
    },
    {
      id: 2,
      title: 'Digital Agriculture Workshop',
      date: '2024-02-20',
      time: '2:00 PM - 4:00 PM',
      location: 'Virtual Event',
      type: 'Workshop',
      description: 'Learn about latest digital tools and techniques for modern farming.',
      registrationOpen: true
    },
    {
      id: 3,
      title: 'Crop Insurance Awareness Drive',
      date: '2024-02-25',
      time: '11:00 AM - 3:00 PM',
      location: 'District Collector Office',
      type: 'Awareness',
      description: 'Understanding benefits and application process for crop insurance schemes.',
      registrationOpen: false
    }
  ];

  const toggleBookmark = (newsId: number) => {
    setBookmarkedNews(prev => 
      prev.includes(newsId) 
        ? prev.filter(id => id !== newsId)
        : [...prev, newsId]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 pb-20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-indigo-200/50 dark:border-indigo-800/50 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl text-gray-900 dark:text-white">Updates & News</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stay informed with latest agricultural updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80">
            <TabsTrigger value="notifications" className="text-xs">Alerts</TabsTrigger>
            <TabsTrigger value="news" className="text-xs">News</TabsTrigger>
            <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            {/* Priority Notifications */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Recent Alerts</span>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    4 New
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center text-2xl flex-shrink-0">
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm text-gray-900 dark:text-white">{notification.title}</h3>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{notification.time}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{notification.location}</span>
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alert Settings */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  ⚙️ Customize Alert Types
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📍 Set Location Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔔 Notification Schedule
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            {/* Trending News */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Trending Stories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsArticles.filter(article => article.trending).map((article) => (
                    <div key={article.id} className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl flex-shrink-0">
                          {article.image}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                              {article.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              🔥 Trending
                            </Badge>
                          </div>
                          <h3 className="text-sm text-gray-900 dark:text-white mb-1">{article.title}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-3">
                              <span>{article.author}</span>
                              <span>{article.readTime}</span>
                              <span className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{article.views}</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleBookmark(article.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Bookmark 
                                  className={`w-3 h-3 ${
                                    bookmarkedNews.includes(article.id) 
                                      ? 'fill-current text-blue-500' 
                                      : 'text-gray-400'
                                  }`} 
                                />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Share className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* All News */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Latest News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {newsArticles.filter(article => !article.trending).map((article) => (
                    <div key={article.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-xl flex-shrink-0">
                          {article.image}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                          </div>
                          <h3 className="text-sm text-gray-900 dark:text-white mb-1">{article.title}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-3">
                              <span>{article.author}</span>
                              <span>{article.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleBookmark(article.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Bookmark 
                                  className={`w-3 h-3 ${
                                    bookmarkedNews.includes(article.id) 
                                      ? 'fill-current text-blue-500' 
                                      : 'text-gray-400'
                                  }`} 
                                />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Share className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {/* Upcoming Events */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm text-gray-900 dark:text-white">{event.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{event.description}</p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button 
                              size="sm" 
                              disabled={!event.registrationOpen}
                              className="w-full"
                            >
                              {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Calendar */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  📅 View Full Calendar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}