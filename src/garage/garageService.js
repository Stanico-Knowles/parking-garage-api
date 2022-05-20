const garageRepo = require('./garageRepo')
const GarageExceptions = require('./GarageEnums/garageExceptions')
const likedColors = require('./GarageEnums/likedColors')
const HTTPError = require('../frameworks/errorHandler/APIError/HTTPError');
const CarExceptions = require('./GarageEnums/garageExceptions');

module.exports.addCar = async function (car) {
    await validateNewCar(car)
    const price = calculatePrice(car.hours, car.clean, car.color)
    return garageRepo.addCar(car, price)
}

module.exports.findCar = async function (licensePlate) {
    const car = await findCarByLicensePlate(licensePlate)
    if (!car) throw HTTPError.badRequest(CarExceptions.CarNotParked)
    return car
}

module.exports.findAllCars = function () {
    return garageRepo.findAllCars()
}

module.exports.getGarageCapacity = function () {
    return garageRepo.getGarageCapacity()
}

module.exports.updateCar = async function (updatedInfo, licensePlate) {
    const price =  await updatePrice(updatedInfo.color, updatedInfo.clean, updatedInfo.hours, licensePlate)
    Object.assign(updatedInfo, {price:price})
    return garageRepo.updateCar(updatedInfo, licensePlate)
}

module.exports.deleteCar = function (licensePlate) {
    if (!licensePlate) {
        throw HTTPError.badRequest(GarageExceptions.LicensePlateRequired)
    }
    garageRepo.deleteCar(licensePlate)
}

const findCarByLicensePlate = async function (licensePlate) {
    if (!licensePlate) {
        throw HTTPError.badRequest(GarageExceptions.LicensePlateRequired)
    }
    return await garageRepo.findCarByLicensePlate(licensePlate)
}

const calculatePrice = function (hours, clean, color) {
    const rate = 7
    if (Object.values(likedColors).includes(color)) {
        if (clean) {
            return 0
        }
        return (rate * .5) * hours
    } else {
        if (clean) {
            return rate * hours
        }
        return (rate * 2) * hours
    }
}

const updatePrice = async function (color, clean, hours, licensePlate) {
    const car = {}
    const currentCar = await findCarByLicensePlate(licensePlate)
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
    return await calculatePrice(car.hours, car.clean, car.color)
}

const validateNewCar = async function (car) {
    if (!car.licensePlate) {
        throw HTTPError.badRequest(GarageExceptions.LicensePlateRequired)
    }
    if (car.clean == null) {
        throw HTTPError.badRequest(GarageExceptions.CleanRequired)
    }
    if (!car.color) {
        throw HTTPError.badRequest(GarageExceptions.ColorRequired)
    }
    if (!car.hours) {
        throw HTTPError.badRequest(GarageExceptions.HoursRequired)
    }
    if (!Number.isInteger(car.hours)) {
        throw HTTPError.badRequest(GarageExceptions.HoursNotAnInteger)
    }
    if (await findCarByLicensePlate(car.licensePlate)) {
        throw HTTPError.badRequest(GarageExceptions.LicensePlateExists)
    }
}