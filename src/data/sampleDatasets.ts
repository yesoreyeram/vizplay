// Sample datasets for visualization playground
import type { CustomVizConfig } from '../components/CustomVizBuilder';

export interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  format: 'json' | 'csv' | 'tsv';
  data: string;
  // Optional visualization configuration - applied when dataset is loaded
  vizConfig?: {
    type: string;
    xField?: string;
    yField?: string;
    colorField?: string;
    sizeField?: string;
    title?: string;
    barStyle?: 'simple' | 'stacked' | 'grouped' | 'diverging' | 'gantt' | 'diverging-stacked';
    barOrientation?: 'vertical' | 'horizontal';
    stackNormalize?: boolean;
    xAxisSort?: 'none' | 'ascending' | 'descending';
    stackSort?: 'none' | 'ascending' | 'descending';
    topN?: number;
    showTextLabels?: boolean;
    aggregateOp?: 'none' | 'count' | 'sum' | 'average' | 'median' | 'min' | 'max';
    colorGradient?: boolean;
    xField2?: string;
    showReferenceLine?: boolean;
    referenceLine?: number;
    legendPosition?: 'none' | 'left' | 'right' | 'top' | 'bottom';
    legendMode?: 'inline' | 'table' | 'popup';
    customVizConfig?: CustomVizConfig; // CustomVizConfig from builder
    treemapNesting?: 'flat' | 'nested';
    treemapColorScheme?: 'category10' | 'tableau10' | 'blues' | 'greens' | 'reds' | 'viridis';
    treemapLabels?: boolean;
  };
}

export const sampleDatasets: Dataset[] = [
  // Visualization-Specific Example Datasets (one per viz type)
  {
    id: 'viz-bar-chart',
    name: '📊 Bar Chart Example',
    description: 'Product sales comparison - ideal for bar charts',
    category: 'Visualization Examples',
    tags: ['bar-chart', 'example', 'product-sales'],
    format: 'json',
    data: JSON.stringify([
      { product: 'Laptop', sales: 45000, quantity: 125 },
      { product: 'Phone', sales: 78000, quantity: 340 },
      { product: 'Tablet', sales: 32000, quantity: 95 },
      { product: 'Monitor', sales: 18000, quantity: 60 },
      { product: 'Keyboard', sales: 8500, quantity: 210 },
      { product: 'Mouse', sales: 6200, quantity: 180 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'product',
      yField: 'sales',
      title: 'Product Sales Comparison',
      barStyle: 'simple',
    }
  },
  {
    id: 'viz-stacked-bar',
    name: '📊 Stacked Bar Chart Example',
    description: 'Quarterly revenue by product category - ideal for stacked bar charts',
    category: 'Visualization Examples',
    tags: ['stacked-bar', 'example', 'revenue', 'quarterly'],
    format: 'json',
    data: JSON.stringify([
      { quarter: 'Q1', category: 'Electronics', revenue: 125000 },
      { quarter: 'Q1', category: 'Clothing', revenue: 85000 },
      { quarter: 'Q1', category: 'Food', revenue: 62000 },
      { quarter: 'Q2', category: 'Electronics', revenue: 145000 },
      { quarter: 'Q2', category: 'Clothing', revenue: 92000 },
      { quarter: 'Q2', category: 'Food', revenue: 68000 },
      { quarter: 'Q3', category: 'Electronics', revenue: 162000 },
      { quarter: 'Q3', category: 'Clothing', revenue: 108000 },
      { quarter: 'Q3', category: 'Food', revenue: 75000 },
      { quarter: 'Q4', category: 'Electronics', revenue: 185000 },
      { quarter: 'Q4', category: 'Clothing', revenue: 125000 },
      { quarter: 'Q4', category: 'Food', revenue: 82000 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'quarter',
      yField: 'revenue',
      colorField: 'category',
      title: 'Quarterly Revenue by Category (Stacked)',
      barStyle: 'stacked',
    }
  },
  {
    id: 'viz-grouped-bar',
    name: '📊 Grouped Bar Chart Example',
    description: 'Sales comparison by region and product - ideal for grouped bar charts',
    category: 'Visualization Examples',
    tags: ['grouped-bar', 'multi-dimension', 'example', 'comparison'],
    format: 'json',
    data: JSON.stringify([
      { region: 'North', product: 'Product A', sales: 42000 },
      { region: 'North', product: 'Product B', sales: 58000 },
      { region: 'North', product: 'Product C', sales: 35000 },
      { region: 'South', product: 'Product A', sales: 38000 },
      { region: 'South', product: 'Product B', sales: 62000 },
      { region: 'South', product: 'Product C', sales: 45000 },
      { region: 'East', product: 'Product A', sales: 55000 },
      { region: 'East', product: 'Product B', sales: 48000 },
      { region: 'East', product: 'Product C', sales: 52000 },
      { region: 'West', product: 'Product A', sales: 48000 },
      { region: 'West', product: 'Product B', sales: 72000 },
      { region: 'West', product: 'Product C', sales: 41000 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'region',
      yField: 'sales',
      colorField: 'product',
      title: 'Sales by Region and Product (Grouped)',
      barStyle: 'grouped',
    }
  },
  {
    id: 'viz-horizontal-bar',
    name: '📊 Horizontal Bar Chart Example',
    description: 'Product sales in horizontal orientation - great for long category names',
    category: 'Visualization Examples',
    tags: ['horizontal-bar', 'example', 'sales', 'orientation'],
    format: 'json',
    data: JSON.stringify([
      { product: 'Professional Gaming Laptop', sales: 125000 },
      { product: 'Ultra-Wide Monitor 34"', sales: 98000 },
      { product: 'Wireless Keyboard & Mouse Combo', sales: 45000 },
      { product: 'High-End Graphics Card', sales: 185000 },
      { product: 'Ergonomic Office Chair', sales: 72000 },
      { product: 'Standing Desk Converter', sales: 53000 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'product',
      yField: 'sales',
      title: 'Product Sales (Horizontal)',
      barStyle: 'simple',
      barOrientation: 'horizontal',
      xAxisSort: 'descending',
    }
  },
  {
    id: 'viz-percentage-stacked-bar',
    name: '📊 Percentage Stacked Bar Example',
    description: 'Market share composition normalized to 100% - ideal for comparing proportions',
    category: 'Visualization Examples',
    tags: ['percentage-bar', 'normalized', 'example', 'market-share'],
    format: 'json',
    data: JSON.stringify([
      { year: '2020', segment: 'Enterprise', revenue: 2500000 },
      { year: '2020', segment: 'SMB', revenue: 1800000 },
      { year: '2020', segment: 'Consumer', revenue: 1200000 },
      { year: '2021', segment: 'Enterprise', revenue: 2950000 },
      { year: '2021', segment: 'SMB', revenue: 2100000 },
      { year: '2021', segment: 'Consumer', revenue: 1450000 },
      { year: '2022', segment: 'Enterprise', revenue: 3400000 },
      { year: '2022', segment: 'SMB', revenue: 2450000 },
      { year: '2022', segment: 'Consumer', revenue: 1650000 },
      { year: '2023', segment: 'Enterprise', revenue: 3850000 },
      { year: '2023', segment: 'SMB', revenue: 2800000 },
      { year: '2023', segment: 'Consumer', revenue: 1850000 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'year',
      yField: 'revenue',
      colorField: 'segment',
      title: 'Revenue Composition by Segment (Percentage)',
      barStyle: 'stacked',
      stackNormalize: true,
    }
  },
  {
    id: 'viz-sorted-bar',
    name: '📊 Sorted Bar Chart with Top 10',
    description: 'Top 10 cities by population sorted descending - demonstrates sorting and limiting',
    category: 'Visualization Examples',
    tags: ['sorted-bar', 'top-n', 'example', 'population'],
    format: 'json',
    data: JSON.stringify([
      { city: 'Tokyo', population: 37400000 },
      { city: 'Delhi', population: 28514000 },
      { city: 'Shanghai', population: 25582000 },
      { city: 'São Paulo', population: 21650000 },
      { city: 'Mexico City', population: 21581000 },
      { city: 'Cairo', population: 20076000 },
      { city: 'Mumbai', population: 19980000 },
      { city: 'Beijing', population: 19618000 },
      { city: 'Dhaka', population: 19578000 },
      { city: 'Osaka', population: 19281000 },
      { city: 'New York', population: 18819000 },
      { city: 'Karachi', population: 15400000 },
      { city: 'Buenos Aires', population: 14967000 },
      { city: 'Chongqing', population: 14838000 },
      { city: 'Istanbul', population: 14751000 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'city',
      yField: 'population',
      title: 'Top 10 Cities by Population',
      barStyle: 'simple',
      xAxisSort: 'descending',
      topN: 10,
    }
  },
  {
    id: 'viz-grouped-sorted-bar',
    name: '📊 Grouped Bar with Stack Sorting',
    description: 'Sales by region and product with sorted stacks - demonstrates multi-dimensional sorting',
    category: 'Visualization Examples',
    tags: ['grouped-bar', 'sorted', 'example', 'multi-dim'],
    format: 'json',
    data: JSON.stringify([
      { region: 'North America', product: 'Software', sales: 8500000 },
      { region: 'North America', product: 'Hardware', sales: 6200000 },
      { region: 'North America', product: 'Services', sales: 4800000 },
      { region: 'Europe', product: 'Software', sales: 7200000 },
      { region: 'Europe', product: 'Hardware', sales: 5100000 },
      { region: 'Europe', product: 'Services', sales: 3900000 },
      { region: 'Asia Pacific', product: 'Software', sales: 9800000 },
      { region: 'Asia Pacific', product: 'Hardware', sales: 8500000 },
      { region: 'Asia Pacific', product: 'Services', sales: 5200000 },
      { region: 'Latin America', product: 'Software', sales: 3200000 },
      { region: 'Latin America', product: 'Hardware', sales: 2800000 },
      { region: 'Latin America', product: 'Services', sales: 1900000 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'region',
      yField: 'sales',
      colorField: 'product',
      title: 'Sales by Region (Sorted by Total)',
      barStyle: 'grouped',
      xAxisSort: 'descending',
      stackSort: 'descending',
    }
  },
  {
    id: 'viz-line-chart',
    name: '📈 Line Chart Example',
    description: 'Temperature trends over time - ideal for line charts',
    category: 'Visualization Examples',
    tags: ['line-chart', 'example', 'time-series', 'temperature'],
    format: 'json',
    data: JSON.stringify([
      { date: '2024-01', temperature: 5.2, humidity: 65 },
      { date: '2024-02', temperature: 7.5, humidity: 62 },
      { date: '2024-03', temperature: 12.8, humidity: 58 },
      { date: '2024-04', temperature: 17.3, humidity: 55 },
      { date: '2024-05', temperature: 22.1, humidity: 52 },
      { date: '2024-06', temperature: 26.5, humidity: 48 },
      { date: '2024-07', temperature: 28.9, humidity: 45 },
      { date: '2024-08', temperature: 27.8, humidity: 47 },
      { date: '2024-09', temperature: 23.4, humidity: 51 },
      { date: '2024-10', temperature: 16.9, humidity: 57 },
      { date: '2024-11', temperature: 10.2, humidity: 63 },
      { date: '2024-12', temperature: 6.1, humidity: 67 },
    ], null, 2),
    vizConfig: {
      type: 'line',
      xField: 'date',
      yField: 'temperature',
      title: 'Monthly Temperature Trends',
    }
  },
  {
    id: 'viz-area-chart',
    name: '📉 Area Chart Example',
    description: 'User growth over quarters - ideal for area charts',
    category: 'Visualization Examples',
    tags: ['area-chart', 'example', 'growth', 'users'],
    format: 'json',
    data: JSON.stringify([
      { quarter: 'Q1 2023', users: 12000, activeUsers: 9800 },
      { quarter: 'Q2 2023', users: 15500, activeUsers: 12900 },
      { quarter: 'Q3 2023', users: 19200, activeUsers: 16100 },
      { quarter: 'Q4 2023', users: 24800, activeUsers: 21200 },
      { quarter: 'Q1 2024', users: 31500, activeUsers: 27800 },
      { quarter: 'Q2 2024', users: 39200, activeUsers: 35100 },
    ], null, 2),
    vizConfig: {
      type: 'area',
      xField: 'quarter',
      yField: 'users',
      title: 'User Growth Over Time',
    }
  },
  {
    id: 'viz-scatter-plot',
    name: '⚫ Scatter Plot Example',
    description: 'Income vs spending patterns - ideal for scatter plots',
    category: 'Visualization Examples',
    tags: ['scatter-plot', 'example', 'correlation', 'income'],
    format: 'json',
    data: JSON.stringify([
      { income: 35000, spending: 28000, age: 25, category: 'Young Professional' },
      { income: 48000, spending: 35000, age: 30, category: 'Young Professional' },
      { income: 62000, spending: 42000, age: 35, category: 'Mid Career' },
      { income: 55000, spending: 38000, age: 32, category: 'Mid Career' },
      { income: 78000, spending: 51000, age: 40, category: 'Mid Career' },
      { income: 92000, spending: 58000, age: 45, category: 'Senior' },
      { income: 105000, spending: 62000, age: 48, category: 'Senior' },
      { income: 120000, spending: 68000, age: 52, category: 'Senior' },
      { income: 42000, spending: 32000, age: 28, category: 'Young Professional' },
      { income: 68000, spending: 45000, age: 37, category: 'Mid Career' },
      { income: 88000, spending: 54000, age: 43, category: 'Mid Career' },
      { income: 135000, spending: 75000, age: 55, category: 'Senior' },
    ], null, 2),
    vizConfig: {
      type: 'scatter',
      xField: 'income',
      yField: 'spending',
      colorField: 'category',
      title: 'Income vs Spending by Category',
    }
  },
  {
    id: 'viz-pie-chart',
    name: '🥧 Pie Chart Example',
    description: 'Market share by company - ideal for pie charts',
    category: 'Visualization Examples',
    tags: ['pie-chart', 'example', 'market-share', 'proportion'],
    format: 'json',
    data: JSON.stringify([
      { company: 'TechCorp', marketShare: 32.5 },
      { company: 'InnovateCo', marketShare: 28.3 },
      { company: 'DataSys', marketShare: 18.7 },
      { company: 'CloudNet', marketShare: 12.8 },
      { company: 'Others', marketShare: 7.7 },
    ], null, 2),
    vizConfig: {
      type: 'pie',
      xField: 'company',
      yField: 'marketShare',
      title: 'Market Share Distribution',
    }
  },
  {
    id: 'viz-heatmap',
    name: '🔲 Heatmap Example',
    description: 'Website activity by hour and day - ideal for heatmaps',
    category: 'Visualization Examples',
    tags: ['heatmap', 'example', 'activity', 'pattern'],
    format: 'json',
    data: JSON.stringify([
      { day: 'Monday', hour: '9 AM', visits: 120 },
      { day: 'Monday', hour: '12 PM', visits: 280 },
      { day: 'Monday', hour: '3 PM', visits: 195 },
      { day: 'Monday', hour: '6 PM', visits: 85 },
      { day: 'Tuesday', hour: '9 AM', visits: 135 },
      { day: 'Tuesday', hour: '12 PM', visits: 310 },
      { day: 'Tuesday', hour: '3 PM', visits: 220 },
      { day: 'Tuesday', hour: '6 PM', visits: 95 },
      { day: 'Wednesday', hour: '9 AM', visits: 145 },
      { day: 'Wednesday', hour: '12 PM', visits: 325 },
      { day: 'Wednesday', hour: '3 PM', visits: 240 },
      { day: 'Wednesday', hour: '6 PM', visits: 105 },
      { day: 'Thursday', hour: '9 AM', visits: 130 },
      { day: 'Thursday', hour: '12 PM', visits: 295 },
      { day: 'Thursday', hour: '3 PM', visits: 210 },
      { day: 'Thursday', hour: '6 PM', visits: 90 },
      { day: 'Friday', hour: '9 AM', visits: 110 },
      { day: 'Friday', hour: '12 PM', visits: 250 },
      { day: 'Friday', hour: '3 PM', visits: 175 },
      { day: 'Friday', hour: '6 PM', visits: 145 },
    ], null, 2),
    vizConfig: {
      type: 'heatmap',
      xField: 'hour',
      yField: 'day',
      colorField: 'visits',
      title: 'Website Activity Heatmap',
    }
  },
  {
    id: 'viz-box-plot',
    name: '📦 Box Plot Example',
    description: 'Test scores distribution by class - ideal for box plots',
    category: 'Visualization Examples',
    tags: ['box-plot', 'example', 'distribution', 'scores'],
    format: 'json',
    data: JSON.stringify([
      { class: 'Class A', score: 78 },
      { class: 'Class A', score: 82 },
      { class: 'Class A', score: 85 },
      { class: 'Class A', score: 88 },
      { class: 'Class A', score: 90 },
      { class: 'Class A', score: 92 },
      { class: 'Class A', score: 95 },
      { class: 'Class B', score: 65 },
      { class: 'Class B', score: 70 },
      { class: 'Class B', score: 72 },
      { class: 'Class B', score: 75 },
      { class: 'Class B', score: 78 },
      { class: 'Class B', score: 80 },
      { class: 'Class B', score: 85 },
      { class: 'Class C', score: 85 },
      { class: 'Class C', score: 88 },
      { class: 'Class C', score: 90 },
      { class: 'Class C', score: 92 },
      { class: 'Class C', score: 94 },
      { class: 'Class C', score: 96 },
      { class: 'Class C', score: 98 },
    ], null, 2),
    vizConfig: {
      type: 'boxplot',
      xField: 'class',
      yField: 'score',
      title: 'Test Scores Distribution by Class',
    }
  },
  {
    id: 'viz-histogram',
    name: '📊 Histogram Example',
    description: 'Age distribution of customers - ideal for histograms',
    category: 'Visualization Examples',
    tags: ['histogram', 'example', 'distribution', 'frequency'],
    format: 'json',
    data: JSON.stringify([
      { age: 22 }, { age: 24 }, { age: 25 }, { age: 26 }, { age: 27 },
      { age: 28 }, { age: 29 }, { age: 30 }, { age: 31 }, { age: 32 },
      { age: 33 }, { age: 34 }, { age: 35 }, { age: 36 }, { age: 38 },
      { age: 40 }, { age: 42 }, { age: 43 }, { age: 45 }, { age: 46 },
      { age: 48 }, { age: 50 }, { age: 52 }, { age: 54 }, { age: 55 },
      { age: 25 }, { age: 28 }, { age: 30 }, { age: 32 }, { age: 35 },
      { age: 38 }, { age: 40 }, { age: 42 }, { age: 45 }, { age: 48 },
    ], null, 2),
    vizConfig: {
      type: 'histogram',
      xField: 'age',
      yField: '__count__',
      title: 'Age Distribution of Customers',
    }
  },
  {
    id: 'viz-bar-with-labels',
    name: '📊 Bar Chart with Text Labels',
    description: 'Sales data with values displayed on bars - makes exact values easy to read',
    category: 'Visualization Examples',
    tags: ['bar-chart', 'text-labels', 'example'],
    format: 'json',
    data: JSON.stringify([
      { product: 'Laptop', sales: 45000 },
      { product: 'Phone', sales: 78000 },
      { product: 'Tablet', sales: 32000 },
      { product: 'Monitor', sales: 18000 },
      { product: 'Keyboard', sales: 8500 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'product',
      yField: 'sales',
      title: 'Product Sales with Labels',
      barStyle: 'simple',
      showTextLabels: true,
    }
  },
  {
    id: 'viz-diverging-bar',
    name: '📊 Diverging Bar Chart',
    description: 'Profit/loss by department - positive and negative values with different colors',
    category: 'Visualization Examples',
    tags: ['diverging-bar', 'positive-negative', 'example'],
    format: 'json',
    data: JSON.stringify([
      { department: 'Sales', profit: 125000 },
      { department: 'Marketing', profit: -45000 },
      { department: 'Engineering', profit: 85000 },
      { department: 'Support', profit: 32000 },
      { department: 'R&D', profit: -28000 },
      { department: 'Operations', profit: 62000 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'department',
      yField: 'profit',
      title: 'Department Profit/Loss',
      barStyle: 'diverging',
      barOrientation: 'horizontal',
    }
  },
  {
    id: 'viz-gantt-chart',
    name: '📊 Gantt Chart (Time Ranges)',
    description: 'Project timeline with start and end dates - ideal for project management',
    category: 'Visualization Examples',
    tags: ['gantt', 'timeline', 'ranges', 'example'],
    format: 'json',
    data: JSON.stringify([
      { task: 'Planning', start: 0, end: 5, phase: 'Phase 1' },
      { task: 'Design', start: 4, end: 12, phase: 'Phase 1' },
      { task: 'Development', start: 10, end: 25, phase: 'Phase 2' },
      { task: 'Testing', start: 22, end: 30, phase: 'Phase 2' },
      { task: 'Deployment', start: 28, end: 35, phase: 'Phase 3' },
      { task: 'Maintenance', start: 34, end: 45, phase: 'Phase 3' },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'task',
      yField: 'start',
      xField2: 'end',
      colorField: 'phase',
      title: 'Project Timeline',
      barStyle: 'gantt',
    }
  },
  {
    id: 'viz-gradient-bar',
    name: '📊 Gradient Color Bar Chart',
    description: 'Temperature data with gradient coloring by value - visual heat representation',
    category: 'Visualization Examples',
    tags: ['gradient-bar', 'color-scale', 'example'],
    format: 'json',
    data: JSON.stringify([
      { city: 'Phoenix', temperature: 106 },
      { city: 'Las Vegas', temperature: 104 },
      { city: 'Miami', temperature: 92 },
      { city: 'Dallas', temperature: 88 },
      { city: 'Atlanta', temperature: 85 },
      { city: 'New York', temperature: 78 },
      { city: 'Seattle', temperature: 72 },
      { city: 'Portland', temperature: 70 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'city',
      yField: 'temperature',
      title: 'Temperature by City',
      barStyle: 'simple',
      colorGradient: true,
      xAxisSort: 'descending',
    }
  },
  {
    id: 'viz-bar-with-reference',
    name: '📊 Bar Chart with Reference Line',
    description: 'Sales performance with target line - easily see above/below target',
    category: 'Visualization Examples',
    tags: ['reference-line', 'target', 'example'],
    format: 'json',
    data: JSON.stringify([
      { month: 'Jan', sales: 45000 },
      { month: 'Feb', sales: 52000 },
      { month: 'Mar', sales: 48000 },
      { month: 'Apr', sales: 61000 },
      { month: 'May', sales: 58000 },
      { month: 'Jun', sales: 55000 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'month',
      yField: 'sales',
      title: 'Monthly Sales vs Target',
      barStyle: 'simple',
      showReferenceLine: true,
      referenceLine: 50000,
    }
  },
  {
    id: 'viz-aggregate-count',
    name: '📊 Count Aggregation Bar Chart',
    description: 'Category frequency using count aggregation - no pre-aggregated data needed',
    category: 'Visualization Examples',
    tags: ['aggregate', 'count', 'example'],
    format: 'json',
    data: JSON.stringify([
      { category: 'Electronics', item: 'Item1' },
      { category: 'Electronics', item: 'Item2' },
      { category: 'Electronics', item: 'Item3' },
      { category: 'Clothing', item: 'Item4' },
      { category: 'Clothing', item: 'Item5' },
      { category: 'Food', item: 'Item6' },
      { category: 'Food', item: 'Item7' },
      { category: 'Food', item: 'Item8' },
      { category: 'Food', item: 'Item9' },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'category',
      yField: 'item',
      title: 'Item Count by Category',
      barStyle: 'simple',
      aggregateOp: 'count',
    }
  },
  {
    id: 'viz-aggregate-average',
    name: '📊 Average Aggregation Bar Chart',
    description: 'Average price by category using mean aggregation',
    category: 'Visualization Examples',
    tags: ['aggregate', 'average', 'example'],
    format: 'json',
    data: JSON.stringify([
      { category: 'Electronics', price: 599 },
      { category: 'Electronics', price: 899 },
      { category: 'Electronics', price: 1299 },
      { category: 'Clothing', price: 49 },
      { category: 'Clothing', price: 79 },
      { category: 'Clothing', price: 39 },
      { category: 'Food', price: 12 },
      { category: 'Food', price: 18 },
      { category: 'Food', price: 25 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'category',
      yField: 'price',
      title: 'Average Price by Category',
      barStyle: 'simple',
      aggregateOp: 'average',
      showTextLabels: true,
    }
  },
  {
    id: 'viz-diverging-stacked',
    name: '📊 Diverging Stacked Bar Chart',
    description: 'Survey responses with center-aligned stacks showing agreement/disagreement',
    category: 'Visualization Examples',
    tags: ['diverging', 'stacked', 'survey', 'likert'],
    format: 'json',
    data: JSON.stringify([
      { question: 'Product Quality', response: 'Strongly Disagree', value: -15 },
      { question: 'Product Quality', response: 'Disagree', value: -10 },
      { question: 'Product Quality', response: 'Neutral', value: 20 },
      { question: 'Product Quality', response: 'Agree', value: 35 },
      { question: 'Product Quality', response: 'Strongly Agree', value: 25 },
      { question: 'Customer Service', response: 'Strongly Disagree', value: -8 },
      { question: 'Customer Service', response: 'Disagree', value: -12 },
      { question: 'Customer Service', response: 'Neutral', value: 15 },
      { question: 'Customer Service', response: 'Agree', value: 40 },
      { question: 'Customer Service', response: 'Strongly Agree', value: 30 },
      { question: 'Value for Money', response: 'Strongly Disagree', value: -20 },
      { question: 'Value for Money', response: 'Disagree', value: -18 },
      { question: 'Value for Money', response: 'Neutral', value: 25 },
      { question: 'Value for Money', response: 'Agree', value: 28 },
      { question: 'Value for Money', response: 'Strongly Agree', value: 22 },
    ], null, 2),
    vizConfig: {
      type: 'bar',
      xField: 'question',
      yField: 'value',
      colorField: 'response',
      title: 'Customer Survey Results',
      barStyle: 'diverging-stacked',
      barOrientation: 'horizontal',
      legendPosition: 'bottom',
    }
  },
  {
    id: 'viz-heatlane',
    name: '🌡️ Heat Lane Chart',
    description: 'Server performance by day and hour showing load intensity',
    category: 'Visualization Examples',
    tags: ['heatlane', 'heatmap', 'performance', 'monitoring'],
    format: 'json',
    data: JSON.stringify([
      { server: 'Server A', hour: '00:00', load: 20 },
      { server: 'Server A', hour: '04:00', load: 15 },
      { server: 'Server A', hour: '08:00', load: 65 },
      { server: 'Server A', hour: '12:00', load: 85 },
      { server: 'Server A', hour: '16:00', load: 90 },
      { server: 'Server A', hour: '20:00', load: 55 },
      { server: 'Server B', hour: '00:00', load: 18 },
      { server: 'Server B', hour: '04:00', load: 12 },
      { server: 'Server B', hour: '08:00', load: 70 },
      { server: 'Server B', hour: '12:00', load: 88 },
      { server: 'Server B', hour: '16:00', load: 92 },
      { server: 'Server B', hour: '20:00', load: 60 },
      { server: 'Server C', hour: '00:00', load: 22 },
      { server: 'Server C', hour: '04:00', load: 18 },
      { server: 'Server C', hour: '08:00', load: 60 },
      { server: 'Server C', hour: '12:00', load: 82 },
      { server: 'Server C', hour: '16:00', load: 87 },
      { server: 'Server C', hour: '20:00', load: 52 },
    ], null, 2),
    vizConfig: {
      type: 'heatlane',
      xField: 'server',
      yField: 'hour',
      colorField: 'load',
      title: 'Server Load by Time',
      legendPosition: 'right',
    }
  },

  // Treemap Examples
  {
    id: 'viz-treemap-flat',
    name: '🗺️ Tree Map - Flat',
    description: 'Product category sales distribution using flat treemap layout',
    category: 'Visualization Examples',
    tags: ['treemap', 'hierarchy', 'proportions'],
    format: 'json',
    data: JSON.stringify([
      { category: 'Electronics', revenue: 450000, margin: 35 },
      { category: 'Clothing', revenue: 320000, margin: 55 },
      { category: 'Home & Garden', revenue: 280000, margin: 42 },
      { category: 'Sports', revenue: 195000, margin: 38 },
      { category: 'Books', revenue: 145000, margin: 25 },
      { category: 'Toys', revenue: 125000, margin: 48 },
      { category: 'Automotive', revenue: 95000, margin: 32 },
      { category: 'Beauty', revenue: 85000, margin: 60 },
      { category: 'Food & Beverage', revenue: 75000, margin: 22 },
      { category: 'Office Supplies', revenue: 55000, margin: 45 },
    ], null, 2),
    vizConfig: {
      type: 'treemap',
      xField: 'category',
      yField: 'revenue',
      colorField: 'category',
      title: 'Product Category Revenue Distribution',
      treemapNesting: 'flat',
      treemapColorScheme: 'category10',
      treemapLabels: true,
      legendPosition: 'right',
    }
  },

  {
    id: 'viz-treemap-gradient',
    name: '🗺️ Tree Map - Color Gradient',
    description: 'Market share visualization with gradient color by margin percentage',
    category: 'Visualization Examples',
    tags: ['treemap', 'gradient', 'market-share'],
    format: 'json',
    data: JSON.stringify([
      { company: 'Company A', marketShare: 28.5, profitMargin: 45 },
      { company: 'Company B', marketShare: 22.3, profitMargin: 38 },
      { company: 'Company C', marketShare: 18.7, profitMargin: 52 },
      { company: 'Company D', marketShare: 12.4, profitMargin: 29 },
      { company: 'Company E', marketShare: 8.9, profitMargin: 61 },
      { company: 'Company F', marketShare: 5.2, profitMargin: 35 },
      { company: 'Others', marketShare: 4.0, profitMargin: 25 },
    ], null, 2),
    vizConfig: {
      type: 'treemap',
      xField: 'company',
      yField: 'marketShare',
      colorField: 'profitMargin',
      title: 'Market Share by Profit Margin',
      treemapNesting: 'flat',
      treemapColorScheme: 'viridis',
      treemapLabels: true,
      colorGradient: true,
      legendPosition: 'right',
    }
  },

  {
    id: 'viz-treemap-nested',
    name: '🗺️ Tree Map - Nested',
    description: 'Department budget allocation with nested hierarchical view',
    category: 'Visualization Examples',
    tags: ['treemap', 'nested', 'budget', 'hierarchy'],
    format: 'json',
    data: JSON.stringify([
      { department: 'Engineering', budget: 2500000 },
      { department: 'Sales', budget: 1800000 },
      { department: 'Marketing', budget: 1200000 },
      { department: 'Operations', budget: 950000 },
      { department: 'HR', budget: 650000 },
      { department: 'Finance', budget: 580000 },
      { department: 'Customer Support', budget: 420000 },
      { department: 'R&D', budget: 380000 },
      { department: 'Legal', budget: 320000 },
      { department: 'IT', budget: 280000 },
    ], null, 2),
    vizConfig: {
      type: 'treemap',
      xField: 'department',
      yField: 'budget',
      colorField: 'department',
      title: 'Department Budget Allocation',
      treemapNesting: 'nested',
      treemapColorScheme: 'tableau10',
      treemapLabels: true,
      legendPosition: 'bottom',
    }
  },

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
  },

  // Custom Visualization Examples
  {
    id: 'custom-multi-layer-1',
    name: '🎨 Multi-Layer: Bar + Line',
    description: 'Custom viz combining bars and lines - sales with trend overlay',
    category: 'Custom Visualizations',
    tags: ['custom', 'multi-layer', 'bar-line', 'trend'],
    format: 'json',
    data: JSON.stringify([
      { month: 'Jan', sales: 45000, target: 40000 },
      { month: 'Feb', sales: 52000, target: 45000 },
      { month: 'Mar', sales: 48000, target: 50000 },
      { month: 'Apr', sales: 61000, target: 55000 },
      { month: 'May', sales: 69000, target: 60000 },
      { month: 'Jun', sales: 72000, target: 65000 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Sales vs Target (Multi-Layer)',
      customVizConfig: {
        layers: [
          {
            id: 'layer-bar',
            mark: 'bar',
            markOptions: { tooltip: true, opacity: 0.7, color: '#3b82f6' },
            encodings: {
              x: { field: 'month', type: 'ordinal' },
              y: { field: 'sales', type: 'quantitative' },
            },
          },
          {
            id: 'layer-line',
            mark: 'line',
            markOptions: { tooltip: true, color: '#ef4444', size: 3 },
            encodings: {
              x: { field: 'month', type: 'ordinal' },
              y: { field: 'target', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-multi-layer-2',
    name: '🎨 Multi-Layer: Area + Points',
    description: 'Custom viz with area chart and scatter points overlay',
    category: 'Custom Visualizations',
    tags: ['custom', 'multi-layer', 'area', 'scatter'],
    format: 'json',
    data: JSON.stringify([
      { year: 2018, revenue: 120000, profit: 30000 },
      { year: 2019, revenue: 145000, profit: 42000 },
      { year: 2020, revenue: 132000, profit: 35000 },
      { year: 2021, revenue: 168000, profit: 55000 },
      { year: 2022, revenue: 195000, profit: 68000 },
      { year: 2023, revenue: 225000, profit: 82000 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Revenue & Profit Trends',
      customVizConfig: {
        layers: [
          {
            id: 'layer-area',
            mark: 'area',
            markOptions: { tooltip: true, opacity: 0.4, color: '#10b981' },
            encodings: {
              x: { field: 'year', type: 'ordinal' },
              y: { field: 'revenue', type: 'quantitative' },
            },
          },
          {
            id: 'layer-points',
            mark: 'circle',
            markOptions: { tooltip: true, size: 100, color: '#8b5cf6' },
            encodings: {
              x: { field: 'year', type: 'ordinal' },
              y: { field: 'profit', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-multi-layer-3',
    name: '🎨 Multi-Layer: Dual Bar Chart',
    description: 'Custom viz with two bar series side by side',
    category: 'Custom Visualizations',
    tags: ['custom', 'multi-layer', 'bars', 'comparison'],
    format: 'json',
    data: JSON.stringify([
      { category: 'Product A', online: 45000, offline: 32000 },
      { category: 'Product B', online: 58000, offline: 41000 },
      { category: 'Product C', online: 36000, offline: 52000 },
      { category: 'Product D', online: 72000, offline: 38000 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Online vs Offline Sales',
      customVizConfig: {
        layers: [
          {
            id: 'layer-online',
            mark: 'bar',
            markOptions: { tooltip: true, color: '#06b6d4' },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'online', type: 'quantitative' },
            },
          },
          {
            id: 'layer-offline',
            mark: 'bar',
            markOptions: { tooltip: true, color: '#f59e0b', opacity: 0.7 },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'offline', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-aggregated-1',
    name: '🎨 Aggregated: Average by Category',
    description: 'Custom viz with mean aggregation',
    category: 'Custom Visualizations',
    tags: ['custom', 'aggregation', 'average', 'stats'],
    format: 'json',
    data: JSON.stringify([
      { region: 'North', sales: 45000, category: 'Electronics' },
      { region: 'North', sales: 38000, category: 'Clothing' },
      { region: 'South', sales: 52000, category: 'Electronics' },
      { region: 'South', sales: 41000, category: 'Clothing' },
      { region: 'East', sales: 48000, category: 'Electronics' },
      { region: 'East', sales: 44000, category: 'Clothing' },
      { region: 'West', sales: 61000, category: 'Electronics' },
      { region: 'West', sales: 35000, category: 'Clothing' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Average Sales by Category',
      customVizConfig: {
        layers: [
          {
            id: 'layer-avg',
            mark: 'bar',
            markOptions: { tooltip: true },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'sales', type: 'quantitative', aggregate: 'mean' },
              color: { field: 'category', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-aggregated-2',
    name: '🎨 Aggregated: Count by Group',
    description: 'Custom viz with count aggregation',
    category: 'Custom Visualizations',
    tags: ['custom', 'aggregation', 'count'],
    format: 'json',
    data: JSON.stringify([
      { department: 'Engineering', employee: 'Alice', level: 'Senior' },
      { department: 'Engineering', employee: 'Bob', level: 'Junior' },
      { department: 'Engineering', employee: 'Charlie', level: 'Senior' },
      { department: 'Sales', employee: 'David', level: 'Senior' },
      { department: 'Sales', employee: 'Eve', level: 'Junior' },
      { department: 'Marketing', employee: 'Frank', level: 'Mid' },
      { department: 'Marketing', employee: 'Grace', level: 'Senior' },
      { department: 'Marketing', employee: 'Henry', level: 'Junior' },
      { department: 'Marketing', employee: 'Iris', level: 'Mid' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Employee Count by Department',
      customVizConfig: {
        layers: [
          {
            id: 'layer-count',
            mark: 'bar',
            markOptions: { tooltip: true, color: '#8b5cf6' },
            encodings: {
              x: { field: 'department', type: 'nominal' },
              y: { field: 'employee', type: 'quantitative', aggregate: 'count' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-color-encoding-1',
    name: '🎨 Color Encoding: Heatmap Style',
    description: 'Custom viz with color gradient based on values',
    category: 'Custom Visualizations',
    tags: ['custom', 'color', 'heatmap', 'gradient'],
    format: 'json',
    data: JSON.stringify([
      { x: 'A', y: 'Mon', value: 23 },
      { x: 'A', y: 'Tue', value: 45 },
      { x: 'A', y: 'Wed', value: 67 },
      { x: 'B', y: 'Mon', value: 89 },
      { x: 'B', y: 'Tue', value: 34 },
      { x: 'B', y: 'Wed', value: 56 },
      { x: 'C', y: 'Mon', value: 78 },
      { x: 'C', y: 'Tue', value: 91 },
      { x: 'C', y: 'Wed', value: 12 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Value Heatmap with Color Gradient',
      customVizConfig: {
        layers: [
          {
            id: 'layer-rect',
            mark: 'rect',
            markOptions: { tooltip: true },
            encodings: {
              x: { field: 'x', type: 'nominal' },
              y: { field: 'y', type: 'nominal' },
              color: { field: 'value', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-size-encoding-1',
    name: '🎨 Size Encoding: Bubble Chart',
    description: 'Custom viz with size mapped to a field',
    category: 'Custom Visualizations',
    tags: ['custom', 'size', 'bubble', 'scatter'],
    format: 'json',
    data: JSON.stringify([
      { product: 'Laptop', profit: 45000, units: 125, satisfaction: 4.5 },
      { product: 'Phone', profit: 78000, units: 340, satisfaction: 4.7 },
      { product: 'Tablet', profit: 32000, units: 95, satisfaction: 4.2 },
      { product: 'Monitor', profit: 18000, units: 60, satisfaction: 4.0 },
      { product: 'Keyboard', profit: 8500, units: 210, satisfaction: 4.3 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Product Performance Bubble Chart',
      customVizConfig: {
        layers: [
          {
            id: 'layer-bubbles',
            mark: 'circle',
            markOptions: { tooltip: true, opacity: 0.7 },
            encodings: {
              x: { field: 'units', type: 'quantitative' },
              y: { field: 'profit', type: 'quantitative' },
              size: { field: 'satisfaction', type: 'quantitative' },
              color: { field: 'product', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-trail-1',
    name: '🎨 Trail Mark: Time Series',
    description: 'Custom viz using trail mark for temporal data',
    category: 'Custom Visualizations',
    tags: ['custom', 'trail', 'time-series', 'temporal'],
    format: 'json',
    data: JSON.stringify([
      { date: '2024-01', temperature: 5, humidity: 65 },
      { date: '2024-02', temperature: 7, humidity: 60 },
      { date: '2024-03', temperature: 12, humidity: 58 },
      { date: '2024-04', temperature: 18, humidity: 55 },
      { date: '2024-05', temperature: 23, humidity: 52 },
      { date: '2024-06', temperature: 28, humidity: 48 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Temperature Trends with Trail',
      customVizConfig: {
        layers: [
          {
            id: 'layer-trail',
            mark: 'trail',
            markOptions: { tooltip: true, color: '#f97316' },
            encodings: {
              x: { field: 'date', type: 'temporal' },
              y: { field: 'temperature', type: 'quantitative' },
              size: { field: 'humidity', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-tick-1',
    name: '🎨 Tick Mark: Distribution',
    description: 'Custom viz using tick marks to show distribution',
    category: 'Custom Visualizations',
    tags: ['custom', 'tick', 'distribution'],
    format: 'json',
    data: JSON.stringify([
      { value: 23, category: 'A' },
      { value: 45, category: 'A' },
      { value: 67, category: 'A' },
      { value: 34, category: 'B' },
      { value: 56, category: 'B' },
      { value: 78, category: 'B' },
      { value: 91, category: 'B' },
      { value: 12, category: 'C' },
      { value: 88, category: 'C' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Value Distribution by Category',
      customVizConfig: {
        layers: [
          {
            id: 'layer-ticks',
            mark: 'tick',
            markOptions: { tooltip: true, opacity: 0.8 },
            encodings: {
              x: { field: 'value', type: 'quantitative' },
              y: { field: 'category', type: 'nominal' },
              color: { field: 'category', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-square-1',
    name: '🎨 Square Mark: Grid Layout',
    description: 'Custom viz using square marks for grid visualization',
    category: 'Custom Visualizations',
    tags: ['custom', 'square', 'grid'],
    format: 'json',
    data: JSON.stringify([
      { row: 1, col: 1, value: 45 },
      { row: 1, col: 2, value: 67 },
      { row: 1, col: 3, value: 34 },
      { row: 2, col: 1, value: 89 },
      { row: 2, col: 2, value: 23 },
      { row: 2, col: 3, value: 56 },
      { row: 3, col: 1, value: 78 },
      { row: 3, col: 2, value: 91 },
      { row: 3, col: 3, value: 12 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Grid Visualization with Squares',
      customVizConfig: {
        layers: [
          {
            id: 'layer-squares',
            mark: 'square',
            markOptions: { tooltip: true, size: 200 },
            encodings: {
              x: { field: 'col', type: 'ordinal' },
              y: { field: 'row', type: 'ordinal' },
              color: { field: 'value', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-text-1',
    name: '🎨 Text Mark: Labels',
    description: 'Custom viz using text marks for annotations',
    category: 'Custom Visualizations',
    tags: ['custom', 'text', 'labels', 'annotation'],
    format: 'json',
    data: JSON.stringify([
      { x: 1, y: 45, label: 'Start' },
      { x: 2, y: 67, label: 'Growth' },
      { x: 3, y: 89, label: 'Peak' },
      { x: 4, y: 72, label: 'Decline' },
      { x: 5, y: 85, label: 'Recovery' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Timeline with Text Labels',
      customVizConfig: {
        layers: [
          {
            id: 'layer-line',
            mark: 'line',
            markOptions: { tooltip: true, color: '#3b82f6', size: 2 },
            encodings: {
              x: { field: 'x', type: 'quantitative' },
              y: { field: 'y', type: 'quantitative' },
            },
          },
          {
            id: 'layer-text',
            mark: 'text',
            markOptions: { tooltip: true, color: '#1f2937' },
            encodings: {
              x: { field: 'x', type: 'quantitative' },
              y: { field: 'y', type: 'quantitative' },
              text: { field: 'label', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-rule-1',
    name: '🎨 Rule Mark: Reference Lines',
    description: 'Custom viz using rule marks for reference lines',
    category: 'Custom Visualizations',
    tags: ['custom', 'rule', 'reference', 'threshold'],
    format: 'json',
    data: JSON.stringify([
      { month: 'Jan', value: 45, threshold: 50 },
      { month: 'Feb', value: 52, threshold: 50 },
      { month: 'Mar', value: 48, threshold: 50 },
      { month: 'Apr', value: 61, threshold: 50 },
      { month: 'May', value: 69, threshold: 50 },
      { month: 'Jun', value: 72, threshold: 50 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Values with Threshold Line',
      customVizConfig: {
        layers: [
          {
            id: 'layer-bars',
            mark: 'bar',
            markOptions: { tooltip: true },
            encodings: {
              x: { field: 'month', type: 'ordinal' },
              y: { field: 'value', type: 'quantitative' },
              color: { field: 'month', type: 'nominal' },
            },
          },
          {
            id: 'layer-threshold',
            mark: 'rule',
            markOptions: { tooltip: true, color: '#ef4444', size: 2 },
            encodings: {
              y: { field: 'threshold', type: 'quantitative', aggregate: 'mean' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-triple-layer-1',
    name: '🎨 Triple Layer: Comprehensive View',
    description: 'Custom viz with three layers: area, line, and points',
    category: 'Custom Visualizations',
    tags: ['custom', 'multi-layer', 'complex', 'comprehensive'],
    format: 'json',
    data: JSON.stringify([
      { quarter: 'Q1-22', revenue: 120000, cost: 85000, profit: 35000 },
      { quarter: 'Q2-22', revenue: 145000, cost: 95000, profit: 50000 },
      { quarter: 'Q3-22', revenue: 132000, cost: 88000, profit: 44000 },
      { quarter: 'Q4-22', revenue: 168000, cost: 102000, profit: 66000 },
      { quarter: 'Q1-23', revenue: 195000, cost: 115000, profit: 80000 },
      { quarter: 'Q2-23', revenue: 225000, cost: 128000, profit: 97000 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Quarterly Financial Overview (Triple Layer)',
      customVizConfig: {
        layers: [
          {
            id: 'layer-revenue-area',
            mark: 'area',
            markOptions: { tooltip: true, opacity: 0.3, color: '#10b981' },
            encodings: {
              x: { field: 'quarter', type: 'ordinal' },
              y: { field: 'revenue', type: 'quantitative' },
            },
          },
          {
            id: 'layer-cost-line',
            mark: 'line',
            markOptions: { tooltip: true, color: '#f59e0b', size: 3 },
            encodings: {
              x: { field: 'quarter', type: 'ordinal' },
              y: { field: 'cost', type: 'quantitative' },
            },
          },
          {
            id: 'layer-profit-points',
            mark: 'circle',
            markOptions: { tooltip: true, color: '#8b5cf6', size: 100 },
            encodings: {
              x: { field: 'quarter', type: 'ordinal' },
              y: { field: 'profit', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-max-aggregation',
    name: '🎨 Aggregated: Maximum Values',
    description: 'Custom viz showing max values by category',
    category: 'Custom Visualizations',
    tags: ['custom', 'aggregation', 'max', 'comparison'],
    format: 'json',
    data: JSON.stringify([
      { product: 'Widget A', region: 'North', sales: 45000 },
      { product: 'Widget A', region: 'South', sales: 52000 },
      { product: 'Widget A', region: 'East', sales: 48000 },
      { product: 'Widget B', region: 'North', sales: 38000 },
      { product: 'Widget B', region: 'South', sales: 61000 },
      { product: 'Widget B', region: 'East', sales: 44000 },
      { product: 'Widget C', region: 'North', sales: 72000 },
      { product: 'Widget C', region: 'South', sales: 68000 },
      { product: 'Widget C', region: 'East', sales: 75000 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Maximum Sales by Product',
      customVizConfig: {
        layers: [
          {
            id: 'layer-max',
            mark: 'bar',
            markOptions: { tooltip: true, color: '#ec4899' },
            encodings: {
              x: { field: 'product', type: 'nominal' },
              y: { field: 'sales', type: 'quantitative', aggregate: 'max' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-min-aggregation',
    name: '🎨 Aggregated: Minimum Values',
    description: 'Custom viz showing min values by category',
    category: 'Custom Visualizations',
    tags: ['custom', 'aggregation', 'min', 'analysis'],
    format: 'json',
    data: JSON.stringify([
      { store: 'Store A', day: 'Mon', customers: 245 },
      { store: 'Store A', day: 'Tue', customers: 189 },
      { store: 'Store A', day: 'Wed', customers: 267 },
      { store: 'Store B', day: 'Mon', customers: 312 },
      { store: 'Store B', day: 'Tue', customers: 278 },
      { store: 'Store B', day: 'Wed', customers: 295 },
      { store: 'Store C', day: 'Mon', customers: 156 },
      { store: 'Store C', day: 'Tue', customers: 198 },
      { store: 'Store C', day: 'Wed', customers: 223 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Minimum Daily Customers by Store',
      customVizConfig: {
        layers: [
          {
            id: 'layer-min',
            mark: 'bar',
            markOptions: { tooltip: true, color: '#06b6d4' },
            encodings: {
              x: { field: 'store', type: 'nominal' },
              y: { field: 'customers', type: 'quantitative', aggregate: 'min' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-median-aggregation',
    name: '🎨 Aggregated: Median Values',
    description: 'Custom viz using median aggregation for robust statistics',
    category: 'Custom Visualizations',
    tags: ['custom', 'aggregation', 'median', 'statistics'],
    format: 'json',
    data: JSON.stringify([
      { category: 'Electronics', price: 299 },
      { category: 'Electronics', price: 899 },
      { category: 'Electronics', price: 599 },
      { category: 'Electronics', price: 1299 },
      { category: 'Clothing', price: 49 },
      { category: 'Clothing', price: 89 },
      { category: 'Clothing', price: 129 },
      { category: 'Clothing', price: 69 },
      { category: 'Food', price: 15 },
      { category: 'Food', price: 25 },
      { category: 'Food', price: 18 },
      { category: 'Food', price: 32 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Median Price by Category',
      customVizConfig: {
        layers: [
          {
            id: 'layer-median',
            mark: 'bar',
            markOptions: { tooltip: true, color: '#a855f7' },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'price', type: 'quantitative', aggregate: 'median' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-sum-aggregation',
    name: '🎨 Aggregated: Total Sum',
    description: 'Custom viz with sum aggregation for totals',
    category: 'Custom Visualizations',
    tags: ['custom', 'aggregation', 'sum', 'total'],
    format: 'json',
    data: JSON.stringify([
      { department: 'Sales', expense: 15000, type: 'Marketing' },
      { department: 'Sales', expense: 8000, type: 'Travel' },
      { department: 'Sales', expense: 12000, type: 'Equipment' },
      { department: 'Engineering', expense: 45000, type: 'Software' },
      { department: 'Engineering', expense: 32000, type: 'Hardware' },
      { department: 'Engineering', expense: 18000, type: 'Training' },
      { department: 'HR', expense: 6000, type: 'Recruiting' },
      { department: 'HR', expense: 4500, type: 'Benefits' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Total Expenses by Department',
      customVizConfig: {
        layers: [
          {
            id: 'layer-sum',
            mark: 'bar',
            markOptions: { tooltip: true, color: '#14b8a6' },
            encodings: {
              x: { field: 'department', type: 'nominal' },
              y: { field: 'expense', type: 'quantitative', aggregate: 'sum' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-multi-encoding-1',
    name: '🎨 Multi-Encoding: Full Spectrum',
    description: 'Custom viz with x, y, color, and size all encoded',
    category: 'Custom Visualizations',
    tags: ['custom', 'multi-encoding', 'comprehensive', 'complex'],
    format: 'json',
    data: JSON.stringify([
      { country: 'USA', gdp: 21000, population: 331, happiness: 7.0, continent: 'Americas' },
      { country: 'China', gdp: 14000, population: 1400, happiness: 5.2, continent: 'Asia' },
      { country: 'Japan', gdp: 5000, population: 126, happiness: 5.9, continent: 'Asia' },
      { country: 'Germany', gdp: 3800, population: 83, happiness: 7.1, continent: 'Europe' },
      { country: 'UK', gdp: 2800, population: 67, happiness: 6.8, continent: 'Europe' },
      { country: 'India', gdp: 2900, population: 1380, happiness: 4.0, continent: 'Asia' },
      { country: 'France', gdp: 2700, population: 65, happiness: 6.6, continent: 'Europe' },
      { country: 'Brazil', gdp: 1800, population: 212, happiness: 6.3, continent: 'Americas' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Country Comparison: GDP, Population, Happiness',
      customVizConfig: {
        layers: [
          {
            id: 'layer-bubbles',
            mark: 'circle',
            markOptions: { tooltip: true, opacity: 0.7 },
            encodings: {
              x: { field: 'gdp', type: 'quantitative' },
              y: { field: 'happiness', type: 'quantitative' },
              size: { field: 'population', type: 'quantitative' },
              color: { field: 'continent', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-temporal-1',
    name: '🎨 Temporal: Time Series Analysis',
    description: 'Custom viz with temporal encoding for time-based data',
    category: 'Custom Visualizations',
    tags: ['custom', 'temporal', 'time-series', 'trend'],
    format: 'json',
    data: JSON.stringify([
      { date: '2024-01-01', value: 45, category: 'Product A' },
      { date: '2024-02-01', value: 52, category: 'Product A' },
      { date: '2024-03-01', value: 48, category: 'Product A' },
      { date: '2024-04-01', value: 61, category: 'Product A' },
      { date: '2024-01-01', value: 38, category: 'Product B' },
      { date: '2024-02-01', value: 44, category: 'Product B' },
      { date: '2024-03-01', value: 51, category: 'Product B' },
      { date: '2024-04-01', value: 58, category: 'Product B' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Product Trends Over Time',
      customVizConfig: {
        layers: [
          {
            id: 'layer-lines',
            mark: 'line',
            markOptions: { tooltip: true, size: 3 },
            encodings: {
              x: { field: 'date', type: 'temporal' },
              y: { field: 'value', type: 'quantitative' },
              color: { field: 'category', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-combined-marks-1',
    name: '🎨 Combined Marks: Area + Circle + Rule',
    description: 'Custom viz combining area chart, circles, and reference rule',
    category: 'Custom Visualizations',
    tags: ['custom', 'multi-layer', 'complex', 'advanced'],
    format: 'json',
    data: JSON.stringify([
      { month: 'Jan', value: 45, target: 50, peak: 48 },
      { month: 'Feb', value: 52, target: 50, peak: 55 },
      { month: 'Mar', value: 48, target: 50, peak: 51 },
      { month: 'Apr', value: 61, target: 50, peak: 64 },
      { month: 'May', value: 69, target: 50, peak: 72 },
      { month: 'Jun', value: 72, target: 50, peak: 75 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Performance Analysis with Multiple Indicators',
      customVizConfig: {
        layers: [
          {
            id: 'layer-area',
            mark: 'area',
            markOptions: { tooltip: true, opacity: 0.4, color: '#3b82f6' },
            encodings: {
              x: { field: 'month', type: 'ordinal' },
              y: { field: 'value', type: 'quantitative' },
            },
          },
          {
            id: 'layer-peaks',
            mark: 'circle',
            markOptions: { tooltip: true, size: 80, color: '#10b981' },
            encodings: {
              x: { field: 'month', type: 'ordinal' },
              y: { field: 'peak', type: 'quantitative' },
            },
          },
          {
            id: 'layer-target',
            mark: 'rule',
            markOptions: { tooltip: true, color: '#ef4444', size: 2 },
            encodings: {
              y: { field: 'target', type: 'quantitative', aggregate: 'mean' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-advanced-scatter',
    name: '🎨 Advanced Scatter: Multi-Dimensional',
    description: 'Custom scatter plot with 4+ dimensions encoded',
    category: 'Custom Visualizations',
    tags: ['custom', 'scatter', 'multi-dimensional', 'analysis'],
    format: 'json',
    data: JSON.stringify([
      { age: 25, salary: 55000, experience: 2, department: 'Engineering', performance: 85 },
      { age: 32, salary: 78000, experience: 7, department: 'Engineering', performance: 92 },
      { age: 28, salary: 62000, experience: 4, department: 'Sales', performance: 88 },
      { age: 35, salary: 95000, experience: 10, department: 'Engineering', performance: 95 },
      { age: 29, salary: 58000, experience: 3, department: 'Marketing', performance: 82 },
      { age: 41, salary: 105000, experience: 15, department: 'Engineering', performance: 97 },
      { age: 26, salary: 52000, experience: 2, department: 'Sales', performance: 79 },
      { age: 38, salary: 88000, experience: 12, department: 'Sales', performance: 91 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Employee Analysis: Multi-Dimensional View',
      customVizConfig: {
        layers: [
          {
            id: 'layer-scatter',
            mark: 'circle',
            markOptions: { tooltip: true, opacity: 0.8 },
            encodings: {
              x: { field: 'experience', type: 'quantitative' },
              y: { field: 'salary', type: 'quantitative' },
              size: { field: 'performance', type: 'quantitative' },
              color: { field: 'department', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-lollipop-chart',
    name: '🎨 Lollipop Chart',
    description: 'Custom viz using circle + rule marks for lollipop effect',
    category: 'Custom Visualizations',
    tags: ['custom', 'lollipop', 'creative', 'comparison'],
    format: 'json',
    data: JSON.stringify([
      { category: 'Design', score: 87 },
      { category: 'Development', score: 92 },
      { category: 'Marketing', score: 78 },
      { category: 'Sales', score: 85 },
      { category: 'Support', score: 91 },
      { category: 'Operations', score: 82 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Department Performance Scores (Lollipop)',
      customVizConfig: {
        layers: [
          {
            id: 'layer-stems',
            mark: 'rule',
            markOptions: { tooltip: false, color: '#94a3b8', size: 2 },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'score', type: 'quantitative' },
            },
          },
          {
            id: 'layer-dots',
            mark: 'circle',
            markOptions: { tooltip: true, size: 200, color: '#8b5cf6' },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'score', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-waterfall-chart',
    name: '🎨 Waterfall Chart',
    description: 'Custom viz showing cumulative effects with bars',
    category: 'Custom Visualizations',
    tags: ['custom', 'waterfall', 'financial', 'cumulative'],
    format: 'json',
    data: JSON.stringify([
      { stage: 'Starting Balance', amount: 100000, cumulative: 100000, type: 'start' },
      { stage: 'Revenue', amount: 45000, cumulative: 145000, type: 'increase' },
      { stage: 'Cost of Goods', amount: -18000, cumulative: 127000, type: 'decrease' },
      { stage: 'Operating Expenses', amount: -22000, cumulative: 105000, type: 'decrease' },
      { stage: 'Marketing', amount: -8000, cumulative: 97000, type: 'decrease' },
      { stage: 'Ending Balance', amount: 97000, cumulative: 97000, type: 'end' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Cash Flow Waterfall Analysis',
      customVizConfig: {
        layers: [
          {
            id: 'layer-bars',
            mark: 'bar',
            markOptions: { tooltip: true },
            encodings: {
              x: { field: 'stage', type: 'ordinal' },
              y: { field: 'cumulative', type: 'quantitative' },
              color: { field: 'type', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-slope-chart',
    name: '🎨 Slope Chart',
    description: 'Custom viz showing change between two time points',
    category: 'Custom Visualizations',
    tags: ['custom', 'slope', 'trend', 'comparison'],
    format: 'json',
    data: JSON.stringify([
      { product: 'Product A', period: '2022', value: 45 },
      { product: 'Product A', period: '2023', value: 62 },
      { product: 'Product B', period: '2022', value: 78 },
      { product: 'Product B', period: '2023', value: 71 },
      { product: 'Product C', period: '2022', value: 52 },
      { product: 'Product C', period: '2023', value: 85 },
      { product: 'Product D', period: '2022', value: 91 },
      { product: 'Product D', period: '2023', value: 95 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Product Performance Change (Slope Chart)',
      customVizConfig: {
        layers: [
          {
            id: 'layer-lines',
            mark: 'line',
            markOptions: { tooltip: true, size: 3 },
            encodings: {
              x: { field: 'period', type: 'ordinal' },
              y: { field: 'value', type: 'quantitative' },
              color: { field: 'product', type: 'nominal' },
            },
          },
          {
            id: 'layer-points',
            mark: 'circle',
            markOptions: { tooltip: true, size: 100 },
            encodings: {
              x: { field: 'period', type: 'ordinal' },
              y: { field: 'value', type: 'quantitative' },
              color: { field: 'product', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-connected-scatter',
    name: '🎨 Connected Scatter Plot',
    description: 'Custom viz with points connected by lines showing progression',
    category: 'Custom Visualizations',
    tags: ['custom', 'scatter', 'connected', 'progression'],
    format: 'json',
    data: JSON.stringify([
      { month: 'Jan', revenue: 45000, profit: 12000, efficiency: 26.7 },
      { month: 'Feb', revenue: 52000, profit: 15000, efficiency: 28.8 },
      { month: 'Mar', revenue: 48000, profit: 13500, efficiency: 28.1 },
      { month: 'Apr', revenue: 61000, profit: 19000, efficiency: 31.1 },
      { month: 'May', revenue: 69000, profit: 22000, efficiency: 31.9 },
      { month: 'Jun', revenue: 72000, profit: 24000, efficiency: 33.3 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Revenue vs Profit Progression',
      customVizConfig: {
        layers: [
          {
            id: 'layer-path',
            mark: 'line',
            markOptions: { tooltip: false, color: '#94a3b8', size: 2 },
            encodings: {
              x: { field: 'revenue', type: 'quantitative' },
              y: { field: 'profit', type: 'quantitative' },
            },
          },
          {
            id: 'layer-points',
            mark: 'circle',
            markOptions: { tooltip: true, opacity: 0.9 },
            encodings: {
              x: { field: 'revenue', type: 'quantitative' },
              y: { field: 'profit', type: 'quantitative' },
              size: { field: 'efficiency', type: 'quantitative' },
              color: { field: 'month', type: 'ordinal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-ranged-dots',
    name: '🎨 Ranged Dot Plot',
    description: 'Custom viz showing ranges with min/max dots and connecting lines',
    category: 'Custom Visualizations',
    tags: ['custom', 'range', 'dots', 'comparison'],
    format: 'json',
    data: JSON.stringify([
      { category: 'Q1', min: 35, max: 87, avg: 61 },
      { category: 'Q2', min: 42, max: 92, avg: 67 },
      { category: 'Q3', min: 38, max: 85, avg: 62 },
      { category: 'Q4', min: 45, max: 95, avg: 70 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Quarterly Performance Range',
      customVizConfig: {
        layers: [
          {
            id: 'layer-min-points',
            mark: 'circle',
            markOptions: { tooltip: true, size: 100, color: '#ef4444' },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'min', type: 'quantitative' },
            },
          },
          {
            id: 'layer-max-points',
            mark: 'circle',
            markOptions: { tooltip: true, size: 100, color: '#10b981' },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'max', type: 'quantitative' },
            },
          },
          {
            id: 'layer-avg-points',
            mark: 'square',
            markOptions: { tooltip: true, size: 150, color: '#3b82f6' },
            encodings: {
              x: { field: 'category', type: 'nominal' },
              y: { field: 'avg', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-bullet-chart',
    name: '🎨 Bullet Chart',
    description: 'Custom viz combining bars and rules for KPI visualization',
    category: 'Custom Visualizations',
    tags: ['custom', 'bullet', 'kpi', 'performance'],
    format: 'json',
    data: JSON.stringify([
      { metric: 'Sales', actual: 85, target: 100, poor: 60, satisfactory: 80, good: 100 },
      { metric: 'Profit', actual: 72, target: 80, poor: 50, satisfactory: 70, good: 90 },
      { metric: 'Customer Sat', actual: 91, target: 85, poor: 70, satisfactory: 85, good: 95 },
      { metric: 'Efficiency', actual: 78, target: 90, poor: 65, satisfactory: 85, good: 100 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'KPI Performance Bullet Chart',
      customVizConfig: {
        layers: [
          {
            id: 'layer-actual',
            mark: 'bar',
            markOptions: { tooltip: true, color: '#3b82f6', opacity: 0.8 },
            encodings: {
              x: { field: 'actual', type: 'quantitative' },
              y: { field: 'metric', type: 'nominal' },
            },
          },
          {
            id: 'layer-target',
            mark: 'tick',
            markOptions: { tooltip: true, color: '#ef4444', size: 3 },
            encodings: {
              x: { field: 'target', type: 'quantitative' },
              y: { field: 'metric', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-funnel-chart',
    name: '🎨 Funnel Chart',
    description: 'Custom viz showing conversion funnel with decreasing bars',
    category: 'Custom Visualizations',
    tags: ['custom', 'funnel', 'conversion', 'sales'],
    format: 'json',
    data: JSON.stringify([
      { stage: '1. Website Visitors', count: 10000, rate: 100 },
      { stage: '2. Product Views', count: 5000, rate: 50 },
      { stage: '3. Add to Cart', count: 1500, rate: 15 },
      { stage: '4. Checkout', count: 750, rate: 7.5 },
      { stage: '5. Purchase', count: 500, rate: 5 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Sales Funnel Conversion',
      customVizConfig: {
        layers: [
          {
            id: 'layer-funnel',
            mark: 'bar',
            markOptions: { tooltip: true },
            encodings: {
              x: { field: 'count', type: 'quantitative' },
              y: { field: 'stage', type: 'ordinal' },
              color: { field: 'rate', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-dumbbell-chart',
    name: '🎨 Dumbbell Chart',
    description: 'Custom viz showing before/after comparison with connecting lines',
    category: 'Custom Visualizations',
    tags: ['custom', 'dumbbell', 'comparison', 'change'],
    format: 'json',
    data: JSON.stringify([
      { department: 'Engineering', before: 45, after: 62 },
      { department: 'Sales', before: 78, after: 85 },
      { department: 'Marketing', before: 52, after: 71 },
      { department: 'Support', before: 88, after: 92 },
      { department: 'Operations', before: 65, after: 58 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Department Satisfaction: Before vs After',
      customVizConfig: {
        layers: [
          {
            id: 'layer-before',
            mark: 'circle',
            markOptions: { tooltip: true, size: 150, color: '#ef4444' },
            encodings: {
              x: { field: 'before', type: 'quantitative' },
              y: { field: 'department', type: 'nominal' },
            },
          },
          {
            id: 'layer-after',
            mark: 'circle',
            markOptions: { tooltip: true, size: 150, color: '#10b981' },
            encodings: {
              x: { field: 'after', type: 'quantitative' },
              y: { field: 'department', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-horizon-chart',
    name: '🎨 Horizon Chart Style',
    description: 'Custom viz with layered areas for compact time series',
    category: 'Custom Visualizations',
    tags: ['custom', 'horizon', 'time-series', 'compact'],
    format: 'json',
    data: JSON.stringify([
      { month: 'Jan', value: 23, band: 'low' },
      { month: 'Feb', value: 45, band: 'medium' },
      { month: 'Mar', value: 67, band: 'high' },
      { month: 'Apr', value: 89, band: 'high' },
      { month: 'May', value: 56, band: 'medium' },
      { month: 'Jun', value: 34, band: 'medium' },
      { month: 'Jul', value: 78, band: 'high' },
      { month: 'Aug', value: 91, band: 'high' },
      { month: 'Sep', value: 42, band: 'medium' },
      { month: 'Oct', value: 65, band: 'high' },
      { month: 'Nov', value: 28, band: 'low' },
      { month: 'Dec', value: 51, band: 'medium' },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Performance Horizon Chart',
      customVizConfig: {
        layers: [
          {
            id: 'layer-area',
            mark: 'area',
            markOptions: { tooltip: true, opacity: 0.6 },
            encodings: {
              x: { field: 'month', type: 'ordinal' },
              y: { field: 'value', type: 'quantitative' },
              color: { field: 'band', type: 'nominal' },
            },
          },
          {
            id: 'layer-line',
            mark: 'line',
            markOptions: { tooltip: false, color: '#1f2937', size: 2 },
            encodings: {
              x: { field: 'month', type: 'ordinal' },
              y: { field: 'value', type: 'quantitative' },
            },
          },
        ],
      },
    },
  },
  {
    id: 'custom-sparkline-multiples',
    name: '🎨 Sparkline Grid',
    description: 'Custom viz with mini trend lines for multiple series',
    category: 'Custom Visualizations',
    tags: ['custom', 'sparkline', 'small-multiples', 'trends'],
    format: 'json',
    data: JSON.stringify([
      { product: 'A', week: 1, sales: 45 },
      { product: 'A', week: 2, sales: 52 },
      { product: 'A', week: 3, sales: 48 },
      { product: 'A', week: 4, sales: 61 },
      { product: 'B', week: 1, sales: 78 },
      { product: 'B', week: 2, sales: 85 },
      { product: 'B', week: 3, sales: 82 },
      { product: 'B', week: 4, sales: 91 },
      { product: 'C', week: 1, sales: 34 },
      { product: 'C', week: 2, sales: 41 },
      { product: 'C', week: 3, sales: 38 },
      { product: 'C', week: 4, sales: 45 },
    ], null, 2),
    vizConfig: {
      type: 'custom',
      title: 'Weekly Sales Trends by Product',
      customVizConfig: {
        layers: [
          {
            id: 'layer-trends',
            mark: 'line',
            markOptions: { tooltip: true, size: 2 },
            encodings: {
              x: { field: 'week', type: 'ordinal' },
              y: { field: 'sales', type: 'quantitative' },
              color: { field: 'product', type: 'nominal' },
            },
          },
          {
            id: 'layer-end-points',
            mark: 'circle',
            markOptions: { tooltip: true, size: 80 },
            encodings: {
              x: { field: 'week', type: 'ordinal' },
              y: { field: 'sales', type: 'quantitative' },
              color: { field: 'product', type: 'nominal' },
            },
          },
        ],
      },
    },
  },
];

