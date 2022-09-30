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
var injl = function (term) {
    return "σL(" + term + ")";
};
var injr = function (term) {
    return "σR(" + term + ")";
};
var take = function (termA, termB) {
    if (!termB)
        throw "B couldn't be empty";
    return termA;
};
var drop = function (termA, termB) {
    if (!termA)
        throw "A couldn't be empty";
    return termB;
};
var comp = function (term) {
    return term;
};
var pair = function (termA, termB) {
    return "<" + termA + "," + termB + ">";
};
var case_ = function (a, c, termA, termB) {
    if (a.charAt(1) === "L") {
        return termA;
    }
    else if (a.charAt(1) === "R") {
        return termB;
    }
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