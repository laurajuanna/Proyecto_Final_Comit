  // Configuracion de FIREBASE
  var firebaseConfig = {
    apiKey: "AIzaSyCS3cWvtoXVCT1yxs-SC1CiSYzeYuGkwrc",
    authDomain: "vans-comit.firebaseapp.com",
    databaseURL: "https://vans-comit.firebaseio.com",
    projectId: "vans-comit",
    storageBucket: "vans-comit.appspot.com",
    messagingSenderId: "1030828373346",
    appId: "1:1030828373346:web:ce419539bc7b52f479683b",
    measurementId: "G-6QQZBF6CYE"
  };
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Efecto para el Nav
    $('#toggle-menu').click(function(){
        $(this).next().slideToggle();
    })

function getID(id){
    return document.getElementById(id).value;
}

function arrayJSON(nom,tel,fech,ori,des,hrs,nroA){
    var data = {
        '01-Origen': ori,
        '02-Destino': des,
        '03-Hora': hrs,
        '04-Fecha': fech,
        '05-Asiento': nroA,
        '06-Pasajero': {
            Nombre: nom,
            Telefono: tel
        }
    }; return data;
}

function insertarDatos(){
    var database = firebase.database();
    var nombre = getID("nombre_pasajero");
    var fono = getID("telefono");
    var fec = getID("fecha");
    var orig = getID("origen");
    var dest = getID("destino");
    var horas = getID("hora");
    var nroAsi = getID("nroElegido");

    // Validación para campos vacios
    if (nombre.length == 0 || fono.length == 0 || fec.length == 0 || orig == 'Seleccionar..' || dest == 'Seleccionar..' || horas == 'Seleccionar..' || nroAsi == 'Seleccionar..'){
        alert('Hay campos sin completar!');
    } else {
        //console.log(nombre);
        //console.log(fono);
        //console.log(fec);
        //console.log(orig);
        //console.log(dest);
        //console.log(horas);
        //console.log(nroAsi);
        arrayData = arrayJSON(nombre,fono,fec,orig,dest,horas,nroAsi);
        // Agrega 1 nuevo array JSON en Reservas, para calcular el ID 1ro cuenta la cantidad de items y luego le suma 1
        firebase.database().ref('reservas/'+(contarId()+1)).set(arrayData);
        // Actualiza la cantidad de reservas en el contador (con la funcion contarID)
        firebase.database().ref('contador/nroReservas').set(contarId());
        alert('Reserva realizada con éxito!');
        //console.log(contarId());
    }  
}

    function contarId(){
        var datos = firebase.database().ref('reservas/');
        var cantidad = [];
        datos.on('child_added',function(data){
            var valores = data.val();
            cantidad.push(valores);
        }); return (cantidad.length);
    }

    function dar_asiento(id,value){
        // Confirmación del asiento elegido (if true, hace esto, sino no hace nada)
        if(confirm('El lugar elegido es el Nro: '+value+'.\n¿Desea reservar ese lugar?')){
            // Array de asientos totales
            var asientos_totales = ["a1","a2","a3","a4","a5","a6","a7","a8","a9","a10","a11","a12","a13","a14","a15","a16","a17","a18","a19"];
            // Recorre el array (el loop) del 0 al total del array y va sumando 1 a la variable I (que luego es el indice del array)
            for (i = 0; i < asientos_totales.length; i++){
                // Le quita a todos los hacientos la propiedad de ser clikeado
                var selec_asiento = document.getElementById(asientos_totales[i]).toggleAttribute("onclick");
                // Cambia el color de fondo del asiento seleccionado
                var selec_asiento = document.getElementById(id).className = "inactivo";
            }
            // Selecciona el input del asiento elegido
            var asiento = document.querySelector("#asiento_elegido")
            // Inserta el valor del asiento elegido en el input correspondiente    
            asiento.innerHTML = `
            <input type="text" id="nroElegido" value="${value}" disabled>
            `;
        }
    }
