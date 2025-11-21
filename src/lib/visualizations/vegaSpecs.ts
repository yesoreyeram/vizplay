import type { TopLevelSpec } from 'vega-lite';

export interface VisualizationConfig {
  type: string;
  xField?: string;
  yField?: string;
  colorField?: string;
  sizeField?: string;
  title?: string;
}

export const visualizationTypes = [
  { id: 'bar', name: 'Bar Chart', description: 'Compare values across categories' },
  { id: 'line', name: 'Line Chart', description: 'Show trends over time' },
  { id: 'area', name: 'Area Chart', description: 'Show cumulative trends' },
  { id: 'scatter', name: 'Scatter Plot', description: 'Show correlation between variables' },
  { id: 'pie', name: 'Pie Chart', description: 'Show proportions of a whole' },
  { id: 'heatmap', name: 'Heatmap', description: 'Show patterns in matrix data' },
  { id: 'boxplot', name: 'Box Plot', description: 'Show distribution statistics' },
  { id: 'histogram', name: 'Histogram', description: 'Show frequency distribution' },
];

export function generateVegaSpec(
  data: any[],
  config: VisualizationConfig
): TopLevelSpec {
  const baseSpec: any = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    width: 'container',
    height: 'container',
    data: { values: data },
    title: config.title || `${config.type} Chart`,
    config: {
      background: '#0a0e1a',
      view: { strokeWidth: 0, fill: '#0a0e1a' },
      axis: {
        labelFont: 'system-ui',
        titleFont: 'system-ui',
        labelColor: '#e5e7eb',
        titleColor: '#e5e7eb',
        gridColor: '#1f2937',
        domainColor: '#374151',
      },
      title: {
        color: '#e5e7eb',
        font: 'system-ui',
      },
      legend: {
        labelColor: '#e5e7eb',
        titleColor: '#e5e7eb',
      },
    },
  };

  switch (config.type) {
    case 'bar':
      return {
        ...baseSpec,
        mark: { type: 'bar', tooltip: true },
        encoding: {
          x: { field: config.xField, type: 'nominal', axis: { labelAngle: -45 } },
          y: { field: config.yField, type: 'quantitative' },
          color: config.colorField ? { field: config.colorField, type: 'nominal' } : undefined,
        },
      };

    case 'line':
      return {
        ...baseSpec,
        mark: { type: 'line', point: true, tooltip: true },
        encoding: {
          x: { field: config.xField, type: 'ordinal' },
          y: { field: config.yField, type: 'quantitative' },
          color: config.colorField ? { field: config.colorField, type: 'nominal' } : undefined,
        },
      };

    case 'area':
      return {
        ...baseSpec,
        mark: { type: 'area', tooltip: true },
        encoding: {
          x: { field: config.xField, type: 'ordinal' },
          y: { field: config.yField, type: 'quantitative' },
          color: config.colorField ? { field: config.colorField, type: 'nominal' } : undefined,
        },
      };

    case 'scatter':
      return {
        ...baseSpec,
        mark: { type: 'point', tooltip: true, filled: true, size: 100, opacity: 0.8, color: config.colorField ? undefined : '#60a5fa' },
        encoding: {
          x: { field: config.xField, type: 'quantitative' },
          y: { field: config.yField, type: 'quantitative' },
          color: config.colorField ? { field: config.colorField, type: 'nominal' } : undefined,
          size: config.sizeField ? { field: config.sizeField, type: 'quantitative', scale: { range: [50, 400] } } : undefined,
        },
      };

    case 'pie':
      return {
        ...baseSpec,
        mark: { type: 'arc', tooltip: true },
        encoding: {
          theta: { field: config.yField, type: 'quantitative' },
          color: { field: config.xField, type: 'nominal' },
        },
        view: { stroke: null },
      };

    case 'heatmap':
      return {
        ...baseSpec,
        mark: { type: 'rect', tooltip: true },
        encoding: {
          x: { field: config.xField, type: 'ordinal' },
          y: { field: config.yField, type: 'ordinal' },
          color: { field: config.colorField, type: 'quantitative', scale: { scheme: 'viridis' } },
        },
      };

    case 'boxplot':
      return {
        ...baseSpec,
        mark: { type: 'boxplot', tooltip: true },
        encoding: {
          x: { field: config.xField, type: 'nominal' },
          y: { field: config.yField, type: 'quantitative' },
        },
      };

    case 'histogram':
      return {
        ...baseSpec,
        mark: { type: 'bar', tooltip: true },
        encoding: {
          x: { 
            field: config.xField, 
            type: 'quantitative', 
            bin: true,
            axis: { labelAngle: -45 }
          },
          y: { aggregate: 'count', type: 'quantitative' },
        },
      };

    default:
      return {
        ...baseSpec,
        mark: { type: 'bar', tooltip: true },
        encoding: {
          x: { field: config.xField, type: 'nominal' },
          y: { field: config.yField, type: 'quantitative' },
        },
      };
  }
}

export function getAvailableFields(data: any[]): string[] {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
}
