const express = require('express')
const app = express()
const cors = require('cors')
const ErrorHandler = require("./frameworks/errorHandler/errorHandler")
const port = 3000
const db = require('./models/index')

app.use(express.json());
app.use(cors());
app.use(ErrorHandler);

const cars = require('./garage/garageController')
app.use('/', cars)

module.exports = {
    run: () => {
        db.sequelize.sync().then(() => {
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`);
            });
        });
    }
}