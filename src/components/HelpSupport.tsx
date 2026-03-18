import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { HelpCircle, MessageCircle, Phone, Mail, Bot, Send, Search, ExternalLink, PlayCircle } from 'lucide-react';

export function HelpSupport() {
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I\'m your AI farming assistant. How can I help you today? 🌾', time: '10:30 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs = [
    {
      category: 'prediction',
      question: 'How accurate are the yield predictions?',
      answer: 'Our AI models achieve 85-92% accuracy using advanced machine learning algorithms trained on historical data, weather patterns, and soil conditions. Accuracy may vary based on data quality and local conditions.'
    },
    {
      category: 'technical',
      question: 'Why can\'t I see my prediction results?',
      answer: 'Ensure you have filled all required fields (crop type, soil type, location). Check your internet connection and try refreshing the app. If the issue persists, contact our support team.'
    },
    {
      category: 'account',
      question: 'How do I verify my farmer account?',
      answer: 'Go to Profile > Security and upload your land records, Aadhaar card, and recent photograph. Verification typically takes 2-3 business days. You\'ll receive a confirmation email once approved.'
    },
    {
      category: 'msp',
      question: 'When are MSP rates updated?',
      answer: 'MSP (Minimum Support Price) rates are updated as soon as the government announces new rates. We typically update within 24 hours of official announcements. You\'ll receive a notification when rates change.'
    },
    {
      category: 'weather',
      question: 'How often is weather data updated?',
      answer: 'Weather data is updated every 3 hours for current conditions and daily for forecasts. We use multiple reliable sources including IMD to ensure accuracy for your farming decisions.'
    },
    {
      category: 'technical',
      question: 'Can I use the app offline?',
      answer: 'Basic features work offline, but yield predictions require internet connectivity. We\'re working on enhanced offline capabilities including SMS-based predictions for areas with poor connectivity.'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with Yield Prediction',
      duration: '3 min',
      description: 'Learn how to create your first crop yield prediction',
      thumbnail: '🌱'
    },
    {
      title: 'Understanding Weather Alerts',
      duration: '2 min',
      description: 'How to interpret and act on weather notifications',
      thumbnail: '🌤️'
    },
    {
      title: 'Using the Scenario Simulator',
      duration: '4 min',
      description: 'Plan for different weather and farming conditions',
      thumbnail: '📊'
    },
    {
      title: 'MSP Calculator Guide',
      duration: '2 min',
      description: 'Calculate expected profits using MSP rates',
      thumbnail: '💰'
    }
  ];

  const contactOptions = [
    {
      type: 'Chat',
      icon: MessageCircle,
      description: 'Live chat support',
      availability: '24/7',
      response: 'Instant',
      color: 'green'
    },
    {
      type: 'Phone',
      icon: Phone,
      description: 'Call our helpline',
      availability: '9 AM - 6 PM',
      response: 'Immediate',
      color: 'blue'
    },
    {
      type: 'Email',
      icon: Mail,
      description: 'Send us an email',
      availability: 'Always',
      response: '2-4 hours',
      color: 'purple'
    },
    {
      type: 'WhatsApp',
      icon: MessageCircle,
      description: 'WhatsApp support',
      availability: '24/7',
      response: '5-10 min',
      color: 'green'
    }
  ];

  const quickActions = [
    { label: 'Prediction not working', emoji: '❌' },
    { label: 'Account verification', emoji: '✅' },
    { label: 'Weather alerts setup', emoji: '🌤️' },
    { label: 'MSP rate inquiry', emoji: '💰' },
    { label: 'Data export help', emoji: '📊' },
    { label: 'Language change', emoji: '🌐' }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = { type: 'user', message: newMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setChatMessages([...chatMessages, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = { 
        type: 'bot', 
        message: 'I understand your concern. Let me help you with that. Based on your query, I recommend checking our FAQ section or speaking with our technical team.', 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setNewMessage('');
  };

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-900/20 dark:via-red-900/20 dark:to-pink-900/20 pb-20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-orange-200/50 dark:border-orange-800/50 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl text-gray-900 dark:text-white">Help & Support</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">We're here to help you 24/7</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80">
            <TabsTrigger value="faq" className="text-xs">FAQ</TabsTrigger>
            <TabsTrigger value="chat" className="text-xs">Chat</TabsTrigger>
            <TabsTrigger value="contact" className="text-xs">Contact</TabsTrigger>
            <TabsTrigger value="tutorials" className="text-xs">Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            {/* Search and Filter */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search frequently asked questions..."
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {['all', 'prediction', 'technical', 'account', 'msp', 'weather'].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ List */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            {/* Quick Actions */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Quick Help</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto p-3"
                      onClick={() => setNewMessage(action.label)}
                    >
                      <span className="mr-2">{action.emoji}</span>
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>AI Assistant</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Messages */}
                <div className="h-64 overflow-y-auto space-y-3 mb-4 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-blue-500 text-white ml-auto' 
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your question..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            {/* Contact Options */}
            <div className="grid grid-cols-1 gap-4">
              {contactOptions.map((option, index) => (
                <Card key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${option.color}-100 dark:bg-${option.color}-900/50`}>
                        <option.icon className={`w-6 h-6 text-${option.color}-600 dark:text-${option.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 dark:text-white">{option.type}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                        <div className="flex space-x-4 mt-1">
                          <span className="text-xs text-gray-500">Available: {option.availability}</span>
                          <span className="text-xs text-gray-500">Response: {option.response}</span>
                        </div>
                      </div>
                      <Button size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Describe your issue or question..." rows={4} />
                <Button className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-4">
            {/* Video Tutorials */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="w-16 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-2xl">
                        {tutorial.thumbnail}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm text-gray-900 dark:text-white">{tutorial.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{tutorial.description}</p>
                        <Badge variant="outline" className="mt-1">
                          {tutorial.duration}
                        </Badge>
                      </div>
                      <PlayCircle className="w-6 h-6 text-red-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documentation Links */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  📖 User Manual
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  🔧 API Documentation
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  🌾 Farming Best Practices
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  📊 Data Privacy Policy
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}