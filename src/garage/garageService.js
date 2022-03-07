const garageRepo = require('./garageRepo')
const GarageExceptions = require('./GarageEnums/garageExceptions')
const likedColors = require('./GarageEnums/likedColors')

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
    const car = await garageRepo.findCarByLicensePlate(licensePlate)
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

exports.updateCar = async function (updatedInfo, licensePlate) {
    const price =  await this.updatePrice(updatedInfo.color, updatedInfo.clean, updatedInfo.hours, licensePlate)
    Object.assign(updatedInfo, {price:price})
    return garageRepo.updateCar(updatedInfo, licensePlate)
}

exports.deleteCar = async function (licensePlate) {
    if (!licensePlate) {
        throw Error(GarageExceptions.LicensePlateRequired)
    }
    garageRepo.deleteCar(licensePlate)
}

exports.calculatePrice = async function (hours, clean, color) {
    const rate = 7
    if (Object.values(likedColors).includes(color)) {
        if (clean) {
            return 0
        } else {
            return (rate * .5) * hours
        }
    } else {
        if (clean) {
            return rate * hours
        } else {
            return (rate * 2) * hours
        }
    }
}

exports.updatePrice = async function (color, clean, hours, licensePlate) {
    const car = {}
    const currentCar = await this.findCarByLicensePlate(licensePlate)
    if (color === null || color === undefined) {
        Object.assign(car, {color:currentCar.color})
    } else {
        Object.assign(car, {color:color})
    }
    if (clean === null || clean === undefined) {
        Object.assign(car, {clean:currentCar.clean})
    } else {
        Object.assign(car, {clean:clean})
    }
    if (hours === null || hours === undefined) {
        Object.assign(car, {hours:currentCar.hours})
    } else {
        Object.assign(car, {hours:hours})
    }
    const price = await this.calculatePrice(car.hours, car.clean, car.color)
    return price
}
