"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineParser = exports.textConverter = void 0;
var core_1 = require("./core");
var helper_1 = require("./helper");
var userCustomTerms = [];
var textConverter = function () {
    var text = "func1 := comp(pair(iden)(unit))(injl(iden))";
    // const text = "func1 := unit";
    var textParser = text.split(" ");
    // first declaretion
    if (userCustomTerms.length === 0) {
        var functionName = textParser[0];
        var functionSyntax = textParser[1];
        if (functionSyntax != ":=")
            throw "Invalid simplicity function syntax";
        if (textParser.length < 3)
            throw "Invalid simplicity function declaretion";
        // const text = "func1 := unit";
        if (textParser.length === 3) {
            var firstTermText = textParser[2];
            if (firstTermText !== "unit" && firstTermText !== "iden")
                throw "Invalid term";
            var firstTerm = core_1.core[firstTermText];
        }
        // const text = "func1 := injl(unit)";
        if (textParser.length === 4) {
            var firstTermText = textParser[2];
            var secondTermText = textParser[3];
            if (firstTermText === "injl" || firstTermText === "injr" || firstTermText === "take" || firstTermText === "drop") {
                if (secondTermText !== "unit" && secondTermText !== "iden")
                    throw "Invalid term";
            }
            var firstTermValid = (0, helper_1.termChecker)(firstTermText);
            var secondTermValid = (0, helper_1.termChecker)(secondTermText);
            var firstTerm = core_1.core[firstTermValid];
            var secondTerm = core_1.core[secondTermValid];
        }
        if (textParser.length > 4) {
            var termExpression = textParser.slice(2);
            var firstTermText = textParser[0];
            var firstTermValid = (0, helper_1.termChecker)(firstTermText);
            if (termExpression[1].charAt(0) !== "(")
                throw "Invalid syntax";
        }
        userCustomTerms.push(functionName);
    }
};
exports.textConverter = textConverter;
var lineParser = function (text, termIndex) {
    var _a;
    var parsedText = text.split("");
    var starts = [];
    var ends = [];
    for (var i = 0; i < parsedText.length; i++) {
        var data_1 = parsedText[i];
        if (data_1 === "(") {
            starts.push(i);
        }
        if (data_1 === ")") {
            ends.push(i);
        }
    }
    var final = [];
    var sortedArray = [];
    var firstStartState = __spreadArray([], starts, true);
    ends.forEach(function (end) {
        var clonedStarts = __spreadArray([], starts, true);
        clonedStarts.push(end);
        clonedStarts.sort(function (a, b) { return a - b; });
        var index = clonedStarts.findIndex(function (st) { return st === end; }) - 1;
        sortedArray.push(starts[index]);
        starts.splice(index, 1);
    });
    firstStartState.forEach(function (fs) {
        var endIndex = sortedArray.findIndex(function (rh) { return rh === fs; });
        final.push({ s: fs, e: ends[endIndex], args: text.slice(fs, ends[endIndex] + 1) });
    });
    var length = 0;
    var data = final[0];
    var result;
    var termNameText = text.substring(length, data.s);
    var termName = (0, helper_1.termChecker)(termNameText);
    var arguementCount = (0, helper_1.termArgumenetCount)(termName);
    length += data.s;
    if (arguementCount === 2) {
        var a = final[0].args;
        var bigEnd_1 = ends.sort(function (a, b) { return b - a; })[0];
        var b = (_a = final.find(function (f) { return f.e === bigEnd_1; })) === null || _a === void 0 ? void 0 : _a.args;
        result = { term: termName, termIndex: termIndex, a: a, b: b };
    }
    else if (arguementCount === 1) {
        var a = final[0].args;
        result = { term: termName, termIndex: termIndex, a: a };
    }
    else if (arguementCount === 0) {
        result = { term: termName, termIndex: termIndex };
    }
    return result;
};
exports.lineParser = lineParser;
//# sourceMappingURL=textConverter.js.map