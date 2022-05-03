const d = document;
const $crudTitle = d.getElementById("crud-title");
const $crudForm = d.getElementById("crud-form");
const $crudTable = d.getElementById("crud-table");
const $crudTableContent = d.getElementById("crud-table-content");
const $inputName = d.getElementById("name");

const URL_PLAYERS = "http://localhost:3000/players";

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
      $td.classList.add("align-middle");

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
      $btnEliminar.dataset.name = player.name;
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

d.addEventListener("submit", (e) => {
  if (e.target === $crudForm) {
    e.preventDefault();
    // revisa si el input tiene un dataset.id != a null
    // si tiene un número, es put
    // si es null, es post

    if (!$inputName.dataset.id) {
      // POST agregar
      fetch(URL_PLAYERS, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: $inputName.value,
        }),
      }).catch((err) => {
        let message = err.statusText || "Ocurrió un error";
        $gameCrudForm.insertAdjacentHTML("afterend", `<p>${message}<p>`);
      });
    } else {
      // PUT editar
      fetch(`${URL_PLAYERS}/${$inputName.dataset.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: $inputName.value,
        }),
      }).catch((err) => {
        let message = err.statusText || "Ocurrió un error";
        $gameCrudForm.insertAdjacentHTML("afterend", `<p>${message}<p>`);
      });
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    e.preventDefault();
    // transfiere la info del btn .edit al input game-name
    $crudTitle.innerHTML = "Editar jugador";
    $inputName.dataset.id = e.target.dataset.id;
    $inputName.dataset.name = e.target.dataset.name;
    $inputName.value = e.target.dataset.name;
    // $gameName.value = e.dataset.id;
    // console.log(`dataset.id = ${e.dataset.id}`);
  }

  if (e.target.matches(".delete")) {
    e.preventDefault();
    $crudTitle.innerHTML = "Eliminar jugador";

    let isDelete = confirm(`¿Querés eliminar el jugador ${e.target.dataset.id} - ${e.target.dataset.name}?`);

    if (isDelete) {
      fetch(`${URL_PLAYERS}/${e.target.dataset.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
      }).catch((err) => {
        let message = err.statusText || "Ocurrió un error";
        $gameCrudForm.insertAdjacentHTML("afterend", `<p>${message}<p>`);
      });
    }
  }

  if (e.target.matches(".reset")) {
    e.preventDefault();
    $crudTitle.innerHTML = "Agregar jugador";
    // hace que los data atributes del input game-name vuelvan a null para poder validar
    // si enviamos una petición post o put al submit
    $inputName.dataset.id = "";
    $inputName.dataset.name = "";
    $inputName.value = "";
  }
});
