const d = document;
const $gameList = d.getElementById("game-list");
const $fragment = d.createDocumentFragment();

const URL_GAMES = "./data/games.json";

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
