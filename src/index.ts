import { core } from "./coreb";
import { corec } from "./corec";
import { termChecker } from "./helper";
import { lineParser } from "./textConverter";

const runFinal = (text: string, input: string) => {
  const first = lineParser(text, 0);

  const firstTerm = first.term;

  const currentTerm = termChecker(firstTerm);

  return corec[currentTerm](input, first.a, first.b);
};

type SimplicityData = {
  term: string;
  program: string;
};

export const programCompiler = (input: string, programList: SimplicityData[]) => {
  const customInput = input.split(" ");
  const userCommand = customInput[0];
  const userInput = customInput.slice(1).join("");

  const termList = programList.map((pr) => pr.term);
  const userTermIndex = termList.findIndex((pl) => pl === userCommand);

  const currentTermArray: SimplicityData[] = [];

  programList.slice(0, userTermIndex + 1).forEach((pr: SimplicityData, index: number) => {
    if (index === 0) {
      currentTermArray.push(pr);
    } else {
      const isExist = termList.findIndex((tl) => tl === pr.program);
      console.log(isExist);

      if (isExist > -1) {
        currentTermArray.push({ ...pr, program: currentTermArray[isExist].program });
      } else {
        currentTermArray.push(pr);
      }
    }
  });

  console.log("currentTermArray", currentTermArray);

  return "hello";
};
