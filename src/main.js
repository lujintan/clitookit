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
        CommandLine.init(conf.version, proArg);
        
        //get the triggered command
        var cmd = CommandLine.getCurrentCmd();
        
        if (cmd && !CommandLine.isTriggerHelp()){
            cmd.exec();
        } else {
            CommandLine.help();
        }
    }
};