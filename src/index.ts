import { core } from "./coreb";
import { termChecker } from "./helper";
import { lineParser } from "./textConverter";

const input = "<>";

const true_bit = "injr(unit)";
const false_bit = "injl(unit)";
// const not = "pair(injr(unit))(injl(unit))";

const not = "pair(injl(comp(comp(iden)(injl(iden)))(injr(iden))))(injr(iden))";

const compiler = (text: string) => {
  let finalData: any = [];
  let result = lineParser(text, 0);
  let manipulatedInput = input;

  finalData.push(result);

  const recursive = (inp: number) => {
    let index = inp;
    let execute = false;

    const data = finalData[index - 1];

    if (data.a) {
      let aText: string = data.a.substring(1);
      aText = aText.slice(0, -1);

      if (aText.charAt(aText.length - 1) === ")") {
        const resultA = lineParser(aText, index);
        finalData.push(resultA);
      } else {
        execute = true;
      }
    }

    if (data.b) {
      let bText = data.b.substring(1);
      bText = bText.slice(0, -1);

      if (bText.charAt(bText.length - 1) === ")") {
        const resultB = lineParser(bText, index);
        finalData.push(resultB);
        execute = false;
      } else {
        execute = true;
      }
    }

    if (execute) {
      const newFinalData = [...finalData];

      if (data.a && data.b) {
        const term0 = data.term;
        const term1 = data.a.slice(1, -1);
        const term2 = data.b.slice(1, -1);

        const currentTerm0 = termChecker(term0);
        const currentTerm1 = termChecker(term1);
        const currentTerm2 = termChecker(term2);

        const funcResult1 = core[currentTerm1](manipulatedInput, "", "");
        const funcResult2 = core[currentTerm2](manipulatedInput, "", "");

        const final = core[currentTerm0](funcResult1, funcResult2, "");
        const findMainIndex = newFinalData.findIndex((nfw) => nfw.termIndex === data.termIndex - 1);
        const previousData = newFinalData[findMainIndex];
        // const previousDataA = previousData.a.startsWith("(" + currentTerm0);

        // if (previousDataA) {
        //   newFinalData[findMainIndex] = { ...newFinalData[findMainIndex], a: final };
        // } else {
        //   newFinalData[findMainIndex] = { ...newFinalData[findMainIndex], b: final };
        // }

        newFinalData[inp - 1] = { ...newFinalData[inp - 1], exec: final };

        if (previousData.term === "comp") {
          manipulatedInput = final;
        }
      } else {
        const term0 = data.term;
        const term1 = data.a.slice(1, -1);
        const currentTerm0 = termChecker(term0);
        const currentTerm1 = termChecker(term1);
        const funcResult1 = core[currentTerm1](manipulatedInput, "", "");
        const final = core[currentTerm0](funcResult1, "", "");

        if (!newFinalData[inp - 2].exec) {
          newFinalData[inp - 2] = { ...newFinalData[inp - 2], a: final };
        } else {
          newFinalData[inp - 3] = { ...newFinalData[inp - 3], b: final };

          const willExecData = newFinalData[inp - 3];
          const execTerm = willExecData.term;
          const execTermCurrent = termChecker(execTerm);
          let finalResult = "";

          if (execTermCurrent === "case") {
            finalResult = core[execTermCurrent](manipulatedInput, willExecData.a, willExecData.b);
          } else {
            finalResult = core[execTermCurrent](willExecData.a, willExecData.b);
          }

          newFinalData[inp - 3] = { ...newFinalData[inp - 3], exec: finalResult };
        }

        newFinalData[inp - 1] = { ...newFinalData[inp - 1], exec: final };

        if (newFinalData[inp - 2].term && newFinalData[inp - 2].term === "comp") {
          manipulatedInput = final;
        }
      }

      finalData = newFinalData;
    }

    try {
      index++;
      recursive(index);
    } catch (err) {}
  };

  recursive(1);

  console.log("finalData", finalData);

  const program = finalData[0];
  let s: any;
  let t: any;

  if (program.a) {
    s = finalData[1];
  }

  if (program.b) {
    t = finalData[2];
  }

  const currentTerm = termChecker(program.term);

  if (program.exec) {
    return program.exec;
  }

  if (currentTerm === "comp") {
    return t.exec;
  }

  return s.exec;
};

const res = compiler(not);

console.log(res);

// const not = "pair(injl(comp(comp(iden)(injl(iden)))(injr(iden))))(injr(iden))";

// const result: any[] = compiler(not);

// console.log(result);

// let effect = false;

// const runProgram = () => {
//   const customResult: any[] = result.map((res, index) => {
//     if (index > 0 && res.termIndex - result[index - 1].termIndex > 1) {
//       effect = true;
//       return { ...res, termIndex: res.termIndex - 1 };
//     } else {
//       if (effect) return { ...res, termIndex: res.termIndex - 1 };
//       return res;
//     }
//   });

//   const programTreeLength = customResult[customResult.length - 1].termIndex;
//   const program = customResult[0];
//   let termMemory: any = [];
//   let termIndex = 1;

//   while (termIndex <= programTreeLength) {
//     const siblings = customResult.filter((value) => value.termIndex === termIndex);

//     if (termIndex === 1) {
//       termMemory.push({ main: program, programIndex: 0, siblings });
//     } else {
//       const previousData = termMemory[termIndex - 2];
//       if (siblings.length === 2) {
//         termMemory.push({ main: previousData.siblings[previousData.siblings.length - 1], programIndex: 1, siblings });
//       } else {
//         termMemory.push({ main: previousData.siblings[previousData.siblings.length - 2], programIndex: 0, siblings });
//       }
//     }
//     termIndex++;
//   }

//   let programResult: any = [];

// console.log(termMemory);

// termMemory.forEach((tm: any, index: number) => {
//   if (tm.main.term === "comp") {
//     const s = tm.siblings[0];
//     const t = tm.siblings[1];

//     if (termMemory[index + 1].programIndex !== 0) {
//       const term0 = s.term;
//       const term1 = s.a.slice(1, -1);
//       const term2 = s.b.slice(1, -1);

//       const currentTerm0 = termChecker(term0);
//       const currentTerm1 = termChecker(term1);
//       const currentTerm2 = termChecker(term2);

//       const funcResult1 = core[currentTerm1](input, "");
//       const funcResult2 = core[currentTerm2](input, "");

//       const final = core[currentTerm0](funcResult1, funcResult2);

//       programResult.push({ main: { ...tm.main, a: final } });
//     } else {
//       console.log(tm);
//     }
//   }
// });

// console.log(programResult);
// };

// runProgram();

// const run = (input: string) => {
//   let effect = false;
//   const customResult: any[] = result.map((res, index) => {
//     if (index > 0 && res.termIndex - result[index - 1].termIndex > 1) {
//       effect = true;
//       return { ...res, termIndex: res.termIndex - 1 };
//     } else {
//       if (effect) return { ...res, termIndex: res.termIndex - 1 };
//       return res;
//     }
//   });

//   const reversedData = customResult.sort((a, b) => b.termIndex - a.termIndex);
//   const leafCount = reversedData[0].termIndex;
//   const resultData: any = [];

//   console.log("reversedData,", reversedData);

//   reversedData.forEach((data) => {
//     if (data.termIndex === leafCount) {
//       if (data.a) {
//         const term = data.a.slice(1, -1);
//         const currentTerm = termChecker(term);
//         const funcResult = core[currentTerm](input, "", "");

//         resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
//       }

//       // if (data.b) {
//       //   const term = data.b.slice(1, -1);
//       //   const currentTerm = termChecker(term);
//       //   const funcResult = core[currentTerm](input, "", "", "");

//       //   resultData.push({ term: data.term, index: data.termIndex, b: funcResult });
//       // }
//     } else {
//       const previousData = resultData.filter((rd: any) => {
//         return rd.index === data.termIndex + 1;
//       });

//       if (data.a) {
//         const term = data.a.slice(1, 5);
//         const currentTerm = termChecker(term);
//         let newInput = previousData[0].a;

//         if (previousData.length === 1 && term !== previousData[0].term) newInput = input;

//         const funcResult = core[currentTerm](newInput, "", "");

//         resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
//       }

//       if (data.b) {
//         const term = data.b.slice(1, 5);
//         const currentTerm = termChecker(term);

//         let newInput = input;

//         if (previousData.length === 1 && term === previousData[0].term) {
//           newInput = previousData[0].a;
//         }

//         if (previousData.length === 2 && term === previousData[1].term) {
//           previousData[1].b ? (newInput = previousData[1].b) : (newInput = previousData[1].a);
//         }

//         const funcResult = core[currentTerm](newInput, "", "");

//         resultData.push({ term: data.term, index: data.termIndex, b: funcResult });
//       }
//     }
//   });

//   const finalStep = resultData.filter((rd: any) => rd.index === 0);

//   const finalTerm = finalStep[0].term;
//   const currentTerm = termChecker(finalTerm);
//   let finalResult = "";

//   if (finalStep.length === 1) {
//     finalResult = core[currentTerm](finalStep[0].a, "", "");
//   }

//   if (finalStep.length === 2) {
//     finalResult = core[currentTerm](finalStep[0].a, finalStep[1].b, "");
//   }

//   console.log(finalResult);
// };
