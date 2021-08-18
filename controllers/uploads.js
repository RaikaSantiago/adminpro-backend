const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    /*Validas Tipo */
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }
    /*Validar si existe archivo */
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }
    /*procesar imagen */
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    /*Validar extension */
    const extencionValida = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extencionValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión valida'
        });
    }
    /*Generar nombre del archivo */
    const nombreArchivo = `${ uuidv4()}.${ extensionArchivo }`;

    /*Path para guardar la img */
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    /*Mover la img */
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo

        });
    });
}

module.exports = {
    fileUpload

}