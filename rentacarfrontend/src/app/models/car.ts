export class Car {
  carId: number;
  brand: string;
  model: string;
  year: number;
  seatNumber: number;
  description: string;
  carType: string;
  imageUrl?: string[];
  pricePerDay: number;
  isAvailable: boolean;
  reserved?: [Date,Date][];
}