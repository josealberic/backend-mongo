var express = require('express');

var SEED = require('../config/config').SEED;
var app = express();
var usuario = require('../models/usuario');


app.post('/', (req, res) => {
    var body = req.body;

    usuario.findOne({ email: body.email }, (err, usuarioBD) => {

        if (err) {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioBD) {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'credenciales incorrectas',
                errors: { message: 'No existe usuario con ese ID' }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: 'false',
                mensaje: 'credenciales incorrectas',
                errors: { message: 'No existe usuario con ese ID' }
            });
        }
        //crear token
        usuarioBD.password = ':)';
        var token = jwt.sign({ usuario: usuarioBD }, SEED, { expiresIn: 14400 });


        res.status(200).json({
            ok: 'true',
            usuario: usuarioBD,
            id: usuarioBD._id
        });
    });


});







module.exports = app;