import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sampleDatasets } from '@/data/sampleDatasets';
import type { Dataset } from '@/data/sampleDatasets';
import { Search, Upload as UploadIcon } from 'lucide-react';

interface DataInputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onLoadDataset: (dataset: Dataset) => void;
  onTabChange: (value: string) => void;
  onFileUpload: (content: string, fileName: string) => void;
}

export function DataInputSection({ value, onChange, onLoadDataset, onTabChange, onFileUpload }: DataInputSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileContent, setUploadedFileContent] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileRead = (content: string, fileName: string) => {
    setUploadedFileContent(content);
    setUploadedFileName(fileName);
    onFileUpload(content, fileName);
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleFileRead(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Parse preview data for sample datasets
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

  // Parse preview data for uploaded file
  let uploadPreviewData = [];
  try {
    if (uploadedFileContent) {
      uploadPreviewData = JSON.parse(uploadedFileContent);
      if (!Array.isArray(uploadPreviewData)) {
        uploadPreviewData = [uploadPreviewData];
      }
    }
  } catch (e) {
    uploadPreviewData = [];
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="input" className="h-full flex flex-col" onValueChange={onTabChange}>
        <TabsList className="mx-3 mt-3 w-auto justify-start">
          <TabsTrigger value="input" className="text-xs">Input</TabsTrigger>
          <TabsTrigger value="samples" className="text-xs">Sample Datasets</TabsTrigger>
          <TabsTrigger value="upload" className="text-xs">Upload</TabsTrigger>
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
          {/* Search and Category Filter */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 h-7 text-xs"
              />
            </div>
            <div className="w-40">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

        <TabsContent value="upload" className="flex-1 flex flex-col px-3 pb-3 mt-0 overflow-hidden space-y-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv,.tsv,.xml,.yaml,.yml,.txt"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Drag and drop area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
          >
            <UploadIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium text-center mb-2">
              Drag and drop your file here
            </p>
            <p className="text-xs text-muted-foreground text-center mb-4">
              Supports JSON, CSV, TSV, XML, YAML files
            </p>
            <Button onClick={handleBrowseClick} size="sm" className="h-7 text-xs">
              Browse Files
            </Button>
            
            {uploadedFileName && (
              <div className="mt-4 text-xs text-center">
                <p className="text-muted-foreground">Selected file:</p>
                <p className="font-medium text-primary">{uploadedFileName}</p>
              </div>
            )}
          </div>

          {/* Preview Section */}
          {uploadedFileContent && uploadPreviewData.length > 0 && (
            <div className="border rounded-md p-2 bg-card max-h-40 overflow-auto">
              <div className="text-xs font-semibold mb-1 text-muted-foreground">
                Preview ({uploadPreviewData.length} rows)
              </div>
              <pre className="text-xs font-mono overflow-auto">
                {JSON.stringify(uploadPreviewData.slice(0, 6), null, 2)}
                {uploadPreviewData.length > 6 && '\n... and ' + (uploadPreviewData.length - 6) + ' more rows'}
              </pre>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
