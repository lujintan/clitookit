# clitookit
The command line toolkit

###Installation

```bash
npm install clitoolkit
```

###Quick Start

File `/bin/test`:

```javascript
#!/usr/bin/env node

var clitoolkit = require('clitoolkit');

//initial other command line tools
clitoolkit.init({
    version: 1.0.1,
    plugin: [
        'clitoolkit-plugin-a',
        'clitoolkit-plugin-b'
    ]
}, process.argv);
```

Plugin `clitoolkit-plugin-a`(clitoolkit-plugin-a/main.js):

```javascript
module.exports = function(PluginAPI){
    PluginAPI.register('a', 'command a description', [{
            sample: '-d, --dest <names>',
            desc: 'dest files',
            defVal: 'dest'
        }, {
            sample: '-c, --config <names>',
            desc: 'set config file',
        }], function(commander, progArg){
        console.log('command a running...');
    });
};
```

Plugin `clitoolkit-plugin-b`(clitoolkit-plugin-b/main.js):

```javascript
module.exports = function(PluginAPI){
    PluginAPI.register('b', 'command b description', [{
            sample: '-o, --ok <names>',
            desc: 'OK!!!'
        }, {
            sample: '-i, --info <names>',
            desc: 'command info',
        }], function(commander, progArg){
        console.log('command b running...');
    });
};
```
Execute the command `/bin/test`:

```bash
#show the usage of command test
test --help
#show the usage of command a
test a --help
#execute the command a
test a -d -c
#show the usage of command b
test b --help
#execute the command b
test b -oi
```

###Init API Options
* `opt`: `type-> Object` the configration
    * `version`: `type-> String` the command version
    * `pluginBase(optional)`: `type-> String` the plugin root path
    * `plugin`: `type-> Array` the clitoolkit plugins. if can not find the plugin in pluginBase clitoolkit will find node_modules which have the same name with the target plugin.
* `proArgv`: `type-> Array` the progress's arguments(process.argv)

###Plugin

* create a plugin for extend the command
* plugin is a folder contains a `main.js`
* `main.js` should exports a function that with a PluginAPI arguments
* you can use PluginAPI to register a new command

Example:

```javascript
module.exports = function(PluginAPI){
    PluginAPI.register(cmd, desc, options, action);
};
```

####PluginAPI

#####register(name, desc, option, action)
* `name`: `type-> String` command name
* `desc`: `type-> String` description
* `option`: `type-> Array` command options
    * `sample`: `type-> String` command sample, e.g.: '-d, --dest <dest>'
    * `desc(optional)`: `type-> String` option description
    * `defVal(optional)`: `type-> any` the default value
* `action`: `type-> function` eval this function when the command trigger