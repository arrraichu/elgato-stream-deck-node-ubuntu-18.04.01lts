const constants = require('../constants');
const robot = require('robotjs');

module.exports = (config, index, states) => {
	const button = config.buttons.find(x => {
		return x.index === index;
	});

	if (!button) {
		throw new Error(constants.ERROR_BUTTON_WITH_INDEX_NOT_FOUND, index);
	}

	const { keyboard_press_type, keyboard_keys, keyboard_delay } = button;
	robot.setKeyboardDelay(keyboard_delay || constants.DEFAULT_KEYBOARD_DELAY_MS);

	if (keyboard_press_type) {
		processKeyboardByType(keyboard_press_type, keyboard_keys, keyboard_delay);
	}
	else {
		typeSequential(keyboard_keys);
	}

	states[index].type = 'keyboard';
};

function processKeyboardByType(type, keys,delay) {
	switch (type) {
		case 'tap':
			typeTap(keys);
			break;
		case 'sequential':
			typeSequential(keys);
			break;
		case 'simultaneous':
			typeSimultaneous(keys);
			break;
		case 'mixed':
			typeMixed(keys);
		default:
			typeSequential(keys);
			break;
	}
}

function typeTap(keys) {
	robot.keyTap(keys);
}

function typeSequential(keys, delay) {
	if (typeof keys === 'string') {
		let str = keys;

		while (str) {
			let match = str.match(constants.EXCEPTION_KEYS_REGEX);

			if (match) {
				robot.typeString(str.substr(0, match['index']));
				robot.keyTap(match[0], ['shift']);
				str = str.substr(match['index']+1);
			}
			else {
				robot.typeString(str);
				str = null;
			}
		}
	}
}

function typeSimultaneous(keys) {	
	if (typeof keys === 'string') {
		if (constants.MODIFIERS.indexOf(keys) < 0) {
			robot.keyTap(keys);
		}
		return;
	}

	if (!Array.isArray(keys)) {
		throw new Error(constants.ERROR_ROBOT_SIMULTANEOUS_TYPE);
	}

	const mods = [];
	let key;

	keys.forEach(k => {
		if (typeof k !== 'string') {
			throw new Error(constants.ERROR_ROBOT_SIMULTANEOUS_ARRAY_OF_NOT_STRING);
		}

		if (constants.MODIFIERS.indexOf(k) >= 0) {
			mods.push(k);
		}
		else {
			if (key) {
				throw new Error(constants.ERROR_ROBOT_SIMULTANEOUS_ONE_NONMOD_KEY);
			}

			key = k;
		}
	});

	if (!key) {
		throw new Error(constants.ERROR_ROBOT_SIMULTANEOUS_ONE_NONMOD_KEY);
	}

	robot.keyTap(key, mods);
}

function typeMixed(keysArray, delay) {
	if (!Array.isArray(keysArray)) {
		throw new Error(constants.ERROR_ROBOT_MIXED_ARRAY_OF_OBJECTS);
	}

	keysArray.forEach(item => {
		if (typeof item !== 'object') {
			throw new Error(constants.ERROR_ROBOT_MIXED_ARRAY_OF_OBJECTS);
		}

		const { type, keys } = item;

		if (!type || !keys) {
			throw new Error(constants.ERROR_ROBOT_MIXED_REQUIRED_FIELDS);
		}

		return processKeyboardByType(type, keys);
	});
}
