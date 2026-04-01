import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Concerts from "./pages/Concerts";
import ConcertDetails from "./pages/ConcertDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => (<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/concerts" element={<Concerts />}/>
          <Route path="/concerts/:id" element={<ConcertDetails />}/>
          <Route path="/booking/:id" element={<Booking />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/my-bookings" element={<MyBookings />}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>);
export default App;
