import { Cars } from "./car";

export default class ElectricCars extends Cars{
charge(){
    console.log(`Xe ${this.plate} đang được sạc`);
}
}