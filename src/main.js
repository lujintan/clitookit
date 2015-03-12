var PluginEngine = require('./PluginEngine.js');
var CommandEngine = require('./CommandEngine.js');
var CommandLine = require('./CommandLine.js');

module.exports = {
    init: function(conf, proArg){
        var plugins = conf.plugin || {};
        var clis = conf.clis || {};

        //register all the plugins
        PluginEngine.init(plugins, conf.pluginBase);

        //combine the commands
        CommandEngine.combine(clis);
        
        //initial the command line
        var commander = CommandLine.init(conf.version, proArg);
        var oriCommander = CommandLine.getCommander();
        
        //get the triggered command
        var cmd = CommandLine.getCurrentCmd();
        
        if (cmd) {
            //get commander controlling right to plugin
            if (cmd.option === null) {
                cmd.exec(commander, proArg);
                oriCommander.parse(proArg);
                if (CommandLine.isTriggerHelp()) {
                    CommandLine.help();
                }
            } else {
                commander.parse(proArg);
                if (CommandLine.isTriggerHelp()) {
                    CommandLine.help();
                } else {
                    cmd.exec(commander, proArg);
                }
            }
        } else {
            oriCommander.parse(proArg);
            CommandLine.help();
        }
    }
};