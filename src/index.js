// INIT AND RUNS
const init = require('./init');
const runApi = require('./runs/api');
const runDefault = require('./runs/default');
const runKeyboard = require('./runs/keyboard');
const runShell = require('./runs/shell');
const runSystem = require('./runs/system');

const { config, deck, states } = init();
const { debug, log_directory, image_directory } = config;

deck.on('down', keyIndex => {
	if (debug) console.log('key %d down', keyIndex);
	onKeyDown(keyIndex);
});

deck.on('up', keyIndex => {
	if (debug) console.log('key %d up', keyIndex);
	onKeyUp(keyIndex);
});

deck.on('error', error => {
	console.error(error);
});

function onKeyDown(index) {
	let button = config.buttons.find(x => {
		return x.index === index;
	});

	if (!button) return;

	const { type, on_pressed_message, on_pressed_clear_image } = button;
	const { image_source, image_alt } = button;
	let { toggle_image, image_state_alt } = button;

	if (type) {
		switch (type) {
			case 'api':
				runApi(config, index, states, deck);
				break;
			case 'shell':
				runShell(config, index, states, deck);
				break;
			case 'keyboard':
				runKeyboard(config, index, states, deck);
				break;
			case 'system':
				runSystem(config, index, states, deck);
				break;
			case 'default':
				runDefault(config, index, states, deck);
				break;
			default:
				runDefault(config, index, states, deck);
				break;
		}
	} else {
		runDefault(config, index, states, deck);
	}
}

function onKeyUp(index) {
	let button = config.buttons.find(x => {
		return x.index === index;
	});

	if (!button) return;

	const { on_release_clear_image } = button;

	if (on_release_clear_image) {
		deck.clearKey(index);
	}
}
