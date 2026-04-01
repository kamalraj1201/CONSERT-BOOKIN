import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Music, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
const NotFound = () => {
    const location = useLocation();
    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);
    return (<div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"/>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"/>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto animate-fade-in">
        <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
          <Music className="h-12 w-12 text-primary"/>
        </div>

        <div className="space-y-4">
          <h1 className="text-8xl font-display font-black text-gradient">404</h1>
          <h2 className="text-2xl font-display font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Looks like this concert got cancelled! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="hero">
              <Home className="h-4 w-4"/>
              Back to Home
            </Button>
          </Link>
          <Link to="/concerts">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4"/>
              Browse Concerts
            </Button>
          </Link>
        </div>
      </div>
    </div>);
};
export default NotFound;
