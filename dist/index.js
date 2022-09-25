"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyData = void 0;
var core_1 = require("./core");
var output = "";
var stringifyData = function (input) {
    var tag = input[0];
    if (tag == 0) {
    }
    else if (tag == 1) {
        output += "σL(";
    }
    else if (tag == 2) {
        output += "σR(";
    }
    if (input.length == 2) {
        if (input[1] == 1) {
            output += "<>";
        }
        else {
            (0, exports.stringifyData)(input[1]);
        }
    }
    else {
        output += "<";
        if (input[1] == 1) {
            output += "<>";
        }
        else {
            (0, exports.stringifyData)(input[1]);
        }
        output += ",";
        if (input[2] == 1) {
            output += "<>";
        }
        else {
            (0, exports.stringifyData)(input[2]);
        }
        output += ">";
    }
    if (tag == 0) {
    }
    else if (tag == 1) {
        output += ")";
    }
    else if (tag == 2) {
        output += ")";
    }
    return output;
};
exports.stringifyData = stringifyData;
//const input = [2, [2, [1, [0, 1]]], [2, [1, [0, 1]]]];
var input1 = (0, core_1.injr)((0, core_1.injl)(null, core_1.unit), core_1.iden);
var input2 = (0, core_1.injr)((0, core_1.injl)(null, core_1.unit), core_1.iden);
//const input3 = pair(input1, [injl, iden], [injl, unit]);
var inputt = (0, core_1.injr)((0, core_1.unit)(), core_1.iden);
var input3 = (0, core_1.pair)(inputt, [core_1.iden], [core_1.iden]);
var result = (0, exports.stringifyData)(input3 || []);
console.log(result);
//# sourceMappingURL=index.js.map