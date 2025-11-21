import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { visualizationTypes } from '@/lib/visualizations/vegaSpecs';
import { BarChart3 } from 'lucide-react';

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
}: VisualizationControlsProps) {
  return (
    <div className="h-full flex flex-col p-3 space-y-3 overflow-y-auto">
      <div className="flex items-center gap-2 pb-1.5 border-b">
        <BarChart3 className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Visualization Configuration</h3>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="viz-type" className="text-xs">Visualization Type</Label>
        <Select value={vizType} onValueChange={onVizTypeChange}>
          <SelectTrigger id="viz-type" className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {visualizationTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">{type.name}</span>
                  <span className="text-xs text-muted-foreground leading-tight">{type.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
          <Label htmlFor="color-field" className="text-xs">Color Field (optional)</Label>
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
