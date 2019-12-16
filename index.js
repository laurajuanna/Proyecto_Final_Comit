var express = require('express');
var bodyParser = require('body-parser') // transforma en objeto
var ClienteMongo = require('mongodb').MongoClient;
/*-------------------------------- Fin de los require --------------------------------*/

// Datos del Servidor
var servidor = express();
var puerto = process.env.PORT || 3000

// Datos de la BD
var url = 'mongodb+srv://laurajuanna:klapaucius@gestion-cmkio.mongodb.net/test?retryWrites=true&w=majority';
var nombre_base_datos = 'gestion';

var db;


/*-------------------------------- Comienzo de funciones --------------------------------*/

servidor.use(bodyParser.urlencoded( { extended:false } ))
servidor.use(bodyParser.json())

servidor.use(express.static('./public')) // Para que busque en la carpeta de elementos estaticos

ClienteMongo.connect(url, async function(err,cliente) {
    if (err) {
        console.log('Hubo un error: ' + JSON.stringify(err))
        process.exit(1)
    } else {
        console.log('Conexion exitosa!');
        db = cliente.db(nombre_base_datos);

        //var asientos = await db.collection('asientos_reservados').find().toArray()
        //console.log('Los asientos reservados son: ' + JSON.stringify(asientos))

        //cliente.close();
    }   
});

/*--------------------------------------------------------------*/
servidor.listen(puerto, function () {
  console.log('Servidor escuchando en el puerto '+puerto+'!');
});


servidor.get('/api/asientos_reservados', async function (_, respuesta) {
    var asientos = await db.collection('asientos_reservados').find().sort({asiento: 1}).toArray()
    respuesta.json(asientos)
})


servidor.post('/api/asientos_reservados', async function (consulta, respuesta){
    var datos = consulta.body
    var reserva = {
        nombre: datos.nombre,
        telefono: parseInt(datos.telefono),
        fecha: datos.fecha,
        origen: datos.origen,
        destino: datos.destino,
        horario: datos.horario,
        asiento: parseInt(datos.asiento)
    }
    try {
      await db.collection('asientos_reservados').insertOne(reserva)
      console.log('Se agrego un asiento');
      respuesta.status(201).redirect('/reserva_ok.html')
    } catch (error) {
      respuesta.status(500).redirect('/reserva_fail.html')
    }
  })