const fs = require('fs');
const Usuario = require('../models/usuario.model');
const Medicos = require('../models/medicos.model');
const Hospital = require('../models/hospitales.model');

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medicos.findById(id);
            if (!medico) {
                console.log('No se encontro médico por Id');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            if (fs.existsSync(pathViejo)) {
                /*Borrar la imagen anterior */
                fs.unlinkSync(pathViejo);
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontro hospital por Id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            if (fs.existsSync(pathViejo)) {
                /*Borrar la imagen anterior */
                fs.unlinkSync(pathViejo);
            }

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontro usuario por Id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            if (fs.existsSync(pathViejo)) {
                /*Borrar la imagen anterior */
                fs.unlinkSync(pathViejo);
            }

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;


        default:
            break;
    }
}

module.exports = {
    actualizarImagen
};