export const unit = (input?: any) => {
  // ilk eleman tag, diğer eleman(lar) data
  // bir array 2 elemanlıysa ya unit type idir ya da sum type idir
  // bir array 3 elemanlıysa product type idir

  return [0, 1];
};

export const iden = (input?: any) => {
  return input;
};

export const injl = (input: any, argument: any) => {
  return [1, argument(input)];
};

export const injr = (input: any, argument: any) => {
  return [2, argument(input)];
};

export const pair = (input: any, argument1: any, argument2: any) => {
  let returnx = [0];

  if (argument1.length == 1) {
    returnx.push(argument1[0](input));
  } else if (argument1.length == 2) {
    returnx.push(argument1[0](input, argument1[1]));
  }

  if (argument2.length == 1) {
    returnx.push(argument2[0](input));
  } else if (argument2.length == 2) {
    returnx.push(argument2[0](input, argument2[1]));
  }

  return returnx;
};
