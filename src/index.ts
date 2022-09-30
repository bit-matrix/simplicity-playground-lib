import { core } from "./coreb";
import { termChecker } from "./helper";
import { lineParser, textConverter } from "./textConverter";

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
    } catch {}
  };

  recursive(1);

  return finalData;
};

const input = "1";

const bs_01 = "pair(injl(comp(comp(iden)(injl(iden)))(injr(iden))))(injr(iden))";
// const bs_01 = "pair(injl(unit))(injr(unit))";

const result: any[] = compiler(bs_01);

const run = (input: string) => {
  const reversedData = result.sort((a, b) => b.termIndex - a.termIndex);
  const leafCount = reversedData[0].termIndex;
  const resultData: any = [];

  console.log("reverseddata:", reversedData);

  reversedData.forEach((data) => {
    if (data.termIndex === leafCount) {
      if (data.a) {
        const term = data.a.slice(1, -1);
        const currentTerm = termChecker(term);
        const funcResult = core[currentTerm](input, "", "", "");

        resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
      }

      if (data.b) {
        const term = data.b.slice(1, -1);
        const currentTerm = termChecker(term);
        const funcResult = core[currentTerm](input, "", "", "");

        resultData.push({ term: data.term, index: data.termIndex, b: funcResult });
      }
    } else {
      const previousData = resultData.filter((rd: any) => {
        return rd.index === data.termIndex + 1;
      });

      if (data.a) {
        const term = data.a.slice(1, 5);

        const currentTerm = termChecker(term);

        const funcResult = core[currentTerm](previousData[0].a, "", "", "");

        resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
      }

      if (data.b) {
        const term = data.b.slice(1, 5);
        const currentTerm = termChecker(term);
        const funcResult = core[currentTerm](previousData[1].a, "", "", "");

        resultData.push({ term: data.term, index: data.termIndex, b: funcResult });
      }
    }
  });

  const finalStep = resultData.filter((rd: any) => rd.index === 0);

  const finalTerm = finalStep[0].term;
  const currentTerm = termChecker(finalTerm);
  let finalResult = "";

  if (finalStep.length === 1) {
    finalResult = core[currentTerm](finalStep[0].a, "", "", "");
  }

  if (finalStep.length === 2) {
    finalResult = core[currentTerm](finalStep[0].a, finalStep[1].b, "", "");
  }

  console.log(finalResult);
};

run("1");
