let todo = [];

const guardarArray = () => {
    let aRealizar = document.getElementById('textoTodo').value;
    let horaActual = new Date();
    
    todo.push({
        realizar: aRealizar,
        horaCreacion: horaActual.getTime(), // timestamp para calcular duración
        horaLegible: horaActual.toLocaleTimeString(), // solo para mostrar
        tachado: false,
        tiempoFinalizacion: null
    });

    document.getElementById('textoTodo').value = ""; // Limpiar input
    mostrar();
}

const mostrar = () => {
    document.getElementById('mostrarTodo').innerHTML = "";

    todo.forEach((t, index) => {
        let tachadoClass = "";

        if (t.tachado === true) {
            tachadoClass = "tachado";
        } else {
            tachadoClass = "";
        }

        let checkboxMarcado = "";
        if (t.tachado === true) {
            checkboxMarcado = "checked";
        }

        document.getElementById('mostrarTodo').innerHTML += `
            <li class="${tachadoClass}">
                <input type="checkbox" onclick="tacharTarea(${index})" ${checkboxMarcado}>
                <span>${t.realizar} (${t.horaLegible})</span>
            </li>`;
    });
}

const tacharTarea = (index) => {
    const tarea = todo[index];

    if (tarea.tachado === false) {
        tarea.tachado = true;
        tarea.tiempoFinalizacion = new Date().getTime();
    } else {
        tarea.tachado = false;
        tarea.tiempoFinalizacion = null;
    }

    mostrar();
}

const mostrarTareaMasRapida = () => {
    let tareaMasRapida = null;
    let tiempoMinimo = Infinity;

    todo.forEach(t => {
        if (t.tachado === true && t.tiempoFinalizacion !== null) {
            let tiempoRealizado = t.tiempoFinalizacion - t.horaCreacion;

            if (tiempoRealizado < tiempoMinimo) {
                tiempoMinimo = tiempoRealizado;
                tareaMasRapida = t;
            }
        }
    });

    if (tareaMasRapida !== null) {
        alert(`La tarea más rápida fue: "${tareaMasRapida.realizar}" realizada en ${Math.round(tiempoMinimo / 1000)} segundos.`);
    } else {
        alert("No hay tareas completadas aún.");
    }
}

const toggleModo = () => {
    document.body.classList.toggle("dark-mode");

    let boton = document.querySelector(".toggle-btn");

    if (document.body.classList.contains("dark-mode")) {
        boton.innerHTML = "☀️ Modo Claro";
    } else {
        boton.innerHTML = "🌙 Modo Oscuro";
    }
};

mostrar();
