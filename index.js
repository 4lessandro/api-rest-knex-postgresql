const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const router = require('./routes/routes')

require("dotenv-safe").config();
const PORT = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/', router);

app.listen(PORT,() => {
    console.log("Servidor[OK] //sem erros")
});
