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

const getMedicoById = async(req, res = response) => {
    const id = req.params.id;
    const medico = await Medicos.findById(id).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
    res.json({
        ok: true,
        medico
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

    const id = req.params.id;

    try {
        const medico = await Medicos.findById(id);
        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            });
        }
        const cambiosMedico = {
            ...req.body,
            usuario: req.uid
        }
        const medicoActualizado = await Medicos.findByIdAndUpdate(id, cambiosMedico, { new: true })
        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteMedico = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medicos.findById(id);
        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }
        await Medicos.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
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
    getMedicos,
    putMedico,
    deleteMedico,
    postMedico,
    getMedicoById

}