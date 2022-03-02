const { DataTypes } = require("sequelize")
const { sequelize } = require("../models")
const Car = require('../models/garageModel')(sequelize, DataTypes)

exports.addCar = async function (car, price) {
    Car.create({
        licensePlate: car.licensePlate,
        color: car.color,
        clean: car.clean,
        hours: car.hours,
        price: price
    })
}

exports.findcarByLicensePlate = async function (licensePlate) {
    const car = await Car.findOne(
        {
            where: {licensePlate: licensePlate}
        }
    )
    return car
}

exports.findAllCars = async function () {
    const cars = await Car.findAll()
    return cars
}

exports.getGarageCapacity= async function () {
    const carCount = await Car.count()
    return carCount
}

exports.deleteCar = async function (licensePlate) {
    Car.destroy(
        { where: { licensePlate: licensePlate } }
    )
}