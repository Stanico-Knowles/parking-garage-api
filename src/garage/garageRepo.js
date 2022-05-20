const { DataTypes } = require("sequelize")
const { sequelize } = require("../models")
const Car = require('../models/garageModel')(sequelize, DataTypes)

module.exports.addCar = function (car, price) {
    return Car.create({
        licensePlate: car.licensePlate.toLowerCase(),
        color: car.color.toLowerCase(),
        clean: car.clean,
        hours: car.hours,
        price: price
    })
}

module.exports.findCarByLicensePlate = function (licensePlate) {
    const car = Car.findOne(
        {    
            where: {licensePlate: licensePlate}
        }
    )
    return car
}

module.exports.findAllCars = function () {
    const cars = Car.findAll()
    return cars
}

module.exports.getGarageCapacity = function () {
    const carCount = Car.count()
    return carCount
}

module.exports.updateCar = function (updatedInfo, licensePlate) {
    Car.update(
        updatedInfo,
        { where: { licensePlate: licensePlate } }
    )
}

module.exports.deleteCar = function (licensePlate) {
    Car.destroy(
        { where: { licensePlate: licensePlate } }
    )
}