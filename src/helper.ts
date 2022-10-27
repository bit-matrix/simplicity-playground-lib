export const makeid = (length: number) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const termChecker = (termName: string) => {
  if (
    termName !== "unit" &&
    termName !== "iden" &&
    termName !== "injl" &&
    termName !== "injr" &&
    termName !== "take" &&
    termName !== "drop" &&
    termName !== "comp" &&
    termName !== "case" &&
    termName !== "pair"
  )
    throw "Invalid term name";

  return termName;
};

export const termArgumenetCount = (termName: string) => {
  if (termName === "pair" || termName === "comp" || termName === "case") {
    return 2;
  }

  if (termName === "unit" || termName === "iden") {
    return 0;
  }

  // injl , injr , take , drop
  return 1;
};

export type SimplicityData = {
  term: string;
  program: string;
};

const deepCopy = <T>(oldObject: T): T => {
  return JSON.parse(JSON.stringify(oldObject)) as T;
};

// const replaceAll = (str: string, find: string, replace: string) => {
//   return str.replace(new RegExp("^" + find + "$"), replace);
// };

export const programConverter = (values: SimplicityData[]) => {
  const newValues = deepCopy(values);

  newValues.map((value, index) => {
    newValues.slice(0, index).map((compiled_value) => {
      value.program = value.program.replaceAll(new RegExp("\\b" + compiled_value["term"] + "\\b", "gi"), compiled_value["program"]);
    });
  });

  return newValues;
};

export const isProductType = (text: string) => {
  if (text.startsWith("<") && text.charAt(text.length - 1) === ">") {
    return true;
  }

  throw "Input must be product type";
};

export const productTypeBreaker = (text: string) => {
  let firstIndent;
  let lastIndent;
  let startCount = 0;
  let endCount = 0;

  for (let i = 0; i < text.length; i++) {
    if (!firstIndent && text[i] === "(") {
      firstIndent = i;
    }

    if (text[i] === "(") startCount++;

    if (text[i] === ")") endCount++;

    if (!lastIndent && startCount > 0 && endCount > 0) {
      if (startCount - endCount === 0) {
        lastIndent = i;
      }
    }
  }

  return { a: text.slice((firstIndent || 0) + 1, lastIndent), b: text.slice((lastIndent || 0) + 2, text.length - 1) };
};
