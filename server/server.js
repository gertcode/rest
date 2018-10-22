require('./config/config');


const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//configuración global de rutas
app.use(require('./routes/index'));


  mongoose.connect(process.env.URLDB,(err,res)=>{
  if(err) throw err;

  console.log('Base de datos ONLINE');
  });

app.listen(process.env.PORT,()=>{
    console.log('Escuchando puerto',process.env.PORT);
})