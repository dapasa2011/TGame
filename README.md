# TGame

Motor de juegos en JavaScript puro que dibuja el escenario como texto plano: cada objeto del
juego se representa con un carácter dentro de un elemento `<pre>`. Sin dependencias, sin
empaquetador y sin paso de compilación.

## Demo

Abre [`demo/index.html`](demo/index.html) directamente en el navegador (funciona con `file://`,
no hace falta servidor). Mueve el objeto `O` con las flechas del teclado.

## Uso

La librería se carga con etiquetas `<script>` y expone constructores globales. El orden importa:

```html
<script src="../src/TInput.js"></script>
<script src="../src/TScreen.js"></script>
<script src="../src/TGameObject.js"></script>
<script src="../src/TGame.js"></script>
```

Un juego mínimo:

```js
// La página debe definir estos globales que usa el motor
var output = document.getElementById('output'); // lectura de depuración de los ejes
var stageParams = {
	width: 900,       // ancho del escenario en píxeles
	height: 600,      // alto del escenario en píxeles
	frameRate: 1000 / 25, // retardo del bucle en milisegundos (no FPS)
	hPixels: 126,     // columnas de caracteres
	vPixels: 46       // filas de caracteres
};

var game = new TGame(document.body, stageParams);

var dot = new TGameObject(450, 300);
dot.onUpdate = function (g) {
	this.position.x += g.getInput().getAxis('H') * 10;
	this.position.y += g.getInput().getAxis('V') * 10;
};

game.onStart = function () {
	game.appendChild(dot);
};

game.init();
```

`TGame` crea su propio `<pre>` (`stageElement`), no se pasa desde fuera. El constructor no arranca
nada: hay que llamar a `init()`, que ejecuta `onStart` y comienza el bucle.

## API

### `new TGame(container, options)`

- `container`: elemento HTML donde se inserta el escenario.
- `options`: `width`, `height`, `hPixels`, `vPixels` y `frameRate` (retardo en ms).
- `init()`: arranca el juego.
- `onStart()`: se ejecuta una vez antes del primer fotograma.
- `appendChild(obj)`: registra un `TGameObject` y le asigna `obj.game`; solo estos objetos se
  actualizan y se dibujan.
- `getChildren()`: lista de objetos registrados.
- `getInput()`: instancia de `TInput`.
- `horPixelsToLetters(px)` / `verPixelsToLetters(px)`: convierten píxeles del escenario a
  columna/fila de la rejilla de caracteres.

### `new TGameObject(x, y)`

- `position`: `{ x, y }` en píxeles del escenario.
- `getShape()`: carácter con el que se dibuja (por defecto `'O'`); debe ser un solo carácter.
- `onUpdate(game)`: lógica por fotograma; se sobrescribe en cada objeto.

### `TInput` y ejes

`TInput` escucha `keydown`/`keyup` en `document` y agrupa teclas en ejes. Por defecto `TGame`
registra los ejes `"H"` (flecha derecha/izquierda) y `"V"` (flecha abajo/arriba). Los valores
van de -1 a 1 y se suavizan 0.1 por fotograma; `getAxis('H')` devuelve el valor actual.

```js
game.getInput().registerAxis(new InputAxis('H', new KeyObject('ArrowRight'), new KeyObject('ArrowLeft')));
```

## Estado del proyecto

Prototipo en desarrollo. No hay tests, lint ni build automatizados; la verificación es manual
recargando la demo.

## Licencia

GNU General Public License v3.0. Consulta [`LICENSE`](LICENSE).
