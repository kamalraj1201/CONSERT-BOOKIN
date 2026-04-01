import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ticket, Calendar } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "@/services/api";

const MyBookingsPage = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get logged in user
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    await API.post("/bookings", {
      userId,
      concertName: concert.artist,
      bookerName: user.name
    });

    setIsComplete(true);
  } catch (error) {
    console.log(error);
    alert("Booking failed");
  } finally {
    setIsProcessing(false);
  }
};

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await API.get(`/bookings/user/${userId}`);
        setBookings(res.data);
        console.log(bookings);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, navigate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading bookings...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl font-display font-bold">
              My <span className="text-gradient">Bookings</span>
            </h1>
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking._id} variant="gradient">
                  <CardContent className="p-6 space-y-4">

                    <h3 className="text-xl font-bold">
                      {booking.concert?.artist}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {booking.concert?.venue}, {booking.concert?.location}
                    </p>

                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {formatDate(booking.concert?.date)}
                        </span>
                      </div>

                      <div>
                        <span className="font-bold text-primary">
                          ₹ {booking.totalAmount}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm">
                      Tickets: {booking.tickets}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Booked On: {formatDate(booking.bookingDate)}
                    </p>

                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-4">
                No Bookings Yet
              </h3>
              <Link to="/concerts">
                <Button>Browse Concerts</Button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </PageLayout>
  );
};

export default MyBookingsPage;