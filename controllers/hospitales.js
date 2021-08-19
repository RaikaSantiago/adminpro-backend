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

    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }
        const cambiosHospital = {
            ...req.body,
            usuario: req.uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true })
        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteHospital = async(req, res = response) => {

    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }
        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getHospitales,
    putHospital,
    deleteHospital,
    postHospital
}