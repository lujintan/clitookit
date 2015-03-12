var program = require('commander');
var CommandEngine = require('./CommandEngine.js');

var _currentCmd = null;
var _flagHelp = false;
var _proArg = [];
var pro;

var _init = function(version, proArg){
    _proArg = proArg;
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

    pro = program;
    if (!targetCmd) {
        //get command list
        var cmdList = CommandEngine.getCmdList();
        pro.usage('<command> [option]');
        cmdList.forEach(function(cmd, index){
            pro.command(cmd.name).description(cmd.desc);
        });
    } else {
        var cmd = CommandEngine.getCmdByName(targetCmd);
        _currentCmd = cmd;
        pro = program
            .command(cmd.name)
            .usage(' [options]')
            .description(cmd.desc);
        if (cmd.option) {
            cmd.option.forEach(function(opt){
                pro.option(opt.sample, opt.desc, opt.defVal);
            });
        }
    }

    return pro;
};

var _getCommander = function(){
    return program;
};

var _getCurrentCmd = function(){
    return _currentCmd;
};

var _isTriggerHelp = function(){
    return _flagHelp;
}

var _help = function(){
    pro.help();
};

module.exports = {
    init: _init,
    getCurrentCmd: _getCurrentCmd,
    getCommander: _getCommander,
    help: _help,
    isTriggerHelp: _isTriggerHelp
};