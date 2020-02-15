import { Car } from './car';

export class Reservation {
  public id: number;
  public car: Car;
  public totalPrice: number;
  public startDate: Date;
  public endDate: Date;
  public isRental?: boolean;

  public Reservation() { }
}
