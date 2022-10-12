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
        data = exports.corec[s](a, "", "");
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
        data = exports.corec[s](a, "", "");
    }
    else {
        var s = (0, helper_1.termChecker)(term.slice(1, -1));
        data = exports.corec[s](a, "", "");
    }
    return "σR(" + data + ")";
};
var take = function (input, term) {
    var line = (0, textConverter_1.lineParser)(term.slice(1, -1), 0);
    var s = (0, helper_1.termChecker)(term.slice(1, 5));
    var modifiedInput = input.split(",")[0].substring(1);
    return exports.corec[s](input, line.a, line.b);
};
var drop = function (input, term) {
    var line = (0, textConverter_1.lineParser)(term.slice(1, -1), 0);
    var s = (0, helper_1.termChecker)(term.slice(1, 5));
    var modifiedInput = input.split(",")[1].slice(0, -1);
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
    var modifiedInput = input.split(",");
    var newFirstItem = modifiedInput[0].split("(").pop().split(")")[0];
    var finalInput = "<" + newFirstItem + ">," + modifiedInput[1];
    if (input.charAt(2) === "L") {
        var line = (0, textConverter_1.lineParser)(termA.slice(1, -1), 0);
        var s = (0, helper_1.termChecker)(termA.slice(1, 5));
        return exports.corec[s](finalInput, line.a, line.b);
    }
    else if (input.charAt(2) === "R") {
        var line = (0, textConverter_1.lineParser)(termB.slice(1, -1), 0);
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