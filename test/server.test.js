var server = require('../server'),
    db = require('../contratoModeldb');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var sinon = require('sinon');

chai.use(chaiHttp);

describe('GET /', () => {
    it('Should return HTML', (done) => {
        chai.request(server.app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
                done();
            });
    });
});

describe('GET /contratos', () => {
    var contratos = new db([{
        "NoCandidato": 1, "Nombre": "Maria", "Apellido": "Soto",
        "Puesto": "Investigadora", "Categoria": "Gerente",
        "TipoContrato": "Indeterminado", "Sueldo": 100, "NoContrato": 1,
        "FechaInicio": "09-01-2019", "FechaFin": "09-03-2019"
    }]);

    var contratoMock = sinon.mock(contratos);

    var contratosStub;
    before(function (done) {
        contratosStub = sinon.stub(db, 'find');
        contratosStub.yields(null, [contratos]);
        done();
    });

    after(function (done) {
        contratosStub.restore();
        done();
    });


    it('should return all contratos', (done) => {
        chai.request(server.app)
            .get('/api/v1/contratos')
            .query({ apikey: "asdf" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                contratoMock.verify();
                done();
            });
    });

    it('should return the contrato given the NoCandidato', (done) => {

        chai.request(server.app)
            .get('/api/v1/contratos/3')
            .query({ apikey: 'asdf' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                contratoMock.verify();
                done();
            });
            
    });

});

describe('POST /contratos', () => {
    it('should create a new record', (done) => {
        chai.request(server.app)
            .post("/api/v1/contratos")
            .query({ apikey: 'asdf' })
            .send({
                "NoCandidato": 3,
                "Nombre": "Roberto",
                "Apellido": "Garcia",
                "Puesto": "Periodista",
                "Categoria": "Gerente",
                "Tipo de contrato": "Indeterminado",
                "Sueldo": 100,
                "NoContrato": 3,
                "Fecha Inicio": "09-01-2019",
                "Fecha Fin": "09-03-2019"
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });
});


describe('PUT /contratos/:NoCandidato ', () => {

    it('it should UPDATE a contrato given the NoCandidato', (done) => {

        var newInfo = {
            "Nombre": 'Juanita',
            "Apellido": 'Perez'
        }

        updateResult = {
            n: 1
        }

        var dbMock = sinon.mock(db);
        dbMock.expects('update').withArgs({ NoCandidato: '3' }, newInfo).yields(null, updateResult);

        chai.request(server.app)
            .put('/api/v1/contratos/3')
            .query({ apikey: 'asdf' })
            .send(newInfo)
            .end((err, res) => {
                expect(res).to.have.status(200);
                dbMock.verify();
                done();
            });

    });

    it('it should returns 500 error', (done) => {

        var newInfo = {
            "Nombre": 'Juanita',
            "Apellido": 'Perez'
        }

        var dbMock = sinon.mock(db);
        dbMock.expects('update').withArgs({ NoCandidato: '3' }, newInfo).yields('Error', null);

        chai.request(server.app)
            .put('/api/v1/contratos/3')
            .query({ apikey: 'asdf' })
            .send(newInfo)
            .end((err, res) => {
                expect(res).to.have.status(500);
                dbMock.verify();
                done();
            });

    });
});

describe('DELETE /contratos/NoCandidato ', () => {

    it('it should DELETE a contrato given the NoCandidato', (done) => {

        removeResult = {
            n: 1
        };

        var dbMock = sinon.mock(db);
        dbMock.expects('deleteMany').withArgs({ NoCandidato: '3' }).yields(null, removeResult);

        chai.request(server.app)
            .delete('/api/v1/contratos/3')
            .query({ apikey: 'asdf' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                dbMock.verify();
                done();
            });

    });

    it('it should returns 500 error', (done) => {

        var dbMock = sinon.mock(db);
        dbMock.expects('deleteMany').withArgs({ NoCandidato: '3' }).yields(true, null);

        chai.request(server.app)
            .delete('/api/v1/contratos/3')
            .query({ apikey: 'asdf' })
            .end((err, res) => {
                expect(res).to.have.status(500);
                dbMock.verify();
                done();
            });

    });

}); 