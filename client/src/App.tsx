import { useCallback, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
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
import SoundtrackControl from "./components/SoundtrackControl";
import { Account, Auth, IssueDetail, Issues, Stories, StoryReader } from "./pages/Platform";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/stories" component={() => <Stories />} />
    <Route path="/stories/culture" component={() => <Stories category="culture" />} />
    <Route path="/stories/design" component={() => <Stories category="design" />} />
    <Route path="/stories/people" component={() => <Stories category="people" />} />
    <Route path="/stories/music" component={() => <Stories category="music" />} />
    <Route path="/stories/travel" component={() => <Stories category="travel" />} />
    <Route path="/stories/:slug" component={(params) => <StoryReader slug={params.params.slug} />} />
    <Route path="/issues" component={Issues} />
    <Route path="/issues/:issue" component={(params) => <IssueDetail issue={params.params.issue} />} />
    <Route path="/login" component={() => <Auth mode="login" />} />
    <Route path="/signup" component={() => <Auth mode="signup" />} />
    <Route path="/forgot-password" component={() => <Auth mode="forgot" />} />
    <Route path="/account" component={() => <Account />} />
    <Route path="/account/stories" component={() => <Account section="stories" />} />
    <Route path="/account/orders" component={() => <Account section="orders" />} />
    <Route path="/account/orders/:id" component={() => <Account section="orders" />} />
    <Route path="/account/profile" component={() => <Account section="profile" />} />
    <Route path="/account/settings" component={() => <Account section="settings" />} />
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

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(() => window.location.pathname === "/");
  const finishLoading = useCallback(() => setLoading(false), []);
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster />{loading && <LoadingScreen onComplete={finishLoading} />}<ScrollToTop /><TopBar /><Router /><SiteFooter /><SoundtrackControl /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
