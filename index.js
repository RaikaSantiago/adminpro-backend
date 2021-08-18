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

/* 1 - Lectura y parseo del body */
app.use(express.json());

/*Db Conection */
connectionDB();

/* 2 -  Rutas */
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})