import { core } from "./core";
import { termArgumenetCount, termChecker } from "./helper";

let userCustomTerms = [];

export const textConverter = () => {
  const text = "func1 := comp(pair(iden)(unit))(injl(iden))";
  // const text = "func1 := unit";

  const textParser = text.split(" ");

  // first declaretion
  if (userCustomTerms.length === 0) {
    const functionName = textParser[0];
    const functionSyntax = textParser[1];

    if (functionSyntax != ":=") throw "Invalid simplicity function syntax";

    if (textParser.length < 3) throw "Invalid simplicity function declaretion";

    // const text = "func1 := unit";
    if (textParser.length === 3) {
      const firstTermText = textParser[2];

      if (firstTermText !== "unit" && firstTermText !== "iden") throw "Invalid term";

      const firstTerm = core[firstTermText];
    }

    // const text = "func1 := injl(unit)";
    if (textParser.length === 4) {
      const firstTermText = textParser[2];
      const secondTermText = textParser[3];

      if (firstTermText === "injl" || firstTermText === "injr" || firstTermText === "take" || firstTermText === "drop") {
        if (secondTermText !== "unit" && secondTermText !== "iden") throw "Invalid term";
      }

      const firstTermValid = termChecker(firstTermText);
      const secondTermValid = termChecker(secondTermText);
      const firstTerm = core[firstTermValid];
      const secondTerm = core[secondTermValid];
    }

    if (textParser.length > 4) {
      const termExpression = textParser.slice(2);

      const firstTermText = textParser[0];
      const firstTermValid = termChecker(firstTermText);

      if (termExpression[1].charAt(0) !== "(") throw "Invalid syntax";
    }

    userCustomTerms.push(functionName);
  }
};

export const lineParser = (text: string, termIndex: number) => {
  const parsedText = text.split("");

  let starts: number[] = [];
  let ends: number[] = [];

  for (let i = 0; i < parsedText.length; i++) {
    const data = parsedText[i];

    if (data === "(") {
      starts.push(i);
    }

    if (data === ")") {
      ends.push(i);
    }
  }

  const final: { s: number; e: number; args: string }[] = [];
  const sortedArray: number[] = [];
  const firstStartState = [...starts];

  ends.forEach((end) => {
    const clonedStarts = [...starts];
    clonedStarts.push(end);
    clonedStarts.sort((a, b) => a - b);

    const index = clonedStarts.findIndex((st) => st === end) - 1;

    sortedArray.push(starts[index]);
    starts.splice(index, 1);
  });

  firstStartState.forEach((fs) => {
    const endIndex = sortedArray.findIndex((rh) => rh === fs);

    final.push({ s: fs, e: ends[endIndex], args: text.slice(fs, ends[endIndex] + 1) });
  });

  let length = 0;

  const data = final[0];

  let result: any;

  const termNameText = text.substring(length, data.s);
  const termName = termChecker(termNameText);
  const arguementCount = termArgumenetCount(termName);
  length += data.s;

  if (arguementCount === 2) {
    const a = final[0].args;
    const bigEnd = ends.sort((a, b) => b - a)[0];
    const b = final.find((f) => f.e === bigEnd)?.args;

    result = { term: termName, termIndex, a, b };
    // const findRemovedB = ends.findIndex((en) => en === bigEnd);
    // ends.splice(findRemovedB, 1);

    // final.splice(0, 1);

    // const findB = final.findIndex((fn) => fn.e === bigEnd);

    // final.splice(findB, 1);
  } else if (arguementCount === 1) {
    const a = final[0].args;
    result = { term: termName, termIndex, a };
  }

  return result;
};
