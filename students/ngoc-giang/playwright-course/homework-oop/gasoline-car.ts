import { Cars } from "./car";

export default class GasolineCars extends Cars{
refuel(){
    console.log(`Xe ${this.plate} đang được đổ xăng`);
}
}