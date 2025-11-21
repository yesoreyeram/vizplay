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
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto">
      <div className="space-y-2">
        <Label htmlFor="data-format">Data Format</Label>
        <Select value={format} onValueChange={(value) => onFormatChange(value as DataFormat)}>
          <SelectTrigger id="data-format">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
            <SelectItem value="tsv">TSV</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
            <SelectItem value="yaml">YAML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jsonata-expression">JSONata Expression (optional)</Label>
        <Textarea
          id="jsonata-expression"
          value={jsonataExpression}
          onChange={(e) => onJsonataChange(e.target.value)}
          placeholder="e.g., $[price > 100]"
          className="font-mono text-sm h-20 resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Transform your data using JSONata query expressions
        </p>
      </div>

      <div className="space-y-2">
        <Label>Field Type Mappings</Label>
        <div className="space-y-2">
          {fieldMappings.map((mapping, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={mapping.field}
                readOnly
                className="flex-1 text-sm"
              />
              <Select
                value={mapping.type}
                onValueChange={(value) => {
                  const newMappings = [...fieldMappings];
                  newMappings[index].type = value as FieldType;
                  onFieldMappingsChange(newMappings);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-2 pt-2">
          <div className="flex-1 space-y-1">
            <Label htmlFor="new-field" className="text-xs">Field Name</Label>
            <Input
              id="new-field"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              placeholder="Field name"
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addFieldMapping();
                }
              }}
            />
          </div>
          <div className="w-32 space-y-1">
            <Label htmlFor="new-type" className="text-xs">Type</Label>
            <Select value={newFieldType} onValueChange={(value) => setNewFieldType(value as FieldType)}>
              <SelectTrigger id="new-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
          <Button onClick={addFieldMapping} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
