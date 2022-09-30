"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coreb_1 = require("./coreb");
var helper_1 = require("./helper");
var textConverter_1 = require("./textConverter");
var compiler = function (text) {
    var finalData = [];
    var result = (0, textConverter_1.lineParser)(text, 0);
    finalData.push(result);
    var recursive = function (inp) {
        var index = inp;
        var data = finalData[index - 1];
        if (data.a) {
            var aText = data.a.substring(1);
            aText = aText.slice(0, -1);
            if (aText.charAt(aText.length - 1) === ")") {
                var resultA = (0, textConverter_1.lineParser)(aText, index);
                finalData.push(resultA);
            }
        }
        if (data.b) {
            var bText = data.b.substring(1);
            bText = bText.slice(0, -1);
            if (bText.charAt(bText.length - 1) === ")") {
                var resultB = (0, textConverter_1.lineParser)(bText, index);
                finalData.push(resultB);
            }
        }
        try {
            var newIndex = (index += 1);
            recursive(newIndex);
        }
        catch (_a) { }
    };
    recursive(1);
    return finalData;
};
var input = "1";
var bs_01 = "pair(injl(comp(comp(iden)(injl(iden)))(injr(iden))))(injr(iden))";
// const bs_01 = "pair(injl(unit))(injr(unit))";
var result = compiler(bs_01);
var run = function (input) {
    var reversedData = result.sort(function (a, b) { return b.termIndex - a.termIndex; });
    var leafCount = reversedData[0].termIndex;
    var resultData = [];
    console.log("reverseddata:", reversedData);
    reversedData.forEach(function (data) {
        if (data.termIndex === leafCount) {
            if (data.a) {
                var term = data.a.slice(1, -1);
                var currentTerm_1 = (0, helper_1.termChecker)(term);
                var funcResult = coreb_1.core[currentTerm_1](input, "", "", "");
                resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
            }
            if (data.b) {
                var term = data.b.slice(1, -1);
                var currentTerm_2 = (0, helper_1.termChecker)(term);
                var funcResult = coreb_1.core[currentTerm_2](input, "", "", "");
                resultData.push({ term: data.term, index: data.termIndex, b: funcResult });
            }
        }
        else {
            var previousData = resultData.filter(function (rd) {
                return rd.index === data.termIndex + 1;
            });
            if (data.a) {
                var term = data.a.slice(1, 5);
                var currentTerm_3 = (0, helper_1.termChecker)(term);
                var funcResult = coreb_1.core[currentTerm_3](previousData[0].a, "", "", "");
                resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
            }
            if (data.b) {
                var term = data.b.slice(1, 5);
                var currentTerm_4 = (0, helper_1.termChecker)(term);
                var funcResult = coreb_1.core[currentTerm_4](previousData[1].a, "", "", "");
                resultData.push({ term: data.term, index: data.termIndex, b: funcResult });
            }
        }
    });
    var finalStep = resultData.filter(function (rd) { return rd.index === 0; });
    var finalTerm = finalStep[0].term;
    var currentTerm = (0, helper_1.termChecker)(finalTerm);
    var finalResult = "";
    if (finalStep.length === 1) {
        finalResult = coreb_1.core[currentTerm](finalStep[0].a, "", "", "");
    }
    if (finalStep.length === 2) {
        finalResult = coreb_1.core[currentTerm](finalStep[0].a, finalStep[1].b, "", "");
    }
    console.log(finalResult);
};
run("1");
//# sourceMappingURL=index.js.map