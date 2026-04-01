import { useState } from 'react';
import { cn } from '@/lib/utils';
const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const seats = [];
    // Randomly mark some seats as taken
    const takenSeats = new Set();
    for (let i = 0; i < 25; i++) {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const num = Math.floor(Math.random() * seatsPerRow) + 1;
        takenSeats.add(`${row}${num}`);
    }
    rows.forEach((row) => {
        for (let i = 1; i <= seatsPerRow; i++) {
            seats.push({
                id: `${row}${i}`,
                row,
                number: i,
                status: takenSeats.has(`${row}${i}`) ? 'taken' : 'available',
            });
        }
    });
    return seats;
};
export function SeatSelector({ onSeatsChange, maxSeats = 10 }) {
    const [seats, setSeats] = useState(generateSeats);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const toggleSeat = (seatId) => {
        const seat = seats.find((s) => s.id === seatId);
        if (!seat || seat.status === 'taken')
            return;
        let newSelected;
        if (selectedSeats.includes(seatId)) {
            newSelected = selectedSeats.filter((id) => id !== seatId);
        }
        else {
            if (selectedSeats.length >= maxSeats) {
                return;
            }
            newSelected = [...selectedSeats, seatId];
        }
        setSelectedSeats(newSelected);
        onSeatsChange(newSelected);
        setSeats(seats.map((s) => ({
            ...s,
            status: s.status === 'taken' ? 'taken' : newSelected.includes(s.id) ? 'selected' : 'available',
        })));
    };
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return (<div className="space-y-6">
      {/* Stage */}
      <div className="relative">
        <div className="h-12 bg-gradient-primary rounded-t-full flex items-center justify-center shadow-neon">
          <span className="text-sm font-bold text-primary-foreground tracking-widest">STAGE</span>
        </div>
        <div className="h-4 bg-gradient-to-b from-primary/20 to-transparent"/>
      </div>

      {/* Seats Grid */}
      <div className="space-y-2 overflow-x-auto pb-4">
        {rows.map((row) => (<div key={row} className="flex items-center gap-2">
            <span className="w-6 text-sm font-bold text-muted-foreground">{row}</span>
            <div className="flex gap-1.5">
              {seats
                .filter((seat) => seat.row === row)
                .map((seat) => (<button key={seat.id} onClick={() => toggleSeat(seat.id)} disabled={seat.status === 'taken'} className={cn("w-7 h-7 rounded-t-lg text-xs font-medium transition-all duration-200", seat.status === 'available' &&
                    "bg-muted hover:bg-primary/30 hover:scale-110 text-muted-foreground", seat.status === 'selected' &&
                    "bg-primary text-primary-foreground shadow-glow-pink scale-105", seat.status === 'taken' &&
                    "bg-border/50 text-border cursor-not-allowed")}>
                    {seat.number}
                  </button>))}
            </div>
          </div>))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-t-md bg-muted"/>
          <span className="text-xs text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-t-md bg-primary shadow-glow-pink"/>
          <span className="text-xs text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-t-md bg-border/50"/>
          <span className="text-xs text-muted-foreground">Taken</span>
        </div>
      </div>

      {/* Selected Count */}
      {selectedSeats.length > 0 && (<div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Selected seats:{' '}
            <span className="font-bold text-primary">{selectedSeats.join(', ')}</span>
          </p>
        </div>)}
    </div>);
}
