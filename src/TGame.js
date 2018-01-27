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

	var _childs = [];

	this.appendChild = function (child) {
		_childs.push(child);
	}

	this.getChildren = function () {
		return _childs;
	}

	this.onStart = function () {

	}

	/// Antes del primer frame ///
	var _init = function (g) {
		// TODO: Colocar los elementos del juego
		console.log('Colocar los elementos del juego');
		console.log(g);
		_screen = new TScreen(g);

		g.onStart();

		_loop();
	}

	var _loop = function () {
		// TODO: Entradas del usuario
		// TODO: Lógica del juego
		// TODO: Dibujar pantalla
		_screen.draw();
	}

	// Poner el juego en marcha
	this.init = function () {
		_init(this);
	}

	/////////////// UTILS ///////////////

	this.horPixelsToLetters = function (pixels) {
		return Math.min(Math.floor((pixels * stageParams.hPixels) / stageParams.width), stageParams.hPixels - 1);
	}

	this.verPixelsToLetters = function (pixels) {
		return Math.min(Math.floor((pixels * stageParams.vPixels) / stageParams.height), stageParams.vPixels - 1);
	}
}
