const { response } = require('express');

const getBusqueda = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    res.json({
        ok: true,
        busqueda
    });
}

module.exports = {
    getBusqueda,

}