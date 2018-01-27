/**
 * Crea el juego
 * @param {HTMLElement} container Elemento del documento HTML que contendrá el juego
 * @param {object}      options   Opciones de configuración del juego.
 */
function TGame(container, options) {
	console.log("Configuración del juego");
	this.params = options;

	// Crear el marco de juego
	// FUTURE: Configurar aspecto del marco
	this.stageElement = document.createElement('pre');
	var stageStyle = {
		outline: '1px dotted rgb(30,30,30)',
		position: 'absolute',
		width: this.params.width + 'px',
		height: this.params.height + 'px',
		top: '50%',
		left: '50%',
		marginLeft: '-' + (this.params.width / 2) + 'px',
		marginTop: '-' + (this.params.height / 2) + 'px',
		fontFamily: 'monospace',
		lineHeight: '1.05em'
	}
	for (var st in stageStyle) {
		//console.log()
		this.stageElement.style[st] = stageStyle[st];
	}
	container.appendChild(this.stageElement);

	var _screen;

	/// Antes del primer frame ///
	var _init = function (g) {
		// TODO: Colocar los elementos del juego
		console.log('Colocar los elementos del juego');
		console.log(g);
		_screen = new TScreen(g);

		_loop();
	}

	var _loop = function () {
		// TODO: Entradas del usuario
		// TODO: Lógica del juego
		// TODO: Dibujar pantalla
		_screen.draw();
	}

	// Ponemos el juego en marcha
	_init(this);
}
