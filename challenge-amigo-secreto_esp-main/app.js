// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Desafío: Sorteo de Amigos Secretos

//arreglo para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();
    if (nombre && !amigos.includes(nombre)) {
        amigos.push(nombre);
        mostrarLista();
        input.value = '';
        input.focus();
    }
}

// Función para mostrar la lista de amigos
function mostrarLista() {
    const ul = document.getElementById('listaAmigos');
    ul.innerHTML = '';
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        ul.appendChild(li);
    });
}

// Función para sortear los amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarResultado('Agrega al menos dos amigos para sortear.');
        return;
    }
    // Algoritmo para sortear sin que nadie se asigne a sí mismo
    let asignados = [];
    let copia = [...amigos];
    let valido = false;
    while (!valido) {
        copia = [...amigos];
        asignados = [];
        valido = true;
        for (let i = 0; i < amigos.length; i++) {
            let posibles = copia.filter(a => a !== amigos[i]);
            if (posibles.length === 0) {
                valido = false;
                break;
            }
            let elegido = posibles[Math.floor(Math.random() * posibles.length)];
            asignados.push({de: amigos[i], para: elegido});
            copia.splice(copia.indexOf(elegido), 1);
        }
    }
    mostrarResultado(asignados.map(a => `${a.de} → ${a.para}`).join('<br>'));
}

// Función para mostrar el resultado del sorteo
function mostrarResultado(mensaje) {
    const ul = document.getElementById('resultado');
    ul.innerHTML = `<li>${mensaje}</li>`;
}