import { Car } from "./car";

export class GasolineCar  extends Car{

    refule(){
        console.log(`Xe có biển số ${this.plate} đang đổ xăng`);
    }
}