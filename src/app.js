const express = require('express')
const app = express()
const cors = require('cors')
const APIErrorHandler = require('./frameworks/errorHandler/APIError/APIErrorHandler')
const port = 3000
const db = require('./models/index')

app.use(express.json());
app.use(cors());

const cars = require('./garage/garageController')
app.use('/', cars)

app.use(APIErrorHandler);
module.exports = {
    run: () => {
        db.sequelize.sync().then(() => {
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`);
            });
        });
    }
}
