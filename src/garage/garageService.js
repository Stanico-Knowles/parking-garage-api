const garageRepo = require('./garageRepo')
const GarageExceptions = require('./GarageEnums/garageExceptions')

exports.addCar = async function (car) {
    await this.validateNewCar(car)
    const price = await this.calculatePrice(car.hours, car.clean, car.color)
    const newCar = garageRepo.addCar(car, price)
    return newCar
}

exports.validateNewCar = async function (car) {
    const carExists = await this.findCarByLicensePlate(car.licensePlate)
    if (carExists) {
        throw Error(GarageExceptions.LicencePlateExists)
    }
    if (!car.licensePlate) {
        throw Error(GarageExceptions.LicensePlateRequired)
    }
    if (car.clean == null) {
        throw Error(GarageExceptions.CleanRequired)
    }
    if (!car.color) {
        throw Error(GarageExceptions.ColorRequired)
    }
    if (!car.hours) {
        throw Error(GarageExceptions.HoursRequired)
    }
    if (!Number.isInteger(car.hours)) {
        throw Error(GarageExceptions.HoursNotAnInteger)
    }
}
 
exports.findCarByLicensePlate = async function (licensePlate) {
    if (!licensePlate) {
        throw Error(GarageExceptions.LicensePlateRequired)
    }
    const car = garageRepo.findcarByLicensePlate(licensePlate)
    return car
}

exports.findAllCars = async function () {
    const cars = garageRepo.findAllCars()
    return cars
}

exports.getGarageCapacity = async function () {
    const carCount = garageRepo.getGarageCapacity()
    return carCount
}

exports.deleteCar = async function (licensePlate) {
    if (!licensePlate) {
        throw Error(GarageExceptions.LicensePlateRequired)
    }
    garageRepo.deleteCar(licensePlate)
}

exports.calculatePrice = async function (hours, clean, color) {
    likedColors = {
        red: 'red',
        green: 'green',
        black: 'black'
    }
    if (Object.values(likedColors).includes(color)) {
        if (clean = true) {
            return 0
        } else {
            return 3.5 * hours
        }
    } else {
        if (clean = true) {
            return 7 * hours
        } else {
            return 14 * hours
        }
    }
}
