import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout-sidebar";
import { Header } from "@/components/layout-header";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

import LoginPage from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import ComingSoon from "@/pages/coming-soon";

// Protected Route Component
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoadingUser } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login but render nothing while redirecting
    setTimeout(() => setLocation("/login"), 0);
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-72 h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            <Component />
          </div>
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      
      {/* Protected Routes */}
      <Route path="/">
        <ProtectedRoute component={Dashboard} />
      </Route>
      
      {/* Placeholder Routes for Menu Items */}
      <Route path="/sub-warehouse">
        <ProtectedRoute component={ComingSoon} />
      </Route>
      <Route path="/create-warehouse">
        <ProtectedRoute component={ComingSoon} />
      </Route>
      <Route path="/search">
        <ProtectedRoute component={ComingSoon} />
      </Route>
      <Route path="/permissions">
        <ProtectedRoute component={ComingSoon} />
      </Route>

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
