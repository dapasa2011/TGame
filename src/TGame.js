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
	var _input;
	var _childs = [];

	this.getInput = function () {
		return _input;
	}

	this.appendChild = function (child) {
		child.game = this;
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
		//console.log(g);
		_screen = new TScreen(g);
		_input = new TInput();

		/// controlar el movimiento horizontal con ◄ y ►
		_input.registerAxis(new InputAxis("H",
			new KeyObject("ArrowRight"),
			new KeyObject("ArrowLeft")));

		/// controlar el movimiento horizontal con ▲ y ▼
		_input.registerAxis(new InputAxis("V",
			new KeyObject("ArrowDown"),
			new KeyObject("ArrowUp")));
		g.onStart();

		_loop(g);
	}

	var _loop = function (g) {
		// TODO: Entradas del usuario
		_input.update();
		// TODO: Lógica del juego
		_childs.forEach(function (item) {
			item.update(this);
		});
		// TODO: Dibujar pantalla
		_screen.draw();

		_input.reset();
		//console.log(g.params);
		setTimeout(_loop, g.params.frameRate, g);
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
