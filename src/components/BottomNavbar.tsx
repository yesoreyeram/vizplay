import { Info } from 'lucide-react';

export function BottomNavbar({ dataStats }: { dataStats: { rows: number; fields: number } }) {
  return (
    <nav className="h-8 border-t bg-card px-4 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Info className="h-3 w-3" />
          <span>Data: {dataStats.rows} rows, {dataStats.fields} fields</span>
        </div>
        <span>Tip: Use JSONata expressions to transform your data</span>
      </div>
      <div className="flex items-center gap-3">
        <span>Powered by Vega-Lite</span>
        <span>© 2024 VizPlay</span>
      </div>
    </nav>
  );
}
