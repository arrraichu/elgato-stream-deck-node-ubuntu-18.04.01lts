# Elgato Stream Deck NodeJS Framework for Ubuntu 18.XX LTS

This is a framework for running the [Elgato Stream Deck](https://www.elgato.com/en/gaming/stream-deck) on Ubuntu 18.XXLTS.

If you are looking for a more generic framework for running the Elgato Stream Deck on Linux, please refer to the [elgato-stream-deck](https://github.com/Lange/node-elgato-stream-deck) repository.

## Install and Run

Sorry, I won't be publishing this to npm. If you want to use this, simply clone and install the ol' fashioned way.

```
git clone https://github.com/arrraichu/elgato-stream-deck-node-ubuntu-18.04.01lts
cd elgato-stream-deck-node-ubuntu-18.04.01lts
npm install

# Connect your Elgato Stream Deck to your computer

# Configure your buttons in config.yaml (see Usage and Examples)

sudo npm start
```

Reading the device on Linux requires root privileges out-of-the-box, so running with `sudo` is currently required.

## Usage and Examples

Before running the framework, you must create a `config.yaml` file. A sample configuration file is provided for you in `config.sample.yaml`.

You can specify when a button press will do by using the `type` key inside of the button object. Here are the possible button types:

#### [default](#default)

If you specify `type: default` or do not specify a type `type` field, then the button will do nothing. You can still toggle the button images as well as print a message on the console by filling in the `properties` field.

```YAML
button:
  - name: Do nothing
    index: 0
    image_source: image1.png
    image_alt: image2.png
    type: default
    properties:
      toggle_image: true
      on_pressed_message: Image changed to image1.png
      on_pressed_message_alt: Image changed to image2.png
```

#### [keyboard](#keyboard)

Simulates keyboard presses, ranging from typing a string, to performing complex macros.

```YAML
button:
  - name: Close Tab
    index: 0
    image_source: image.png
    type: keyboard
    keyboard_press_type: simultaneous
    keyboard_keys:
    	- control
    	- w
```

There `keyboard_press_type` field dictates how keyboard presses should be handled. The options for this field include:

- `tap` for single key presses. This is usually used for pressing modifiers or the ENTER key.
- `sequential` for constant strings.
- `simultaneous` for pressing multiple keys at once, like when entering macros.
- `mixed` for combining any and all of the above together, sequentially.

See [API docs](API.md) for a deeper dive on how to use this.

#### [shell](#shell)

**WARNING: This has NOT been tested rigorously. This has the potential to be dangerous, especially when this framework _requires_ root privileges. Make super duper sure you know what you're doing!!!**

Spawns a child process which will execute the command supplied in `exec`. Pressing the button once will spawn the child process; pressing the button again will kill the child process running. You can also specify whether to use both image sources as a toggle, and up to two (toggling) messages printed to console whenever the process is created and killed.

```YAML
button:
  - name: Ping CloudFlare DNS
    index: 0
    image_source: ping.png
    image_alt: no_ping.png
    type: shell
    exec:
    	prog: ping
    	args:
    	  - 1.1.1.1
    	toggle_image: true
    	process_ran_message: Pinging 1.1.1.1!
    	process_killed_message: Stopped pinging.
```

#### [api](#api)

Makes an API call to a specified URL. The body in the `api` key use the npm [request](https://www.npmjs.com/package/request) package and follows the same format. `api_console` is a boolean where you can turn on whether the response body gets printed onto the console.

```YAML
button:
  - name: Get Time
    index: 0
    image_source: image.png
    type: api
    api:
      method: get
      uri: http://worldclockapi.com/api/json/utc/now
    api_console: true
```

## API
See [API docs](API.md).

## Notes, Support, Contribution

This is tested only on Ubuntu 18.04.01 LTS. I have no plans to support or to even test this on any other platform, simply because this was intended only for my personal use. If you want to ask questions, feel free to submit issues. There is no point in submitting Pull Requests; fork or clone this repository if you wish.

## Credits

Thank you to [elgato-stream-deck](https://github.com/Lange/node-elgato-stream-deck) as this framework was built on top of that.

Other packages used include:

* [RobotJS](https://github.com/octalmage/robotjs)

If you're looking to buy an Elgato Stream Deck, the link to their page is [here](https://www.elgato.com/en/gaming/stream-deck). Some of the images in the repository were grabbed from their [Stream Deck Key Creator](https://www.elgato.com/en/gaming/keycreator).
