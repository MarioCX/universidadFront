let alumns = [];
let profesors = [];

function fetchMaterias() {
  fetch("https://universidad-backend.onrender.com/getMaterias")
    .then((response) => response.json())
    .then((data) => {
      let option = data.materias.map(
        (item) => `<option value="${item.materia}">${item.materia}</option>`
      );
      document.getElementById("selecter-materias").innerHTML = option;
    });
}

fetchMaterias();

fetch("https://universidad-backend.onrender.com/obtenerAlumnos")
  .then((response) => response.json())
  .then((data) => {
    alumns = data.alumnos;
    console.log(alumns);
    showAlumnos(alumns);
  })
  .catch((error) => console.log(error));

function showAlumnos(array) {
  const table = document.getElementById("listStudents");
  const modal = document.getElementById("containerModal");
  let tableContent;

  array.forEach((item, index) => {
    tableContent += ` <tr>
            <td scop="row" class="table-background">${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.boleta}</td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarAlumno('${item.id}')">Eliminar</button></td>
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${item.id}">Detalle del Alumno
            </button></td>
         </tr>`;

    modal.innerHTML += `<div class="modal fade" id='${item.id}' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered">
           <div class="modal-content">
             <div class="modal-header">
               <h1 class="modal-title fs-5" id="exampleModalLabel">${item.name}</h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
             <p>email: ${item.email}</p>
               <p>Boleta: ${item.boleta}</p>
               <p>Materia: ${item.materias[0].name}</p>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
             </div>
           </div>
         </div>
       </div>`;
  });
  table.innerHTML = tableContent;
}

function eliminarAlumno(id) {
  fetch(`https://universidad-backend.onrender.com/borrarAlumno/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        document.getElementById("listStudents").innerHTML = "";
        showAlumnos(data.alumnosFilter);
        alert("Alumno eliminado");
      } else {
        alert("Alumno no eliminado");
      }
    })
    .catch((error) => console.log(error));
}

fetch("https://universidad-backend.onrender.com/obtenerProfesor")
  .then((response) => response.json())
  .then((data) => {
    profesors = data.profesores;
    console.log(profesors);
    showProfesores(profesors);
  })
  .catch((error) => console.log(error));

function showProfesores(array) {
  const table = document.getElementById("listProfesors");
  const modal = document.getElementById("containerModalProfesor");
  let tableContent;

  array.forEach((item, index) => {
    tableContent += ` <tr>
    <td scop="row" class="table-background">${item.id}</td>
    <td>${item.nombre}</td>
    <td>${item.campus}</td>
    <td>${item.facultad}</td>
    <td><button type="button" class="btn btn-danger" onclick="eliminarProfesor('${item.id}')">Eliminar Profesor</button></td>
    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${item.id}">Detalle del Profesor
    </button></td>
 </tr>`;

    modal.innerHTML += `<div class="modal fade" id='${item.id}' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${item.nombre}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <p>Campus: ${item.campus}</p>
          <p>Facultad: ${item.facultad}</p>
          <p>Materia: ${item.materia}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  });
  table.innerHTML = tableContent;
}

function eliminarProfesor(id) {
  fetch(`https://universidad-backend.onrender.com/borrarProfesor/${id}`,{
    method: "DELETE",
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.status) {
      document.getElementById("listProfesors").innerHTML = "";
      showProfesores(data.profesoresFilter);
      alert("Profesor eliminado");
    } else {
      alert("Profesor eliminado");
    }
  })
  .catch((error) => console.log(error));
}

function loginToStudent() {
  const sectionStudent = document.getElementById("alumnos");
  const sectionProfessors = document.getElementById("profesores");
  const login = document.getElementById("login")

  sectionProfessors.style.display = "none";
  sectionStudent.style.display = "block"; // Opcional, si deseas mostrar la sección de estudiantes
  login.style.display = "none";

}
function loginToProfesors() {
  const sectionStudent = document.getElementById("alumnos");
  const sectionProfessors = document.getElementById("profesores");
  const login = document.getElementById("login")

  login.style.display = "none"
  sectionProfessors.style.display = "block"; 
  sectionStudent.style.display = "none";
}
function loginStudent() {
  const loginStudent = document.getElementById("loginAlumnos")
  const loginProfesor = document.getElementById("loginProfesores")

  loginStudent.style.display = "block"
  loginProfesor.style.display = "none"
}
function loginProfesor() {
  const loginStudent = document.getElementById("loginAlumnos")
  const loginProfesor = document.getElementById("loginProfesores")

  loginProfesor.style.display = "block"
  loginStudent.style.display = "none"
}
function cerrarSesion() {
  const sectionStudent = document.getElementById("alumnos");
  const sectionProfessors = document.getElementById("profesores");
  const loginStudent = document.getElementById("login")

  loginStudent.style.display = "flex"
  sectionProfessors.style.display = "none"; 
  sectionStudent.style.display = "none";
}