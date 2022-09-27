"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
var unit = function (input) {
    // ilk eleman tag, diğer eleman(lar) data
    // bir array 2 elemanlıysa ya unit type idir ya da sum type idir
    // bir array 3 elemanlıysa product type idir
    return [0, 1];
};
var iden = function (input) {
    return input;
};
var injl = function (input, argument) {
    return [1, argument(input)];
};
var injr = function (input, argument) {
    return [2, argument(input)];
};
var take = function () {
    return [];
};
var drop = function () {
    return [];
};
var comp = function () {
    return [];
};
var pair = function () {
    return [];
};
var case_ = function () {
    return [];
};
exports.core = {
    unit: unit,
    iden: iden,
    injl: injl,
    injr: injr,
    take: take,
    drop: drop,
    comp: comp,
    pair: pair,
    case_: case_,
};
//# sourceMappingURL=core.js.map