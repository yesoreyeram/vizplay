import { Info } from 'lucide-react';

export function BottomNavbar({ dataStats }: { dataStats: { rows: number; fields: number } }) {
  return (
    <nav className="h-10 border-t bg-card px-6 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Info className="h-3 w-3" />
          <span>Data: {dataStats.rows} rows, {dataStats.fields} fields</span>
        </div>
        <span>Tip: Use JSONata expressions to transform your data</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Powered by Vega-Lite</span>
        <span>© 2024 VizPlay</span>
      </div>
    </nav>
  );
}
