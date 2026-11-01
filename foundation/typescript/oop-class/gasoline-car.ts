import { Car } from "./car";

export class GasolineCar extends Car {
    refuel() {
        console.log(`Xe ${this.plate} đang đổ xăng`);
    }
}
