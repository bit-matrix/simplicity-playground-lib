"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corec = void 0;
var helper_1 = require("./helper");
var textConverter_1 = require("./textConverter");
var unit = function (a) {
    if (!a)
        throw "A couldn't be empty";
    return "<>";
};
var iden = function (a) {
    return a;
};
var injl = function (a, term) {
    var data = "";
    if (term.length > 6) {
        var s = (0, helper_1.termChecker)(term.slice(1, 5));
        var line = (0, textConverter_1.lineParser)(term.slice(1, -1), 0);
        data = exports.corec[s](a, line.a, line.b);
    }
    else {
        var s = (0, helper_1.termChecker)(term.slice(1, -1));
        data = exports.corec[s](a, "", "");
    }
    return "σL(" + data + ")";
};
var injr = function (a, term) {
    var data = "";
    if (term.length > 6) {
        var s = (0, helper_1.termChecker)(term.slice(1, 5));
        var line = (0, textConverter_1.lineParser)(term.slice(1, -1), 0);
        data = exports.corec[s](a, line.a, line.b);
    }
    else {
        var s = (0, helper_1.termChecker)(term.slice(1, -1));
        data = exports.corec[s](a, "", "");
    }
    return "σR(" + data + ")";
};
var take = function (input, term) {
    (0, helper_1.isProductType)(input);
    var line = term.length > 6 ? (0, textConverter_1.lineParser)(term.slice(1, -1), 0) : term;
    var s = (0, helper_1.termChecker)(term.slice(1, 5));
    var modifiedInput = input.split(",").slice(1).join(",").substring(1);
    return exports.corec[s](modifiedInput, line.a, line.b);
};
var drop = function (input, term) {
    (0, helper_1.isProductType)(input);
    var line = term.length > 6 ? (0, textConverter_1.lineParser)(term.slice(1, -1), 0) : term;
    var s = (0, helper_1.termChecker)(term.slice(1, 5));
    var modifiedInput = input.split(",").slice(1).join(",").slice(0, -1);
    return exports.corec[s](modifiedInput, line.a, line.b);
};
var comp = function (input, termA, termB) {
    var s = (0, helper_1.termChecker)(termA.slice(1, 5));
    var t = (0, helper_1.termChecker)(termB.slice(1, 5));
    var sPart = { a: "", b: "" };
    var tPart = { a: "", b: "" };
    if (termA.length > 6) {
        var parserResult = (0, textConverter_1.lineParser)(termA.slice(1, -1), 0);
        sPart = { a: parserResult.a, b: parserResult.b };
    }
    if (termB.length > 6) {
        var parserResult = (0, textConverter_1.lineParser)(termB.slice(1, -1), 0);
        tPart = { a: parserResult.a, b: parserResult.b };
    }
    return exports.corec[t](exports.corec[s](input, sPart.a, sPart.b), tPart.a, tPart.b);
};
var pair = function (input, termA, termB) {
    var s = (0, helper_1.termChecker)(termA.slice(1, 5));
    var t = (0, helper_1.termChecker)(termB.slice(1, 5));
    var sPart = { a: "", b: "" };
    var tPart = { a: "", b: "" };
    if (termA.length > 6) {
        var parserResult = (0, textConverter_1.lineParser)(termA.slice(1, -1), 0);
        sPart = { a: parserResult.a, b: parserResult.b };
    }
    if (termB.length > 6) {
        var parserResult = (0, textConverter_1.lineParser)(termB.slice(1, -1), 0);
        tPart = { a: parserResult.a, b: parserResult.b };
    }
    return "<" + exports.corec[s](input, sPart.a, sPart.b) + "," + exports.corec[t](input, tPart.a, tPart.b) + ">";
};
var case_ = function (input, termA, termB) {
    // @TO-DO throw
    var newFirstItem = (0, helper_1.productTypeBreaker)(input);
    var finalInput = "<" + newFirstItem.a + "," + newFirstItem.b + ">";
    if (input.charAt(2) === "L") {
        var line = termA.length > 6 ? (0, textConverter_1.lineParser)(termA.slice(1, -1), 0) : termA;
        finalInput = termA.length > 6 ? finalInput : input;
        var s = (0, helper_1.termChecker)(termA.slice(1, 5));
        return exports.corec[s](finalInput, line.a, line.b);
    }
    else if (input.charAt(2) === "R") {
        var line = termB.length > 6 ? (0, textConverter_1.lineParser)(termB.slice(1, -1), 0) : termB;
        finalInput = termB.length > 6 ? finalInput : input;
        var t = (0, helper_1.termChecker)(termB.slice(1, 5));
        return exports.corec[t](finalInput, line.a, line.b);
    }
    return "";
};
exports.corec = {
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
//# sourceMappingURL=corec.js.map