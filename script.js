const ramos = {
  'Comunicación Gráfica': ['Dibujo I', 'Geometría Descriptiva'],
  'Diseño I': ['Diseño II'],
  'Historia I': ['Historia II'],
  'Teoría I': ['Teoría II'],
  'Matemática aplicada': ['Estructura'],
  'Métodos de Estudio': ['Metodología de la Investigación'],
  'Dibujo I': ['Dibujo II'],
  'Diseño II': ['Diseño III'],
  'Historia II': ['Historia III'],
  'Teoría II': ['Teoría III'],
  'Construcción': ['Construcción y Diseño Estructural I'],
  'Dibujo II': ['Dibujo III'],
  'Diseño III': ['Diseño IV'],
  'Historia III': ['Historia IV'],
  'Construcción y Diseño Estructural I': ['Construcción y Diseño Estructural II', 'Instalaciones', 'Topografía y Agrimensura'],
  'Dibujo III': ['Dibujo IV', 'Urbanismo II'],
  'Diseño IV': ['Diseño V'],
  'Historia IV': ['Electiva de Historia'],
  'Urbanismo I': ['Urbanismo II'],
  'Construcción y Diseño Estructural II': ['Construcción y Diseño Estructural III', 'Costos y Presupuestos', 'Electiva de Tecnología I'],
  'Dibujo IV': ['Diseño por computador'],
  'Diseño V': ['Diseño VI', 'Urbanismo III'],
  'Instalaciones': ['Electiva de Tecnología I'],
  'Urbanismo II': ['Urbanismo III'],
  'Construcción y Diseño Estructural III': ['Administración de la Construcción', 'Construcción y Diseño Estructural IV'],
  'Costos y Presupuestos': ['Administración de la Construcción'],
  'Diseño VI': ['Diseño VII', 'Electiva de Urbanismo I', 'Urbanismo IV'],
  'Urbanismo III': ['Electiva de Urbanismo I', 'Urbanismo IV'],
  'Construcción y Diseño Estructural IV': ['Práctica Profesional', 'Electiva de Tecnología II', 'Seminario Electivo I'],
  'Diseño VII': ['Diseño VIII', 'Urbanismo V'],
  'Electiva de Urbanismo I': ['Electiva de Urbanismo II'],
  'Urbanismo IV': ['Urbanismo V'],
  'Diseño VIII': ['Diseño IX', 'Electiva de Proyecto I', 'Presentación de Proyectos I'],
  'Electiva de Urbanismo II': ['Electiva de Urbanismo III'],
  'Electiva de Contexto I': ['Electiva de Contexto II'],
  'Diseño IX': ['Diseño X', 'Electiva de Proyecto II', 'Presentación de Proyectos II'],
  'Electiva de Proyecto I': ['Electiva de Proyecto II'],
  'Electiva de Tecnología II': ['Electiva de Tecnología III'],
  'Electiva de Urbanismo III': ['Electiva de Urbanismo IV'],
  'Presentación de Proyectos I': ['Presentación de Proyectos II'],
  'Seminario Electivo I': ['Seminario Electivo II'],
  'Electiva de Contexto II': ['Electiva de Contexto III']
};

const malla = document.getElementById('malla');
const estadoRamos = {};

function crearRamo(nombre) {
  const div = document.createElement('div');
  div.className = 'ramo';
  div.textContent = nombre;
  div.onclick = () => aprobarRamo(nombre, div);
  malla.appendChild(div);
  estadoRamos[nombre] = { aprobado: false, bloqueado: false, div };
}

function aprobarRamo(nombre, div) {
  if (estadoRamos[nombre].aprobado) return;

  estadoRamos[nombre].aprobado = true;
  div.classList.add('aprobado');

  if (ramos[nombre]) {
    ramos[nombre].forEach(hijo => {
      const hijoEstado = estadoRamos[hijo];
      if (hijoEstado) {
        hijoEstado.div.classList.remove('bloqueado');
        hijoEstado.bloqueado = false;
      }
    });
  }
}

function inicializarMalla() {
  const todosLosRamos = new Set([...Object.keys(ramos), ...Object.values(ramos).flat()]);
  todosLosRamos.forEach(nombre => crearRamo(nombre));

  for (const [padre, hijos] of Object.entries(ramos)) {
    hijos.forEach(hijo => {
      const hijoEstado = estadoRamos[hijo];
      if (hijoEstado) {
        hijoEstado.div.classList.add('bloqueado');
        hijoEstado.bloqueado = true;
      }
    });
  }
}

inicializarMalla();

