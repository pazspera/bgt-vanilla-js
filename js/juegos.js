/* 
    1. Recuperar todos los juegos del json y pintarlos en una tabla on DOMContentLoaded

*/

const d = document;
const $gameCrudTableContent = d.getElementById("game-crud-table-content");
const $gameCrudTitle = d.getElementById("game-crud-title");
console.log($gameCrudTitle);
const $gameName = d.getElementById("game-name");
console.log($gameName);
const URL_GAMES = "./data/games.json";

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

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    e.preventDefault();
    console.log("hola soy .edit");
    console.log(e);
    console.log($gameCrudTitle.innerHTML);
    $gameCrudTitle.innerHTML = "Editar juego";
    // $gameName.value = e.dataset.id;
    // console.log(`dataset.id = ${e.dataset.id}`);
  }

  if (e.target.matches(".delete")) {
    e.preventDefault();
    $gameCrudTitle.innerHTML = "Eliminar juego";
  }
});
