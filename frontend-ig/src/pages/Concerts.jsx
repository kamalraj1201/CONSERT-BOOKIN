import { useState, useMemo, useEffect } from "react";
import { Search, Filter, MapPin, Calendar, Music } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ConcertCard } from "@/components/ConcertCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "@/services/api";

const ConcertsPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // 🔥 Fetch from backend
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

  // 🔥 Generate genres dynamically
const genres = useMemo(() => {
  if (!concerts) return ["All"];

  const allGenres = concerts
    .map((c) => c.genre)
    .filter(Boolean); // removes undefined/null(fixed)

  return ["All", ...new Set(allGenres)];
}, [concerts]);

  // 🔥 Generate locations dynamically(fixed)
  const locations = useMemo(() => {
  if (!concerts) return ["All"];

  const allLocations = concerts
    .map((c) => c.location)
    .filter(Boolean);

  return ["All", ...new Set(allLocations)];
}, [concerts]);

  // 🔥 Filter logic(fixed)
  const filteredConcerts = useMemo(() => {
  if (!concerts || concerts.length === 0) return [];

  return concerts.filter((concert) => {
    const artist = concert.artist?.toLowerCase() || "";
    const venue = concert.venue?.toLowerCase() || "";
    const genre = concert.genre || "";
    const location = concert.location || "";
    const date = concert.date || "";

    const search = searchQuery?.toLowerCase() || "";

    const matchesSearch =
      artist.includes(search) ||
      venue.includes(search);

    const matchesGenre =
      selectedGenre === "All" || genre === selectedGenre;

    const matchesLocation =
      selectedLocation === "All" || location === selectedLocation;

    const matchesDate =
      !selectedDate || date >= selectedDate;

    return (
      matchesSearch &&
      matchesGenre &&
      matchesLocation &&
      matchesDate
    );
  });
}, [concerts, searchQuery, selectedGenre, selectedLocation, selectedDate]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSelectedLocation("All");
    setSelectedDate("");
  };

  return (
    <PageLayout>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Explore <span className="text-gradient">Concerts</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your next unforgettable live music experience
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                <Input
                  placeholder="Search artists, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4"/>
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* Genre */}
                  <div>
                    <label className="text-sm font-medium flex gap-2">
                      <Music className="h-4 w-4"/>
                      Genre
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {genres.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => setSelectedGenre(genre)}
                          className={`px-3 py-1.5 text-sm rounded-full ${
                            selectedGenre === genre
                              ? "bg-primary text-white"
                              : "bg-muted"
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium flex gap-2">
                      <MapPin className="h-4 w-4"/>
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) =>
                        setSelectedLocation(e.target.value)
                      }
                      className="w-full mt-2 p-2 rounded-lg border"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="text-sm font-medium flex gap-2">
                      <Calendar className="h-4 w-4"/>
                      From Date
                    </label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) =>
                        setSelectedDate(e.target.value)
                      }
                      className="mt-2"
                    />
                  </div>

                </div>

                <div className="mt-4 text-right">
                  <Button variant="ghost" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filteredConcerts.length} concerts
          </p>

          {filteredConcerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcerts.map((concert) => (
                <ConcertCard key={concert._id} concert={concert}/>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3>No concerts found</h3>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ConcertsPage;