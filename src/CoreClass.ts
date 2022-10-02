export class CoreClass {
  program: string = "";

  constructor(text: string) {}

  unit = (a: string) => {
    if (!a) throw "A couldn't be empty";

    return "<>";
  };

  iden = (a: string) => {
    return a;
  };

  injl = (a: string, term: any) => {
    return "σL(" + term(a) + ")";
  };

  injr = (a: string, term: any) => {
    return "σR(" + term(a) + ")";
  };

  take = (a: string, b: string, term: any) => {
    return term(a);
  };

  drop = (a: string, b: string, term: any) => {
    return term(b);
  };

  comp = (a: string, term: any, term2: any) => {
    return term2(a, term(a));
  };

  pair = (a: string, term: any, term2: any) => {
    return "<" + term(a) + "," + term2(a) + ">";
  };

  case_ = (a: string, c: string, term: any, term2: any) => {
    if (a.charAt(1) === "L") {
      const input = a.slice(3, a.length - 1);
      return term(input, c);
    } else if (a.charAt(1) === "R") {
      const input = a.slice(3, a.length - 1);
      return term2(input, c);
    }
  };
}
