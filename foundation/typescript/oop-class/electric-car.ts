import { Car } from "./car";

export default class ElectricCar extends Car{
  charge() {
    console.log(`Xe ${this.plate} đang được sạc`);
  }
}
