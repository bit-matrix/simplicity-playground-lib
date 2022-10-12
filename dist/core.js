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
var injl = function (a, term) {
    return "σL(" + term(a) + ")";
};
var injr = function (a, term) {
    return "σR(" + term(a) + ")";
};
var take = function (a, b, term) {
    return term(a);
};
var drop = function (a, b, term) {
    return term(b);
};
var comp = function (a, term, term2) {
    return term2(a, term(a));
};
var pair = function (a, term, term2) {
    return "<" + term(a) + "," + term2(a) + ">";
};
var case_ = function (a, c, term, term2) {
    if (a.charAt(1) === "L") {
        var input_1 = a.slice(3, a.length - 1);
        return term(input_1, c);
    }
    else if (a.charAt(1) === "R") {
        var input_2 = a.slice(3, a.length - 1);
        return term2(input_2, c);
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
//# sourceMappingURL=core.js.map