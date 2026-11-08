import { Car } from "./car";

export default class ElectricCar extends Car{

    charge(){
        console.log(`Xe có biển số ${this.plate} đang được sạc`);
    }
}