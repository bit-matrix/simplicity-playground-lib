"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pair = exports.injr = exports.injl = exports.iden = exports.unit = void 0;
var unit = function (input) {
    // ilk eleman tag, diğer eleman(lar) data
    // bir array 2 elemanlıysa ya unit type idir ya da sum type idir
    // bir array 3 elemanlıysa product type idir
    return [0, 1];
};
exports.unit = unit;
var iden = function (input) {
    return input;
};
exports.iden = iden;
var injl = function (input, argument) {
    return [1, argument(input)];
};
exports.injl = injl;
var injr = function (input, argument) {
    return [2, argument(input)];
};
exports.injr = injr;
var pair = function (input, argument1, argument2) {
    var returnx = [0];
    if (argument1.length == 1) {
        returnx.push(argument1[0](input));
    }
    else if (argument1.length == 2) {
        returnx.push(argument1[0](input, argument1[1]));
    }
    if (argument2.length == 1) {
        returnx.push(argument2[0](input));
    }
    else if (argument2.length == 2) {
        returnx.push(argument2[0](input, argument2[1]));
    }
    return returnx;
};
exports.pair = pair;
//# sourceMappingURL=core.js.map