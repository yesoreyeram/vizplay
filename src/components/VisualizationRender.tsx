import { useEffect, useRef } from 'react';
import embed from 'vega-embed';
import type { TopLevelSpec } from 'vega-lite';
import { AlertCircle } from 'lucide-react';

interface VisualizationRenderProps {
  spec: TopLevelSpec | null;
  error?: string;
}

export function VisualizationRender({ spec, error }: VisualizationRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && spec) {
      // Clear previous visualization using safer method than innerHTML
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }

      // Embed the Vega-Lite spec
      embed(containerRef.current, spec, {
        actions: {
          export: true,
          source: false,
          compiled: false,
          editor: false,
        },
        renderer: 'canvas',
      }).catch(err => {
        console.error('Vega embed error:', err);
      });
    }
  }, [spec]);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!spec) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground p-8 text-center">
        <div>
          <p className="text-lg font-semibold mb-2">No visualization yet</p>
          <p className="text-sm">Enter data and configure visualization settings to see the chart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-4">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
