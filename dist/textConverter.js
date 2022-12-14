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
exports.lineParser = void 0;
var helper_1 = require("./helper");
var lineParser = function (text, termIndex) {
    var _a;
    if (text === "iden" || text === "unit") {
        return { term: text };
    }
    var parsedText = text.split("");
    var starts = [];
    var ends = [];
    for (var i = 0; i < parsedText.length; i++) {
        var data = parsedText[i];
        if (data === "(") {
            starts.push(i);
        }
        if (data === ")") {
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
    if (final.length > 0) {
        var length_1 = 0;
        var data = final[0];
        var result = void 0;
        var termNameText = text.substring(length_1, data.s);
        var termName = (0, helper_1.termChecker)(termNameText);
        var arguementCount = (0, helper_1.termArgumenetCount)(termName);
        length_1 += data.s;
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
    }
};
exports.lineParser = lineParser;
//# sourceMappingURL=textConverter.js.map