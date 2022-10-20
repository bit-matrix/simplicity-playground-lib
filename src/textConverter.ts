import { termArgumenetCount, termChecker } from "./helper";

export const lineParser = (text: string, termIndex: number) => {
  if (text === "iden" || text === "unit") {
    return { term: text };
  }

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

  if (final.length > 0) {
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
    } else if (arguementCount === 1) {
      const a = final[0].args;
      result = { term: termName, termIndex, a };
    } else if (arguementCount === 0) {
      result = { term: termName, termIndex };
    }

    return result;
  }
};
