# Board Game Tracker

## Versión 1

El formulario de agregar partida permite seleccionar campos para agregar nueva partida y también agregar nuevos jugadores y juegos. Esta funcionalidad está simulada.

Sería muy confuso mantener todo junto, además de tener que hacer muchas peticiones fetch. Para simplificar, en la versión 2 voy a separar juegos y jugadores para que se pueda agregar, editar y eliminar desde sus páginas dedicadas. En agregar partida solo se van a poder seleccionar los campos para guardar partidas.

## Versión 2 (Actual)

Instalé JSON Server para tener la API con jugadores y juegos.

Comando para iniciar JSON Server:

`json-server --watch data/db.json`

Ir a [http://localhost:3000/](http://localhost:3000/) para consultar API.

- Creé páginas para jugadores y juegos
- Armé el crud para agregar, editar y eliminar jugadores y juegos
- En agregar-partida.html hice que los btn de agregar jugador y agregar juego van a sus respectivas páginas

Para la próxima versión quiero implementar:

- Guardar los datos del form agregar-partida en local storage para evitar pérdida de datos y tiempo si agregamos juego o jugador
- Hacer funcional el formulario de agregar-partida
- Recuperar en el index todas las partidas guardadas e imprimirlas como cards