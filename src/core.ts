const unit = (input?: any) => {
  // ilk eleman tag, diğer eleman(lar) data
  // bir array 2 elemanlıysa ya unit type idir ya da sum type idir
  // bir array 3 elemanlıysa product type idir

  return [0, 1];
};

const iden = (input?: any) => {
  return input;
};

const injl = (input: any, argument: any) => {
  return [1, argument(input)];
};

const injr = (input: any, argument: any) => {
  return [2, argument(input)];
};

const take = () => {
  return [];
};

const drop = () => {
  return [];
};

const comp = () => {
  return [];
};

const pair = () => {
  return [];
};

const case_ = () => {
  return [];
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
  case_,
};
