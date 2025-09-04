class Car {
  constructor() {
    this.brand = null;
    this.model = null;
    this.year = null;
    this.engine = null;
    this.color = null;
    this.gps = null;
  }

  showDetails() {
    console.log(
      `Carro criado:
      Ano: ${this.year} 
      Marca: ${this.brand} 
      Modelo: ${this.model} 
      Motor: ${this.engine}, 
      Cor: ${this.color}, 
      GPS: ${this.gps ? "Sim" : "Não"}
      `);
  }
}

class CarBuilder {
  constructor() {
    this.car = new Car();
  }

  setYear(year) {
    this.car.year = year;
    return this;
  }

  setBrand(brand) {
    this.car.brand = brand;
    return this;
  }

  setModel(model) {
    this.car.model = model;
    return this;
  }

  setEngine(engine) {
    this.car.engine = engine;
    return this;
  }

  setColor(color) {
    this.car.color = color;
    return this;
  }

  setGps(gps) {
    this.car.gps = gps;
    return this;
  }

  build() {
    return this.car;
  }
}

class CarDirector {
  static buildHonda() {
    return new CarBuilder()
    .setModel("Civic")
    .setBrand("Honda")
    .setYear("2020")
    .setColor("Black")
    .setEngine("V12")
    .setGps(true)
    .build()
  }

  static buildPeugeot() {
    return new CarBuilder()
    .setModel("3008")
    .setBrand("Peugeot")
    .setYear("2023")
    .setColor("White")
    .setEngine("V8")
    .setGps(true)
    .build()
  }

  static buildVolkswagen() {
    return new CarBuilder()
    .setModel("Gol")
    .setBrand("Volkswagen")
    .setYear("2025")
    .setColor("Red")
    .setEngine("V10")
    .setGps(false)
    .build()
  }
}

const honda = CarDirector.buildHonda();
const peugeot = CarDirector.buildPeugeot();
const volkswagen = CarDirector.buildVolkswagen();
const renault = new CarBuilder()
.setModel("Sandero")
.setBrand("Renault")
.setColor("Green")
.setEngine("V4")
.setGps(false)
.setYear("2025")
.build()

honda.showDetails()
peugeot.showDetails()
volkswagen.showDetails()
renault.showDetails()
