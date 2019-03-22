const mongoose = require("mongoose");
var chai = require('chai');
var PresTest = require('../contratoModeldb');
 
var expect = chai.expect;

describe('Presupuesto DB test Connection', () => {
    before((done) => {
        var dbURL = process.env.DB || "mongodb://localhost:27017/contratos";

        mongoose.connect(dbURL, { useCreateIndex: true, useNewUrlParser: true });

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            done();
        });
    });

    beforeEach((done) => {
        PresTest.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a contract in the DB', (done) => {
        var presToInsert = new PresTest({
            NoContrato: 1, Nombre: "1", Apellido: "1", Puesto: "1", Categoria: "1", TipoContrato: "1",
            Sueldo: 1, NoCandidato: 1, FechaInicio: "10-01-2019", FechaFin: "19-12-2019"
        });
        presToInsert.save((err, presupuesto) => {
            expect(err).is.null;
            PresTest.find({}, (err, presupuestos) => {
                expect(presupuestos).to.have.lengthOf(1);
                done();
            });
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    })

})