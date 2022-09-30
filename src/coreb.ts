const unit = (a: string) => {
  if (!a) throw "A couldn't be empty";

  return "<>";
};

const iden = (a: string) => {
  return a;
};

const injl = (term: string) => {
  return "σL(" + term + ")";
};

const injr = (term: string) => {
  return "σR(" + term + ")";
};

const take = (termA: string, termB: string) => {
  if (!termB) throw "B couldn't be empty";
  return termA;
};

const drop = (termA: string, termB: string) => {
  if (!termA) throw "A couldn't be empty";

  return termB;
};

const comp = (term: any) => {
  return term;
};

const pair = (termA: any, termB: any) => {
  return "<" + termA + "," + termB + ">";
};

const case_ = (a: string, c: string, termA: any, termB: any) => {
  if (a.charAt(1) === "L") {
    return termA;
  } else if (a.charAt(1) === "R") {
    return termB;
  }
};

export const core = {
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
