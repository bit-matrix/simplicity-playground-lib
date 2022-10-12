const not = "comp(pair(iden)(unit))(case(injr(unit))(injl(unit)))";
const halfAdder = "case(drop(pair(injl(unit))(iden)))(drop(pair(iden)(" + not + ")))";

const true_bit = "injr(unit)";
const false_bit = "injl(unit)";

//01000001

const bs_01 = "pair(" + false_bit + ")" + "(" + true_bit + ")";
const bs_00 = "pair(" + false_bit + ")" + "(" + false_bit + ")";
const bs_10 = "pair(" + true_bit + ")" + "(" + false_bit + ")";
const bs_11 = "pair(" + true_bit + ")" + "(" + true_bit + ")";

const bs_0100 = "pair(" + bs_01 + ")" + "(" + bs_00 + ")";

const input = "<σL(<>),σR(<>)>";

const long = "pair(pair(unit)(pair(pair(iden)(injl(iden)))(pair(injr(iden))(iden))))(pair(pair(pair(injr(iden))(iden))(pair(iden)(injl(iden))))(unit))";
