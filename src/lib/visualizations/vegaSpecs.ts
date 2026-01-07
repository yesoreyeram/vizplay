/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
// @ts-nocheck
import type { TopLevelSpec } from 'vega-lite';
import type { CustomVizConfig } from '@/components/CustomVizBuilder';

export interface VisualizationConfig {
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
  // New bar chart options
  showTextLabels?: boolean;
  aggregateOp?: 'none' | 'count' | 'sum' | 'average' | 'median' | 'min' | 'max';
  colorGradient?: boolean;
  xField2?: string; // For Gantt charts (end field)
  referenceLine?: number; // For adding reference/average lines
  showReferenceLine?: boolean;
  // Legend controls
  legendPosition?: 'none' | 'left' | 'right' | 'top' | 'bottom';
  legendMode?: 'inline' | 'table' | 'popup';
  // Custom viz builder config
  customVizConfig?: CustomVizConfig;
}

export const visualizationTypes = [
  { id: 'bar', name: 'Bar Chart', description: 'Compare values across categories' },
  { id: 'line', name: 'Line Chart', description: 'Show trends over time' },
  { id: 'area', name: 'Area Chart', description: 'Show cumulative trends' },
  { id: 'scatter', name: 'Scatter Plot', description: 'Show correlation between variables' },
  { id: 'pie', name: 'Pie Chart', description: 'Show proportions of a whole' },
  { id: 'heatmap', name: 'Heatmap', description: 'Show patterns in matrix data' },
  { id: 'heatlane', name: 'Heat Lane', description: 'Show categorical data with color intensity' },
  { id: 'boxplot', name: 'Box Plot', description: 'Show distribution statistics' },
  { id: 'histogram', name: 'Histogram', description: 'Show frequency distribution' },
  { id: 'custom', name: 'Custom Vega-Lite', description: 'Advanced custom visualization with full Vega-Lite spec control' },
];

export function generateVegaSpec(
  data: Record<string, unknown>[],
  config: VisualizationConfig
): TopLevelSpec {
  // Determine legend configuration
  const legendPosition = config.legendPosition || 'right';
  const showLegend = legendPosition !== 'none';
  const legendOrient = legendPosition === 'none' ? 'right' : legendPosition;
  
  const baseSpec: Record<string, unknown> = {
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
      legend: showLegend ? {
        labelColor: '#e5e7eb',
        titleColor: '#e5e7eb',
        orient: legendOrient,
      } : null,
    },
  };

  switch (config.type) {
    case 'bar': {
      const barStyle = config.barStyle || 'simple';
      const barOrientation = config.barOrientation || 'vertical';
      const stackNormalize = config.stackNormalize || false;
      const xAxisSort = config.xAxisSort || 'none';
      const stackSort = config.stackSort || 'none';
      const topN = config.topN || 0;
      const showTextLabels = config.showTextLabels || false;
      const aggregateOp = config.aggregateOp || 'none';
      const colorGradient = config.colorGradient || false;
      const showReferenceLine = config.showReferenceLine || false;

      // Apply top N filtering if sorting is enabled
      let processedData = data;
      if (xAxisSort !== 'none' && topN > 0) {
        // Group and sum by x field, then take top N
        const aggregated = data.reduce((acc: Record<string, number>, item) => {
          const key = item[config.xField!] as string;
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key] += (item[config.yField!] as number) || 0;
          return acc;
        }, {});
        
        const sorted = Object.entries(aggregated)
          .sort(([, a], [, b]) => xAxisSort === 'ascending' ? (a as number) - (b as number) : (b as number) - (a as number))
          .slice(0, topN)
          .map(([key]) => key);
        
        processedData = data.filter((item) => sorted.includes(item[config.xField!] as string));
      }

      // Determine x and y encodings based on orientation
      const isHorizontal = barOrientation === 'horizontal';
      
      // Handle Gantt chart (ranged bars)
      if (barStyle === 'gantt' && config.xField2) {
        const ganttSpec = {
          ...baseSpec,
          data: { values: processedData },
          mark: { type: 'bar', tooltip: true },
          encoding: {
            y: { field: config.xField, type: 'nominal' },
            x: { field: config.yField, type: 'quantitative', title: 'Start' },
            x2: { field: config.xField2 },
            color: config.colorField ? { field: config.colorField, type: 'nominal' } : { value: '#60a5fa' },
          },
        };
        return ganttSpec as TopLevelSpec;
      }

      // Handle diverging bar chart
      if (barStyle === 'diverging') {
        const divergingSpec = {
          ...baseSpec,
          data: { values: processedData },
          mark: { type: 'bar', tooltip: true },
          encoding: isHorizontal ? {
            y: { field: config.xField, type: 'nominal' },
            x: { 
              field: config.yField, 
              type: 'quantitative',
              scale: { domain: 'unaggregated' }
            },
            color: {
              condition: {
                test: `datum.${config.yField} > 0`,
                value: '#10b981'
              },
              value: '#ef4444'
            }
          } : {
            x: { field: config.xField, type: 'nominal', axis: { labelAngle: -45 } },
            y: { 
              field: config.yField, 
              type: 'quantitative',
              scale: { domain: 'unaggregated' }
            },
            color: {
              condition: {
                test: `datum.${config.yField} > 0`,
                value: '#10b981'
              },
              value: '#ef4444'
            }
          },
        };
        if (!showLegend) {
          (divergingSpec.encoding as any).color.legend = null;
        }
        return divergingSpec as TopLevelSpec;
      }

      // Handle diverging stacked bar chart (with neutral parts)
      if (barStyle === 'diverging-stacked' && config.colorField && config.colorField !== '__none__') {
        const divergingStackedSpec = {
          ...baseSpec,
          data: { values: processedData },
          mark: { type: 'bar', tooltip: true },
          encoding: isHorizontal ? {
            y: { field: config.xField, type: 'nominal' },
            x: { 
              field: config.yField, 
              type: 'quantitative',
              stack: 'center',
              axis: { title: config.yField }
            },
            color: { 
              field: config.colorField, 
              type: 'nominal',
              legend: showLegend ? { orient: legendOrient } : null,
              scale: { scheme: 'category10' }
            }
          } : {
            x: { field: config.xField, type: 'nominal', axis: { labelAngle: -45 } },
            y: { 
              field: config.yField, 
              type: 'quantitative',
              stack: 'center',
              axis: { title: config.yField }
            },
            color: { 
              field: config.colorField, 
              type: 'nominal',
              legend: showLegend ? { orient: legendOrient } : null,
              scale: { scheme: 'category10' }
            }
          },
        };
        return divergingStackedSpec as TopLevelSpec;
      }

      // Standard bar encodings
      let xEncoding: any = isHorizontal
        ? { field: config.yField, type: 'quantitative' }
        : { field: config.xField, type: 'nominal', axis: { labelAngle: -45 } };
      let yEncoding: any = isHorizontal
        ? { field: config.xField, type: 'nominal' }
        : { field: config.yField, type: 'quantitative' };
      
      // Add aggregate operation if specified
      if (aggregateOp !== 'none') {
        const aggMap: Record<string, string> = {
          'count': 'count',
          'sum': 'sum',
          'average': 'mean',
          'median': 'median',
          'min': 'min',
          'max': 'max'
        };
        const vegaAgg = aggMap[aggregateOp];
        if (isHorizontal) {
          xEncoding = { ...xEncoding, aggregate: vegaAgg };
        } else {
          yEncoding = { ...yEncoding, aggregate: vegaAgg };
        }
      }
      
      // Add sorting to axis encoding
      if (xAxisSort !== 'none' && !isHorizontal) {
        xEncoding.sort = xAxisSort === 'ascending' 
          ? { op: 'sum', field: config.yField, order: 'ascending' }
          : { op: 'sum', field: config.yField, order: 'descending' };
      } else if (xAxisSort !== 'none' && isHorizontal) {
        yEncoding.sort = xAxisSort === 'ascending'
          ? { op: 'sum', field: config.yField, order: 'ascending' }
          : { op: 'sum', field: config.yField, order: 'descending' };
      }

      // Stack normalization for stacked bars
      if (barStyle === 'stacked' && stackNormalize) {
        if (isHorizontal) {
          xEncoding.stack = 'normalize';
        } else {
          yEncoding.stack = 'normalize';
        }
      }

      const baseBarSpec = {
        ...baseSpec,
        data: { values: processedData },
      };

      // Build color encoding
      let colorEncoding: any;
      if (colorGradient && config.yField) {
        colorEncoding = { 
          field: config.yField, 
          type: 'quantitative',
          scale: { scheme: 'blues' },
          legend: showLegend ? { orient: legendOrient } : null
        };
      } else if (config.colorField && config.colorField !== '__none__') {
        colorEncoding = { 
          field: config.colorField, 
          type: 'nominal',
          sort: stackSort !== 'none' ? { op: 'sum', field: config.yField, order: stackSort === 'ascending' ? 'ascending' : 'descending' } : null,
          legend: showLegend ? { orient: legendOrient } : null
        };
      } else {
        colorEncoding = { value: '#60a5fa' };
      }

      // Create layers for bar chart with text labels or reference line
      if (showTextLabels || showReferenceLine) {
        const layers: any[] = [];

        // Add bar layer
        const barLayer: any = {
          mark: { type: 'bar', tooltip: true },
          encoding: {
            ...( isHorizontal ? { x: xEncoding, y: yEncoding } : { x: xEncoding, y: yEncoding }),
            color: colorEncoding,
          }
        };
        
        if (barStyle === 'grouped' && config.colorField) {
          barLayer.encoding[isHorizontal ? 'yOffset' : 'xOffset'] = { field: config.colorField, type: 'nominal' };
        }
        
        layers.push(barLayer);
        
        // Add text labels layer
        if (showTextLabels) {
          const textLayer: any = {
            mark: { type: 'text', dy: isHorizontal ? 0 : -10, dx: isHorizontal ? 10 : 0, color: '#e5e7eb' },
            encoding: {
              ...( isHorizontal ? { x: xEncoding, y: yEncoding } : { x: xEncoding, y: yEncoding }),
              text: { field: config.yField, type: 'quantitative' }
            }
          };
          
          if (barStyle === 'grouped' && config.colorField) {
            textLayer.encoding[isHorizontal ? 'yOffset' : 'xOffset'] = { field: config.colorField, type: 'nominal' };
          }
          
          layers.push(textLayer);
        }
        
        // Add reference line layer
        if (showReferenceLine && config.referenceLine !== undefined) {
          const refLayer: any = {
            mark: { type: 'rule', strokeDash: [4, 4], stroke: '#fbbf24', size: 2 },
            encoding: isHorizontal ? {
              x: { datum: config.referenceLine }
            } : {
              y: { datum: config.referenceLine }
            }
          };
          layers.push(refLayer);
        }
        
        return {
          ...baseBarSpec,
          layer: layers
        };
      }

      // Standard bar charts without layers
      if (barStyle === 'grouped' && config.colorField) {
        // Grouped bar chart
        return {
          ...baseBarSpec,
          mark: { type: 'bar', tooltip: true },
          encoding: {
            ...( isHorizontal ? { x: xEncoding, y: yEncoding } : { x: xEncoding, y: yEncoding }),
            color: colorEncoding,
            [isHorizontal ? 'yOffset' : 'xOffset']: { field: config.colorField, type: 'nominal' },
          },
        };
      } else if (barStyle === 'stacked' && config.colorField) {
        // Stacked bar chart
        return {
          ...baseBarSpec,
          mark: { type: 'bar', tooltip: true },
          encoding: {
            ...( isHorizontal ? { x: xEncoding, y: yEncoding } : { x: xEncoding, y: yEncoding }),
            color: colorEncoding,
          },
        };
      } else {
        // Simple bar chart
        return {
          ...baseBarSpec,
          mark: { type: 'bar', tooltip: true },
          encoding: {
            ...( isHorizontal ? { x: xEncoding, y: yEncoding } : { x: xEncoding, y: yEncoding }),
            color: colorEncoding,
          },
        };
      }
    }

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
          color: { 
            field: config.colorField, 
            type: 'quantitative', 
            scale: { scheme: 'viridis' },
            legend: showLegend ? { orient: legendOrient } : null
          },
        },
      };

    case 'heatlane': {
      // Heat lane chart - horizontal lanes with color intensity
      // Requires a quantitative field for color encoding
      const colorFieldForHeat = config.colorField && config.colorField !== '__none__' ? config.colorField : config.sizeField;
      return {
        ...baseSpec,
        mark: { type: 'rect', tooltip: true },
        encoding: {
          y: { field: config.xField, type: 'nominal', axis: { title: config.xField } },
          x: { field: config.yField, type: 'ordinal', axis: { labelAngle: 0, title: config.yField } },
          color: colorFieldForHeat ? { 
            field: colorFieldForHeat, 
            type: 'quantitative', 
            scale: { scheme: 'redyellowgreen', reverse: false },
            legend: showLegend ? { 
              orient: legendOrient,
              title: 'Intensity'
            } : null
          } : { value: '#60a5fa' },
        },
        config: {
          ...baseSpec.config,
          mark: { tooltip: { content: 'data' } }
        }
      };
    }

    case 'boxplot':
      return {
        ...baseSpec,
        mark: { type: 'boxplot' } as any,
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

    case 'custom':
      // For custom viz, user builds spec using UI
      if (config.customVizConfig && config.customVizConfig.layers.length > 0) {
        try {
          const layers = config.customVizConfig.layers.map((layer) => {
            const layerSpec: any = {
              mark: layer.markOptions ? { type: layer.mark, ...layer.markOptions } : layer.mark,
              encoding: {},
            };

            // Build encodings
            if (layer.encodings.x) {
              layerSpec.encoding.x = { ...layer.encodings.x };
            }
            if (layer.encodings.y) {
              layerSpec.encoding.y = { ...layer.encodings.y };
            }
            if (layer.encodings.xOffset) {
              layerSpec.encoding.xOffset = { ...layer.encodings.xOffset };
            }
            if (layer.encodings.yOffset) {
              layerSpec.encoding.yOffset = { ...layer.encodings.yOffset };
            }
            if (layer.encodings.color) {
              layerSpec.encoding.color = { ...layer.encodings.color };
            }
            if (layer.encodings.size) {
              layerSpec.encoding.size = { ...layer.encodings.size };
            }
            if (layer.encodings.opacity) {
              layerSpec.encoding.opacity = { ...layer.encodings.opacity };
            }
            if (layer.encodings.shape) {
              layerSpec.encoding.shape = { ...layer.encodings.shape };
            }
            if (layer.encodings.text) {
              layerSpec.encoding.text = { ...layer.encodings.text };
            }
            if (layer.encodings.theta) {
              layerSpec.encoding.theta = { ...layer.encodings.theta };
            }
            if (layer.encodings.tooltip) {
              layerSpec.encoding.tooltip = layer.encodings.tooltip;
            }

            // Add transforms if any
            if (layer.transform && layer.transform.length > 0) {
              layerSpec.transform = layer.transform;
            }

            return layerSpec;
          });

          // If single layer, use it directly; if multiple, use layer composition
          if (layers.length === 1) {
            return {
              ...baseSpec,
              ...layers[0],
            };
          } else {
            return {
              ...baseSpec,
              layer: layers,
            };
          }
        } catch (error) {
          console.error('Error building custom viz spec:', error);
          return {
            ...baseSpec,
            mark: { type: 'text', fontSize: 14 },
            encoding: {
              text: { value: 'Error building custom visualization. Please check your configuration.' }
            }
          };
        }
      }
      // Default template for custom viz when no layers configured
      return {
        ...baseSpec,
        mark: { type: 'text', fontSize: 16 },
        encoding: {
          text: { value: 'Add layers to build your custom visualization' }
        }
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

export function getAvailableFields(data: Record<string, unknown>[]): string[] {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
}
