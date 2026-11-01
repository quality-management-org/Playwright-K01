export class Car {                          // bản thiết kế
  color: string;
  plate: string;

  constructor(color: string, plate: string) {   // lúc sản xuất: nhận màu, biển số
    this.color = color;
    this.plate = plate;
  }

  run() {    
    console.log(`Xe ${this.plate} đang chạy`);
  }
}
