"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.programCompiler = void 0;
var corec_1 = require("./corec");
var helper_1 = require("./helper");
var textConverter_1 = require("./textConverter");
var runFinal = function (text, input) {
    var first = (0, textConverter_1.lineParser)(text, 0);
    var firstTerm = first.term;
    var currentTerm = (0, helper_1.termChecker)(firstTerm);
    return corec_1.corec[currentTerm](input, first.a, first.b);
};
var programCompiler = function (input, programList) {
    var customInput = input.split(" ");
    var userCommand = customInput[0];
    var userInput = customInput.slice(1).join("");
    var termList = programList.map(function (pr) { return pr.term; });
    var userTermIndex = termList.findIndex(function (pl) { return pl === userCommand; });
    var currentTermArray = [];
    programList.slice(0, userTermIndex + 1).forEach(function (pr, index) {
        if (index === 0) {
            currentTermArray.push(pr);
        }
        else {
            var isExist = termList.findIndex(function (tl) { return tl === pr.program; });
            console.log(isExist);
            if (isExist > -1) {
                currentTermArray.push(__assign(__assign({}, pr), { program: currentTermArray[isExist].program }));
            }
            else {
                currentTermArray.push(pr);
            }
        }
    });
    console.log("currentTermArray", currentTermArray);
    return "hello";
};
exports.programCompiler = programCompiler;
//# sourceMappingURL=index.js.map