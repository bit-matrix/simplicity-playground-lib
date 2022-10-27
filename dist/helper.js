"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeBreaker = exports.isProductType = exports.programConverter = exports.termArgumenetCount = exports.termChecker = exports.makeid = void 0;
var makeid = function (length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.makeid = makeid;
var termChecker = function (termName) {
    if (termName !== "unit" &&
        termName !== "iden" &&
        termName !== "injl" &&
        termName !== "injr" &&
        termName !== "take" &&
        termName !== "drop" &&
        termName !== "comp" &&
        termName !== "case" &&
        termName !== "pair")
        throw "Invalid term name";
    return termName;
};
exports.termChecker = termChecker;
var termArgumenetCount = function (termName) {
    if (termName === "pair" || termName === "comp" || termName === "case") {
        return 2;
    }
    if (termName === "unit" || termName === "iden") {
        return 0;
    }
    // injl , injr , take , drop
    return 1;
};
exports.termArgumenetCount = termArgumenetCount;
var deepCopy = function (oldObject) {
    return JSON.parse(JSON.stringify(oldObject));
};
// const replaceAll = (str: string, find: string, replace: string) => {
//   return str.replace(new RegExp("^" + find + "$"), replace);
// };
var programConverter = function (values) {
    var newValues = deepCopy(values);
    newValues.map(function (value, index) {
        newValues.slice(0, index).map(function (compiled_value) {
            value.program = value.program.replaceAll(new RegExp("\\b" + compiled_value["term"] + "\\b", "gi"), compiled_value["program"]);
        });
    });
    return newValues;
};
exports.programConverter = programConverter;
var isProductType = function (text) {
    if (text.startsWith("<") && text.charAt(text.length - 1) === ">") {
        return true;
    }
    throw "Input must be product type";
};
exports.isProductType = isProductType;
var productTypeBreaker = function (text) {
    var firstIndent;
    var lastIndent;
    var startCount = 0;
    var endCount = 0;
    for (var i = 0; i < text.length; i++) {
        if (!firstIndent && text[i] === "(") {
            firstIndent = i;
        }
        if (text[i] === "(")
            startCount++;
        if (text[i] === ")")
            endCount++;
        if (!lastIndent && startCount > 0 && endCount > 0) {
            if (startCount - endCount === 0) {
                lastIndent = i;
            }
        }
    }
    return { a: text.slice((firstIndent || 0) + 1, lastIndent), b: text.slice((lastIndent || 0) + 2, text.length - 1) };
};
exports.productTypeBreaker = productTypeBreaker;
//# sourceMappingURL=helper.js.map