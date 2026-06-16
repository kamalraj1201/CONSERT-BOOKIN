import { Link } from 'react-router-dom';
import { Music, Instagram, Twitter, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';
export function Footer() {
    return (<footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary shadow-neon">
                <Music className="h-5 w-5 text-primary-foreground"/>
              </div>
              <span className="font-display text-xl font-bold text-gradient">
                ConcertHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for live music experiences. Book tickets to the hottest concerts and events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/concerts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Concerts
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary"/>
                support@concerthub.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary"/>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary"/>
                123 Music Street, NY
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors group">
               <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary"/>
                
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors group">
                <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary"/>
              </a>
              <a href="https://www.youtube.com/results?search_query=how+to+deploy+in+github" className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors group">
                <Youtube className="h-5 w-5 text-muted-foreground group-hover:text-primary"/>
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors group">
                <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-primary"/>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 ConcertHub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>);
}
