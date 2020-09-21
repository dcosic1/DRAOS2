export class Car {
  carId: number;
  brand: string;
  model: string;
  year: number;
  seatNumber: number;
  description: string;
  carType: string;
  imgUrl?: string;
  pricePerDay: number;
  isAvailable: boolean;
  reserved?: [Date,Date][];
}