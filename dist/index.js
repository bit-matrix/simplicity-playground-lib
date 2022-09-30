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
            index++;
            recursive(index);
        }
        catch (_a) { }
    };
    recursive(1);
    return finalData;
};
var bs_01 = "comp(pair(iden)(unit))(case(injr(unit))(injl(unit)))";
// const bs_01 = "pair(injl(iden))(injr(iden))";
var result = compiler(bs_01);
console.log(result);
var run = function (input) {
    var effect = false;
    var customResult = result.map(function (res, index) {
        if (index > 0 && res.termIndex - result[index - 1].termIndex > 1) {
            effect = true;
            return __assign(__assign({}, res), { termIndex: res.termIndex - 1 });
        }
        else {
            if (effect)
                return __assign(__assign({}, res), { termIndex: res.termIndex - 1 });
            return res;
        }
    });
    var reversedData = customResult.sort(function (a, b) { return b.termIndex - a.termIndex; });
    var leafCount = reversedData[0].termIndex;
    var resultData = [];
    console.log("reversedData,", reversedData);
    reversedData.forEach(function (data) {
        if (data.termIndex === leafCount) {
            if (data.a) {
                var term = data.a.slice(1, -1);
                var currentTerm_1 = (0, helper_1.termChecker)(term);
                var funcResult = coreb_1.core[currentTerm_1](input, "", "", "");
                resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
            }
            // if (data.b) {
            //   const term = data.b.slice(1, -1);
            //   const currentTerm = termChecker(term);
            //   const funcResult = core[currentTerm](input, "", "", "");
            //   resultData.push({ term: data.term, index: data.termIndex, b: funcResult });
            // }
        }
        else {
            var previousData = resultData.filter(function (rd) {
                return rd.index === data.termIndex + 1;
            });
            if (data.a) {
                var term = data.a.slice(1, 5);
                var currentTerm_2 = (0, helper_1.termChecker)(term);
                var newInput = previousData[0].a;
                if (previousData.length === 1 && term !== previousData[0].term)
                    newInput = input;
                var funcResult = coreb_1.core[currentTerm_2](newInput, "", "", "");
                resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
            }
            if (data.b) {
                var term = data.b.slice(1, 5);
                var currentTerm_3 = (0, helper_1.termChecker)(term);
                var newInput = input;
                console.log(currentTerm_3);
                console.log(previousData);
                if (previousData.length === 1 && term === previousData[0].term) {
                    newInput = previousData[0].a;
                }
                if (previousData.length === 2 && term === previousData[1].term) {
                    previousData[1].b ? (newInput = previousData[1].b) : (newInput = previousData[1].a);
                }
                var funcResult = coreb_1.core[currentTerm_3](newInput, "", "", "");
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
run("[not]σR(<>)");
//# sourceMappingURL=index.js.map