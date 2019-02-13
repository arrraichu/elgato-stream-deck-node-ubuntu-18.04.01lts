const constants = require('../constants');
const path = require('path');

module.exports = (config, index, states, deck) => {
	const button = config.buttons.find(x => {
		return x.index === index;
	});

	if (!button) {
		throw new Error(constants.ERROR_BUTTON_WITH_INDEX_NOT_FOUND, index);
	}

	const { image_directory } = config;
	const { image_source, image_alt, properties } = button;
	const { toggle_image, on_press_message, on_press_message_alt } = properties || {};
	states[index].alt = states[index].alt || false;

	let alternate = false;

	if (toggle_image) {
		const imageFile = path.resolve(__dirname, '../../', image_directory, states[index].alt ? image_source : image_alt);
		deck.fillImageFromFile(index, imageFile);

		alternate = true;
	}

	if (on_press_message) {
		if (on_press_message_alt && states[index].alt) {
			console.log(on_press_message_alt);
		}
		else {
			console.log(on_press_message);
		}

		alternate = true;
	}

	if (alternate) {
		states[index].alt = !states[index].alt;
	}

	states[index].type = 'default';
};
