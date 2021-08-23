const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        /*Verificar Email */
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no valido'
            });
        }

        /*Verificar Contraseña */
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        /*Generar el Token */
        const token = await generateJWT(usuarioDB.id);
        res.json({
            ok: true,
            token,
            uid: usuarioDB._id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });

    }
}
const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;
    try {

        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            /*Si no existe el usuario */
            usuario = new Usuario({
                nombre: name,
                email,
                password: '',
                img: picture,
                google: true
            });

        } else {
            /*Existe usuario */
            usuario = usuarioDB;
            usuario.google = true;
        }

        /*guardar en base de datos */
        await usuario.save();

        /*Generar jwt */
        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'El token no es valido'
        });
    }

}

const renewToken = async(req, res) => {
    const uid = req.uid;

    /*Generar jwt */
    const token = await generateJWT(uid);

    res.json({
        ok: true,
        msg: 'Renovar token',
        token
    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}