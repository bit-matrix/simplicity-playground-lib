// import { iden, injl, injr, pair, unit } from "./core";

import { core } from "./coreb";
import { lineParser, textConverter } from "./textConverter";

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

const input = "4";
const truebit = core.injr(core.iden(input));
const falsebit = core.injl(core.iden(input));

console.log("truebit", truebit);
console.log("falsebit", falsebit);

// const x = core.pair(truebit, falsebit);

const z = core.injl(core.iden(core.iden(input)));

const x = core.comp(core.injl(""), core.iden(input));

console.log("x", x);

// console.log(truebit);
// console.log(falsebit);

// const term = "injr(unit)";
// const term2 = "injl(unit)";

// const bs01 = core.pair(input, core.injl(null, core.unit), core.injr);

// console.log(bs01);

const compiler = (text: string) => {
  const finalData: any = [];
  let result = lineParser(text, 0);

  finalData.push(result);

  const recursive = (inp: number) => {
    let index = inp;
    const data = finalData[index - 1];

    if (data.a) {
      let aText: string = data.a.substring(1);
      aText = aText.slice(0, -1);

      if (aText.charAt(aText.length - 1) === ")") {
        const resultA = lineParser(aText, index);
        finalData.push(resultA);
      }
    }

    if (data.b) {
      let bText = data.b.substring(1);
      bText = bText.slice(0, -1);

      if (bText.charAt(bText.length - 1) === ")") {
        const resultB = lineParser(bText, index);
        finalData.push(resultB);
      }
    }

    try {
      const newIndex = (index += 1);
      recursive(newIndex);
    } catch {
      console.log("end of recursive");
    }
  };

  recursive(1);

  return finalData;
};
