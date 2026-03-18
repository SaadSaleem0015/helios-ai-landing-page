import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { TermsAndConditions } from "./components/sections/TermsAndConditions";
import PrivacyPolicy from "./components/sections/PrivacyPolicyModal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />


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
