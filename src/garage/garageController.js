const express = require('express')
const router = express.Router()
const garageService = require('./garageService')


router.post('/cars', async (req, res) => {
    try {
        const hours = req.body.hours
        const color = req.body.color.toLowerCase().trim()
        const clean = req.body.clean
        const car = {
            licensePlate: req.body.licensePlate.toLowerCase().trim(),
            color: color,
            clean: clean,
            hours: hours, 
        }
        await garageService.addCar(car)
        return res.status(200).send({ message: "Car Added"})
    } 
    catch(err) { 
        res.status(400).json({ error: err.message })
    }
})

router.get('/', async (req, res) => {
    try{
        const carCount = await garageService.getGarageCapacity()
        
        if (carCount < 1) {
            return res.send(`Hello, there are no cars parked currently.`)
        } else {
            return res.send(`Hello, there are ${carCount} cars in the garage.`)
        }
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
})

router.get('/car', async (req, res) => {
    try {
        const licensePlate = req.query.licensePlate
        const car = await garageService.findCarByLicensePlate(licensePlate)
        return res.status(200).json(car)
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
})

router.get('/cars', async (req, res) => {
    try {
        const cars = await garageService.findAllCars()
        return res.status(200).json(cars)
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
})

router.put('/car/:licensePlate', async (req, res) => {
    try {
        const hours = req.body.hours
        const color = req.body.color
        const clean = req.body.clean
        const licensePlate = req.params.licensePlate
        const updatedInfo = {}

        if (hours) {
            Object.assign(updatedInfo, {hours:hours})
        }
        if (color) {
            Object.assign(updatedInfo, {color:color})
        }
        if (clean != null || clean != undefined) {
            Object.assign(updatedInfo, {clean:clean})
        }
        await garageService.updateCar(updatedInfo, licensePlate)
        return res.status(200).json({ message: "Successfully Updated" })
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
})

router.delete('/cars/:licensePlate', async (req, res) => {
    try {
        const licensePlate = req.params.licensePlate
        await garageService.deleteCar(licensePlate)
        return res.status(200).json({ message: "car deleted"})
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router;