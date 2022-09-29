"use strict";
// import { iden, injl, injr, pair, unit } from "./core";
Object.defineProperty(exports, "__esModule", { value: true });
var coreb_1 = require("./coreb");
var textConverter_1 = require("./textConverter");
// let output = "";
// export const stringifyData = (input: any[]) => {
//   const tag = input[0];
//   if (tag == 0) {
//   } else if (tag == 1) {
//     output += "σL(";
//   } else if (tag == 2) {
//     output += "σR(";
//   }
//   if (input.length == 2) {
//     if (input[1] == 1) {
//       output += "<>";
//     } else {
//       stringifyData(input[1]);
//     }
//   } else {
//     output += "<";
//     if (input[1] == 1) {
//       output += "<>";
//     } else {
//       stringifyData(input[1]);
//     }
//     output += ",";
//     if (input[2] == 1) {
//       output += "<>";
//     } else {
//       stringifyData(input[2]);
//     }
//     output += ">";
//   }
//   if (tag == 0) {
//   } else if (tag == 1) {
//     output += ")";
//   } else if (tag == 2) {
//     output += ")";
//   }
//   return output;
// };
// // const result = stringifyData(output_ || []);
// console.log(result);
// textConverter();
var input = "4";
var truebit = coreb_1.core.injr(coreb_1.core.iden(input));
var falsebit = coreb_1.core.injl(coreb_1.core.iden(input));
console.log("truebit", truebit);
console.log("falsebit", falsebit);
// const x = core.pair(truebit, falsebit);
var z = coreb_1.core.injl(coreb_1.core.iden(coreb_1.core.iden(input)));
var x = coreb_1.core.comp(coreb_1.core.injl(""), coreb_1.core.iden(input));
console.log("x", x);
// console.log(truebit);
// console.log(falsebit);
// const term = "injr(unit)";
// const term2 = "injl(unit)";
// const bs01 = core.pair(input, core.injl(null, core.unit), core.injr);
// console.log(bs01);
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
        catch (_a) {
            console.log("end of recursive");
        }
    };
    recursive(1);
    return finalData;
};
//# sourceMappingURL=index.js.map