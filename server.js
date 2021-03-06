var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var morgan = require('morgan');
var path = require('path')
var contratosdb = require('./contratoModeldb');
const CONTACTS_APP_DIR = "/dist/contrato-int";
var ApiKey = require('./apikeys');

var passport = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;
var BASE_API_PATH = "/api/v1";
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));     
app.use(express.static(path.join(__dirname, CONTACTS_APP_DIR)));


passport.use(new LocalAPIKey(
    (apikey, done) => {

        if (apikey == 'asdf') {
            //console.log("Logged as: " + user.user);
            return done(null, true);
        } else
            ApiKey.findOne({ apikey: apikey }, (err, user) => {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Unknown apikey ' + apikey });
                } else {
                    console.log("Logged as: " + user.user);
                    return done(null, user);
                }
            });
    }
));

app.use(passport.initialize());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, CONTACTS_APP_DIR, '/index.html'));
});

app.get('/formulario', function (req, res) {
    res.sendFile(path.join(__dirname, CONTACTS_APP_DIR, '/index.html'));
});

app.get('/detalles', function (req, res) {
    res.sendFile(path.join(__dirname, CONTACTS_APP_DIR, '/index.html'));
});

app.get(BASE_API_PATH + "/contratos:NoCandidato",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        // Obtain all contratos
        console.log(Date() + " - GET /contratos");

        contratosdb.find({}, (err, contratos) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            } else {
                res.send(contratos.map((contrato) => {
                    delete contrato._id;
                    return contrato;
                }));
            }
        });

    });

app.get(BASE_API_PATH + "/contratos",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        // Obtain all contratos
        console.log(Date() + " - GET /contratos");

        contratosdb.find({}, (err, contratos) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            } else {
                res.send(contratos.map((contrato) => {
                    delete contrato._id;
                    return contrato;
                }));
            }
        });

    });

app.post(BASE_API_PATH + "/contratos",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        // Create a new contrato
        console.log(Date() + " - POST /contratos");

        var contrato = req.body;

        contratosdb.create(contrato);

        res.sendStatus(201);
    });

// app.put(BASE_API_PATH + "/contratos", (req, res) => {
//     // Forbidden
//     console.log(Date() + " - PUT /contratos");

//     res.sendStatus(405);
// });

app.post(BASE_API_PATH + "/contratos/:NoCandidato", (req, res) => {
    // Forbidden
    console.log(Date() + " - POST /contratos");

    res.sendStatus(405);
});

app.get(BASE_API_PATH + "/contratos/:NoCandidato",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        // Get a single contrato
        var NoCandidato = req.params.NoCandidato;
        console.log(Date() + " - GET /contratos/" + NoCandidato);

        contratosdb.find({ "NoCandidato": NoCandidato }, (err, contratos) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            } else {
                if (contratos.length > 1) {
                    console.warn("Incosistent DB: duplicated name");
                }
                res.send(contratos.map((contrato) => {
                    delete contrato._id;
                    return contrato;
                })[0]);
            }
        });
    });
    

app.delete(BASE_API_PATH + "/contratos/:NoCandidato",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        // Delete a single contrato
        var NoCandidato = req.params.NoCandidato

        console.log(Date() + " - DELETE /contratos/" + NoCandidato);

        contratosdb.deleteMany({ NoCandidato: NoCandidato }, {}, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            } else {
                if (numRemoved > 1) {
                    res.sendStatus(409);
                    console.warn("Incosistent DB: duplicated name");
                } else if (numRemoved == 0) {
                    res.sendStatus(404);
                } else if (numRemoved == 1) {
                    res.sendStatus(200);
                } else {
                    res.send(numRemoved);
                }
            }
        });
    });

app.put(BASE_API_PATH + "/contratos/:NoCandidato",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        // Update contrato
        var NoCandidato = req.params.NoCandidato;
        var updatedcontrato = req.body;
        console.log(Date() + " - PUT /contratos/" + NoCandidato);

        contratosdb.update({ "NoCandidato": NoCandidato }, updatedcontrato, (err, numUpdated) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            } else {
                if (numUpdated > 1) {
                    console.warn("Incosistent DB: duplicated name");
                } else if (numUpdated == 0) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
    });


module.exports.app = app;