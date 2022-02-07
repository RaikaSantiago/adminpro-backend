const { Schema, model } = require('mongoose');

const hospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

}, { collection: 'hospitales' });

hospitalSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', hospitalSchema);