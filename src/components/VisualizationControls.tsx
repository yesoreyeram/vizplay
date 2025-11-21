import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { visualizationTypes } from '@/lib/visualizations/vegaSpecs';
import { BarChart3, TrendingUp, AreaChart, Circle, PieChart, Grid3x3, Box, BarChart2, Rows, Code } from 'lucide-react';
import { CustomVizBuilder, type CustomVizConfig } from './CustomVizBuilder';



const vizIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  bar: BarChart3,
  line: TrendingUp,
  area: AreaChart,
  scatter: Circle,
  pie: PieChart,
  heatmap: Grid3x3,
  heatlane: Rows,
  boxplot: Box,
  histogram: BarChart2,
  custom: Code,
};

interface VisualizationControlsProps {
  vizType: string;
  onVizTypeChange: (type: string) => void;
  xField: string;
  onXFieldChange: (field: string) => void;
  yField: string;
  onYFieldChange: (field: string) => void;
  colorField: string;
  onColorFieldChange: (field: string) => void;
  sizeField: string;
  onSizeFieldChange: (field: string) => void;
  title: string;
  onTitleChange: (title: string) => void;
  availableFields: string[];
  barStyle: string;
  onBarStyleChange: (style: 'simple' | 'stacked' | 'grouped' | 'diverging' | 'gantt' | 'diverging-stacked') => void;
  barOrientation: 'vertical' | 'horizontal';
  onBarOrientationChange: (orientation: 'vertical' | 'horizontal') => void;
  stackNormalize: boolean;
  onStackNormalizeChange: (normalize: boolean) => void;
  xAxisSort: 'none' | 'ascending' | 'descending';
  onXAxisSortChange: (sort: 'none' | 'ascending' | 'descending') => void;
  stackSort: 'none' | 'ascending' | 'descending';
  onStackSortChange: (sort: 'none' | 'ascending' | 'descending') => void;
  topN: number;
  onTopNChange: (n: number) => void;
  // New bar chart options
  showTextLabels: boolean;
  onShowTextLabelsChange: (show: boolean) => void;
  aggregateOp: 'none' | 'count' | 'sum' | 'average' | 'median' | 'min' | 'max';
  onAggregateOpChange: (op: 'none' | 'count' | 'sum' | 'average' | 'median' | 'min' | 'max') => void;
  colorGradient: boolean;
  onColorGradientChange: (gradient: boolean) => void;
  xField2: string;
  onXField2Change: (field: string) => void;
  showReferenceLine: boolean;
  onShowReferenceLineChange: (show: boolean) => void;
  referenceLine: number;
  onReferenceLineChange: (value: number) => void;
  // Legend controls
  legendPosition: 'none' | 'left' | 'right' | 'top' | 'bottom';
  onLegendPositionChange: (position: 'none' | 'left' | 'right' | 'top' | 'bottom') => void;
  legendMode: 'inline' | 'table' | 'popup';
  onLegendModeChange: (mode: 'inline' | 'table' | 'popup') => void;
  // Custom viz builder
  customVizConfig: CustomVizConfig;
  onCustomVizConfigChange: (config: CustomVizConfig) => void;
}

export function VisualizationControls({
  vizType,
  onVizTypeChange,
  xField,
  onXFieldChange,
  yField,
  onYFieldChange,
  colorField,
  onColorFieldChange,
  sizeField,
  onSizeFieldChange,
  title,
  onTitleChange,
  availableFields,
  barStyle,
  onBarStyleChange,
  barOrientation,
  onBarOrientationChange,
  stackNormalize,
  onStackNormalizeChange,
  xAxisSort,
  onXAxisSortChange,
  stackSort,
  onStackSortChange,
  topN,
  onTopNChange,
  showTextLabels,
  onShowTextLabelsChange,
  aggregateOp,
  onAggregateOpChange,
  colorGradient,
  onColorGradientChange,
  xField2,
  onXField2Change,
  showReferenceLine,
  onShowReferenceLineChange,
  referenceLine,
  onReferenceLineChange,
  legendPosition,
  onLegendPositionChange,
  legendMode,
  onLegendModeChange,
  customVizConfig,
  onCustomVizConfigChange,
}: VisualizationControlsProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Sticky header and viz type picker */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="p-3 pb-2">
          <div className="flex items-center gap-2 pb-2 border-b">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">Visualization Configuration</h3>
          </div>
        </div>
        
        <div className="px-3 pb-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Visualization Type</Label>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {visualizationTypes.map(type => {
                  const Icon = vizIcons[type.id] || BarChart3;
                  const isSelected = vizType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => onVizTypeChange(type.id)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg border transition-all min-w-[90px] ${
                        isSelected
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-card border-border hover:bg-accent hover:border-accent-foreground/20'
                      }`}
                      title={type.description}
                    >
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-xs font-medium text-center leading-tight">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto p-3 pt-0 space-y-3">

      {vizType === 'custom' ? (
        <CustomVizBuilder 
          config={customVizConfig}
          onChange={onCustomVizConfigChange}
          availableFields={availableFields}
        />
      ) : (
        <>

      {vizType === 'bar' && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="bar-style" className="text-xs">Bar Style</Label>
            <Select value={barStyle} onValueChange={onBarStyleChange}>
              <SelectTrigger id="bar-style" className="h-8 text-sm">
                <SelectValue placeholder="Select bar style" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="simple">Simple - Single bars</SelectItem>
                <SelectItem value="stacked">Stacked - Show composition</SelectItem>
                <SelectItem value="grouped">Grouped - Compare side-by-side</SelectItem>
                <SelectItem value="diverging">Diverging - Positive/negative</SelectItem>
                <SelectItem value="diverging-stacked">Diverging Stacked - Center-aligned stacks</SelectItem>
                <SelectItem value="gantt">Gantt - Time ranges</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bar-orientation" className="text-xs">Orientation</Label>
            <Select value={barOrientation} onValueChange={onBarOrientationChange}>
              <SelectTrigger id="bar-orientation" className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="vertical">Vertical</SelectItem>
                <SelectItem value="horizontal">Horizontal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {barStyle === 'stacked' && (
            <div className="space-y-1.5">
              <Label htmlFor="stack-normalize" className="text-xs">Stack Mode</Label>
              <Select 
                value={stackNormalize ? 'normalized' : 'normal'} 
                onValueChange={(v) => onStackNormalizeChange(v === 'normalized')}
              >
                <SelectTrigger id="stack-normalize" className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="normal">Normal - Absolute values</SelectItem>
                  <SelectItem value="normalized">Percentage - 100% normalized</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="x-axis-sort" className="text-xs">Sort {barOrientation === 'vertical' ? 'X-Axis' : 'Y-Axis'}</Label>
            <Select value={xAxisSort} onValueChange={onXAxisSortChange}>
              <SelectTrigger id="x-axis-sort" className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="none">None - Original order</SelectItem>
                <SelectItem value="ascending">Ascending</SelectItem>
                <SelectItem value="descending">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(barStyle === 'stacked' || barStyle === 'grouped') && (
            <div className="space-y-1.5">
              <Label htmlFor="stack-sort" className="text-xs">Sort Stack Items</Label>
              <Select value={stackSort} onValueChange={onStackSortChange}>
                <SelectTrigger id="stack-sort" className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="none">None - Original order</SelectItem>
                  <SelectItem value="ascending">Ascending by value</SelectItem>
                  <SelectItem value="descending">Descending by value</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {xAxisSort !== 'none' && (
            <div className="space-y-1.5">
              <Label htmlFor="top-n" className="text-xs">Limit to Top N (0 = no limit)</Label>
              <Input
                id="top-n"
                type="number"
                min="0"
                value={topN}
                onChange={(e) => onTopNChange(parseInt(e.target.value) || 0)}
                placeholder="0"
                className="h-8 text-sm"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="aggregate-op" className="text-xs">Aggregate Operation</Label>
            <Select value={aggregateOp} onValueChange={onAggregateOpChange}>
              <SelectTrigger id="aggregate-op" className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="none">None - Use raw values</SelectItem>
                <SelectItem value="count">Count</SelectItem>
                <SelectItem value="sum">Sum</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="median">Median</SelectItem>
                <SelectItem value="min">Minimum</SelectItem>
                <SelectItem value="max">Maximum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="show-labels" className="text-xs">Text Labels</Label>
            <Select 
              value={showTextLabels ? 'show' : 'hide'} 
              onValueChange={(v) => onShowTextLabelsChange(v === 'show')}
            >
              <SelectTrigger id="show-labels" className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="hide">Hide</SelectItem>
                <SelectItem value="show">Show on bars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {barStyle !== 'diverging' && barStyle !== 'gantt' && (
            <div className="space-y-1.5">
              <Label htmlFor="color-gradient" className="text-xs">Color Mode</Label>
              <Select 
                value={colorGradient ? 'gradient' : 'solid'} 
                onValueChange={(v) => onColorGradientChange(v === 'gradient')}
              >
                <SelectTrigger id="color-gradient" className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="solid">Solid color</SelectItem>
                  <SelectItem value="gradient">Gradient by value</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {barStyle === 'gantt' && (
            <div className="space-y-1.5">
              <Label htmlFor="x-field2" className="text-xs">End Field (for ranges)</Label>
              <Select value={xField2} onValueChange={onXField2Change}>
                <SelectTrigger id="x-field2" className="h-8 text-sm">
                  <SelectValue placeholder="Select end field" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="__none__">None</SelectItem>
                  {availableFields.map(field => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="show-ref-line" className="text-xs">Reference Line</Label>
            <Select 
              value={showReferenceLine ? 'show' : 'hide'} 
              onValueChange={(v) => onShowReferenceLineChange(v === 'show')}
            >
              <SelectTrigger id="show-ref-line" className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="hide">Hide</SelectItem>
                <SelectItem value="show">Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showReferenceLine && (
            <div className="space-y-1.5">
              <Label htmlFor="ref-line-value" className="text-xs">Reference Line Value</Label>
              <Input
                id="ref-line-value"
                type="number"
                value={referenceLine}
                onChange={(e) => onReferenceLineChange(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="h-8 text-sm"
              />
            </div>
          )}
        </>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="chart-title" className="text-xs">Chart Title</Label>
        <Input
          id="chart-title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter chart title"
          className="h-8 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="x-field" className="text-xs">X-Axis Field</Label>
        <Select value={xField} onValueChange={onXFieldChange}>
          <SelectTrigger id="x-field" className="h-8 text-sm">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {availableFields.map(field => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="y-field" className="text-xs">Y-Axis Field</Label>
        <Select value={yField} onValueChange={onYFieldChange}>
          <SelectTrigger id="y-field" className="h-8 text-sm">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {availableFields.map(field => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {['scatter', 'bar', 'line'].includes(vizType) && (
        <div className="space-y-1.5">
          <Label htmlFor="color-field" className="text-xs">
            Color Field {vizType === 'bar' && barStyle !== 'simple' ? '(required for grouping)' : '(optional)'}
          </Label>
          <Select value={colorField} onValueChange={onColorFieldChange}>
            <SelectTrigger id="color-field" className="h-8 text-sm">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="__none__">None</SelectItem>
              {availableFields.map(field => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {vizType === 'scatter' && (
        <div className="space-y-1.5">
          <Label htmlFor="size-field" className="text-xs">Size Field (optional)</Label>
          <Select value={sizeField} onValueChange={onSizeFieldChange}>
            <SelectTrigger id="size-field" className="h-8 text-sm">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="__none__">None</SelectItem>
              {availableFields.map(field => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Legend Controls */}
      <div className="space-y-1.5">
        <Label htmlFor="legend-position" className="text-xs">Legend Position</Label>
        <Select value={legendPosition} onValueChange={onLegendPositionChange}>
          <SelectTrigger id="legend-position" className="h-8 text-sm">
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="none">None (Hidden)</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="bottom">Bottom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {legendPosition !== 'none' && (
        <div className="space-y-1.5">
          <Label htmlFor="legend-mode" className="text-xs">Legend Display Mode</Label>
          <Select value={legendMode} onValueChange={onLegendModeChange}>
            <SelectTrigger id="legend-mode" className="h-8 text-sm">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="table">Table (default)</SelectItem>
              <SelectItem value="inline">Inline</SelectItem>
              <SelectItem value="popup">Popup with help icon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      </>
      )}
      </div>
    </div>
  );
}
