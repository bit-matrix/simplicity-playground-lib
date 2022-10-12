"use strict";
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
    var convertedProgram = (0, helper_1.programConverter)(programList);
    var currentProgram = convertedProgram.find(function (a) { return a.term === userCommand; });
    if (currentProgram) {
        return runFinal(currentProgram.program, userInput);
    }
    else {
        return "Wrong Program !";
    }
};
exports.programCompiler = programCompiler;
//# sourceMappingURL=index.js.map