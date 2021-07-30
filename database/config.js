const mongoose = require('mongoose');
require('dotenv').config();
/*user:raika_user, pass:gOAHPsOu6YGcF8oP */
const connectionDB = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la conexion con la base de datos');
    }

}

module.exports = { connectionDB }