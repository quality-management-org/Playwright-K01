import { Car } from "./car";

export class GasolineCar extends Car{
  refuel() {
    console.log("Xe đang được đổ xăng");
  }
}
