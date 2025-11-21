import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DataInputSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function DataInputSection({ value, onChange }: DataInputSectionProps) {
  return (
    <div className="h-full flex flex-col p-4 space-y-2">
      <Label htmlFor="data-input" className="text-sm font-semibold">
        Data Input (JSON)
      </Label>
      <Textarea
        id="data-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Enter your data in JSON format, e.g., [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
        className="flex-1 font-mono text-sm resize-none"
      />
    </div>
  );
}
