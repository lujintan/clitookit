var Q = require('q');
var Util = require('./Util.js');

var Command = function(name, desc, option, handler, children){
    this.name = name;
    this.desc = desc;
    this.option = option;
    this.handler = handler || Util.noop;
    this.children = children || [];
};

Command.prototype.exec = function(commander, proArg) {
    var handlerReturn = this.handler(commander, proArg);
    var _children = this.children;
    if (handlerReturn && handlerReturn.then){
        return handlerReturn.then(function(){
            return Util.arrForInPromise(_children, function(child, index){
                return child.exec(commander, proArg);
            });
        });
    } else {
        return Util.arrForInPromise(_children, function(child, index){
            return child.exec(commander, proArg);
        });
    }
};

Command.prototype.addChild = function(cmd) {
    this.children = this.children.concat(cmd);
};

module.exports = Command;