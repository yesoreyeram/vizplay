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
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto">
      <div className="flex items-center gap-2 pb-2 border-b">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Visualization Configuration</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="viz-type">Visualization Type</Label>
        <Select value={vizType} onValueChange={onVizTypeChange}>
          <SelectTrigger id="viz-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {visualizationTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{type.name}</span>
                  <span className="text-xs text-muted-foreground">{type.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="chart-title">Chart Title</Label>
        <Input
          id="chart-title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter chart title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="x-field">X-Axis Field</Label>
        <Select value={xField} onValueChange={onXFieldChange}>
          <SelectTrigger id="x-field">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {availableFields.map(field => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="y-field">Y-Axis Field</Label>
        <Select value={yField} onValueChange={onYFieldChange}>
          <SelectTrigger id="y-field">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {availableFields.map(field => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {['scatter', 'bar', 'line'].includes(vizType) && (
        <div className="space-y-2">
          <Label htmlFor="color-field">Color Field (optional)</Label>
          <Select value={colorField} onValueChange={onColorFieldChange}>
            <SelectTrigger id="color-field">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
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
        <div className="space-y-2">
          <Label htmlFor="size-field">Size Field (optional)</Label>
          <Select value={sizeField} onValueChange={onSizeFieldChange}>
            <SelectTrigger id="size-field">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
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
