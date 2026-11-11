import { GasolineCar as GslCar} from "./gasoline-car"; // Named class
import ElectricCar from "./electric-car"; // Default class 

const electricCar = new ElectricCar("Red", "29A-12345");
electricCar.run();
electricCar.charge();



const redGasolineCar = new GslCar("Red", "30A-62348");
const greenGasolineCar = new GslCar("Green", "30A-62345");
redGasolineCar.run();
greenGasolineCar.run();


