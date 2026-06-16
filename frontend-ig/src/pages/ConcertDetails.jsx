import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Users, ArrowLeft, Share2, Heart } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SeatSelector } from "@/components/SeatSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import API from "@/services/api";

const ConcertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    API.get(`/concerts/${id}`)
      .then((res) => {
        setConcert(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </PageLayout>
    );
  }

  if (!concert) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Concert not found</h1>
            <Link to="/concerts">
              <Button variant="outline">Back to Concerts</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleBookNow = () => {
    navigate(`/booking/${concert._id}`,  {
      state: {
        seats: selectedSeats,
        quantity: selectedSeats.length || ticketQuantity,
      },
    });
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={concert.image}
          alt={concert.artist}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute top-24 left-6">
          <Link to="/concerts">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-5xl font-bold">{concert.artist}</h1>
          <p className="text-xl">{concert.venue}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><Calendar className="inline mr-2" /> {formatDate(concert.date)}</p>
              <p><Clock className="inline mr-2" /> {concert.time}</p>
              <p><MapPin className="inline mr-2" /> {concert.location}</p>
              <p>{concert.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Seats</CardTitle>
            </CardHeader>
            <CardContent>
              <SeatSelector onSeatsChange={setSelectedSeats} maxSeats={10} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-3xl font-bold">₹{concert.price}</h2>

              {selectedSeats.length === 0 && (
                <div className="flex gap-3 items-center">
                  <Button
                    variant="outline"
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                  >
                    -
                  </Button>
                  <span>{ticketQuantity}</span>
                  <Button
                    variant="outline"
                    onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                  >
                    +
                  </Button>
                </div>
              )}

              <Button className="w-full" onClick={handleBookNow}>
                Book Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
};

export default ConcertDetails;
