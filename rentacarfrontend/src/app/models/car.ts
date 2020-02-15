export class Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  seatNumber: number;
  description: string;
  carType: string;
  imgUrls: any[];
  pricePerDay: number;
  isAvailable: boolean;

  public Car() {
    this.imgUrls = [];
  }
}

// May update model if needed
