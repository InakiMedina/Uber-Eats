const express = require('express')
const app = express()
const fs = require('fs')
const router = require('./app/controllers/router')

const port = 3000

// const productsFile = require('./products.json')
// // const products = JSON.parse(await require('./products.json'))
// console.log(typeof(productsFile))


// app.use(express.json())
app.use(express.static('app'))
app.use(router)
// app.get('/', (req, res) => res.send("e-commerce app práctica 3"))

app.listen(port, () => console.log(`running in http://localhost:${port}`))

