require('dotenv').config();

const express = require('express');
const { connectionDB } = require('./database/config');
const cors = require('cors')

/*Comando de Arranque */
// nodemon start:dev
/*ID Cliente: 557293408583-huol63oiu3vsq1hh768jtoqh7bde7pgn.apps.googleusercontent.com */
/*ID Secret: UyqwLAUYjTyc_yIiLoPHbEfI */

/*Crear el servidor  de express */
const app = express();

/*Configurar Cors */
app.use(cors());


/* 1 - Lectura y parseo del body */
app.use(express.json());

/*Db Conection */
connectionDB();

/*Directorio publico*/
app.use(express.static('public'));

/* 2 -  Rutas */
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})