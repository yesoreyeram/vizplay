import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { visualizationTypes } from '@/lib/visualizations/vegaSpecs';
import { BarChart3, TrendingUp, AreaChart, Circle, PieChart, Grid3x3, Box, BarChart2 } from 'lucide-react';

const vizIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  bar: BarChart3,
  line: TrendingUp,
  area: AreaChart,
  scatter: Circle,
  pie: PieChart,
  heatmap: Grid3x3,
  boxplot: Box,
  histogram: BarChart2,
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
  onBarStyleChange: (style: 'simple' | 'stacked' | 'grouped') => void;
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
}: VisualizationControlsProps) {
  return (
    <div className="h-full flex flex-col p-3 space-y-3 overflow-y-auto">
      <div className="flex items-center gap-2 pb-1.5 border-b">
        <BarChart3 className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Visualization Configuration</h3>
      </div>

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
    </div>
  );
}
