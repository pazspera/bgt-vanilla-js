# Board Game Tracker

## Versión 1

El formulario de agregar partida permite seleccionar campos para agregar nueva partida y también agregar nuevos jugadores y juegos. Esta funcionalidad está simulada.

Sería muy confuso mantener todo junto, además de tener que hacer muchas peticiones fetch. Para simplificar, en la versión 2 voy a separar juegos y jugadores para que se pueda agregar, editar y eliminar desde sus páginas dedicadas. En agregar partida solo se van a poder seleccionar los campos para guardar partidas.

## Versión 2 (Actual)

Instalé JSON Server para tener la API con players y games. 

Comando para iniciar JSON Server:

`json-server --watch db.json`

Ir a [http://localhost:3000/](http://localhost:3000/) para consultar API. 
