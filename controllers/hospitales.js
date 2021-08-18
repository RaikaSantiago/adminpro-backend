const { response } = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospitales.model');
const { generateJWT } = require('../helpers/jwt');

const getHospitales = async(req, res = response) => {

    const hospital = await Hospital.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospital,
        uid: req.uid
    });
}
const postHospital = async(req, res = response) => {

    const hospital = new Hospital({
        usuario: req.uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const putHospital = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Hospital'
    });
}

const deleteHospital = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'Eliminar Hospital'
    });
}

module.exports = {
    getHospitales,
    putHospital,
    deleteHospital,
    postHospital
}