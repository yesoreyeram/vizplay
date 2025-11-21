import { Database, Info, Github } from 'lucide-react';

export function TopNavbar() {
  return (
    <nav className="h-14 border-b bg-card px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            VizPlay
          </h1>
        </div>
        <span className="text-sm text-muted-foreground">Enterprise Data Visualization Playground</span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/yesoreyeram/vizplay"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </a>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Info className="h-4 w-4" />
          <span>Help</span>
        </button>
      </div>
    </nav>
  );
}
