/* 
    1. Recuperar todos los juegos del json y pintarlos en una tabla on DOMContentLoaded

*/

const d = document;
const $gameCrudTableContent = d.getElementById("game-crud-table-content");
const $gameCrudTitle = d.getElementById("game-crud-title");
const $gameName = d.getElementById("game-name");
const $gameCrudForm = d.getElementById("game-crud-form");
console.log($gameCrudForm);
const URL_GAMES = "http://localhost:3000/games";

// Get all games
fetch(URL_GAMES, {
  method: "GET",
})
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(res);
    // envía la respuesta al otro then en formato json si la respuesta da ok true
    // si no está ok, fuerza a que se ejecute el catch rechazando la promesa
    // si no ponemos el rechazo de la promesa, no se ejecuta el catch aunque haya error
  })
  .then((json) => {
    console.log(json);
    const $fragment = d.createDocumentFragment();
    // recorre el json y crea un tr por cada juego
    json.forEach((game) => {
      // crea una fila en la tabla por juego
      const $tr = d.createElement("tr");
      const $td = d.createElement("td");
      $td.textContent = game.name;

      // crea btn para editar
      const $td2 = d.createElement("td");

      const $btnEditar = d.createElement("button");
      $btnEditar.classList.add("edit", "btn", "btn__secondary", "me-3");
      $btnEditar.textContent = "Editar";
      // data attributes
      $btnEditar.dataset.id = game.id;
      $btnEditar.dataset.name = game.name;
      $td2.appendChild($btnEditar);

      // crea btn para eliminar
      const $btnEliminar = d.createElement("button");
      $btnEliminar.classList.add("delete", "btn", "btn__secondary");
      $btnEliminar.textContent = "Eliminar";
      // data attributes
      $btnEliminar.dataset.id = game.id;
      $td2.appendChild($btnEliminar);

      $tr.appendChild($td);
      $tr.appendChild($td2);
      $fragment.appendChild($tr);
    });

    $gameCrudTableContent.appendChild($fragment);
  })
  .catch((err) => {
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  });

d.addEventListener("submit", (e) => {
  if (e.target === $gameCrudForm) {
    e.preventDefault();
    console.log("submit");
    // revisa si el input tiene un dataset.id != a null
    // si tiene un número, es put
    // si es null, es post
    console.log($gameName.dataset.id);

    if (!$gameName.dataset.id) {
      console.log(`${$gameName.dataset.id} no tiene id`);
      // POST agregar
      fetch(URL_GAMES, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: $gameName.value,
        })
      }).catch(err => {
        let message = err.statusText || "Ocurrió un error";
        $gameCrudForm.insertAdjacentHTML("afterend", `<p>${message}<p>`);
      });
    } else {
      console.log(`${$gameName.dataset.id} tiene id`);
      // PUT editar juego
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    // Al hacer click en editar, se carga la info de id y name del btn .edit en el input game-name

    e.preventDefault();
    console.log("hola soy .edit");
    console.log(e);
    console.log($gameCrudTitle.innerHTML);
    $gameCrudTitle.innerHTML = "Editar juego";
    // $gameName.value = e.dataset.id;
    console.log(`dataset.id = ${e.target.dataset.id}`);
    console.log(`dataset.name = ${e.target.dataset.name}`);
    // transfiere la info del btn .edit al input game-name
    $gameName.dataset.id = e.target.dataset.id;
    $gameName.dataset.name = e.target.dataset.name;
    $gameName.value = e.target.dataset.name;
  }

  if (e.target.matches(".delete")) {
    e.preventDefault();
    $gameCrudTitle.innerHTML = "Eliminar juego";
  }

  if (e.target.matches(".add")) {
    e.preventDefault();
    $gameCrudTitle.innerHTML = "Agregar juego";
    // hace que los data atributes del input game-name vuelvan a null para poder validar
    // si enviamos una petición post o put al submit
    $gameName.dataset.id = "";
    $gameName.dataset.name = "";
    $gameName.value = "";
  }
});
