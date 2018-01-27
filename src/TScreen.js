String.prototype.replaceAt = function (index, replacement) {
	//if(index)
	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


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

	// TODO: ajustar marco a dimensiones de tipo
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

		// borrar pantalla
		clear();
		// dibujar cada uno de los objetos
		_e = _g.getChildren();
		// FIXME: No se rellena el array _screen

		for (var i = 0; i < _e.length; i++) {
			var h = _g.horPixelsToLetters(_e[i].position.x);
			var v = _g.verPixelsToLetters(_e[i].position.y);

			if ((h >= 0 || h < _g.params.hPixels) && (v >= 0 || v < _g.params.vPixels)) {
				try {
					_screen[v] = _screen[v].replaceAt(h, _e[i].getShape());
					//console.log(_screen[v]);
				} catch (e) {
					console.log('no se pudo dibujar', e, v, h);
					// NOTE: gamePaused = true;
				}
			}

		}
		// salida a pantalla
		_g.stageElement.innerHTML = _screen.join('<br>');
	}
}
