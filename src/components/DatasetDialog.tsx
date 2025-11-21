import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleDatasets } from '@/data/sampleDatasets';
import type { Dataset } from '@/data/sampleDatasets';
import { Database, Search, Tag } from 'lucide-react';

interface DatasetDialogProps {
  onLoadDataset: (dataset: Dataset) => void;
}

export function DatasetDialog({ onLoadDataset }: DatasetDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(sampleDatasets.map(d => d.category)))];

  const filteredDatasets = sampleDatasets.filter(dataset => {
    const matchesSearch = 
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || dataset.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleLoad = (dataset: Dataset) => {
    onLoadDataset(dataset);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Database className="h-4 w-4" />
          Load Sample Dataset
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sample Datasets ({sampleDatasets.length})</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search datasets by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Dataset Grid */}
          <div className="flex-1 overflow-y-auto max-h-[calc(85vh-250px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDatasets.map(dataset => (
                <div
                  key={dataset.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow space-y-3"
                >
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{dataset.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {dataset.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                      {dataset.category}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                      {dataset.format.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    {dataset.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleLoad(dataset)}
                    size="sm"
                    className="w-full"
                  >
                    Load Dataset
                  </Button>
                </div>
              ))}
            </div>
            
            {filteredDatasets.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No datasets found matching your criteria
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
