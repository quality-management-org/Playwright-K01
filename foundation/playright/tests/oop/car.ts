export class Car {
    color: string;
    plate: string;

    constructor(color: string, plate: string) {
        this.color = color;
        this.plate = plate;
    }

    run() {
        console.log(
            `Xe có biển số ${this.plate} và màu sắc ${this.color} đang chạy`
        );
    }

    washingCar() {
        console.log(
            `Xe ${this.plate} đang được rửa`
        );
    }
}