import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Ticket, Shield } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ConcertCard } from "@/components/ConcertCard";
import { Button } from "@/components/ui/button";
import heroConcert from "@/assets/hero-concert.jpg";
import { useEffect, useState, useMemo } from "react";
import API from "@/services/api";

const Index = () => {
  const [concerts, setConcerts] = useState([]);

  // 🔥 Fetch concerts from backend
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await API.get("/concerts");
        setConcerts(res.data);
      } catch (err) {
        console.log("Error fetching concerts:", err);
      }
    };

    fetchConcerts();
  }, []);

  // 🔥 Filter featured concerts
  const featuredConcerts = useMemo(() => {
    return concerts.filter((c) => c.featured === true);
  }, [concerts]);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroConcert}
            alt="Concert crowd"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-background/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Your Next Live Experience Awaits
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-black leading-tight">
              Feel the <span className="text-gradient">Beat</span>
              <br />
              Live the <span className="text-gradient">Moment</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover and book tickets to the hottest concerts, music
              festivals, and live performances.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/concerts">
                <Button variant="hero" size="xl">
                  Book Tickets Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/concerts">
                <Button variant="outline" size="xl">
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Concerts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Featured <span className="text-gradient">Concerts</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these trending events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredConcerts.map((concert, index) => (
              <div
                key={concert._id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ConcertCard concert={concert} featured />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/concerts">
              <Button variant="outline" size="lg">
                View All Concerts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;