import { Database, Info, Github } from 'lucide-react';

export function TopNavbar() {
  return (
    <nav className="h-12 border-b bg-card px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">
            VizPlay
          </h1>
        </div>
        <span className="text-xs text-muted-foreground">Enterprise Data Visualization Playground</span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/yesoreyeram/vizplay"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-3.5 w-3.5" />
          <span>GitHub</span>
        </a>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Info className="h-3.5 w-3.5" />
          <span>Help</span>
        </button>
      </div>
    </nav>
  );
}
