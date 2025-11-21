// Sample datasets for visualization playground
export interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  format: 'json' | 'csv' | 'tsv';
  data: string;
}

export const sampleDatasets: Dataset[] = [
  // Business & Finance
  {
    id: 'sales-monthly',
    name: 'Monthly Sales Data',
    description: 'Monthly sales figures for a retail business',
    category: 'Business',
    tags: ['sales', 'revenue', 'time-series'],
    format: 'json',
    data: JSON.stringify([
      { month: 'Jan', sales: 45000, units: 320, profit: 12000 },
      { month: 'Feb', sales: 52000, units: 380, profit: 14500 },
      { month: 'Mar', sales: 48000, units: 340, profit: 13200 },
      { month: 'Apr', sales: 61000, units: 425, profit: 17800 },
      { month: 'May', sales: 58000, units: 410, profit: 16500 },
      { month: 'Jun', sales: 72000, units: 495, profit: 21600 },
    ], null, 2)
  },
  {
    id: 'stock-prices',
    name: 'Stock Price History',
    description: 'Daily stock prices for tech companies',
    category: 'Finance',
    tags: ['stocks', 'market', 'time-series'],
    format: 'json',
    data: JSON.stringify([
      { date: '2024-01-01', symbol: 'TECH', open: 150.2, high: 155.8, low: 149.5, close: 154.3, volume: 2500000 },
      { date: '2024-01-02', symbol: 'TECH', open: 154.5, high: 158.2, low: 153.8, close: 156.7, volume: 2800000 },
      { date: '2024-01-03', symbol: 'TECH', open: 156.9, high: 159.5, low: 155.2, close: 157.8, volume: 2600000 },
      { date: '2024-01-04', symbol: 'TECH', open: 157.5, high: 161.3, low: 156.8, close: 160.2, volume: 3100000 },
      { date: '2024-01-05', symbol: 'TECH', open: 160.5, high: 162.8, low: 158.9, close: 159.5, volume: 2900000 },
    ], null, 2)
  },
  {
    id: 'revenue-by-region',
    name: 'Regional Revenue',
    description: 'Revenue breakdown by geographical region',
    category: 'Business',
    tags: ['revenue', 'geography', 'regional'],
    format: 'json',
    data: JSON.stringify([
      { region: 'North America', revenue: 125000, customers: 450, growth: 12.5 },
      { region: 'Europe', revenue: 98000, customers: 380, growth: 8.3 },
      { region: 'Asia Pacific', revenue: 145000, customers: 520, growth: 18.7 },
      { region: 'Latin America', revenue: 42000, customers: 180, growth: 15.2 },
      { region: 'Middle East', revenue: 38000, customers: 150, growth: 10.8 },
    ], null, 2)
  },
  
  // Demographics & Population
  {
    id: 'population-age',
    name: 'Population by Age Group',
    description: 'Population distribution across age groups',
    category: 'Demographics',
    tags: ['population', 'age', 'distribution'],
    format: 'json',
    data: JSON.stringify([
      { ageGroup: '0-18', population: 73000000, percentage: 22.3 },
      { ageGroup: '19-35', population: 89000000, percentage: 27.2 },
      { ageGroup: '36-50', population: 67000000, percentage: 20.5 },
      { ageGroup: '51-65', population: 58000000, percentage: 17.7 },
      { ageGroup: '65+', population: 40000000, percentage: 12.3 },
    ], null, 2)
  },
  {
    id: 'city-population',
    name: 'World Cities Population',
    description: 'Population of major world cities',
    category: 'Demographics',
    tags: ['population', 'cities', 'urban'],
    format: 'json',
    data: JSON.stringify([
      { city: 'Tokyo', country: 'Japan', population: 37400000, area: 13452 },
      { city: 'Delhi', country: 'India', population: 28514000, area: 2344 },
      { city: 'Shanghai', country: 'China', population: 25582000, area: 6341 },
      { city: 'São Paulo', country: 'Brazil', population: 21650000, area: 3043 },
      { city: 'Mexico City', country: 'Mexico', population: 21581000, area: 2370 },
      { city: 'Cairo', country: 'Egypt', population: 20076000, area: 3085 },
    ], null, 2)
  },

  // Technology & Web
  {
    id: 'web-traffic',
    name: 'Website Traffic Analytics',
    description: 'Daily website traffic and engagement metrics',
    category: 'Technology',
    tags: ['web', 'analytics', 'traffic'],
    format: 'json',
    data: JSON.stringify([
      { date: '2024-01-01', visitors: 12500, pageViews: 45800, bounceRate: 42.3, avgDuration: 245 },
      { date: '2024-01-02', visitors: 13200, pageViews: 48200, bounceRate: 40.1, avgDuration: 268 },
      { date: '2024-01-03', visitors: 11800, pageViews: 43100, bounceRate: 44.5, avgDuration: 232 },
      { date: '2024-01-04', visitors: 14500, pageViews: 52300, bounceRate: 38.7, avgDuration: 289 },
      { date: '2024-01-05', visitors: 15100, pageViews: 55600, bounceRate: 36.2, avgDuration: 305 },
    ], null, 2)
  },
  {
    id: 'programming-languages',
    name: 'Programming Language Popularity',
    description: 'Developer survey on programming language usage',
    category: 'Technology',
    tags: ['programming', 'languages', 'developers'],
    format: 'json',
    data: JSON.stringify([
      { language: 'JavaScript', users: 16500000, satisfaction: 72, growth: 5.2 },
      { language: 'Python', users: 15200000, satisfaction: 85, growth: 12.8 },
      { language: 'Java', users: 12800000, satisfaction: 65, growth: -2.3 },
      { language: 'C#', users: 8900000, satisfaction: 78, growth: 3.5 },
      { language: 'TypeScript', users: 7500000, satisfaction: 88, growth: 18.6 },
      { language: 'Go', users: 3200000, satisfaction: 82, growth: 15.4 },
    ], null, 2)
  },

  // Health & Fitness
  {
    id: 'exercise-calories',
    name: 'Exercise Calorie Burn',
    description: 'Calories burned by different exercise types',
    category: 'Health',
    tags: ['exercise', 'calories', 'fitness'],
    format: 'json',
    data: JSON.stringify([
      { exercise: 'Running', duration: 30, calories: 320, intensity: 'High' },
      { exercise: 'Cycling', duration: 30, calories: 240, intensity: 'Medium' },
      { exercise: 'Swimming', duration: 30, calories: 280, intensity: 'High' },
      { exercise: 'Walking', duration: 30, calories: 120, intensity: 'Low' },
      { exercise: 'Yoga', duration: 30, calories: 90, intensity: 'Low' },
      { exercise: 'Weight Training', duration: 30, calories: 180, intensity: 'Medium' },
    ], null, 2)
  },

  // Education
  {
    id: 'student-scores',
    name: 'Student Test Scores',
    description: 'Exam scores across different subjects',
    category: 'Education',
    tags: ['students', 'scores', 'education'],
    format: 'json',
    data: JSON.stringify([
      { student: 'Alice', math: 92, science: 88, english: 85, history: 90 },
      { student: 'Bob', math: 78, science: 82, english: 91, history: 75 },
      { student: 'Charlie', math: 95, science: 93, english: 87, history: 92 },
      { student: 'Diana', math: 84, science: 86, english: 94, history: 88 },
      { student: 'Eve', math: 88, science: 90, english: 82, history: 86 },
    ], null, 2)
  },

  // Environment & Weather
  {
    id: 'temperature-data',
    name: 'Temperature Records',
    description: 'Daily temperature readings for a city',
    category: 'Environment',
    tags: ['temperature', 'weather', 'climate'],
    format: 'json',
    data: JSON.stringify([
      { date: '2024-01-01', high: 45, low: 32, humidity: 65, precipitation: 0.2 },
      { date: '2024-01-02', high: 48, low: 35, humidity: 58, precipitation: 0.0 },
      { date: '2024-01-03', high: 42, low: 30, humidity: 72, precipitation: 0.8 },
      { date: '2024-01-04', high: 38, low: 28, humidity: 68, precipitation: 1.2 },
      { date: '2024-01-05', high: 50, low: 36, humidity: 55, precipitation: 0.0 },
    ], null, 2)
  },

  // Sports
  {
    id: 'basketball-stats',
    name: 'Basketball Player Stats',
    description: 'Season statistics for basketball players',
    category: 'Sports',
    tags: ['basketball', 'statistics', 'sports'],
    format: 'json',
    data: JSON.stringify([
      { player: 'James', points: 28.5, rebounds: 7.8, assists: 8.2, games: 72 },
      { player: 'Durant', points: 26.3, rebounds: 6.5, assists: 5.1, games: 68 },
      { player: 'Curry', points: 30.2, rebounds: 5.2, assists: 6.8, games: 75 },
      { player: 'Giannis', points: 29.8, rebounds: 11.5, assists: 5.9, games: 70 },
      { player: 'Jokic', points: 24.5, rebounds: 10.8, assists: 9.5, games: 73 },
    ], null, 2)
  },

  // E-commerce
  {
    id: 'product-ratings',
    name: 'Product Ratings',
    description: 'Customer ratings for products',
    category: 'E-commerce',
    tags: ['products', 'ratings', 'reviews'],
    format: 'json',
    data: JSON.stringify([
      { product: 'Laptop Pro', rating: 4.5, reviews: 1250, price: 1299, category: 'Electronics' },
      { product: 'Wireless Mouse', rating: 4.2, reviews: 890, price: 29, category: 'Electronics' },
      { product: 'Office Chair', rating: 4.7, reviews: 2100, price: 249, category: 'Furniture' },
      { product: 'Desk Lamp', rating: 4.3, reviews: 650, price: 45, category: 'Furniture' },
      { product: 'USB-C Cable', rating: 4.0, reviews: 3200, price: 15, category: 'Accessories' },
    ], null, 2)
  },

  // CSV Format Examples
  {
    id: 'sales-csv',
    name: 'Sales Data (CSV)',
    description: 'Quarterly sales data in CSV format',
    category: 'Business',
    tags: ['sales', 'csv', 'quarterly'],
    format: 'csv',
    data: 'Quarter,Revenue,Costs,Profit,Units\nQ1-2024,250000,180000,70000,4200\nQ2-2024,280000,195000,85000,4800\nQ3-2024,320000,210000,110000,5400\nQ4-2024,380000,240000,140000,6200'
  },

  // Scatter Plot Examples
  {
    id: 'sales-vs-marketing',
    name: 'Marketing Budget vs Sales',
    description: 'Correlation between marketing spend and sales revenue',
    category: 'Business',
    tags: ['marketing', 'sales', 'correlation', 'scatter'],
    format: 'json',
    data: JSON.stringify([
      { month: 'Jan', marketingBudget: 25000, sales: 180000, region: 'North' },
      { month: 'Feb', marketingBudget: 32000, sales: 245000, region: 'North' },
      { month: 'Mar', marketingBudget: 28000, sales: 210000, region: 'South' },
      { month: 'Apr', marketingBudget: 45000, sales: 320000, region: 'East' },
      { month: 'May', marketingBudget: 38000, sales: 285000, region: 'West' },
      { month: 'Jun', marketingBudget: 52000, sales: 380000, region: 'North' },
      { month: 'Jul', marketingBudget: 48000, sales: 350000, region: 'South' },
      { month: 'Aug', marketingBudget: 41000, sales: 310000, region: 'East' },
      { month: 'Sep', marketingBudget: 55000, sales: 395000, region: 'West' },
      { month: 'Oct', marketingBudget: 62000, sales: 425000, region: 'North' },
      { month: 'Nov', marketingBudget: 58000, sales: 410000, region: 'South' },
      { month: 'Dec', marketingBudget: 70000, sales: 480000, region: 'East' },
    ], null, 2)
  },
  {
    id: 'height-weight-athletes',
    name: 'Athlete Height vs Weight',
    description: 'Physical characteristics of professional athletes by sport',
    category: 'Sports',
    tags: ['athletes', 'physical', 'correlation', 'scatter'],
    format: 'json',
    data: JSON.stringify([
      { name: 'John', height: 185, weight: 82, sport: 'Basketball', age: 25 },
      { name: 'Maria', height: 170, weight: 68, sport: 'Soccer', age: 23 },
      { name: 'Chen', height: 198, weight: 95, sport: 'Basketball', age: 27 },
      { name: 'Ahmed', height: 175, weight: 78, sport: 'Soccer', age: 26 },
      { name: 'Emma', height: 165, weight: 58, sport: 'Tennis', age: 22 },
      { name: 'Dmitri', height: 192, weight: 88, sport: 'Basketball', age: 28 },
      { name: 'Sof��a', height: 168, weight: 62, sport: 'Tennis', age: 24 },
      { name: 'Raj', height: 178, weight: 75, sport: 'Soccer', age: 25 },
      { name: 'Yuki', height: 172, weight: 70, sport: 'Soccer', age: 24 },
      { name: 'Lars', height: 195, weight: 92, sport: 'Basketball', age: 29 },
      { name: 'Ana', height: 163, weight: 55, sport: 'Tennis', age: 21 },
      { name: 'Tom', height: 188, weight: 85, sport: 'Basketball', age: 26 },
    ], null, 2)
  },
  {
    id: 'study-time-grades',
    name: 'Study Hours vs Exam Scores',
    description: 'Student study time correlation with test performance',
    category: 'Education',
    tags: ['students', 'study', 'grades', 'scatter'],
    format: 'json',
    data: JSON.stringify([
      { student: 'Student 1', studyHours: 2, examScore: 65, subject: 'Math', semester: 1 },
      { student: 'Student 2', studyHours: 5, examScore: 78, subject: 'Math', semester: 1 },
      { student: 'Student 3', studyHours: 8, examScore: 88, subject: 'Math', semester: 1 },
      { student: 'Student 4', studyHours: 3, examScore: 70, subject: 'Science', semester: 1 },
      { student: 'Student 5', studyHours: 10, examScore: 95, subject: 'Math', semester: 1 },
      { student: 'Student 6', studyHours: 4, examScore: 72, subject: 'Science', semester: 1 },
      { student: 'Student 7', studyHours: 7, examScore: 85, subject: 'Math', semester: 1 },
      { student: 'Student 8', studyHours: 6, examScore: 80, subject: 'Science', semester: 1 },
      { student: 'Student 9', studyHours: 1, examScore: 58, subject: 'Math', semester: 1 },
      { student: 'Student 10', studyHours: 9, examScore: 92, subject: 'Science', semester: 1 },
      { student: 'Student 11', studyHours: 5, examScore: 75, subject: 'Math', semester: 1 },
      { student: 'Student 12', studyHours: 8, examScore: 90, subject: 'Science', semester: 1 },
    ], null, 2)
  },
  {
    id: 'house-price-size',
    name: 'House Price vs Size',
    description: 'Real estate pricing based on property size',
    category: 'Real Estate',
    tags: ['housing', 'price', 'size', 'scatter'],
    format: 'json',
    data: JSON.stringify([
      { address: 'Property 1', sqft: 1200, price: 285000, bedrooms: 2, location: 'Urban' },
      { address: 'Property 2', sqft: 1800, price: 420000, bedrooms: 3, location: 'Suburban' },
      { address: 'Property 3', sqft: 2400, price: 580000, bedrooms: 4, location: 'Suburban' },
      { address: 'Property 4', sqft: 1500, price: 340000, bedrooms: 3, location: 'Urban' },
      { address: 'Property 5', sqft: 3200, price: 780000, bedrooms: 5, location: 'Suburban' },
      { address: 'Property 6', sqft: 900, price: 210000, bedrooms: 1, location: 'Urban' },
      { address: 'Property 7', sqft: 2800, price: 680000, bedrooms: 4, location: 'Suburban' },
      { address: 'Property 8', sqft: 1600, price: 375000, bedrooms: 3, location: 'Urban' },
      { address: 'Property 9', sqft: 2200, price: 520000, bedrooms: 4, location: 'Suburban' },
      { address: 'Property 10', sqft: 1100, price: 260000, bedrooms: 2, location: 'Urban' },
      { address: 'Property 11', sqft: 3800, price: 920000, bedrooms: 5, location: 'Suburban' },
      { address: 'Property 12', sqft: 2000, price: 475000, bedrooms: 3, location: 'Suburban' },
    ], null, 2)
  },
  {
    id: 'temperature-ice-cream',
    name: 'Temperature vs Ice Cream Sales',
    description: 'Correlation between daily temperature and ice cream sales',
    category: 'Food',
    tags: ['temperature', 'sales', 'correlation', 'scatter'],
    format: 'json',
    data: JSON.stringify([
      { date: 'Day 1', temperature: 18, iceCreamSales: 320, day: 'Monday' },
      { date: 'Day 2', temperature: 22, iceCreamSales: 480, day: 'Tuesday' },
      { date: 'Day 3', temperature: 28, iceCreamSales: 720, day: 'Wednesday' },
      { date: 'Day 4', temperature: 25, iceCreamSales: 620, day: 'Thursday' },
      { date: 'Day 5', temperature: 32, iceCreamSales: 890, day: 'Friday' },
      { date: 'Day 6', temperature: 30, iceCreamSales: 810, day: 'Saturday' },
      { date: 'Day 7', temperature: 26, iceCreamSales: 680, day: 'Sunday' },
      { date: 'Day 8', temperature: 20, iceCreamSales: 420, day: 'Monday' },
      { date: 'Day 9', temperature: 24, iceCreamSales: 580, day: 'Tuesday' },
      { date: 'Day 10', temperature: 29, iceCreamSales: 760, day: 'Wednesday' },
      { date: 'Day 11', temperature: 27, iceCreamSales: 710, day: 'Thursday' },
      { date: 'Day 12', temperature: 35, iceCreamSales: 980, day: 'Friday' },
    ], null, 2)
  },
  {
    id: 'experience-salary',
    name: 'Work Experience vs Salary',
    description: 'Tech industry compensation by years of experience',
    category: 'Technology',
    tags: ['salary', 'experience', 'compensation', 'scatter'],
    format: 'json',
    data: JSON.stringify([
      { employee: 'Dev 1', yearsExperience: 1, salary: 65000, role: 'Junior Dev', company: 'Startup' },
      { employee: 'Dev 2', yearsExperience: 3, salary: 85000, role: 'Mid Dev', company: 'Corporate' },
      { employee: 'Dev 3', yearsExperience: 5, salary: 110000, role: 'Senior Dev', company: 'Corporate' },
      { employee: 'Dev 4', yearsExperience: 2, salary: 72000, role: 'Junior Dev', company: 'Startup' },
      { employee: 'Dev 5', yearsExperience: 8, salary: 145000, role: 'Lead Dev', company: 'Enterprise' },
      { employee: 'Dev 6', yearsExperience: 4, salary: 95000, role: 'Mid Dev', company: 'Startup' },
      { employee: 'Dev 7', yearsExperience: 10, salary: 175000, role: 'Principal', company: 'Enterprise' },
      { employee: 'Dev 8', yearsExperience: 6, salary: 125000, role: 'Senior Dev', company: 'Corporate' },
      { employee: 'Dev 9', yearsExperience: 1.5, salary: 68000, role: 'Junior Dev', company: 'Startup' },
      { employee: 'Dev 10', yearsExperience: 7, salary: 135000, role: 'Senior Dev', company: 'Enterprise' },
      { employee: 'Dev 11', yearsExperience: 12, salary: 195000, role: 'Architect', company: 'Enterprise' },
      { employee: 'Dev 12', yearsExperience: 4.5, salary: 102000, role: 'Mid Dev', company: 'Corporate' },
    ], null, 2)
  },

  // More diverse datasets
  {
    id: 'social-media',
    name: 'Social Media Engagement',
    description: 'Social media platform engagement metrics',
    category: 'Technology',
    tags: ['social', 'media', 'engagement'],
    format: 'json',
    data: JSON.stringify([
      { platform: 'Facebook', users: 2900000000, dailyActive: 1960000000, avgTime: 38 },
      { platform: 'YouTube', users: 2600000000, dailyActive: 1200000000, avgTime: 48 },
      { platform: 'Instagram', users: 2000000000, dailyActive: 1000000000, avgTime: 53 },
      { platform: 'TikTok', users: 1600000000, dailyActive: 950000000, avgTime: 95 },
      { platform: 'Twitter', users: 550000000, dailyActive: 240000000, avgTime: 31 },
    ], null, 2)
  },
  {
    id: 'energy-consumption',
    name: 'Energy Consumption',
    description: 'Household energy consumption by source',
    category: 'Environment',
    tags: ['energy', 'consumption', 'utilities'],
    format: 'json',
    data: JSON.stringify([
      { source: 'Electricity', consumption: 8500, cost: 1275, percentage: 45 },
      { source: 'Natural Gas', consumption: 6200, cost: 620, percentage: 33 },
      { source: 'Solar', consumption: 2800, cost: 0, percentage: 15 },
      { source: 'Other', consumption: 1300, cost: 195, percentage: 7 },
    ], null, 2)
  },
  {
    id: 'employee-satisfaction',
    name: 'Employee Satisfaction Survey',
    description: 'Employee satisfaction across departments',
    category: 'Business',
    tags: ['hr', 'satisfaction', 'survey'],
    format: 'json',
    data: JSON.stringify([
      { department: 'Engineering', satisfaction: 4.2, employees: 85, turnover: 8.5 },
      { department: 'Sales', satisfaction: 3.8, employees: 62, turnover: 15.2 },
      { department: 'Marketing', satisfaction: 4.5, employees: 38, turnover: 6.8 },
      { department: 'HR', satisfaction: 4.1, employees: 22, turnover: 9.1 },
      { department: 'Finance', satisfaction: 3.9, employees: 28, turnover: 11.3 },
    ], null, 2)
  },
  {
    id: 'movie-box-office',
    name: 'Movie Box Office',
    description: 'Top grossing movies of the year',
    category: 'Entertainment',
    tags: ['movies', 'box-office', 'entertainment'],
    format: 'json',
    data: JSON.stringify([
      { title: 'Space Adventure', genre: 'Sci-Fi', gross: 850000000, budget: 200000000, rating: 8.2 },
      { title: 'Comedy Club', genre: 'Comedy', gross: 420000000, budget: 80000000, rating: 7.5 },
      { title: 'Action Hero', genre: 'Action', gross: 720000000, budget: 180000000, rating: 7.8 },
      { title: 'Romance Story', genre: 'Romance', gross: 280000000, budget: 50000000, rating: 8.0 },
      { title: 'Horror Night', genre: 'Horror', gross: 320000000, budget: 40000000, rating: 7.2 },
    ], null, 2)
  },
  {
    id: 'car-specifications',
    name: 'Car Specifications',
    description: 'Technical specifications of vehicles',
    category: 'Automotive',
    tags: ['cars', 'vehicles', 'specifications'],
    format: 'json',
    data: JSON.stringify([
      { model: 'Sedan X', mpg: 32, horsepower: 185, price: 28500, type: 'Sedan' },
      { model: 'SUV Pro', mpg: 24, horsepower: 295, price: 42000, type: 'SUV' },
      { model: 'Truck Max', mpg: 20, horsepower: 410, price: 48000, type: 'Truck' },
      { model: 'Hybrid Eco', mpg: 52, horsepower: 145, price: 32000, type: 'Hybrid' },
      { model: 'Sports Car', mpg: 22, horsepower: 450, price: 65000, type: 'Sports' },
    ], null, 2)
  },
  {
    id: 'real-estate',
    name: 'Real Estate Listings',
    description: 'Property listings with pricing',
    category: 'Real Estate',
    tags: ['property', 'real-estate', 'housing'],
    format: 'json',
    data: JSON.stringify([
      { type: 'House', bedrooms: 4, bathrooms: 3, sqft: 2800, price: 485000, location: 'Suburb' },
      { type: 'Condo', bedrooms: 2, bathrooms: 2, sqft: 1200, price: 325000, location: 'Downtown' },
      { type: 'Townhouse', bedrooms: 3, bathrooms: 2.5, sqft: 1850, price: 395000, location: 'Urban' },
      { type: 'Apartment', bedrooms: 1, bathrooms: 1, sqft: 750, price: 220000, location: 'City Center' },
      { type: 'Villa', bedrooms: 5, bathrooms: 4, sqft: 4200, price: 950000, location: 'Waterfront' },
    ], null, 2)
  },
  {
    id: 'restaurant-ratings',
    name: 'Restaurant Ratings',
    description: 'Restaurant reviews and ratings',
    category: 'Food',
    tags: ['restaurants', 'food', 'ratings'],
    format: 'json',
    data: JSON.stringify([
      { name: 'Italian Bistro', cuisine: 'Italian', rating: 4.5, reviews: 892, priceRange: '$$' },
      { name: 'Sushi Palace', cuisine: 'Japanese', rating: 4.7, reviews: 1245, priceRange: '$$$' },
      { name: 'Burger Joint', cuisine: 'American', rating: 4.2, reviews: 2150, priceRange: '$' },
      { name: 'Thai Garden', cuisine: 'Thai', rating: 4.6, reviews: 678, priceRange: '$$' },
      { name: 'French Cafe', cuisine: 'French', rating: 4.8, reviews: 456, priceRange: '$$$$' },
    ], null, 2)
  },
  {
    id: 'cryptocurrency',
    name: 'Cryptocurrency Prices',
    description: 'Current cryptocurrency market data',
    category: 'Finance',
    tags: ['crypto', 'cryptocurrency', 'trading'],
    format: 'json',
    data: JSON.stringify([
      { symbol: 'BTC', name: 'Bitcoin', price: 45280, change24h: 3.2, marketCap: 885000000000 },
      { symbol: 'ETH', name: 'Ethereum', price: 2850, change24h: 4.5, marketCap: 342000000000 },
      { symbol: 'BNB', name: 'Binance Coin', price: 380, change24h: 2.1, marketCap: 58500000000 },
      { symbol: 'ADA', name: 'Cardano', price: 0.52, change24h: -1.8, marketCap: 18200000000 },
      { symbol: 'SOL', name: 'Solana', price: 98, change24h: 5.7, marketCap: 41500000000 },
    ], null, 2)
  },
  {
    id: 'flight-data',
    name: 'Flight Statistics',
    description: 'Airline flight performance data',
    category: 'Transportation',
    tags: ['flights', 'airlines', 'transportation'],
    format: 'json',
    data: JSON.stringify([
      { airline: 'SkyHigh', onTimeRate: 82.5, cancelRate: 1.2, passengers: 125000000, satisfaction: 4.1 },
      { airline: 'AirGlobal', onTimeRate: 78.3, cancelRate: 2.1, passengers: 98000000, satisfaction: 3.8 },
      { airline: 'JetStream', onTimeRate: 85.2, cancelRate: 0.9, passengers: 87000000, satisfaction: 4.3 },
      { airline: 'WingSpan', onTimeRate: 80.1, cancelRate: 1.5, passengers: 112000000, satisfaction: 4.0 },
      { airline: 'CloudNine', onTimeRate: 88.5, cancelRate: 0.6, passengers: 65000000, satisfaction: 4.6 },
    ], null, 2)
  },
  {
    id: 'book-sales',
    name: 'Book Sales Data',
    description: 'Bestselling books and sales figures',
    category: 'Entertainment',
    tags: ['books', 'sales', 'literature'],
    format: 'json',
    data: JSON.stringify([
      { title: 'Mystery Novel', genre: 'Mystery', copiesSold: 850000, rating: 4.3, price: 14.99 },
      { title: 'Sci-Fi Epic', genre: 'Science Fiction', copiesSold: 1200000, rating: 4.7, price: 16.99 },
      { title: 'Romance Story', genre: 'Romance', copiesSold: 920000, rating: 4.1, price: 12.99 },
      { title: 'Biography', genre: 'Non-Fiction', copiesSold: 650000, rating: 4.5, price: 18.99 },
      { title: 'Fantasy Adventure', genre: 'Fantasy', copiesSold: 1500000, rating: 4.8, price: 15.99 },
    ], null, 2)
  },
  {
    id: 'coffee-consumption',
    name: 'Global Coffee Consumption',
    description: 'Coffee consumption by country',
    category: 'Food',
    tags: ['coffee', 'beverages', 'consumption'],
    format: 'json',
    data: JSON.stringify([
      { country: 'Finland', cupsPerDay: 3.2, population: 5500000, imports: 52000 },
      { country: 'Norway', cupsPerDay: 2.9, population: 5400000, imports: 48000 },
      { country: 'Iceland', cupsPerDay: 2.7, population: 370000, imports: 8500 },
      { country: 'USA', cupsPerDay: 1.9, population: 331000000, imports: 1650000 },
      { country: 'Brazil', cupsPerDay: 2.1, population: 212000000, imports: 425000 },
    ], null, 2)
  }
];

// Generate additional datasets programmatically to reach 500+
const categories = ['Business', 'Finance', 'Technology', 'Health', 'Education', 'Environment', 'Sports', 'E-commerce', 'Entertainment', 'Food'];
const baseNames = ['Analysis', 'Report', 'Survey', 'Study', 'Research', 'Metrics', 'Statistics', 'Data', 'Trends', 'Insights'];

for (let i = 0; i < 480; i++) {
  const category = categories[i % categories.length];
  const baseName = baseNames[Math.floor(i / 10) % baseNames.length];
  
  sampleDatasets.push({
    id: `dataset-${i + 100}`,
    name: `${category} ${baseName} ${i + 1}`,
    description: `Sample ${category.toLowerCase()} dataset for visualization testing`,
    category,
    tags: [category.toLowerCase(), baseName.toLowerCase(), 'sample'],
    format: 'json',
    data: JSON.stringify([
      { x: 10 + i, y: Math.floor(Math.random() * 100), z: Math.floor(Math.random() * 50) },
      { x: 20 + i, y: Math.floor(Math.random() * 100), z: Math.floor(Math.random() * 50) },
      { x: 30 + i, y: Math.floor(Math.random() * 100), z: Math.floor(Math.random() * 50) },
      { x: 40 + i, y: Math.floor(Math.random() * 100), z: Math.floor(Math.random() * 50) },
      { x: 50 + i, y: Math.floor(Math.random() * 100), z: Math.floor(Math.random() * 50) },
    ], null, 2)
  });
}
