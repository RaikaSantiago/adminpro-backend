require('dotenv').config();

const express = require('express');
const { connectionDB } = require('./database/config');
const cors = require('cors')

/*Comando de Arranque */
// nodemon start:dev

/*Crear el servidor  de express */
const app = express();

/*Configurar Cors */
app.use(cors());

/*Db Conection */
connectionDB();

/*Rutas */
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})