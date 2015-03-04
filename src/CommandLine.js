var program = require('commander');
var CommandEngine = require('./CommandEngine.js');

var _currentCmd = null;
var _flagHelp = false;

var _init = function(version, proArg){
    //set the command version for display
    if (version) {
        program.version(version);
    }

    var targetCmd;
    for (var i = 1, len = proArg.length ; i < len ; i++) {
        var arg = proArg[i];
        if (!targetCmd && CommandEngine.isExist(arg)) {
            targetCmd = arg;
        }
        if (arg === '-h' || arg === '--help') {
            _flagHelp = true;
        }
    }

    if (!targetCmd) {
        //get command list
        var cmdList = CommandEngine.getCmdList();
        program.usage('[command] [option]');
        cmdList.forEach(function(cmd, index){
            program.command(cmd.name).description(cmd.desc);
        });
    } else {
        var cmd = CommandEngine.getCmdByName(targetCmd);
        _currentCmd = cmd;
        program
            .usage(cmd.name + ' [options]')
            .command(cmd.name).description(cmd.desc);
        cmd.option.forEach(function(opt){
            program.option(opt.sample, opt.desc, opt.defVal);
        });
    }

    program.parse(proArg);

    if (_flagHelp) {
        _help();
    }
};

var _getCurrentCmd = function(){
    return _currentCmd;
};

var _isTriggerHelp = function(){
    return _flagHelp;
}

var _help = function(){
    program.help();
};

module.exports = {
    init: _init,
    getCurrentCmd: _getCurrentCmd,
    help: _help,
    isTriggerHelp: _isTriggerHelp
};