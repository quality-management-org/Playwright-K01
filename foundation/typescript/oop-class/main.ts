import { Car } from "./car";
import { ElectricCar } from "./electric-car";

// const gasoline1 = new Car('đỏ', '30A-111');     // sản xuất xe thứ nhất
// const gasoline2 = new Car('trắng', '29B-222');  // sản xuất xe thứ hai

// gasoline1.run();   // Xe 30A-111 đang chạy

const electricCar = new ElectricCar("green", "36A-12345", 80);
electricCar.charge();
electricCar.getBattery();