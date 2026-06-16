import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import API from "@/services/api";

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [concert, setConcert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { seats = [], quantity = 1 } = location.state || {};
  const ticketCount = seats.length || quantity;

  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // ✅ Fetch concert from backend
  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const res = await API.get(`/concerts/${id}`);
        setConcert(res.data);
      } catch (err) {
        console.log("Error fetching concert:", err);
      }
    };

    fetchConcert();
  }, [id]);

  if (!concert) {
    console.log("Booking page id:", id);
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      </PageLayout>
    );
  }

  const totalPrice = ticketCount * concert.price + 5;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ REAL backend booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/bookings", {
        userId: user?._id,
        concertId: concert._id,
        ticketCount,
        totalPrice,
        seats,
      });

      setIsProcessing(false);
      setIsComplete(true);
    } catch (err) {
      console.log("Booking error:", err);
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="max-w-md w-full text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>

            <Card>
              <CardContent className="p-6 space-y-3 text-left">
                <div className="flex justify-between">
                  <span>Event</span>
                  <span>{concert.artist}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{formatDate(concert.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tickets</span>
                  <span>{ticketCount}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Paid</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Link to="/my-bookings" className="flex-1">
                <Button className="w-full">View My Bookings</Button>
              </Link>
              <Link to="/concerts" className="flex-1">
                <Button variant="outline" className="w-full">
                  Browse More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen py-20 container mx-auto px-4">
        <Link to={`/concerts/${concert._id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="cardHolder"
                  placeholder="Card Holder Name"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="cvv"
                  type="password"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Confirm Booking - ₹${totalPrice.toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">{concert.artist}</h3>
              <p>{concert.venue}</p>
              <p>{formatDate(concert.date)}</p>

              <div className="flex justify-between">
                <span>Tickets</span>
                <span>{ticketCount}</span>
              </div>

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default BookingPage;
