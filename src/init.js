const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const StreamDeck = require('elgato-stream-deck');

module.exports = () => {
	const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
	const logdir = config.log_directory || 'logs/';
	const debug = config.debug;

	const deck = new StreamDeck();
	const states = Array(15).fill({});

	const { reload, image_directory, toggle_image } = config;

	if (reload) {
		for (let x = 0; x < 15; ++x) {
			deck.clearKey(x);
		}
		deck.setBrightness(20);
	}

	config.buttons.forEach(button => {
		const { index, image_source, toggle_image } = button;

		if (index === null || index === undefined) return;

		if (image_source) {
			deck.fillImageFromFile(index, path.resolve(__dirname, '../', image_directory, image_source));
		}

		if (toggle_image) {
			states[index].alt = 0;
		}
	});

	return { config, deck, states };
};
