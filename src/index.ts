import { core } from "./coreb";
import { corec } from "./corec";
import { programConverter, SimplicityData, termChecker } from "./helper";
import { lineParser } from "./textConverter";

const runFinal = (text: string, input: string) => {
  const first = lineParser(text, 0);

  const firstTerm = first.term;

  const currentTerm = termChecker(firstTerm);

  return corec[currentTerm](input, first.a, first.b);
};

export const programCompiler = (input: string, programList: SimplicityData[]) => {
  const customInput = input.split(" ");
  const userCommand = customInput[0];
  const userInput = customInput.slice(1).join("");

  const convertedProgram = programConverter(programList);

  const currentProgram = convertedProgram.find((a) => a.term === userCommand);

  if (currentProgram) {
    console.log("res", runFinal(currentProgram.program, input));
    return runFinal(currentProgram.program, userInput);
  } else {
    return "Wrong Program !";
  }
};
