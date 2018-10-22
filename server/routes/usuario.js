const express = require('express');
//para instalar  bcrypt me marco error npm y tuve que instalar
//npm install node-sass
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();



app.get('/usuario', verificaToken ,(req, res) => {

    
    let desde = req.query.desde || 0;

    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    Usuario.find({estado:true},'nombre email rol estado google img') //'nombre email rol estado google img' solo muestra los campos descritos en el find
    .skip(desde)
    .limit(limite)
    .exec((err,usuarios)=>{
        if (err)
        {
            return res.status(400).json(
                {
                    ok:false,
                    err
                }
            );
        }

        Usuario.count({estado:true},(err,conteo)=>{
            res.json({
                ok:true,
                usuarios,
                size:conteo
            });
        });

        


    })



  })

  app.post('/usuario', [verificaToken,verificaAdmin_Role],function (req, res) {
    let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    })

    //res.json(usuario);

    usuario.save( (err,usuarioDB) => {

        if (err)
        {
            return res.status(400).json(
                {
                    ok:false,
                    err
                }
            );
        }

        //usuarioDB.password = null;

        res.json({
            ok:true,
            usuario: usuarioDB
        })


    } );
    
  })

  app.put('/usuario/:id',[verificaToken,verificaAdmin_Role], function (req, res) {

    let id = req.params.id;
    //la siguiente linea _.pick se hace para solo poder actualuizar los elementos que deben solo de actualizarse
    let body = _.pick(req.body,['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,usuarioDB)=>{
        if (err)
        {
            return res.status(400).json(
                {
                    ok:false,
                    err
                }
            );
        }
        
        res.json({
            ok:true,
            usuario: usuarioDB
        })
    });


    
  })

  /*
  
  if (err)
        {
            return res.status(400).json(
                {
                    ok:false,
                    err
                }
            );
        }
        
        res.json({
            ok:true,
            usuario: usuarioDB
        })
  
  */

  app.delete('/usuario/:id',[verificaToken,verificaAdmin_Role], function (req, res) {
    let id = req.params.id;

    /*Usuario.findByIdAndRemove(id, (err,usuarioBorrado)=>{

        if (err)
        {
            return res.status(400).json(
                {
                    ok:false,
                    err
                }
            );
        }
 
        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                error:{
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok:true,
            usuario:usuarioBorrado
        });


    });*/

    let cambiaEstado = {
        estado : false
    };


    Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true} ,(err,usuarioBorrado)=>{

        

        if (err)
        {
            return res.status(400).json(
                {
                    ok:false,
                    err
                }
            );
        }
 
        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                error:{
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok:true,
            usuario:usuarioBorrado
        });


    });







  })

  module.exports = app;
