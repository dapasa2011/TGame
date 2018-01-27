/**
 * Crea el juego
 * @param {HTMLElement} container Elemento del documento HTML que contendrá el juego
 * @param {object}      options   Opciones de configuración del juego.
 */
function TGame(container, options) {
	console.log("Configuración del juego");
	var params = options;

	// Crear el marco de juego
	// FUTURE: Configurar aspecto del marco
	var stageElement = document.createElement('pre');
	var stageStyle = {
		outline: '1px dotted rgb(30,30,30)',
		position: 'absolute',
		width: params.width + 'px',
		height: params.height + 'px',
		top: '50%',
		left: '50%',
		marginLeft: '-' + (params.width / 2) + 'px',
		marginTop: '-' + (params.height / 2) + 'px',
		fontFamily: 'monospace',
		lineHeight: '1.05em'
	}
	for (var st in stageStyle) {
		//console.log()
		stageElement.style[st] = stageStyle[st];
	}
	container.appendChild(stageElement);

}
