import { iden, injl, injr, pair, unit } from "./core";

let output = "";

export const stringifyData = (input: any[]) => {
  const tag = input[0];

  if (tag == 0) {
  } else if (tag == 1) {
    output += "σL(";
  } else if (tag == 2) {
    output += "σR(";
  }

  if (input.length == 2) {
    if (input[1] == 1) {
      output += "<>";
    } else {
      stringifyData(input[1]);
    }
  } else {
    output += "<";
    if (input[1] == 1) {
      output += "<>";
    } else {
      stringifyData(input[1]);
    }
    output += ",";
    if (input[2] == 1) {
      output += "<>";
    } else {
      stringifyData(input[2]);
    }
    output += ">";
  }

  if (tag == 0) {
  } else if (tag == 1) {
    output += ")";
  } else if (tag == 2) {
    output += ")";
  }

  return output;
};

//const input = [2, [2, [1, [0, 1]]], [2, [1, [0, 1]]]];
const input1 = injr(injl(null, unit), iden);
const input2 = injr(injl(null, unit), iden);

//const input3 = pair(input1, [injl, iden], [injl, unit]);
const inputt = injr(unit(), iden);
const input3 = pair(inputt, [iden], [iden]);

const result = stringifyData(input3 || []);

console.log(result);
