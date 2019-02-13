const constants = require('../constants');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

module.exports = (config, index, states, deck) => {
	const button = config.buttons.find(x => {
		return x.index === index;
	})

	if (!button) {
		throw new Error(constants.ERROR_BUTTON_WITH_INDEX_NOT_FOUND, index);
	}

	const { log_directory, image_directory } = config;
	const { name, exec, image_source, image_alt } = button;
	const { toggle_image, process_ran_message, process_killed_message } = exec || {};

	const logFilename = path.resolve(__dirname, '../../', log_directory, `${ name ? name.replace(' ', '_') : 'button' + index }.log`);

	if (!states[index].process) {
		const p = createProcess(logFilename, exec);

		states[index].process = p.process;
		states[index].fd = p.fd;

		if (toggle_image) {
			toggleImage(true); // process started, switch to alt image
		}

		if (process_ran_message) {
			console.log(process_ran_message);
		}
	}
	else {
		const child = states[index].process;
		const fd = states[index].fd;

		killProcess(child, fd);
		delete states[index].process;
		delete states[index].fd;

		if (toggle_image) {
			toggleImage(false); // process killed, switch to original image
		}

		if (process_killed_message) {
			console.log(process_killed_message);
		}
	}

	states[index].type = 'shell';

	function toggleImage(alt) {
		const imageFile = path.resolve(__dirname, '../../', image_directory, alt && image_alt ? image_alt : image_source);
		deck.fillImageFromFile(index, imageFile);
	}
};

function createProcess(logfile, exec) {
	const fd = fs.openSync(logfile, 'a+');

	if (fd < 0) {
		throw new Error(constants.ERROR_CANNOT_OPEN_FILE, logfile);
	}

	const { prog, args } = exec;
	const child = spawn(prog, args, { stdio : ['pipe', fd, fd] });

	return { process: child, fd };
}

function killProcess(child, fd) {
	child.kill();
	fs.closeSync(fd);
}
