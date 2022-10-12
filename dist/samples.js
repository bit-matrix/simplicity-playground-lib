"use strict";
var not = "comp(pair(iden)(unit))(case(injr(unit))(injl(unit)))";
var halfAdder = "case(drop(pair(injl(unit))(iden)))(drop(pair(iden)(" + not + ")))";
var true_bit = "injr(unit)";
var false_bit = "injl(unit)";
//01000001
var bs_01 = "pair(" + false_bit + ")" + "(" + true_bit + ")";
var bs_00 = "pair(" + false_bit + ")" + "(" + false_bit + ")";
var bs_10 = "pair(" + true_bit + ")" + "(" + false_bit + ")";
var bs_11 = "pair(" + true_bit + ")" + "(" + true_bit + ")";
var bs_0100 = "pair(" + bs_01 + ")" + "(" + bs_00 + ")";
var input = "<σL(<>),σR(<>)>";
var long = "pair(pair(unit)(pair(pair(iden)(injl(iden)))(pair(injr(iden))(iden))))(pair(pair(pair(injr(iden))(iden))(pair(iden)(injl(iden))))(unit))";
//# sourceMappingURL=samples.js.map