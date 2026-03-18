import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Bot, Send, Mic, Globe, MessageCircle } from 'lucide-react';

interface ChatBotProps {
  onInteraction?: () => void;
}

export function ChatBot({ onInteraction }: ChatBotProps) {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      message: 'नमस्ते! मैं आपका कृषि सहायक हूं। मैं आपकी खेती से जुड़े सवालों का जवाब दे सकता हूं। 🌾',
      translation: 'Hello! I am your farming assistant. I can answer your farming-related questions.',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('hi');

  const quickQuestions = [
    { hindi: 'गेहूं के लिए कौन सी खाद अच्छी है?', english: 'Which fertilizer is good for wheat?' },
    { hindi: 'बारिश कम हो तो क्या करना चाहिए?', english: 'What to do if there is less rainfall?' },
    { hindi: 'फसल की बीमारी कैसे पहचानें?', english: 'How to identify crop diseases?' },
    { hindi: 'अच्छी उपज के लिए टिप्स दें', english: 'Give tips for good yield' },
  ];

  const botResponses = [
    'आपके गेहूं के लिए यूरिया और डीएपी का संतुलित उपयोग करें। मिट्टी जांच के आधार पर 120 किग्रा यूरिया प्रति एकड़ उपयोग करें।',
    'कम बारिश में ड्रिप इरिगेशन का उपयोग करें। सुबह 6-8 बजे पानी दें। मल्चिंग से नमी बचाएं।',
    'पत्तों का रंग, धब्बे, और पौधे की वृद्धि देखें। तुरंत कृषि विशेषज्ञ से संपर्क करें।',
    'समय पर बुआई, उचित बीज दर, संतुलित खाद, और नियमित सिंचाई करें। मौसम की जानकारी रखें।'
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      type: 'user',
      message: newMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    onInteraction?.();

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        type: 'bot',
        message: randomResponse,
        translation: 'AI-generated farming advice based on your query',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);

    setNewMessage('');
  };

  const handleQuickQuestion = (question: any) => {
    setNewMessage(question.hindi);
    onInteraction?.();
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>AI कृषि सहायक (Farming Assistant)</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Online
            </Badge>
          </CardTitle>
          <CardDescription className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Multilingual support: 24 languages available</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Language Toggle */}
          <div className="flex items-center space-x-2 pb-2 border-b">
            <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
            <Button
              variant={language === 'hi' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('hi')}
            >
              🇮🇳 हिंदी
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              🇺🇸 English
            </Button>
          </div>

          {/* Quick Questions */}
          <div>
            <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-2">Quick Questions:</h4>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto p-3"
                  onClick={() => handleQuickQuestion(q)}
                >
                  <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm">{q.hindi}</p>
                    <p className="text-xs text-gray-500">{q.english}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50 dark:bg-gray-900 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border'
                }`}>
                  {msg.type === 'bot' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-blue-600">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  {msg.type === 'bot' && msg.translation && language === 'en' && (
                    <p className="text-xs text-gray-500 mt-1 italic">{msg.translation}</p>
                  )}
                  <p className={`text-xs mt-1 ${
                    msg.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-blue-600 animate-pulse" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={language === 'hi' ? "अपना सवाल यहाँ लिखें..." : "Type your question here..."}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              <Send className="w-4 h-4" />
            </Button>
            <Button variant="outline" disabled>
              <Mic className="w-4 h-4" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Globe className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-blue-800 dark:text-blue-300">Multilingual</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">24 Languages</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Bot className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-green-800 dark:text-green-300">AI Powered</p>
              <p className="text-xs text-green-600 dark:text-green-400">Smart Answers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}