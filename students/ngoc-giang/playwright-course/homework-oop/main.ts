import ElectricCars from "./electric-car";
import GslCar from "./gasoline-car";
const electricCar = new ElectricCars("Red", "29A-12345");
const car1 = new GslCar("Red", "30A-62348");
const car2 = new GslCar("Green", "30A-62345");

electricCar.run();
electricCar.charge();
electricCar.washingCar();

car1.run();
car1.refuel();

car2.run();
car2.refuel();
