import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { DataFormat, FieldType, FieldMapping } from '@/lib/dataParser';
import { Plus, X } from 'lucide-react';

interface DataParsingControlsProps {
  format: DataFormat;
  onFormatChange: (format: DataFormat) => void;
  jsonataExpression: string;
  onJsonataChange: (expression: string) => void;
  fieldMappings: FieldMapping[];
  onFieldMappingsChange: (mappings: FieldMapping[]) => void;
}

export function DataParsingControls({
  format,
  onFormatChange,
  jsonataExpression,
  onJsonataChange,
  fieldMappings,
  onFieldMappingsChange,
}: DataParsingControlsProps) {
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldType>('string');

  const addFieldMapping = () => {
    if (newFieldName.trim()) {
      onFieldMappingsChange([
        ...fieldMappings,
        { field: newFieldName.trim(), type: newFieldType },
      ]);
      setNewFieldName('');
      setNewFieldType('string');
    }
  };

  const removeFieldMapping = (index: number) => {
    onFieldMappingsChange(fieldMappings.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col p-3 space-y-3 overflow-y-auto">
      <div className="space-y-1.5">
        <Label htmlFor="data-format" className="text-xs">Data Format</Label>
        <Select value={format} onValueChange={(value) => onFormatChange(value as DataFormat)}>
          <SelectTrigger id="data-format" className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
            <SelectItem value="tsv">TSV</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
            <SelectItem value="yaml">YAML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="jsonata-expression" className="text-xs">JSONata Expression (optional)</Label>
        <Textarea
          id="jsonata-expression"
          value={jsonataExpression}
          onChange={(e) => onJsonataChange(e.target.value)}
          placeholder="e.g., $[price > 100]"
          className="font-mono text-xs h-16 resize-none"
        />
        <p className="text-xs text-muted-foreground leading-tight">
          Transform your data using JSONata query expressions.
        </p>
        <p className="text-xs text-yellow-600 dark:text-yellow-500 leading-tight">
          ⚠️ Only use with trusted data sources. Malicious expressions are blocked.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Field Type Mappings</Label>
        <div className="space-y-1.5">
          {fieldMappings.map((mapping, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <Input
                value={mapping.field}
                readOnly
                className="flex-1 text-xs h-7"
              />
              <Select
                value={mapping.type}
                onValueChange={(value) => {
                  const newMappings = [...fieldMappings];
                  newMappings[index].type = value as FieldType;
                  onFieldMappingsChange(newMappings);
                }}
              >
                <SelectTrigger className="w-28 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="datetime">DateTime</SelectItem>
                  <SelectItem value="epoch-s">Epoch (s)</SelectItem>
                  <SelectItem value="epoch-ms">Epoch (ms)</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFieldMapping(index)}
                className="h-7 w-7"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-1.5 pt-1.5">
          <div className="flex-1 space-y-1">
            <Label htmlFor="new-field" className="text-xs">Field Name</Label>
            <Input
              id="new-field"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              placeholder="Field name"
              className="text-xs h-7"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addFieldMapping();
                }
              }}
            />
          </div>
          <div className="w-28 space-y-1">
            <Label htmlFor="new-type" className="text-xs">Type</Label>
            <Select value={newFieldType} onValueChange={(value) => setNewFieldType(value as FieldType)}>
              <SelectTrigger id="new-type" className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="datetime">DateTime</SelectItem>
                <SelectItem value="epoch-s">Epoch (s)</SelectItem>
                <SelectItem value="epoch-ms">Epoch (ms)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addFieldMapping} size="icon" className="h-7 w-7">
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
