var mongoose = require('mongoose');

var contratoSchema = new mongoose.Schema(
    {
        NoContrato: {
            type: Number,
            unique: true
        },
        Nombre: String,
        Apellido: String,
        Puesto: String,
        Categoria: String,
        TipoContrato: String,
        Sueldo: Number,
        NoCandidato: Number,
        FechaInicio: String,
        FechaFin: String,
    }
);
 
contratoSchema.methods.cleanup = function () {
    // return { name: this.name, phone: this.phone };
}

var contrato = mongoose.model('contrato', contratoSchema);

module.exports = contrato;