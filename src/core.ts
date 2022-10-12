const unit = (a: string) => {
  if (!a) throw "A couldn't be empty";

  return "<>";
};

const iden = (a: string) => {
  return a;
};

const injl = (a: string, term: any) => {
  return "σL(" + term(a) + ")";
};

const injr = (a: string, term: any) => {
  return "σR(" + term(a) + ")";
};

const take = (a: string, b: string, term: any) => {
  return term(a);
};

const drop = (a: string, b: string, term: any) => {
  return term(b);
};

const comp = (a: string, term: any, term2: any) => {
  return term2(a, term(a));
};

const pair = (a: string, term: any, term2: any) => {
  return "<" + term(a) + "," + term2(a) + ">";
};

const case_ = (a: string, c: string, term: any, term2: any) => {
  if (a.charAt(1) === "L") {
    const input = a.slice(3, a.length - 1);
    return term(input, c);
  } else if (a.charAt(1) === "R") {
    const input = a.slice(3, a.length - 1);
    return term2(input, c);
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
