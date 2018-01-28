function TGameObject(x = 0, y = 0) {
	this.position = {
		x: x,
		y: y
	};

	this.game;

	this.getShape = function () {
		return 'O';
	};

	this.update = function () {
		this.onUpdate(this.game);
	}

	this.onUpdate = function (tGame) {

	};
}
