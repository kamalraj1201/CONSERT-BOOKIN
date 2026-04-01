require("dotenv").config();
const mongoose = require("mongoose");
const Concert = require("./models/Concert");

mongoose.connect(process.env.MONGO_URI);

const concerts = [

  {
    "artist": "Anirudh Live in Chennai",
    "venue": "YMCA Grounds",
    "location": "Chennai, India",
    "date": "2026-08-14",
    "time": "7:00 PM",
    "price": 110,
    "genre": "Tamil",
    "image": "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop",
    "description": "High-energy Tamil hits and electrifying stage performance.",
    "featured": true
  },
  {
    "artist": "Sid Sriram Live",
    "venue": "Nehru Stadium",
    "location": "Chennai, India",
    "date": "2026-09-20",
    "time": "7:30 PM",
    "price": 120,
    "genre": "Tamil",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop",
    "description": "A soulful night filled with Sid Sriram’s mesmerizing melodies.",
    "featured": true
  },
  {
    "artist": "Telugu Beats Festival",
    "venue": "Gachibowli Stadium",
    "location": "Hyderabad, India",
    "date": "2026-10-12",
    "time": "6:00 PM",
    "price": 95,
    "genre": "Telugu",
    "image": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    "description": "Top Tollywood music directors and singers under one stage.",
    "featured": false
  },
  {
    "artist": "Kerala Live Music Carnival",
    "venue": "Marine Drive Ground",
    "location": "Kochi, India",
    "date": "2026-11-05",
    "time": "7:00 PM",
    "price": 80,
    "genre": "Malayalam",
    "image": "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1200&auto=format&fit=crop",
    "description": "An unforgettable Malayalam musical evening by the waterfront.",
    "featured": false
  },
  {
    "artist": "Bangalore EDM Storm",
    "venue": "Whitefield Arena",
    "location": "Bangalore, India",
    "date": "2026-12-18",
    "time": "9:00 PM",
    "price": 150,
    "genre": "EDM",
    "image": "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop",
    "description": "Massive EDM night with international DJs and laser show.",
    "featured": true
  },
  {
    "artist": "Coimbatore Rock Night",
    "venue": "Codissia Trade Fair Complex",
    "location": "Coimbatore, India",
    "date": "2027-01-14",
    "time": "8:00 PM",
    "price": 70,
    "genre": "Rock",
    "image": "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200&auto=format&fit=crop",
    "description": "A high-voltage rock performance by emerging South Indian bands.",
    "featured": false
  },
  {
    "artist": "Harris Jayaraj Musical Night",
    "venue": "Nehru Indoor Stadium",
    "location": "Chennai, India",
    "date": "2026-09-28",
    "time": "7:00 PM",
    "price": 130,
    "genre": "Tamil",
    "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop",
    "description": "A nostalgic musical evening with Harris Jayaraj’s greatest hits.",
    "featured": true
  },
  {
    "artist": "Trivandrum Indie Fest",
    "venue": "Kanakakkunnu Palace Grounds",
    "location": "Trivandrum, India",
    "date": "2026-10-16",
    "time": "6:30 PM",
    "price": 65,
    "genre": "Indie",
    "image": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    "description": "An open-air indie music celebration featuring emerging artists.",
    "featured": false
  },
  {
    "artist": "Hyderabad DJ Carnival",
    "venue": "HITEX Arena",
    "location": "Hyderabad, India",
    "date": "2026-11-22",
    "time": "9:00 PM",
    "price": 160,
    "genre": "EDM",
    "image": "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop",
    "description": "An electrifying EDM festival with top international DJs.",
    "featured": true
  },
  {
    "artist": "Coimbatore Folk Music Night",
    "venue": "Codissia Grounds",
    "location": "Coimbatore, India",
    "date": "2026-12-05",
    "time": "6:00 PM",
    "price": 55,
    "genre": "Folk",
    "image": "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1200&auto=format&fit=crop",
    "description": "A traditional folk music event celebrating South Indian culture.",
    "featured": false
  },
  {
    "artist": "Bangalore Live Band Showcase",
    "venue": "Phoenix Marketcity Arena",
    "location": "Bangalore, India",
    "date": "2027-01-20",
    "time": "8:30 PM",
    "price": 90,
    "genre": "Rock",
    "image": "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200&auto=format&fit=crop",
    "description": "A rock music showcase featuring the best live bands in the city.",
    "featured": true
  }
];

const seedData = async () => {
  await Concert.deleteMany();
  await Concert.insertMany(concerts);
  console.log("Concerts inserted");
  process.exit();
};

seedData();