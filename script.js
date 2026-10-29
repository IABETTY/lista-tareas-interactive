const formulario = document.getElementById("formulario");
const entrada = document.getElementById("entrada");
const lista = document.getElementById("lista");

let tareas = [];

const iconoBasura = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <polyline points="3 6 5 6 21 6"/>
  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
  <path d="M10 11v6M14 11v6"/>
  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
</svg>`;

function mostrarTareas() {
  lista.innerHTML = "";

  if (tareas.length === 0) {
    lista.innerHTML = '<li class="vacio">No hay tareas todavía</li>';
    return;
  }

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.className = "tarea" + (tarea.completada ? " completada" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = tarea.completada;
    check.addEventListener("change", () => {
      tarea.completada = check.checked;
      mostrarTareas();
    });

    const texto = document.createElement("span");
    texto.className = "texto";
    texto.textContent = tarea.texto; // textContent evita inyección de HTML

    const btn = document.createElement("button");
    btn.className = "btn-eliminar";
    btn.setAttribute("aria-label", "Eliminar tarea");
    btn.innerHTML = iconoBasura;
    btn.addEventListener("click", () => {
      tareas = tareas.filter((t) => t.id !== tarea.id);
      mostrarTareas();
    });

    li.append(check, texto, btn);
    lista.appendChild(li);
  });
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = entrada.value.trim();
  if (texto === "") return;

  tareas.push({ id: Date.now(), texto, completada: false });
  entrada.value = "";
  entrada.focus();
  mostrarTareas();
});

mostrarTareas();