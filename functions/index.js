const {onRequest} = require("firebase-functions/v2/https");

const express = require('express');
const cors = require("cors");

//*Inicializamos express
const app = express();
// app.use(cors)

app.get('/hello-world', ( req, res ) => {
    return res.status(200).json({message: 'Hello World'})
});

app.use(require('./routes/products.routes'))

//* DE ESTA FORMA ESTAMOS SIRVIENDO A FIREBASE CON NUESTRO BACKEND
exports.app = onRequest(app);