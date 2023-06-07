const cors = require('cors')
const express = require('express')
const mySqlProxy = require('./MySqlProxy')
const { body, check, param, validationResult } = require('express-validator')


const PORT = 80
const app = express()
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

// Middleware...
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/message', cors(corsOptions), async (req, res) => { 
    res.send({message: 'Hello World!!!'})
})


//
// Person
//

app.get('/person/:id', 
    cors(corsOptions), 
    param('id').isNumeric(),
    async (req, res) => { 
        // Validate...
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // Business logic...
        const personId = req.params['id']
        const person = await mySqlProxy.selectPersonById(personId)
        person ? res.send(person) : res.status(404).send({message: 'Not found.'})
    }
)

app.post('/person/', cors(corsOptions), async (req, res) => { 
    const person = req.body
    const newPerson = await mySqlProxy.insertPerson(person)
    res.send(newPerson)
})

//

app.get('/persons/', cors(corsOptions), async (req, res) => { 
    const persons = await mySqlProxy.selectPersons()
    res.send(persons)
})

app.put('/person/', cors(corsOptions), async (req, res) => { 
    const person = req.body
    const message = await mySqlProxy.updatePerson(person)
    res.send({ message })
})

app.delete('/person/:id', cors(corsOptions), async (req, res) => { 
    const personId = req.params['id']
    const results = await mySqlProxy.deletePerson(personId)
    res.send(results)
})

//
// Car
//

app.get('/cars/:id', cors(corsOptions), async (req, res) => { 
    const carId = req.params['id']
    const car = await mySqlProxy.selectCarById(carId)
    res.send(car)
})

app.get('/cars', cors(corsOptions), async (req, res) => { 
    const make = req.query['make']
    const car = await mySqlProxy.selectCarByMake(make)
    res.send(car)
})

app.put('/cars/', cors(corsOptions), async (req, res) => { 
    const car = req.body
    const message = await mySqlProxy.updateCar(car)
    res.send({ message })
})

app.post('/cars/', cors(corsOptions), async (req, res) => { 
    const car = req.body
    const newCar = await mySqlProxy.insertCar(car)
    res.send(newCar)
})

app.delete('/cars/:id', cors(corsOptions), async (req, res) => {
    const carId = req.params['id']
    const results = await mySqlProxy.deleteCar(carId)
    res.send(results)
})

app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})
