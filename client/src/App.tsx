import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { useSyncExternalStore } from "react";

const base = import.meta.env.BASE_URL || "/";

// Custom history hook that handles base path
function useHistoryHook() {
  const subscribe = (callback: () => void) => {
    window.addEventListener("popstate", callback);
    return () => window.removeEventListener("popstate", callback);
  };

  const getSnapshot = () => {
    const pathname = window.location.pathname;
    // Remove base path from pathname
    return pathname.startsWith(base) 
      ? pathname.slice(base.length) || "/"
      : pathname;
  };

  return [useSyncExternalStore(subscribe, getSnapshot), (path: string) => {
    const fullPath = base + path.replace(/^\//, "");
    window.history.pushState(null, "", fullPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }] as const;
}

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location, navigate] = useHistoryHook();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router hook={() => [location, navigate]}>
          <Toaster />
          <Routes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
