const CarExceptions = {
    LicencePlateExists: "That car is already parked in the garage",
    LicensePlateRequired: "Please enter car license plate",
    CleanRequired: "Please indicate if car is clean",
    ColorRequired: "Please enter car color",
    HoursRequired: "Please enter hours parked",
    HoursNotAnInteger: "Hours must be an integer",
    CarNotParked: "Sorry, that car is not parked here"
}

Object.freeze(CarExceptions)

module.exports = CarExceptions