function TGameObject(x = 0, y = 0) {
	this.position = {
		x: x,
		y: y
	};

	this.getShape = function () {
		return 'O';
	};
}
