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
    // return {
    //     NoCandidato: this.NoCandidato,
    //     Nombre: this.Nombre,
    //     Apellido: this.Apellido,
    //     Puesto: this.Puesto,
    //     Categoria: this.Categoria,
    //     TipoContrato: this.TipoContrato,
    //     Sueldo: this.Sueldo,
    //     NoContrato: this.NoContrato,
    //     FechaInicio: this.FechaInicio,
    //     FechaFin: this.FechaFin
    // };
}

var contrato = mongoose.model('contrato', contratoSchema);

module.exports = contrato;