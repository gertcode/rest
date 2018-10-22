//==========
// Puerto
//========
process.env.PORT = process.env.PORT || 3000;


//==========
// Entorno
//========


process.env.NODE_ENV = process.env.NODE_ENV || 'dev'



//==========
// Base de Datos
//========


let urlBD;

if(process.env.NODE_ENV === 'dev'){
    urlBD = 'mongodb://localhost:27017/cafe';
}
else{
    urlBD = 'mongodb://cafe-user:Beck5452@ds033484.mlab.com:33484/cafe';
}

process.env.URLDB = urlBD;

//==========
// Vencimiento del token
//expiresIn: 60 segundos * 60 minutos *24 horas  * 30 días
//========

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



//==========
// SEED de autenticación
//========

process.env.SEED = 'este-es-el-seed-de-desarrollo';


