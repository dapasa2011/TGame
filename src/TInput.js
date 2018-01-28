(function () {
	Math.clamp = function (a, b, c) {
		return Math.max(b, Math.min(c, a));
	}
})();

/**
 * [[Description]]
 */
var TInput = function () {
	// detectar pulsación de teclas
	document.addEventListener('keydown', function (e) {
		//console.log(e.key);
		/*_axes.forEach(function (_a) {
			_a.checkAxisDown(e.key);
		});*/
		for (var _a in _axes) {
			_axes[_a].checkAxisDown(e.key);
		}
	});

	// detectar liberación de teclas
	document.addEventListener('keyup', function (e) {
		for (var _a in _axes) {
			_axes[_a].checkAxisUp(e.key);
		}
	});

	var _axes = {};
	this.registerAxis = function (axis) {
		_axes[axis.name] = axis;
	}

	this.getAxis = function (axisName) {
		return _axes[axisName].value;
	}

	this.reset = function () {
		for (var _a in _axes) {
			_axes[_a].reset();
		}
	}

	this.update = function () {
		for (var _a in _axes) {
			_axes[_a].update();
		}
		output.innerHTML = this.getAxis("H") + " , " + this.getAxis("V");
	}
}


/**
 * Representa una tecla del teclado.
 * @param {string} keyName Nombre de la tecla asociada.
 */
var KeyObject = function (keyName) {
	/**
	 * Nombre de la tecla
	 */
	this.name = keyName;

	/**
	 * Representa el acto de pulsar la tecla.
	 */
	this.down = false;

	this.up = false;
	this.pressed = false;
	this.chekIsDown = function (keyDownName) {
		if (keyDownName == this.name) {
			console.log("Pulsada " + this.name);
			if (!this.pressed) this.down = true;
			this.pressed = true;
		}
	}
	this.chekIsUp = function (keyUpName) {
		if (keyUpName == this.name) {
			this.up = true;
			this.pressed = false;
		}
	}

	this.reset = function () {
		this.down = false;
		this.up = false;
	}
}

/**
 * [[Description]]
 * @param {string}    name        [[Description]]
 * @param {KeyObject} keyPositive [[Description]]
 * @param {KeyObject}  keyNegative [[Description]]
 */
var InputAxis = function (axisName, keyPositive, keyNegative) {
	this.name = axisName;
	this.positive = keyPositive;
	this.negative = keyNegative;
	this.value = 0;
	this.checkAxisDown = function (keyDownName) {
		//console.log("Check eje " + this.name);
		this.positive.chekIsDown(keyDownName);
		this.negative.chekIsDown(keyDownName);

	}
	this.checkAxisUp = function (keyUpName) {
		this.positive.chekIsUp(keyUpName);
		this.negative.chekIsUp(keyUpName);

	}
	this.reset = function () {
		this.positive.reset();
		this.negative.reset();
	}
	this.update = function () {
		if (this.positive.pressed) this.value += 0.1;
		if (this.negative.pressed) this.value -= 0.1;
		this.value = Math.clamp(this.value, -1, 1);

		if (!this.positive.pressed && !this.negative.pressed) {
			if (this.value > -0.001 && this.value < 0.001) {
				this.value = 0;
				return;
			}
			this.value += (this.value > 0) ? -0.1 : 0.1;
		}
	}
}
