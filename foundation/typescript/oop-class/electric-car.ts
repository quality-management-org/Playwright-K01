import { Car } from "./car";


export class ElectricCar extends Car {

    charge() {
        console.log(`Xe ${this.plate} đang sạc`);
    }

    getBattery() {
        console.log(`Phần trăm pin = ${this.battery}`);
    }
}