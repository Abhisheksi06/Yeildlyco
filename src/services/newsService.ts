// News Service for real-time filtered farming and agriculture news
// Note: Replace with your actual News API key
const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
const NEWS_BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
  url: string;
  category: 'farming' | 'technology' | 'weather' | 'market' | 'policy' | 'research';
  tags: string[];
  importance: 'low' | 'medium' | 'high' | 'urgent';
}

export interface NewsFilter {
  category?: string;
  location?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  keywords?: string[];
}

export class NewsService {
  private static instance: NewsService;
  
  static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService();
    }
    return NewsService.instance;
  }

  // Mock news data for demonstration
  private mockNews: NewsArticle[] = [
    {
      id: '1',
      title: 'AI-Powered Crop Monitoring System Reduces Losses by 30% in Karnataka',
      description: 'Farmers in Karnataka are using artificial intelligence to monitor crop health and predict yields with unprecedented accuracy.',
      content: 'A revolutionary AI-powered crop monitoring system has been helping farmers in Karnataka reduce crop losses by up to 30%. The system uses satellite imagery and machine learning algorithms to detect early signs of disease, pest infestations, and nutrient deficiencies...',
      author: 'Rajesh Kumar',
      source: 'Agriculture Today',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=200&fit=crop',
      url: 'https://example.com/ai-crop-monitoring',
      category: 'technology',
      tags: ['AI', 'Crop Monitoring', 'Karnataka', 'Technology'],
      importance: 'high'
    },
    {
      id: '2',
      title: 'Government Announces New MSP Rates for Kharif Crops 2024-25',
      description: 'The government has increased minimum support prices for major kharif crops, benefiting millions of farmers across India.',
      content: 'The Union Government today announced the Minimum Support Prices (MSPs) for Kharif crops for the 2024-25 marketing season. The prices show significant increases across all major crops...',
      author: 'Priya Sharma',
      source: 'Ministry of Agriculture',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=200&fit=crop',
      url: 'https://example.com/msp-announcement',
      category: 'policy',
      tags: ['MSP', 'Kharif', 'Government', 'Policy'],
      importance: 'urgent'
    },
    {
      id: '3',
      title: 'Organic Farming Techniques Show 25% Increase in Soil Fertility',
      description: 'Latest research demonstrates the long-term benefits of organic farming practices on soil health and crop productivity.',
      content: 'A comprehensive study conducted over five years shows that organic farming techniques can increase soil fertility by up to 25% compared to conventional methods...',
      author: 'Dr. Anjali Verma',
      source: 'Journal of Agricultural Science',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop',
      url: 'https://example.com/organic-farming-study',
      category: 'research',
      tags: ['Organic Farming', 'Soil Fertility', 'Research', 'Sustainability'],
      importance: 'medium'
    },
    {
      id: '4',
      title: 'Heavy Rainfall Alert: Farmers Advised to Protect Standing Crops',
      description: 'IMD issues heavy rainfall warning for northern states. Farmers urged to take preventive measures.',
      content: 'The India Meteorological Department (IMD) has issued a heavy rainfall warning for several northern states over the next 48 hours. Farmers are advised to...',
      author: 'Weather Desk',
      source: 'IMD Weather Service',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=200&fit=crop',
      url: 'https://example.com/rainfall-alert',
      category: 'weather',
      tags: ['Weather Alert', 'Rainfall', 'IMD', 'Crop Protection'],
      importance: 'urgent'
    },
    {
      id: '5',
      title: 'Commodity Prices Rise as Global Demand Increases',
      description: 'Agricultural commodity prices see significant uptick due to increased global demand and supply chain disruptions.',
      content: 'Global agricultural commodity prices have risen sharply this week, with wheat, rice, and corn leading the surge. The increase is attributed to...',
      author: 'Market Analyst',
      source: 'Commodity Exchange',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop',
      url: 'https://example.com/commodity-prices',
      category: 'market',
      tags: ['Commodity Prices', 'Market', 'Global Demand', 'Trade'],
      importance: 'high'
    },
    {
      id: '6',
      title: 'Smart Irrigation Systems Help Save 40% Water in Maharashtra',
      description: 'Precision irrigation technology is helping farmers in Maharashtra optimize water usage while maintaining crop yields.',
      content: 'Farmers in drought-prone areas of Maharashtra are adopting smart irrigation systems that use sensors and data analytics to optimize water usage...',
      author: 'Technology Reporter',
      source: 'Farm Tech Weekly',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=200&fit=crop',
      url: 'https://example.com/smart-irrigation',
      category: 'technology',
      tags: ['Smart Irrigation', 'Water Conservation', 'Maharashtra', 'Technology'],
      importance: 'medium'
    },
    {
      id: '7',
      title: 'New Crop Insurance Scheme Launched for Small Farmers',
      description: 'Government introduces comprehensive crop insurance scheme with enhanced coverage for small and marginal farmers.',
      content: 'The government has launched a new crop insurance scheme specifically designed for small and marginal farmers, offering enhanced coverage and simplified claim processes...',
      author: 'Policy Correspondent',
      source: 'Rural Development News',
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop',
      url: 'https://example.com/crop-insurance',
      category: 'policy',
      tags: ['Crop Insurance', 'Small Farmers', 'Government Scheme', 'Rural Development'],
      importance: 'high'
    },
    {
      id: '8',
      title: 'Drone Technology Revolutionizes Pest Control in Punjab Fields',
      description: 'Agricultural drones equipped with precision spraying systems are transforming pest control methods in Punjab.',
      content: 'Farmers in Punjab are increasingly adopting drone technology for precise pesticide application, reducing chemical usage while improving effectiveness...',
      author: 'Innovation Reporter',
      source: 'AgriTech India',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      imageUrl: 'https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?w=400&h=200&fit=crop',
      url: 'https://example.com/drone-pest-control',
      category: 'technology',
      tags: ['Drones', 'Pest Control', 'Punjab', 'Precision Agriculture'],
      importance: 'medium'
    }
  ];

  async getLatestNews(limit: number = 10): Promise<NewsArticle[]> {
    try {
      // For demonstration, return mock data
      // In production, make actual API call:
      /*
      const response = await fetch(
        `${NEWS_BASE_URL}/everything?q=agriculture OR farming OR crops&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=${limit}`
      );
      const data = await response.json();
      return this.transformNewsData(data.articles);
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return this.mockNews
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching latest news:', error);
      return this.mockNews.slice(0, limit);
    }
  }

  async getFilteredNews(filter: NewsFilter, limit: number = 10): Promise<NewsArticle[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let filteredNews = [...this.mockNews];
      
      // Filter by category
      if (filter.category && filter.category !== 'all') {
        filteredNews = filteredNews.filter(article => article.category === filter.category);
      }
      
      // Filter by keywords
      if (filter.keywords && filter.keywords.length > 0) {
        filteredNews = filteredNews.filter(article =>
          filter.keywords!.some(keyword =>
            article.title.toLowerCase().includes(keyword.toLowerCase()) ||
            article.description.toLowerCase().includes(keyword.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
          )
        );
      }
      
      // Filter by date range
      if (filter.dateRange) {
        const fromDate = new Date(filter.dateRange.from);
        const toDate = new Date(filter.dateRange.to);
        filteredNews = filteredNews.filter(article => {
          const articleDate = new Date(article.publishedAt);
          return articleDate >= fromDate && articleDate <= toDate;
        });
      }
      
      return filteredNews
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error filtering news:', error);
      return this.mockNews.slice(0, limit);
    }
  }

  async getNewsByCategory(category: string, limit: number = 5): Promise<NewsArticle[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return this.mockNews
        .filter(article => article.category === category)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching news by category:', error);
      return [];
    }
  }

  async getUrgentNews(): Promise<NewsArticle[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return this.mockNews
        .filter(article => article.importance === 'urgent')
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } catch (error) {
      console.error('Error fetching urgent news:', error);
      return [];
    }
  }

  async searchNews(query: string, limit: number = 10): Promise<NewsArticle[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const searchQuery = query.toLowerCase();
      return this.mockNews
        .filter(article =>
          article.title.toLowerCase().includes(searchQuery) ||
          article.description.toLowerCase().includes(searchQuery) ||
          article.content.toLowerCase().includes(searchQuery) ||
          article.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        )
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error searching news:', error);
      return [];
    }
  }

  getNewsCategories(): string[] {
    return ['all', 'farming', 'technology', 'weather', 'market', 'policy', 'research'];
  }

  getImportanceColor(importance: string): string {
    switch (importance) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      farming: '🌾',
      technology: '🤖',
      weather: '🌤️',
      market: '📈',
      policy: '📋',
      research: '🔬'
    };
    return icons[category] || '📰';
  }

  formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  // Helper method to transform API response (for real implementation)
  private transformNewsData(articles: any[]): NewsArticle[] {
    return articles.map((article, index) => ({
      id: `${Date.now()}-${index}`,
      title: article.title,
      description: article.description || '',
      content: article.content || '',
      author: article.author || 'Unknown',
      source: article.source.name,
      publishedAt: article.publishedAt,
      imageUrl: article.urlToImage || '',
      url: article.url,
      category: this.categorizeArticle(article.title + ' ' + article.description),
      tags: this.extractTags(article.title + ' ' + article.description),
      importance: this.assessImportance(article.title + ' ' + article.description)
    }));
  }

  private categorizeArticle(text: string): NewsArticle['category'] {
    const lowercaseText = text.toLowerCase();
    
    if (lowercaseText.includes('weather') || lowercaseText.includes('rainfall') || lowercaseText.includes('temperature')) {
      return 'weather';
    } else if (lowercaseText.includes('technology') || lowercaseText.includes('ai') || lowercaseText.includes('drone')) {
      return 'technology';
    } else if (lowercaseText.includes('price') || lowercaseText.includes('market') || lowercaseText.includes('trade')) {
      return 'market';
    } else if (lowercaseText.includes('policy') || lowercaseText.includes('government') || lowercaseText.includes('scheme')) {
      return 'policy';
    } else if (lowercaseText.includes('research') || lowercaseText.includes('study') || lowercaseText.includes('university')) {
      return 'research';
    } else {
      return 'farming';
    }
  }

  private extractTags(text: string): string[] {
    const tags: string[] = [];
    const keywords = ['farming', 'agriculture', 'crop', 'farmer', 'technology', 'weather', 'market', 'policy', 'research'];
    
    keywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) {
        tags.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      }
    });
    
    return tags;
  }

  private assessImportance(text: string): NewsArticle['importance'] {
    const lowercaseText = text.toLowerCase();
    
    if (lowercaseText.includes('urgent') || lowercaseText.includes('alert') || lowercaseText.includes('warning')) {
      return 'urgent';
    } else if (lowercaseText.includes('important') || lowercaseText.includes('significant') || lowercaseText.includes('major')) {
      return 'high';
    } else if (lowercaseText.includes('moderate') || lowercaseText.includes('update')) {
      return 'medium';
    } else {
      return 'low';
    }
  }
}