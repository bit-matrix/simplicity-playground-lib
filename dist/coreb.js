"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
var unit = function (a) {
    if (!a)
        throw "A couldn't be empty";
    return "<>";
};
var iden = function (a) {
    return a;
};
var injl = function (a) {
    return "σL(" + a + ")";
};
var injr = function (a) {
    return "σR(" + a + ")";
};
var take = function (input) {
    return input.split(",")[0].substring(1);
};
var drop = function (input) {
    return input.split(",")[1].slice(0, -1);
};
var comp = function (term) {
    return term;
};
var pair = function (input, termA, termB) {
    return "<" + termA + "," + termB + ">";
};
var case_ = function (a, termA, termB) {
    // @TO-DO throw
    if (a.charAt(2) === "L") {
        return termA;
    }
    else if (a.charAt(2) === "R") {
        return termB;
    }
    return "";
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
    case: case_,
};
//# sourceMappingURL=coreb.js.map