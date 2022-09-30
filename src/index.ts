import { core } from "./coreb";
import { termChecker } from "./helper";
import { lineParser } from "./textConverter";

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
      index++;
      recursive(index);
    } catch {}
  };

  recursive(1);

  return finalData;
};

const bs_01 = "comp(pair(iden)(unit))(case(injr(unit))(injl(unit)))";
// const bs_01 = "pair(injl(iden))(injr(iden))";

const result: any[] = compiler(bs_01);

console.log(result);

const run = (input: string) => {
  let effect = false;
  const customResult: any[] = result.map((res, index) => {
    if (index > 0 && res.termIndex - result[index - 1].termIndex > 1) {
      effect = true;
      return { ...res, termIndex: res.termIndex - 1 };
    } else {
      if (effect) return { ...res, termIndex: res.termIndex - 1 };
      return res;
    }
  });

  const reversedData = customResult.sort((a, b) => b.termIndex - a.termIndex);
  const leafCount = reversedData[0].termIndex;
  const resultData: any = [];

  console.log("reversedData,", reversedData);

  reversedData.forEach((data) => {
    if (data.termIndex === leafCount) {
      if (data.a) {
        const term = data.a.slice(1, -1);
        const currentTerm = termChecker(term);
        const funcResult = core[currentTerm](input, "", "", "");

        resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
      }

      // if (data.b) {
      //   const term = data.b.slice(1, -1);
      //   const currentTerm = termChecker(term);
      //   const funcResult = core[currentTerm](input, "", "", "");

      //   resultData.push({ term: data.term, index: data.termIndex, b: funcResult });
      // }
    } else {
      const previousData = resultData.filter((rd: any) => {
        return rd.index === data.termIndex + 1;
      });

      if (data.a) {
        const term = data.a.slice(1, 5);
        const currentTerm = termChecker(term);
        let newInput = previousData[0].a;

        if (previousData.length === 1 && term !== previousData[0].term) newInput = input;

        const funcResult = core[currentTerm](newInput, "", "", "");

        resultData.push({ term: data.term, index: data.termIndex, a: funcResult });
      }

      if (data.b) {
        const term = data.b.slice(1, 5);
        const currentTerm = termChecker(term);

        let newInput = input;

        console.log(currentTerm);
        console.log(previousData);

        if (previousData.length === 1 && term === previousData[0].term) {
          newInput = previousData[0].a;
        }

        if (previousData.length === 2 && term === previousData[1].term) {
          previousData[1].b ? (newInput = previousData[1].b) : (newInput = previousData[1].a);
        }

        const funcResult = core[currentTerm](newInput, "", "", "");

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

run("[not]σR(<>)");
