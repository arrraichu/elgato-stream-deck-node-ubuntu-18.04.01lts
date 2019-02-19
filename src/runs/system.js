const constants = require('../constants');

module.exports = (config, index, states, deck) => {
  const button = config.buttons.find(x => {
    return x.index === index;
  });

  if (!button) {
    throw new Error(constants.ERROR_BUTTON_WITH_INDEX_NOT_FOUND, index);
  }

  const { log_directory, image_directory } = config;
  const { name, system, image_source, image_alt } = button;
  const { type, value, enable_alt, alt_value } = system;

  const state = states[index];
  state.system = state.system || {};
  const stateVal = state.system[type];
  const useVal = (enable_alt && alt_value && (stateVal !== undefined) && (value === stateVal))
    ? alt_value
    : value;

  switch (type) {
    case 'brightness':
      states[index].system[type] = handleBrightness(deck, useVal);
      break;
    default:
      break;
  }
}

function handleBrightness(deck, value) {
  deck.setBrightness(value);
  return value;
}
