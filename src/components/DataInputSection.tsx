import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sampleDatasets } from '@/data/sampleDatasets';
import type { Dataset } from '@/data/sampleDatasets';
import { Search } from 'lucide-react';

interface DataInputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onLoadDataset: (dataset: Dataset) => void;
}

export function DataInputSection({ value, onChange, onLoadDataset }: DataInputSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const categories = ['All', ...Array.from(new Set(sampleDatasets.map(d => d.category)))];

  const filteredDatasets = sampleDatasets.filter(dataset => {
    const matchesSearch = 
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || dataset.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelectDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    onLoadDataset(dataset);
  };

  // Parse preview data
  let previewData = [];
  try {
    if (selectedDataset) {
      previewData = JSON.parse(selectedDataset.data);
      if (!Array.isArray(previewData)) {
        previewData = [previewData];
      }
    }
  } catch (e) {
    previewData = [];
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="input" className="h-full flex flex-col">
        <TabsList className="mx-3 mt-3 w-auto">
          <TabsTrigger value="input" className="text-xs">Input</TabsTrigger>
          <TabsTrigger value="samples" className="text-xs">Sample Datasets</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="flex-1 flex flex-col px-3 pb-3 mt-0 overflow-hidden">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder='Enter your data in JSON format, e.g., [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
            className="flex-1 font-mono text-xs resize-none"
          />
        </TabsContent>

        <TabsContent value="samples" className="flex-1 flex flex-col px-3 pb-3 mt-0 overflow-hidden space-y-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 h-7 text-xs"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-1 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="h-6 text-xs px-2"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Dataset List - Fixed height scrollable */}
          <div className="flex-1 overflow-y-auto border rounded-md">
            <div className="space-y-1 p-1">
              {filteredDatasets.map(dataset => (
                <div
                  key={dataset.id}
                  className={`border rounded p-2 space-y-1 cursor-pointer transition-colors ${
                    selectedDataset?.id === dataset.id 
                      ? 'bg-primary/10 border-primary' 
                      : 'bg-card hover:bg-accent'
                  }`}
                  onClick={() => handleSelectDataset(dataset)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs line-clamp-1 leading-tight">{dataset.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 leading-tight">
                        {dataset.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant={selectedDataset?.id === dataset.id ? 'default' : 'outline'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDataset(dataset);
                      }}
                      className="h-6 text-xs px-2 shrink-0"
                    >
                      {selectedDataset?.id === dataset.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary leading-none">
                      {dataset.category}
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground leading-none">
                      {dataset.format.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          {selectedDataset && previewData.length > 0 && (
            <div className="border rounded-md p-2 bg-card max-h-40 overflow-auto">
              <div className="text-xs font-semibold mb-1 text-muted-foreground">Preview ({previewData.length} rows)</div>
              <pre className="text-xs font-mono overflow-auto">
                {JSON.stringify(previewData.slice(0, 3), null, 2)}
                {previewData.length > 3 && '\n... and ' + (previewData.length - 3) + ' more rows'}
              </pre>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
