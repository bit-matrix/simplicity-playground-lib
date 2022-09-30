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

  return 1;
};
