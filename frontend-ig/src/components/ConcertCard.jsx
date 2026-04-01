import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
export function ConcertCard({ concert, featured = false }) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    return (<Card variant="gradient" className={`overflow-hidden group ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={concert.image} alt={concert.artist} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-hero"/>
        
        {/* Genre Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-primary/90 text-primary-foreground">
          {concert.genre}
        </span>

        {/* Price Badge */}
        <span className="absolute top-3 right-3 px-3 py-1 text-sm font-bold rounded-full bg-card/90 backdrop-blur-sm text-foreground border border-border/50">
          ${concert.price}
        </span>
      </div>

      <CardContent className="p-5 space-y-3">
        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {concert.artist}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary"/>
            <span>{concert.venue}, {concert.location}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-secondary"/>
              <span>{formatDate(concert.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-accent"/>
              <span>{concert.time}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-3">
        <Link to={`/concerts/${concert._id}`} className="flex-1">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
        <Link to={`/booking/${concert._id}`} className="flex-1">
          <Button className="w-full">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>);
}
