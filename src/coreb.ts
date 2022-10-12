const unit = (a: string) => {
  if (!a) throw "A couldn't be empty";

  return "<>";
};

const iden = (a: string) => {
  return a;
};

const injl = (a: string) => {
  return "σL(" + a + ")";
};

const injr = (a: string) => {
  return "σR(" + a + ")";
};

const take = (input: string) => {
  return input.split(",")[0].substring(1);
};

const drop = (input: string) => {
  return input.split(",")[1].slice(0, -1);
};

const comp = (term: any) => {
  return term;
};

const pair = (input: string, termA: any, termB: any) => {
  return "<" + termA + "," + termB + ">";
};

const case_ = (a: string, termA: any, termB: any) => {
  // @TO-DO throw
  if (a.charAt(2) === "L") {
    return termA;
  } else if (a.charAt(2) === "R") {
    return termB;
  }

  return "";
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
