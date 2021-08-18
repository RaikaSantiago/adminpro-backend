const { response } = require('express');
const bcrypt = require('bcryptjs');
const Medicos = require('../models/medicos.model');
const { generateJWT } = require('../helpers/jwt');

const getMedicos = async(req, res = response) => {

    const medicos = await Medicos.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img');
    res.json({
        ok: true,
        medicos,
        uid: req.uid
    });
}
const postMedico = async(req, res = response) => {

    const medicos = new Medicos({
        usuario: req.uid,
        ...req.body
    });

    try {
        const medicosDB = await medicos.save();

        res.json({
            ok: true,
            medicos: medicosDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const putMedico = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Medico'
    });
}

const deleteMedico = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'Eliminar Medico'
    });
}


module.exports = {
    getMedicos,
    putMedico,
    deleteMedico,
    postMedico

}