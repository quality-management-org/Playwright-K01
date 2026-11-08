import ElectricCar  from "./electric-car";
import { GasolineCar as GalCar} from "./gasoline-car";

const electricCar = new ElectricCar("Red", "29A-12345");
electricCar.run();
electricCar.charge();
electricCar.washingCar();

const redGasolineCar = new GalCar("Red", "30A-62348");
redGasolineCar.run();
redGasolineCar.refule();

const greenGasolineCar = new GalCar("Green", "30A-62345");
greenGasolineCar.run();
greenGasolineCar.refule();