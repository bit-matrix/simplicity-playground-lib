import { termChecker } from "./helper";
import { lineParser } from "./textConverter";

const unit = (a: string) => {
  if (!a) throw "A couldn't be empty";

  return "<>";
};

const iden = (a: string) => {
  return a;
};

const injl = (a: string, term: any): any => {
  let data = "";
  if (term.length > 6) {
    const s = termChecker(term.slice(1, 5));
    data = corec[s](a, "", "");
  } else {
    const s = termChecker(term.slice(1, -1));
    data = corec[s](a, "", "");
  }

  return "σL(" + data + ")";
};

const injr = (a: string, term: any): any => {
  let data = "";

  if (term.length > 6) {
    const s = termChecker(term.slice(1, 5));
    data = corec[s](a, "", "");
  } else {
    const s = termChecker(term.slice(1, -1));
    data = corec[s](a, "", "");
  }

  return "σR(" + data + ")";
};

const take = (input: string, term: any): any => {
  const line = term.length > 6 ? lineParser(term.slice(1, -1), 0) : term;
  const s = termChecker(term.slice(1, 5));
  let modifiedInput = input.split(",")[0].substring(1);

  return corec[s](modifiedInput, line.a, line.b);
};

const drop = (input: string, term: any): any => {
  const line = term.length > 6 ? lineParser(term.slice(1, -1), 0) : term;
  const s = termChecker(term.slice(1, 5));
  let modifiedInput = input.split(",")[1].slice(0, -1);

  return corec[s](modifiedInput, line.a, line.b);
};

const comp = (input: string, termA: any, termB: any): any => {
  const s = termChecker(termA.slice(1, 5));
  const t = termChecker(termB.slice(1, 5));

  let sPart = { a: "", b: "" };
  let tPart = { a: "", b: "" };

  if (termA.length > 6) {
    const parserResult = lineParser(termA.slice(1, -1), 0);

    sPart = { a: parserResult.a, b: parserResult.b };
  }

  if (termB.length > 6) {
    const parserResult = lineParser(termB.slice(1, -1), 0);

    tPart = { a: parserResult.a, b: parserResult.b };
  }

  return corec[t](corec[s](input, sPart.a, sPart.b), tPart.a, tPart.b);
};

const pair = (input: string, termA: any, termB: any): any => {
  const s = termChecker(termA.slice(1, 5));
  const t = termChecker(termB.slice(1, 5));

  let sPart = { a: "", b: "" };
  let tPart = { a: "", b: "" };

  if (termA.length > 6) {
    const parserResult = lineParser(termA.slice(1, -1), 0);

    sPart = { a: parserResult.a, b: parserResult.b };
  }

  if (termB.length > 6) {
    const parserResult = lineParser(termB.slice(1, -1), 0);

    tPart = { a: parserResult.a, b: parserResult.b };
  }

  return "<" + corec[s](input, sPart.a, sPart.b) + "," + corec[t](input, tPart.a, tPart.b) + ">";
};

const case_ = (input: string, termA: any, termB: any): any => {
  // @TO-DO throw
  const modifiedInput = input.split(",");
  const newFirstItem = modifiedInput[0].split("(").pop()!.split(")")[0];
  let finalInput = "<" + newFirstItem + ">," + modifiedInput[1];

  if (input.charAt(2) === "L") {
    const line = termA.length > 6 ? lineParser(termA.slice(1, -1), 0) : termA;
    finalInput = termA.length > 6 ? finalInput : input;

    const s = termChecker(termA.slice(1, 5));

    return corec[s](finalInput, line.a, line.b);
  } else if (input.charAt(2) === "R") {
    const line = termB.length > 6 ? lineParser(termB.slice(1, -1), 0) : termB;
    finalInput = termB.length > 6 ? finalInput : input;

    const t = termChecker(termB.slice(1, 5));

    return corec[t](finalInput, line.a, line.b);
  }

  return "";
};

export const corec = {
  unit,
  iden,
  injl,
  injr,
  take,
  drop,
  comp,
  pair,
  case: case_,
};
