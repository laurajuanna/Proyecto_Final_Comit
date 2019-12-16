function aparecer_menu(){
    if (document.querySelector('#menu').className === "oculto"){
        document.querySelector('#menu').className = "aparecer"
    } else {
        document.querySelector('#menu').className = "oculto";                
    }
    
}

/* --------------- Funciones de RESERVA.HTML -------------------------------*/

function dar_asiento(id,value){
    // Confirmación del asiento elegido (if true, hace esto, sino no hace nada)
    if(confirm('El lugar elegido es el Nro: '+value+'.\n¿Desea reservar ese lugar?')){
        // Array de asientos totales
        var asientos_totales = ["a1","a2","a3","a4","a5","a6","a7","a8","a9",
        "a10","a11","a12","a13","a14","a15","a16","a17","a18","a19"];
        // Recorre el array (en loop) del 0 al total del array y va sumando 1 a la variable I (que luego es el indice del array)
        for (i = 0; i < asientos_totales.length; i++){
            // Le quita a todos los asientos la propiedad de ser clickeado
            var selec_asiento = document.getElementById(asientos_totales[i]).toggleAttribute("onclick");
            // Cambia el color de fondo del asiento seleccionado
            var selec_asiento = document.getElementById(id).className = "inactivo";
        }
        // Selecciona el input del asiento elegido
        var asiento = document.querySelector("#asiento_elegido")
        // Inserta el valor del asiento elegido en el input correspondiente    
        asiento.innerHTML = `
        <input type="number" name="asiento" id="asiento" value="${value}" hidden required>
        `;
    }
}

async function obtener_asientos_ocupados() {
    var respuesta = await fetch('/api/asientos_reservados')
    var contenido = await respuesta.json()     

    var asientos_ocupados = []

    Object.keys(contenido).forEach(function (nro) {
        asientos_ocupados.push('a'+contenido[nro].asiento)
    })

    for (i = 0; i < asientos_ocupados.length; i++){
        var selec_asiento = document.getElementById(asientos_ocupados[i]).toggleAttribute("onclick");
        selec_asiento = document.getElementById(asientos_ocupados[i]).className = "ocupado";
    }
}

/* ------------------------------ FUNCIONES DE ADMINISTRAR.HTML ------------------*/

var transformar = ''

async function obtener_asientos() {
    var respuesta = await fetch('/api/asientos_reservados')
    var contenido = await respuesta.json()    

    transformar = contenido
    //console.log(contenido)

    }

async function obtener_reservas() {      
    try {
        var trans_texto = transformarRespuesta(transformar)
        
        // Para que la clase del contenedor cambie y el tamaño de alto sea ajuste al contenido
        var ampliarContenedor = document.querySelector('#content-ampliar').className = 'contenedor ampliar';
        
        h2 = document.querySelector('.perfiles')
        h2.innerHTML = `
            ${trans_texto.join(' ')}
        `
    } catch (error) {
        // Para que la clase del contenedor cambie y el tamaño de alto sea ajuste al contenido
        //var ampliarContenedor = document.querySelector('#content-ampliar').className = 'contenedor ampliar';
        
        h2 = document.querySelector('.perfiles')
        h2.innerHTML = `
        <div class="mensaje">
            <div class="mensaje1">
                <div class="mensaje2">
                    <span class="mensaje-reserva">
                        <h3 class="correcto">ERROR DE BÚSQUEDA</h3>
                        <p class="correcto">Por favor, inténtelo nuevamente.</p>
                    </span>
                    <img src="./img/error.png" alt="reserva">
                </div>
            </div>                
        </div>
        `
    }        
}

function transformarRespuesta(contenido){
    return contenido.map(function(persona){
        return `
        <table>
            <tr>
                <th>${persona.nombre}</th>
                <th>${persona.telefono}</th>
            </tr>
            <tr>
                <td>Fecha: ${persona.fecha}</td>
                <td>${persona.origen} - ${persona.destino}</td>
            </tr>
            <tr>
                <td>Hora: ${persona.horario} Hs.</td>
                <td>Asiento ${persona.asiento}</td>
            </tr>
        </table><br>
        `
        })
    }

    function ingreso(){
        var nombre_usuario = document.getElementById('usuario').value
        nombre_usuario = nombre_usuario.toLowerCase()
        var passw = document.getElementById('pass').value
        
        if ((nombre_usuario != 'juiz.laurai@gmail.com') || (nombre_usuario != 'invitado@atos.com')){
            try {
                var logNotOk = document.getElementById('completar')
                logNotOk.innerText = '* Usuario no registrado.'
            } catch (error) {
            }            
        }
        if (((nombre_usuario === 'juiz.laurai@gmail.com') && (passw !== '1234'))||
        (((nombre_usuario === 'invitado@atos.com') && passw !== '1234'))){
            try {
                var logNotOk = document.getElementById('completar')
                logNotOk.innerText = '* Contraseña incorrecta!'
            } catch (error) {
            }
        }
        if ((nombre_usuario === "") || (passw === "")) {
            var logNotOk = document.getElementById('completar')
            logNotOk.innerText = '* Hacen falta datos!'
        }
        if (((nombre_usuario === 'juiz.laurai@gmail.com') && passw === '1234')||
            nombre_usuario === 'invitado@atos.com' && passw === '1234') {

            var selec_asiento = document.getElementById('log-aut').toggleAttribute("hidden");
            var logok = document.getElementById('ya-logueado')

            logok.innerHTML = `
            <h3>Bienvenido,<br>${nombre_usuario}!</h3>
            <button onclick="salida()">Cerrar Sesión</button>
            `

            if (document.querySelector('#cont1').className === "content1"){
                document.querySelector('#cont1').className = "content1 achicar"
            } else {
                document.querySelector('#cont1').className = "content1";                
            }
        }
    }

    function salida(){
        var selec_asiento = document.getElementById('log-aut').toggleAttribute("hidden");
        var logok = document.getElementById('ya-logueado')
        logok.innerHTML = `
            <fieldset>
                <input type="text" name="usuario" id="usuario" placeholder="Ingrese email registrado.." required>
                <input type="password" name="pass" id="pass" placeholder="Ingrese contraseña.." required>
                <label for="mensaje-log"></label>
            </fieldset>
            <button onclick="ingreso()">Ingresar</button>
        `

        var logok = document.getElementById('logueado')
        logok.innerHTML = `
            <h2>ADMINISTRAR RESERVAS</h2>
            <button onclick="obtener_reservas()">Buscar</button>
            <div class="perfiles"></div>
        `

        if (document.querySelector('#content-ampliar').className === "contenedor ampliar"){
            document.querySelector('#content-ampliar').className = "contenedor"
        } else {
            document.querySelector('#content-ampliar').className = "contenedor";                
        }

        if (document.querySelector('#cont1').className === "content1"){
            document.querySelector('#cont1').className = "content1 achicar"
        } else {
            document.querySelector('#cont1').className = "content1";                
        }
        
        
    }