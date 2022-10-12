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
var coreb_1 = require("./coreb");
var corec_1 = require("./corec");
var helper_1 = require("./helper");
var textConverter_1 = require("./textConverter");
var recursive = function (input, finalData, index) {
    var data = finalData[index - 1];
    var manipulatedInput = input;
    if (data.a) {
        var aText = data.a.substring(1);
        aText = aText.slice(0, -1);
        if (aText.charAt(aText.length - 1) === ")") {
            var resultA = (0, textConverter_1.lineParser)(aText, index);
            finalData.push(resultA);
        }
        else {
            var currentTerm = (0, helper_1.termChecker)(aText);
            var exec = coreb_1.core[currentTerm](manipulatedInput, "", "");
            var newFinalData = __spreadArray([], finalData, true);
            newFinalData[data.termIndex] = __assign(__assign({}, data), { a: exec });
            finalData = newFinalData;
        }
    }
    if (data.b) {
        var bText = data.b.substring(1);
        bText = bText.slice(0, -1);
        if (bText.charAt(bText.length - 1) === ")") {
            var resultB = (0, textConverter_1.lineParser)(bText, index);
            finalData.push(resultB);
        }
        else {
            var currentTerm = (0, helper_1.termChecker)(bText);
            var exec = coreb_1.core[currentTerm](manipulatedInput, "", "");
            var newFinalData = __spreadArray([], finalData, true);
            newFinalData[data.termIndex] = __assign(__assign({}, data), { b: exec });
            finalData = newFinalData;
        }
    }
    try {
        index++;
        recursive(manipulatedInput, finalData, index);
    }
    catch (err) {
    }
    finally {
        return finalData;
    }
};
var compiler = function (text) {
    var finalData = [];
    var result = __assign(__assign({}, (0, textConverter_1.lineParser)(text, 0)), { dataIndex: 0 });
    finalData.push(result);
    return finalData;
};
var runFinal = function (text, input) {
    var first = (0, textConverter_1.lineParser)(text, 0);
    var firstTerm = first.term;
    var currentTerm = (0, helper_1.termChecker)(firstTerm);
    console.log("first", first);
    console.log("here", corec_1.corec[currentTerm](input, first.a, first.b));
    if (currentTerm === "comp") {
        // @TO-DO comp logic
    }
    // const funcResult1 = core[currentTerm](input, first.a, first.b || "");
    // const designedData = lineParser(funcResult1.slice(1, -1), 0);
    // const currentTerm2 = termChecker(designedData.term);
    // const funcResult2 = core[currentTerm2](input, first.a, first.b || "");
    // const designedData2 = lineParser(designedData.a.slice(1, -1), 1);
    // console.log(designedData2);
    // const currentTerm3 = termChecker(designedData.term);
    // console.log(recursiveResult);
    // const startTerm = parsedData[0].term;
    // console.log(startTerm);
    //   const newFinalData = [...finalData];
    //   if (data.a && data.b) {
    //     const term0 = data.term;
    //     const term1 = data.a.slice(1, -1);
    //     const term2 = data.b.slice(1, -1);
    //     const currentTerm0 = termChecker(term0);
    //     const currentTerm1 = termChecker(term1);
    //     const currentTerm2 = termChecker(term2);
    //     const funcResult1 = core[currentTerm1](manipulatedInput, "", "");
    //     const funcResult2 = core[currentTerm2](manipulatedInput, "", "");
    //     const final = core[currentTerm0](funcResult1, funcResult2, "");
    //     const findMainIndex = newFinalData.findIndex((nfw) => nfw.termIndex === data.termIndex - 1);
    //     const previousData = newFinalData[findMainIndex];
    //     // const previousDataA = previousData.a.startsWith("(" + currentTerm0);
    //     // if (previousDataA) {
    //     //   newFinalData[findMainIndex] = { ...newFinalData[findMainIndex], a: final };
    //     // } else {
    //     //   newFinalData[findMainIndex] = { ...newFinalData[findMainIndex], b: final };
    //     // }
    //     // console.log("test", inp / 2 - 1, data);
    //     newFinalData[inp - 1] = { ...newFinalData[inp - 1], exec: final };
    //     if (previousData.term === "comp") {
    //       manipulatedInput = final;
    //     }
    //   } else {
    //     const term0 = data.term;
    //     const term1 = data.a.slice(1, -1);
    //     const currentTerm0 = termChecker(term0);
    //     const currentTerm1 = termChecker(term1);
    //     const funcResult1 = core[currentTerm1](manipulatedInput, "", "");
    //     const final = core[currentTerm0](funcResult1, "", "");
    //     const isExist = newFinalData.filter((nfd) => nfd.termIndex === data.termIndex).length > 0;
    //     let previousData = newFinalData.filter((nfd) => nfd.termIndex === data.termIndex - 1);
    //     if (previousData.length === 0) {
    //       previousData = newFinalData.filter((nfd) => nfd.termIndex === data.termIndex - 2);
    //     }
    //     if (!newFinalData[inp - 2].exec) {
    //       newFinalData[inp - 2] = { ...newFinalData[inp - 2], a: final };
    //     } else {
    //       newFinalData[inp - 3] = { ...newFinalData[inp - 3], b: final };
    //       const willExecData = newFinalData[inp - 3];
    //       const execTerm = willExecData.term;
    //       const execTermCurrent = termChecker(execTerm);
    //       let finalResult = "";
    //       if (execTermCurrent === "case") {
    //         finalResult = core[execTermCurrent](manipulatedInput, willExecData.a, willExecData.b);
    //       } else {
    //         finalResult = core[execTermCurrent](willExecData.a, willExecData.b);
    //       }
    //       newFinalData[inp - 3] = { ...newFinalData[inp - 3], exec: finalResult };
    //     }
    //     newFinalData[inp - 1] = { ...newFinalData[inp - 1], exec: final };
    //     if (newFinalData[inp - 2].term && newFinalData[inp - 2].term === "comp") {
    //       manipulatedInput = final;
    //     }
    //   }
    //   finalData = newFinalData;
    // }
    // const program = finalData[0];
    // let s: any;
    // let t: any;
    // if (program.a) {
    //   s = finalData[1];
    // }
    // if (program.b) {
    //   t = finalData[2];
    // }
    // const currentTerm = termChecker(program.term);
    // if (program.exec) {
    //   return program.exec;
    // }
    // if (currentTerm === "comp") {
    //   return t.exec;
    // }
    // if (currentTerm === "pair") {
    //   return core.pair(s.exec, t.exec);
    // }
    // return s.exec;
};
// const res = compiler(bs_0100);
var not = "comp(pair(iden)(unit))(case(injr(unit))(injl(unit)))";
var halfAdder = "case(drop(pair(injl(unit))(iden)))(drop(pair(iden)(" + not + ")))";
var true_bit = "injr(unit)";
var false_bit = "injl(unit)";
//01000001
var bs_01 = "pair(" + false_bit + ")" + "(" + true_bit + ")";
var bs_00 = "pair(" + false_bit + ")" + "(" + false_bit + ")";
var bs_10 = "pair(" + true_bit + ")" + "(" + false_bit + ")";
var bs_11 = "pair(" + true_bit + ")" + "(" + true_bit + ")";
var bs_0100 = "pair(" + bs_01 + ")" + "(" + bs_00 + ")";
var input = "<σL(<>),σR(<>)>";
var uzun = "pair(pair(unit)(pair(pair(iden)(injl(iden)))(pair(injr(iden))(iden))))(pair(pair(pair(injr(iden))(iden))(pair(iden)(injl(iden))))(unit))";
console.log("bs_01", bs_0100);
var res = runFinal(uzun, input);
// export const programCompiler = (input: string, programList: SimplicityData[]) => {
//   const customInput = input.split(" ");
//   const userCommand = customInput[0];
//   const userInput = customInput.slice(1).join("");
//   const termList = programList.map((pr) => pr.term);
//   const userTermIndex = termList.findIndex((pl) => pl === userCommand);
//   const currentTermArray: SimplicityData[] = [];
//   programList.slice(0, userTermIndex + 1).forEach((pr: SimplicityData, index: number) => {
//     if (index === 0) {
//       currentTermArray.push(pr);
//     } else {
//       const isExist = termList.findIndex((tl) => tl === pr.program);
//       console.log(isExist);
//       if (isExist > -1) {
//         currentTermArray.push({ ...pr, program: currentTermArray[isExist].program });
//       } else {
//         currentTermArray.push(pr);
//       }
//     }
//   });
//   console.log("currentTermArray", currentTermArray);
//   return "hello";
// };
//# sourceMappingURL=index.js.map