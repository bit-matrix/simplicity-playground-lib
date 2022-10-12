import { core } from "./coreb";
import { corec } from "./corec";
import { termChecker } from "./helper";
import { lineParser } from "./textConverter";

const recursive = (input: string, finalData: any[], index: number) => {
  const data = finalData[index - 1];
  let manipulatedInput = input;

  if (data.a) {
    let aText: string = data.a.substring(1);
    aText = aText.slice(0, -1);

    if (aText.charAt(aText.length - 1) === ")") {
      const resultA = lineParser(aText, index);
      finalData.push(resultA);
    } else {
      const currentTerm = termChecker(aText);

      const exec = core[currentTerm](manipulatedInput, "", "");

      const newFinalData = [...finalData];
      newFinalData[data.termIndex] = { ...data, a: exec };
      finalData = newFinalData;
    }
  }

  if (data.b) {
    let bText = data.b.substring(1);
    bText = bText.slice(0, -1);

    if (bText.charAt(bText.length - 1) === ")") {
      const resultB = lineParser(bText, index);
      finalData.push(resultB);
    } else {
      const currentTerm = termChecker(bText);
      const exec = core[currentTerm](manipulatedInput, "", "");

      const newFinalData = [...finalData];
      newFinalData[data.termIndex] = { ...data, b: exec };

      finalData = newFinalData;
    }
  }

  try {
    index++;
    recursive(manipulatedInput, finalData, index);
  } catch (err) {
  } finally {
    return finalData;
  }
};

const compiler = (text: string) => {
  let finalData: any = [];
  let result = { ...lineParser(text, 0), dataIndex: 0 };

  finalData.push(result);

  return finalData;
};

const runFinal = (text: string, input: string) => {
  const first = lineParser(text, 0);
  const firstTerm = first.term;

  const currentTerm = termChecker(firstTerm);

  console.log("first", first);
  console.log("here", corec[currentTerm](input, first.a, first.b));

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

const not = "comp(pair(iden)(unit))(case(injr(unit))(injl(unit)))";
const halfAdder = "case(drop(pair(injl(unit))(iden)))(drop(pair(iden)(" + not + ")))";

const true_bit = "injr(unit)";
const false_bit = "injl(unit)";

//01000001

const bs_01 = "pair(" + false_bit + ")" + "(" + true_bit + ")";
const bs_00 = "pair(" + false_bit + ")" + "(" + false_bit + ")";
const bs_10 = "pair(" + true_bit + ")" + "(" + false_bit + ")";
const bs_11 = "pair(" + true_bit + ")" + "(" + true_bit + ")";

const bs_0100 = "pair(" + bs_01 + ")" + "(" + bs_00 + ")";

const input = "<σL(<>),σR(<>)>";

const uzun = "pair(pair(unit)(pair(pair(iden)(injl(iden)))(pair(injr(iden))(iden))))(pair(pair(pair(injr(iden))(iden))(pair(iden)(injl(iden))))(unit))";
console.log("bs_01", bs_0100);

const res = runFinal(uzun, input);

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

type SimplicityData = {
  term: string;
  program: string;
};

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
