import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

// Layer configuration interface
export interface VizLayer {
  id: string;
  mark: string;
  markOptions?: {
    tooltip?: boolean;
    opacity?: number;
    size?: number;
    color?: string;
    filled?: boolean;
  };
  encodings: {
    x?: { field: string; type: string; aggregate?: string; bin?: boolean; scale?: Record<string, unknown>; axis?: Record<string, unknown> };
    y?: { field: string; type: string; aggregate?: string; bin?: boolean; scale?: Record<string, unknown>; axis?: Record<string, unknown> };
    color?: { field: string; type: string; scale?: Record<string, unknown>; legend?: Record<string, unknown> };
    size?: { field: string; type: string; scale?: Record<string, unknown> };
    opacity?: { field: string; type: string };
    shape?: { field: string; type: string };
    text?: { field: string; type: string };
    theta?: { field: string; type: string; aggregate?: string; stack?: boolean };
    tooltip?: Array<{ field: string; type: string }>;
  };
  transform?: Array<{
    type: string;
    filter?: string;
    calculate?: string;
    as?: string;
    groupby?: string[];
    aggregate?: Array<{ op: string; field: string; as: string }>;
  }>;
}

export interface CustomVizConfig {
  layers: VizLayer[];
  facet?: { field: string; type: string };
  repeat?: { row?: string[]; column?: string[] };
  selection?: Record<string, unknown>;
  resolve?: Record<string, unknown>;
}

interface CustomVizBuilderProps {
  config: CustomVizConfig;
  onChange: (config: CustomVizConfig) => void;
  availableFields: string[];
}

const markTypes = [
  { value: 'bar', label: 'Bar' },
  { value: 'line', label: 'Line' },
  { value: 'area', label: 'Area' },
  { value: 'point', label: 'Point' },
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
  { value: 'tick', label: 'Tick' },
  { value: 'rect', label: 'Rectangle' },
  { value: 'rule', label: 'Rule' },
  { value: 'text', label: 'Text' },
  { value: 'trail', label: 'Trail' },
  { value: 'geoshape', label: 'Geo Shape' },
];

const fieldTypes = [
  { value: 'quantitative', label: 'Quantitative (Number)' },
  { value: 'nominal', label: 'Nominal (Category)' },
  { value: 'ordinal', label: 'Ordinal (Ordered)' },
  { value: 'temporal', label: 'Temporal (Date/Time)' },
];

const aggregateOps = [
  { value: 'none', label: 'None' },
  { value: 'count', label: 'Count' },
  { value: 'sum', label: 'Sum' },
  { value: 'mean', label: 'Mean' },
  { value: 'average', label: 'Average' },
  { value: 'median', label: 'Median' },
  { value: 'min', label: 'Min' },
  { value: 'max', label: 'Max' },
  { value: 'stdev', label: 'Std Dev' },
  { value: 'variance', label: 'Variance' },
];

export function CustomVizBuilder({ config, onChange, availableFields }: CustomVizBuilderProps) {
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set(config.layers.map(l => l.id)));

  const addLayer = () => {
    const newLayer: VizLayer = {
      id: `layer-${Date.now()}`,
      mark: 'bar',
      markOptions: { tooltip: true },
      encodings: {},
    };
    onChange({ ...config, layers: [...config.layers, newLayer] });
    setExpandedLayers(new Set([...expandedLayers, newLayer.id]));
  };

  const removeLayer = (layerId: string) => {
    onChange({ ...config, layers: config.layers.filter(l => l.id !== layerId) });
  };

  const updateLayer = (layerId: string, updates: Partial<VizLayer>) => {
    onChange({
      ...config,
      layers: config.layers.map(l => l.id === layerId ? { ...l, ...updates } : l),
    });
  };

  const toggleLayerExpanded = (layerId: string) => {
    const newExpanded = new Set(expandedLayers);
    if (newExpanded.has(layerId)) {
      newExpanded.delete(layerId);
    } else {
      newExpanded.add(layerId);
    }
    setExpandedLayers(newExpanded);
  };

  const updateLayerEncoding = (layerId: string, channel: string, value: unknown) => {
    const layer = config.layers.find(l => l.id === layerId);
    if (!layer) return;

    const newEncodings = { ...layer.encodings, [channel]: value };
    updateLayer(layerId, { encodings: newEncodings });
  };

  return (
    <div className="h-full overflow-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Custom Visualization Builder</h3>
        <Button onClick={addLayer} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add Layer
        </Button>
      </div>

      {config.layers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No layers yet. Click "Add Layer" to start building your custom visualization.
        </div>
      )}

      {config.layers.map((layer, index) => (
        <div key={layer.id} className="border rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => toggleLayerExpanded(layer.id)}
              className="flex items-center gap-2 font-medium text-sm hover:text-primary"
            >
              {expandedLayers.has(layer.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              Layer {index + 1}: {layer.mark}
            </button>
            <Button
              onClick={() => removeLayer(layer.id)}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          {expandedLayers.has(layer.id) && (
            <Tabs defaultValue="mark" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="mark">Mark</TabsTrigger>
                <TabsTrigger value="encodings">Encodings</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
                <TabsTrigger value="transforms">Transforms</TabsTrigger>
              </TabsList>

              <TabsContent value="mark" className="space-y-3 mt-3">
                <div className="space-y-2">
                  <Label>Mark Type</Label>
                  <Select
                    value={layer.mark}
                    onValueChange={(value) => updateLayer(layer.id, { mark: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {markTypes.map(mark => (
                        <SelectItem key={mark.value} value={mark.value}>
                          {mark.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="encodings" className="space-y-3 mt-3">
                {/* X Encoding */}
                <div className="space-y-2 p-2 border rounded">
                  <Label className="text-xs font-semibold">X Axis</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Field</Label>
                      <Select
                        value={layer.encodings.x?.field || '__none__'}
                        onValueChange={(field) => {
                          if (field === '__none__') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { x: _removed, ...rest } = layer.encodings;
                            updateLayer(layer.id, { encodings: rest });
                          } else {
                            const current = layer.encodings.x || { type: 'nominal' };
                            updateLayerEncoding(layer.id, 'x', { ...current, field });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">None</SelectItem>
                          {availableFields.map(field => (
                            <SelectItem key={field} value={field}>{field}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Type</Label>
                      <Select
                        value={layer.encodings.x?.type || 'nominal'}
                        onValueChange={(type) => {
                          const current = layer.encodings.x || { field: '' };
                          updateLayerEncoding(layer.id, 'x', { ...current, type });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Aggregate</Label>
                      <Select
                        value={layer.encodings.x?.aggregate || 'none'}
                        onValueChange={(aggregate) => {
                          const current = layer.encodings.x || { field: '', type: 'nominal' };
                          if (aggregate === 'none') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { aggregate: _removed, ...rest } = current;
                            updateLayerEncoding(layer.id, 'x', rest);
                          } else {
                            updateLayerEncoding(layer.id, 'x', { ...current, aggregate });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aggregateOps.map(op => (
                            <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Y Encoding */}
                <div className="space-y-2 p-2 border rounded">
                  <Label className="text-xs font-semibold">Y Axis</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Field</Label>
                      <Select
                        value={layer.encodings.y?.field || '__none__'}
                        onValueChange={(field) => {
                          if (field === '__none__') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { y: _removed, ...rest } = layer.encodings;
                            updateLayer(layer.id, { encodings: rest });
                          } else {
                            const current = layer.encodings.y || { type: 'quantitative' };
                            updateLayerEncoding(layer.id, 'y', { ...current, field });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">None</SelectItem>
                          {availableFields.map(field => (
                            <SelectItem key={field} value={field}>{field}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Type</Label>
                      <Select
                        value={layer.encodings.y?.type || 'quantitative'}
                        onValueChange={(type) => {
                          const current = layer.encodings.y || { field: '' };
                          updateLayerEncoding(layer.id, 'y', { ...current, type });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Aggregate</Label>
                      <Select
                        value={layer.encodings.y?.aggregate || 'none'}
                        onValueChange={(aggregate) => {
                          const current = layer.encodings.y || { field: '', type: 'quantitative' };
                          if (aggregate === 'none') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { aggregate: _removed, ...rest } = current;
                            updateLayerEncoding(layer.id, 'y', rest);
                          } else {
                            updateLayerEncoding(layer.id, 'y', { ...current, aggregate });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aggregateOps.map(op => (
                            <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Color Encoding */}
                <div className="space-y-2 p-2 border rounded">
                  <Label className="text-xs font-semibold">Color (Optional)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Field</Label>
                      <Select
                        value={layer.encodings.color?.field || '__none__'}
                        onValueChange={(field) => {
                          if (field === '__none__') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { color: _removed, ...rest } = layer.encodings;
                            updateLayer(layer.id, { encodings: rest });
                          } else {
                            const current = layer.encodings.color || { type: 'nominal' };
                            updateLayerEncoding(layer.id, 'color', { ...current, field });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">None</SelectItem>
                          {availableFields.map(field => (
                            <SelectItem key={field} value={field}>{field}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {layer.encodings.color?.field && (
                      <div>
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={layer.encodings.color?.type || 'nominal'}
                          onValueChange={(type) => {
                            const current = layer.encodings.color || { field: '' };
                            updateLayerEncoding(layer.id, 'color', { ...current, type });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Size Encoding */}
                <div className="space-y-2 p-2 border rounded">
                  <Label className="text-xs font-semibold">Size (Optional)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Field</Label>
                      <Select
                        value={layer.encodings.size?.field || '__none__'}
                        onValueChange={(field) => {
                          if (field === '__none__') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { size: _removed, ...rest } = layer.encodings;
                            updateLayer(layer.id, { encodings: rest });
                          } else {
                            const current = layer.encodings.size || { type: 'quantitative' };
                            updateLayerEncoding(layer.id, 'size', { ...current, field });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">None</SelectItem>
                          {availableFields.map(field => (
                            <SelectItem key={field} value={field}>{field}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {layer.encodings.size?.field && (
                      <div>
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={layer.encodings.size?.type || 'quantitative'}
                          onValueChange={(type) => {
                            const current = layer.encodings.size || { field: '' };
                            updateLayerEncoding(layer.id, 'size', { ...current, type });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="options" className="space-y-3 mt-3">
                <div className="space-y-2">
                  <Label className="text-xs">Opacity</Label>
                  <Input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={layer.markOptions?.opacity || 1}
                    onChange={(e) => {
                      updateLayer(layer.id, {
                        markOptions: { ...layer.markOptions, opacity: parseFloat(e.target.value) }
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Size</Label>
                  <Input
                    type="number"
                    min="1"
                    value={layer.markOptions?.size || ''}
                    placeholder="Auto"
                    onChange={(e) => {
                      updateLayer(layer.id, {
                        markOptions: { ...layer.markOptions, size: parseInt(e.target.value) || undefined }
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Color</Label>
                  <Input
                    type="text"
                    value={layer.markOptions?.color || ''}
                    placeholder="Auto"
                    onChange={(e) => {
                      updateLayer(layer.id, {
                        markOptions: { ...layer.markOptions, color: e.target.value || undefined }
                      });
                    }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="transforms" className="space-y-3 mt-3">
                <div className="text-xs text-muted-foreground">
                  Transform support coming soon. You can filter and aggregate using encoding options.
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      ))}
    </div>
  );
}
