/**
 * Objeto para crear y dibujar la pantalla del juego
 * @param {TGame} tGame juego al que pertenece la pantalla
 */
var TScreen = function (tGame) {
	var _g = tGame;
	var _empty = [];
	var _screen = [];
	var clear = function () {
		_screen = _empty.slice();
	}

	//// Crear la pantalla vacia
	var s = [];
	for (i = 0; i < tGame.params.vPixels; i++) {
		var l = '';
		for (j = 0; j < tGame.params.hPixels; j++) {
			l += '·';
		}
		s.push(l);
	}
	_empty = s;

	this.draw = function () {
		s = _empty.slice();

		_g.stageElement.innerHTML = s.join('<br>');
	}
}
