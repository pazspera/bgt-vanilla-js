const d = document;
const $crudTitle = d.getElementById("crud-title");
const $crudForm = d.getElementById("crud-form");
const $crudTable = d.getElementById("crud-table");
const $crudTableContent = d.getElementById("crud-table-content");

const URL_PLAYERS = "./data/players.json";

fetch(URL_PLAYERS, {
  method: "GET",
})
  .then((res) => {
    console.log(res);
    return res.ok ? res.json() : Promise.reject(res);
    // envía la respuesta al otro then en formato json si la respuesta da ok true
    // si no está ok, fuerza a que se ejecute el catch rechazando la promesa
    // si no ponemos el rechazo de la promesa, no se ejecuta el catch aunque haya error
  })
  .then((json) => {
    console.log(json);
    const $fragment = d.createDocumentFragment();
    // recorre el json y crea un tr por cada juego
    json.forEach((player) => {
      // crea una fila en la tabla por juego
      const $tr = d.createElement("tr");
      const $td = d.createElement("td");
      $td.textContent = player.name;

      // crea btn para editar
      const $td2 = d.createElement("td");

      const $btnEditar = d.createElement("button");
      $btnEditar.classList.add("edit", "btn", "btn__secondary", "me-3");
      $btnEditar.textContent = "Editar";
      // data attributes
      $btnEditar.dataset.id = player.id;
      $btnEditar.dataset.name = player.name;
      $td2.appendChild($btnEditar);

      // crea btn para eliminar
      const $btnEliminar = d.createElement("button");
      $btnEliminar.classList.add("delete", "btn", "btn__secondary");
      $btnEliminar.textContent = "Eliminar";
      // data attributes
      $btnEliminar.dataset.id = player.id;
      $td2.appendChild($btnEliminar);

      $tr.appendChild($td);
      $tr.appendChild($td2);
      $fragment.appendChild($tr);
    });

    $crudTableContent.appendChild($fragment);
  })
  .catch((err) => {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  });

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    e.preventDefault();
    console.log("hola soy .edit");
    console.log(e);
    console.log($crudTitle.innerHTML);
    $crudTitle.innerHTML = "Editar jugador";
    // $gameName.value = e.dataset.id;
    // console.log(`dataset.id = ${e.dataset.id}`);
  }

  if (e.target.matches(".delete")) {
    e.preventDefault();
    $crudTitle.innerHTML = "Eliminar jugador";
  }

  if (e.target.matches(".add")) {
    e.preventDefault();
    $crudTitle.innerHTML = "Agregar jugador";
  }
});
