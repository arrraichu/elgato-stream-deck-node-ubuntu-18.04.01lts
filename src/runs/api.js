const constants = require('../constants');
const request = require('request');

module.exports = (config, index, states, deck) => {
  const button = config.buttons.find(x => {
    return x.index === index;
  });

  if (!button) {
    throw new Error(constants.ERROR_BUTTON_WITH_INDEX_NOT_FOUND, index);
  }

   const { log_directory, image_directory } = config;
   const { name, api, api_console, image_source, image_alt } = button;

   constants.API_REQUIRED_FIELDS.forEach(field => {
     if (!api[field]) {
       throw new Error(constants.ERROR_API_MISSING_REQUIRED_FIELD, field);
     }
   });

   request(api, (error, response, body) => {
     if (error) {
       throw new Error(error);
     }

     if (api_console) console.log(body);
   });
};
