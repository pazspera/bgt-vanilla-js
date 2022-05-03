const d = document;
const $gameList = d.getElementById("game-list");
const $btnAgregarJuego = d.getElementById("btn-agregar-juego");
const $fieldAgregarJuego = d.getElementById("field-agregar-juego");
const $selectJugadores = d.getElementById("jugadores");
const $fieldAgregarJugadores = d.getElementById("field-agregar-jugadores");
const $selectPlayerWinner = d.getElementById("players-list-winner");
const $btnConfirmarJugadores = d.createElement("button");
const $btnSubmit = d.getElementById("btn-submit");
let jugadoresEnPartida = [];

const URL_GAMES = "http://localhost:3000/games";
const URL_PLAYERS = "http://localhost:3000/players";

// Recuperar juegos disponibles de games.json
fetch(URL_GAMES, {
  method: "GET",
})
  .then((res) => {
    // console.log(res);
    return res.ok ? res.json() : Promise.reject(res);
    // envía la respuesta al otro then en formato json si la respuesta da ok true
    // si no está ok, fuerza a que se ejecute el catch rechazando la promesa
    // si no ponemos el rechazo de la promesa, no se ejecuta el catch aunque haya error
  })
  .then((json) => {
    // console.log(json);
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


// Cuando cambia la cantidad de jugadores elegidos, crear esa cantidad de campos para elegir jugadores
// El fetch iría dentro del for que genera los campos
// También revisa cuando cambia el select de ganadores para activar btn de guardar partida
d.addEventListener("change", (e) => {
  if (e.target.matches("#jugadores")) {
    // borrar contenido de $fieldAgregarJugadores para evitar campos duplicados
    $fieldAgregarJugadores.textContent = "";

    let cantidadJugadores = $selectJugadores.value;

    // con un for, crear los campos de cada jugador
    // dentro del for, hacer una petición fetch para recuperar jugadores de players.json
    for (let i = 0; i < cantidadJugadores && i < 6; i++) {
      // console.log(`Jugador #${i + 1}`);
      // Crear input para jugador
      const $fragment = d.createDocumentFragment();
      const $select = d.createElement("select");
      const $label = d.createElement("label");

      $label.classList.add("form-label");
      $label.for = `jugador${i}`;
      $label.innerHTML = `Jugador #${i + 1}`;
      $fragment.appendChild($label);

      $select.classList.add("form-select", "mb-3", "select-jugadores");
      $select.id = `jugador${i}`;

      // petición fetch para recuperar la lista de jugadores
      fetch(URL_PLAYERS, {
        method: "GET",
      })
        .then((res) => {
          // console.log(res);
          return res.ok ? res.json() : Promise.reject(res);
          // envía la respuesta al otro then en formato json si la respuesta da ok true
          // si no está ok, fuerza a que se ejecute el catch rechazando la promesa
          // si no ponemos el rechazo de la promesa, no se ejecuta el catch aunque haya error
        })
        .then((json) => {
          // console.log(json);
          const $fragment = d.createDocumentFragment();

          // genera opción default antes de recuperar players
          const $optionDefault = d.createElement("option");
          $optionDefault.selected;
          $optionDefault.innerHTML = "Abrir menu para ver jugadores disponibles";
          $fragment.appendChild($optionDefault);

          // recorre el json y crea un option por cada jugador disponible
          json.forEach((player) => {
            const $option = d.createElement("option");
            $option.value = player.id;
            $option.textContent = player.name;
            $fragment.appendChild($option);
          });
          $select.appendChild($fragment);

          /* // agrega event listener a cada select para que on change se agreguen a jugadoresEnPartida[]
          $select.addEventListener("change", (e) => {
            console.log("cambió el select");
            jugadoresEnPartida.push($select.value);
            console.log(jugadoresEnPartida);
          }); */
        })
        .finally(() => {
          // crea un btn para confirmar los jugadores elegidos una vez que se generan todos los inputs
          // recupera el valor de todos los select y los guarda en jugadoresEnPartida[]
          // para usar esos datos para crear el select para elegir ganadores
          $btnConfirmarJugadores.classList.add("btn", "btn__secondary");
          $btnConfirmarJugadores.id = "btn-confirmar-jugadores";
          $btnConfirmarJugadores.textContent = "Confirmar jugadores";
        })
        .catch((err) => {
          console.log("Error desde catch");
          let message = err.statusText || "Ocurrió un error";
          console.log(message);
        });

      // agregar al DOM
      $fragment.appendChild($select);
      $fragment.appendChild($btnConfirmarJugadores);
      $fieldAgregarJugadores.appendChild($fragment);
    }
  }

  // Cuando cambia el select de #players-list-winner, saca el disabled del btn para guardar partida
  if (e.target.matches("#players-list-winner")) {
    $btnSubmit.removeAttribute("disabled");
  }
});
