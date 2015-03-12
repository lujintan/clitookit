var Command = require('./Command.js');
var Util = require('./Util.js');

var _cmdList = [];

/**
 * weather the command is exist in command's list or not
 * @param  {[type]}  name [description]
 * @return {Boolean}      [description]
 */
var _isExist = function(name){
    for (var i = 0, len = _cmdList.length ; i < len ; i++){
        var cmd = _cmdList[i];
        if (name === cmd.name) {
            return true;
        }
    }
    return false;
};

/**
 * register a command
 * @param  {String} name     command name
 * @param  {Object} config   the configration of command
 * @param  {Function} handler  the command handler
 * @param  {Command} children  the children command of current command
 * @return {void}
 */
var _register = function(name, desc, option, handler, children){
    if (!_isExist(name)){
        var children = children;
        var childrenCmd = [];

        if (typeof option === 'function') {
            children = handler;
            handler = option;
            option = null;
        }

        //get the child command object
        if (children && children.length){
            children.forEach(function(childName, index){
                var childCmd = _getCmdByName(childName);
                if (childCmd){
                    childrenCmd.push(childCmd);
                } else {
                    throw new Error('The child command [' + childName + '] is not exist!');
                }
            });
        }

        //create command object
        var command = new Command(name, desc, option, handler, childrenCmd);
        _cmdList.push(command);
    } else{
        throw new Error('The command [' + name + '] has been already exist!');
    }
};

/**
 * execute the command 
 * @param  {String} name command name
 * @return {Promise|void}
 */
var _exec = function(name, commander, proArg){
    var cmd = _getCmdByName(name);
    if (cmd) {
        return cmd.exec(commander, proArg);
    } else {
        throw new Error('The command [' + name + '] is not exist!');
    }
};

/**
 * get the command list
 * @return {Array}
 */
var _getCmdList = function(){
    return _cmdList;
};

/**
 * get command by name
 * @param  {String} name command name
 * @return {Command}
 */
var _getCmdByName = function(name){
    for (var i = 0, len = _cmdList.length ; i < len ; i++){
        var cmd = _cmdList[i];
        if (name === cmd.name) {
            return cmd;
        }
    }
};

/**
 * initial the combined command from command configration
 * @return {void}
 */
var _combine = function(clis){
    Util.objForIn(clis, function(cliName, info){
        if (!_isExist(cliName)){
            _register(cliName, info.desc, null, null, info.commands);
        } else {
            throw new Error('The command [' + cliName + '] has been already exist!');
        }
    });
};

/**
 * remove the command by name
 * @param  {String} name command's name
 * @return {void}      
 */
var _remove = function(name){
    for (var i = 0, len = _cmdList.length ; i < len ; i++){
        var cmd = _cmdList[i];
        if (name === cmd.name) {
            _cmdList.splice(i, 1);
            return;
        }
    }
};

module.exports = {
    isExist: _isExist,
    register: _register,
    exec: _exec,
    getCmdList: _getCmdList,
    getCmdByName: _getCmdByName,
    combine: _combine,
    remove: _remove
};