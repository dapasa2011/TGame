# AGENTS.md

Motor de juego en JavaScript puro que dibuja un escenario de juego como caracteres dentro de un `<pre>`.
No hay gestor de paquetes, empaquetador, tests, lint ni comprobación de tipos. La única
"compilación" verificable es cargar `demo/index.html`.

## Ejecutar / verificar

- Abre `demo/index.html` directamente en un navegador (`file://` funciona; no hace falta servidor).
- No existe ningún comando de test, lint ni build automatizado. Verifica los cambios recargando
  la demo y comprobando el movimiento con teclado del objeto `O`.
- Cualquier archivo nuevo en `src/` también debe añadirse como `<script>` en `demo/index.html`
  respetando el orden de dependencias. Todo es global; no se importa ni exporta nada.

## Orden de carga y globales (fácil de romper)

El orden de scripts en la demo es `TInput.js` -> `TScreen.js` -> `TGameObject.js` -> `TGame.js`.
`TGame` instancia `TScreen`/`TInput`, y `TInput.js` define los globales `KeyObject`
e `InputAxis` que usa `TGame`.

Hay dos globales que el código del motor necesita pero que define la página, no la librería:

- `stageParams` — lo usan `TGame.horPixelsToLetters` / `verPixelsToLetters` (leen el
  global en lugar de `this.params`). Sin él, el dibujado lanza una excepción.
- `output` — lo escribe `TInput.update` como lectura de depuración de los valores de los ejes.

Un juego se monta así: `new TGame(container, params)` -> opcional `game.onStart` ->
`game.appendChild(obj)` -> `game.init()` (el constructor no arranca el bucle).

## Comportamiento real que conviene saber

- `params.frameRate` es en realidad un retardo de `setTimeout` en milisegundos (la demo pasa
  `1000 / 25`), no fotogramas por segundo. El bucle usa `setTimeout`, nunca `requestAnimationFrame`.
- `params.width`/`height` son píxeles del escenario para la caja `<pre>`; `hPixels`/`vPixels` son la
  rejilla de caracteres. Las posiciones de los objetos son píxeles de escenario y se convierten a
  celdas de caracteres al dibujar.
- Solo los objetos añadidos con `game.appendChild` reciben `obj.game` y se actualizan/dibujan.
- `TInput` registra listeners de `keydown`/`keyup` en `document` por instancia y nunca los elimina;
  los nombres son valores DOM de `e.key` (`"ArrowLeft"`), no `keyCode`. Los ejes por defecto son
  `"H"` y `"V"`; los valores de eje suben/bajan de 0.1 en 0.1 hacia -1/1 y decaen al soltar.
- `TScreen` parchea `String.prototype.replaceAt` y asume que `getShape()` de cada objeto
  devuelve un único carácter.
- El renderizado limpia y reconstruye toda la pantalla en cada fotograma; `stageElement` lo crea
  `TGame`, no se pasa desde fuera.

## Convenciones

- Los comentarios, el README y los mensajes de commit están en español; mantén eso.
- El estilo son funciones constructoras tipo ES5 con `var`, tabulaciones para indentar y
  globales mutables. Sigue ese estilo en lugar de introducir módulos, clases o un paso de build.
- Flujo de ramas visto en el historial: las ramas `feature/*` se fusionan en `develop`; `master`
  es la rama de publicación.
