import type { CustomVizConfig, VizLayer } from '@/components/CustomVizBuilder';
import type { VisualizationConfig } from './vegaSpecs';

/**
 * Migrates a standard chart configuration to a custom viz configuration
 * This allows users to switch to custom mode without losing their current setup
 */
export function migrateToCustomViz(config: VisualizationConfig): CustomVizConfig {
  const layers: VizLayer[] = [];

  switch (config.type) {
    case 'bar':
      layers.push(...migrateBarChart(config));
      break;
    case 'line':
      layers.push(...migrateLineChart(config));
      break;
    case 'area':
      layers.push(...migrateAreaChart(config));
      break;
    case 'scatter':
      layers.push(...migrateScatterChart(config));
      break;
    case 'pie':
      layers.push(...migratePieChart(config));
      break;
    case 'heatmap':
      layers.push(...migrateHeatmap(config));
      break;
    case 'heatlane':
      layers.push(...migrateHeatlane(config));
      break;
    case 'boxplot':
      layers.push(...migrateBoxplot(config));
      break;
    case 'histogram':
      layers.push(...migrateHistogram(config));
      break;
    default:
      // For unknown types, create a basic layer
      if (config.xField && config.yField) {
        layers.push(createBasicLayer(config));
      }
  }

  return { layers };
}

function createBasicLayer(config: VisualizationConfig): VizLayer {
  const layer: VizLayer = {
    id: `layer-${crypto.randomUUID()}`,
    mark: 'bar',
    markOptions: { tooltip: true },
    encodings: {},
  };

  if (config.xField) {
    layer.encodings.x = { field: config.xField, type: 'nominal' };
  }
  if (config.yField) {
    layer.encodings.y = { field: config.yField, type: 'quantitative' };
  }
  if (config.colorField && config.colorField !== '__none__') {
    layer.encodings.color = { field: config.colorField, type: 'nominal' };
  }

  return layer;
}

function migrateBarChart(config: VisualizationConfig): VizLayer[] {
  const layers: VizLayer[] = [];
  const barStyle = config.barStyle || 'simple';
  const barOrientation = config.barOrientation || 'vertical';
  const isHorizontal = barOrientation === 'horizontal';
  const showTextLabels = config.showTextLabels || false;
  const aggregateOp = config.aggregateOp || 'none';
  const colorGradient = config.colorGradient || false;

  // Create main bar layer
  const barLayer: VizLayer = {
    id: `layer-bar-${crypto.randomUUID()}`,
    mark: 'bar',
    markOptions: { tooltip: true },
    encodings: {},
  };

  // Determine field types and aggregation
  const xFieldType = isHorizontal ? 'quantitative' : 'nominal';
  const yFieldType = isHorizontal ? 'nominal' : 'quantitative';

  // Build X encoding
  if (config.xField) {
    const xEncoding: VizLayer['encodings']['x'] = {
      field: isHorizontal ? config.yField! : config.xField,
      type: xFieldType,
    };

    // Add sorting if specified
    if (config.xAxisSort && config.xAxisSort !== 'none' && config.yField) {
      xEncoding.axis = {
        labelAngle: isHorizontal ? 0 : -45
      };
    }

    barLayer.encodings.x = xEncoding;
  }

  // Build Y encoding
  if (config.yField) {
    const yEncoding: VizLayer['encodings']['y'] = {
      field: isHorizontal ? config.xField! : config.yField,
      type: yFieldType,
    };

    // Add aggregation if specified
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
      if (!isHorizontal) {
        yEncoding.aggregate = vegaAgg;
      } else {
        if (barLayer.encodings.x) {
          barLayer.encodings.x.aggregate = vegaAgg;
        }
      }
    }

    // Stack normalization for stacked bars
    if (barStyle === 'stacked' && config.stackNormalize) {
      if (isHorizontal) {
        if (barLayer.encodings.x) {
          barLayer.encodings.x.scale = { ...barLayer.encodings.x.scale };
        }
      } else {
        yEncoding.scale = { ...yEncoding.scale };
      }
    }

    barLayer.encodings.y = yEncoding;
  }

  // Build color encoding
  if (colorGradient && config.yField) {
    barLayer.encodings.color = {
      field: config.yField,
      type: 'quantitative',
      scale: { scheme: 'blues' }
    };
  } else if (config.colorField && config.colorField !== '__none__') {
    barLayer.encodings.color = {
      field: config.colorField,
      type: 'nominal',
      scale: { scheme: 'category10' }
    };
  }

  layers.push(barLayer);

  // Add text labels layer if enabled
  if (showTextLabels && config.yField) {
    const textLayer: VizLayer = {
      id: `layer-text-${crypto.randomUUID()}`,
      mark: 'text',
      markOptions: {
        color: '#e5e7eb',
      },
      encodings: {
        x: barLayer.encodings.x ? { ...barLayer.encodings.x } : undefined,
        y: barLayer.encodings.y ? { ...barLayer.encodings.y } : undefined,
        text: { field: config.yField, type: 'quantitative' },
      },
    };
    layers.push(textLayer);
  }

  // Note: Reference lines are not migrated as they require datum encoding which isn't
  // supported in the current VizLayer interface

  return layers;
}

function migrateLineChart(config: VisualizationConfig): VizLayer[] {
  const layer: VizLayer = {
    id: `layer-line-${crypto.randomUUID()}`,
    mark: 'line',
    markOptions: { tooltip: true },
    encodings: {},
  };

  if (config.xField) {
    layer.encodings.x = { field: config.xField, type: 'ordinal' };
  }
  if (config.yField) {
    layer.encodings.y = { field: config.yField, type: 'quantitative' };
  }
  if (config.colorField && config.colorField !== '__none__') {
    layer.encodings.color = { field: config.colorField, type: 'nominal' };
  }

  // Add point markers on the line
  const pointLayer: VizLayer = {
    id: `layer-point-${crypto.randomUUID()}`,
    mark: 'point',
    markOptions: { tooltip: true, filled: true },
    encodings: {
      x: layer.encodings.x ? { ...layer.encodings.x } : undefined,
      y: layer.encodings.y ? { ...layer.encodings.y } : undefined,
      color: layer.encodings.color ? { ...layer.encodings.color } : undefined,
    },
  };

  return [layer, pointLayer];
}

function migrateAreaChart(config: VisualizationConfig): VizLayer[] {
  const layer: VizLayer = {
    id: `layer-area-${crypto.randomUUID()}`,
    mark: 'area',
    markOptions: { tooltip: true },
    encodings: {},
  };

  if (config.xField) {
    layer.encodings.x = { field: config.xField, type: 'ordinal' };
  }
  if (config.yField) {
    layer.encodings.y = { field: config.yField, type: 'quantitative' };
  }
  if (config.colorField && config.colorField !== '__none__') {
    layer.encodings.color = { field: config.colorField, type: 'nominal' };
  }

  return [layer];
}

function migrateScatterChart(config: VisualizationConfig): VizLayer[] {
  const layer: VizLayer = {
    id: `layer-scatter-${crypto.randomUUID()}`,
    mark: 'point',
    markOptions: {
      tooltip: true,
      filled: true,
      size: 100,
      opacity: 0.8,
    },
    encodings: {},
  };

  if (config.xField) {
    layer.encodings.x = { field: config.xField, type: 'quantitative' };
  }
  if (config.yField) {
    layer.encodings.y = { field: config.yField, type: 'quantitative' };
  }
  if (config.colorField && config.colorField !== '__none__') {
    layer.encodings.color = { field: config.colorField, type: 'nominal' };
  }
  if (config.sizeField && config.sizeField !== '__none__') {
    layer.encodings.size = {
      field: config.sizeField,
      type: 'quantitative',
      scale: { range: [50, 400] }
    };
  }

  return [layer];
}

function migratePieChart(config: VisualizationConfig): VizLayer[] {
  const layer: VizLayer = {
    id: `layer-pie-${crypto.randomUUID()}`,
    mark: 'arc',
    markOptions: { tooltip: true },
    encodings: {},
  };

  // Pie charts use theta encoding for the quantitative value (angle/size)
  if (config.yField) {
    layer.encodings.theta = { field: config.yField, type: 'quantitative' };
  }
  if (config.xField) {
    layer.encodings.color = { field: config.xField, type: 'nominal' };
  }

  return [layer];
}

function migrateHeatmap(config: VisualizationConfig): VizLayer[] {
  const layer: VizLayer = {
    id: `layer-heatmap-${crypto.randomUUID()}`,
    mark: 'rect',
    markOptions: { tooltip: true },
    encodings: {},
  };

  if (config.xField) {
    layer.encodings.x = { field: config.xField, type: 'ordinal' };
  }
  if (config.yField) {
    layer.encodings.y = { field: config.yField, type: 'ordinal' };
  }
  if (config.colorField && config.colorField !== '__none__') {
    layer.encodings.color = {
      field: config.colorField,
      type: 'quantitative',
      scale: { scheme: 'viridis' }
    };
  }

  return [layer];
}

function migrateHeatlane(config: VisualizationConfig): VizLayer[] {
  const layer: VizLayer = {
    id: `layer-heatlane-${crypto.randomUUID()}`,
    mark: 'rect',
    markOptions: { tooltip: true },
    encodings: {},
  };

  if (config.xField) {
    layer.encodings.y = { field: config.xField, type: 'nominal' };
  }
  if (config.yField) {
    layer.encodings.x = { field: config.yField, type: 'ordinal' };
  }
  
  // Use color or size field for intensity
  const colorFieldForHeat = config.colorField && config.colorField !== '__none__' 
    ? config.colorField 
    : config.sizeField;
  
  if (colorFieldForHeat && colorFieldForHeat !== '__none__') {
    layer.encodings.color = {
      field: colorFieldForHeat,
      type: 'quantitative',
      scale: { scheme: 'redyellowgreen' }
    };
  }

  return [layer];
}

function migrateBoxplot(config: VisualizationConfig): VizLayer[] {
  const layer: VizLayer = {
    id: `layer-boxplot-${crypto.randomUUID()}`,
    mark: 'boxplot',
    markOptions: { tooltip: true },
    encodings: {},
  };

  if (config.xField) {
    layer.encodings.x = { field: config.xField, type: 'nominal' };
  }
  if (config.yField) {
    layer.encodings.y = { field: config.yField, type: 'quantitative' };
  }

  return [layer];
}

function migrateHistogram(config: VisualizationConfig): VizLayer[] {
  const layer: VizLayer = {
    id: `layer-histogram-${crypto.randomUUID()}`,
    mark: 'bar',
    markOptions: { tooltip: true },
    encodings: {},
  };

  if (config.xField) {
    layer.encodings.x = {
      field: config.xField,
      type: 'quantitative',
      bin: true,
      axis: { labelAngle: -45 }
    };
    // Count aggregation for histograms - using the field with count aggregation
    layer.encodings.y = {
      field: config.xField,
      type: 'quantitative',
      aggregate: 'count'
    };
  }

  return [layer];
}
