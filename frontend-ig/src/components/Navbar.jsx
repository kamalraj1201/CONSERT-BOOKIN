import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Music, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/concerts", label: "Concerts" },
  { href: "/my-bookings", label: "My Bookings" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // ✅ CHECK LOGIN STATE
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-neon">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-gradient">
              ConcertHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ✅ AUTH SECTION */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm font-medium">
                  Hi, {user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-2 text-sm"
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex gap-2 pt-4 border-t border-border/50">
                {user ? (
                  <Button
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/login" className="flex-1">
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <Button className="w-full">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}