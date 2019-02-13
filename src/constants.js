module.exports = {
	DEFAULT_KEYBOARD_DELAY_MS : 500,

	ERROR_CANNOT_OPEN_FILE : 'Cannot open file: %s',
	ERROR_BUTTON_WITH_INDEX_NOT_FOUND : 'Button with index %d not found.',

	ERROR_ROBOT_SIMULTANEOUS_TYPE : 'Keys must be either a non-modifier string or an array of modifiers and keys.',
	ERROR_ROBOT_SIMULTANEOUS_ARRAY_OF_NOT_STRING : 'Keys array can must only contain strings.',
	ERROR_ROBOT_SIMULTANEOUS_ONE_NONMOD_KEY : 'Keys array must contain exactly one non-modifier key.',
	ERROR_ROBOT_MIXED_ARRAY_OF_OBJECTS : 'Mixed type keys must contain an array of objects.',
	ERROR_ROBOT_MIXED_REQUIRED_FIELDS : 'Mixed type keys, required fields: type, keys',

	EXCEPTION_KEYS_REGEX : /[~!@#\$%\^&*()_+{}|:"<>?]/,

	MODIFIERS : ['control', 'alt', 'command', 'shift']
};
