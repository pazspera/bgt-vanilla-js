const d = document;
const $gameList = d.getElementById("game-list");
const $btnAgregarJuego = d.getElementById("btn-agregar-juego");
const $fieldAgregarJuego = d.getElementById("field-agregar-juego");
const $selectJugadores = d.getElementById("jugadores");
const $fieldAgregarJugadores = d.getElementById("field-agregar-jugadores");

const URL_GAMES = "./data/games.json";
const URL_PLAYERS = "./data/players.json";

// Recuperar juegos disponibles de games.json
fetch(URL_GAMES, {
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
    // recorre el json y crea un option por cada juego disponible
    json.forEach((game) => {
      const $option = d.createElement("option");
      $option.value = game.id;
      $option.innerHTML = game.name;
      $fragment.appendChild($option);
    });
    $gameList.appendChild($fragment);
  })
  .catch((err) => {
    console.log("Error desde catch");
    let message = err.statusText || "Ocurrió un error";
    console.log(message);
  });

// Al hacer click en $btnAgregarJuego se generan los inputs para agregar nuevo juego
d.addEventListener("click", (e) => {
  // Agrega inputs para agregar nuevo juego
  if (e.target.matches("#btn-agregar-juego")) {
    e.preventDefault();
    // Borra contenido de $fieldAgregarJuego para evitar que se generen campos duplicados
    $fieldAgregarJuego.textContent = "";

    console.log("estoy haciendo click en el btn agregar juego");
    // Crear input y btn de aceptar
    const $fragment = d.createDocumentFragment();
    const $label = d.createElement("label");
    const $input = d.createElement("input");
    const $aceptarBtn = d.createElement("button");

    // Label
    $label.classList.add("form-label");
    $label.for = "nuevo-juego";
    $label.innerHTML = "Nombre del nuevo juego";
    $fragment.appendChild($label);

    // Input
    $input.type = "text";
    $input.classList.add("form-control", "mb-3");
    $input.id = "nuevo-juego";
    $fragment.appendChild($input);

    // Btn
    $aceptarBtn.id = "guardar-juego-nuevo-btn";
    $aceptarBtn.classList.add("btn", "btn__secondary");
    $aceptarBtn.innerHTML = "Aceptar";
    $fragment.appendChild($aceptarBtn);

    // Agregar fragmento al DOM
    $fieldAgregarJuego.appendChild($fragment);
  }

  // Impide que #guardar-juego-nuevo-btn refresque la página
  if (e.target.matches("#guardar-juego-nuevo-btn")) {
    e.preventDefault();
    // Borra los campos de nuevo juego para simular que se agregó el nuevo juego al select
    $fieldAgregarJuego.textContent = "";
  }
});

// Cuando cambia la cantidad de jugadores elegidos, crear esa cantidad de campos para elegir jugadores
// El fetch iría dentro del for que genera los campos
d.addEventListener("change", (e) => {
  if (e.target.matches("#jugadores")) {
    // borrar contenido de $fieldAgregarJugadores para evitar campos duplicados
    $fieldAgregarJugadores.textContent = "";

    let cantidadJugadores = $selectJugadores.value;

    // con un for, crear los campos de cada jugador
    // dentro del for, hacer una petición fetch para recuperar jugadores de players.json
    for (let i = 0; i < cantidadJugadores && i < 6; i++) {
      console.log(`Jugador #${i + 1}`);
      // Crear input para jugador
      const $fragment = d.createDocumentFragment();
      const $select = d.createElement("select");
      const $label = d.createElement("label");

      $label.classList.add("form-label");
      $label.for = `jugador${i}`;
      $label.innerHTML = `Jugador #${i + 1}`;
      $fragment.appendChild($label);

      $select.classList.add("form-select", "mb-3");
      $select.id = `jugador${i}`;

      // petición fetch para recuperar la lista de jugadores
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

          // genera opción default antes de recuperar players
          const $optionDefault = d.createElement("option");
          $optionDefault.selected;
          $optionDefault.innerHTML = "Abrir menu para ver jugadores disponibles";
          $fragment.appendChild($optionDefault);

          // recorre el json y crea un option por cada juego disponible
          json.forEach((player) => {
            const $option = d.createElement("option");
            $option.value = player.id;
            $option.innerHTML = player.name;
            $fragment.appendChild($option);
          });
          $select.appendChild($fragment);
        })
        .catch((err) => {
          console.log("Error desde catch");
          let message = err.statusText || "Ocurrió un error";
          console.log(message);
        });

      // agregar al DOM
      $fragment.appendChild($select);
      $fieldAgregarJugadores.appendChild($fragment);
    }
  }
});
