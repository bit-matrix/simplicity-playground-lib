// import { iden, injl, injr, pair, unit } from "./core";

import { core } from "./core";
import { test, textConverter } from "./textConverter";

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

// const true_bit = injr(null, unit);
// const false_bit = injl(null, unit);

// const output_ = injr(false_bit, iden);

// // const result = stringifyData(output_ || []);

// console.log(result);

// textConverter();

const compiler = (text: string) => {
  const finalData: any = [];
  let result = test(text, 0);

  finalData.push(result);

  const recursive = (inp: number) => {
    let index = inp;
    const data = finalData[index - 1];

    if (data.a) {
      let aText: string = data.a.substring(1);
      aText = aText.slice(0, -1);

      if (aText.charAt(aText.length - 1) === ")") {
        const resultA = test(aText, index);
        finalData.push(resultA);
      }
    }

    if (data.b) {
      let bText = data.b.substring(1);
      bText = bText.slice(0, -1);

      if (bText.charAt(bText.length - 1) === ")") {
        const resultB = test(bText, index);
        finalData.push(resultB);
      }
    }

    try {
      const newIndex = (index += 1);
      recursive(newIndex);
    } catch {
      console.log("bitti");
    }
  };

  recursive(1);

  return finalData;
};

// let i = 1;

// while (i < 8) {
//   const data = finalData[i - 1];

//   if (data.a) {
//     let aText: string = data.a.substring(1);
//     aText = aText.slice(0, -1);

//     if (aText.charAt(aText.length - 1) === ")") {
//       const resultA = test(aText, i);
//       finalData.push(resultA);
//     }
//   }

//   if (data.b) {
//     let bText = data.b.substring(1);
//     bText = bText.slice(0, -1);

//     if (bText.charAt(bText.length - 1) === ")") {
//       const resultB = test(bText, i);
//       finalData.push(resultB);
//     }
//   }
//   i++;
// }

const text = "pair(injl(comp(comp(iden)(injl(iden)))(injr(iden))))(injr(iden))";

compiler(text);
