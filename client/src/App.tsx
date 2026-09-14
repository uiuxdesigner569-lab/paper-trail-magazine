import { useCallback, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Article from "./pages/Article";
import LoadingScreen from "./components/LoadingScreen";
import TopBar from "./components/TopBar";
import About from "./pages/About";
import Bag from "./pages/Bag";
import Shop from "./pages/Shop";
import SiteFooter from "./components/SiteFooter";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/shop" component={Shop} />
    <Route path="/bag" component={Bag} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/product/:slug" component={Product} />
    <Route path="/article/:slug" component={Article} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

function App() {
  const [loading, setLoading] = useState(() => window.location.pathname === "/");
  const finishLoading = useCallback(() => setLoading(false), []);
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster />{loading && <LoadingScreen onComplete={finishLoading} />}<TopBar /><Router /><SiteFooter /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
