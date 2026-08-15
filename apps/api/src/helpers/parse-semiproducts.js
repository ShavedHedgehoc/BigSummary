"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSemiproducts = parseSemiproducts;
function parseSemiproducts(value) {
    let result = [];
    const re = /(?<={)([0-9]{6})#([0-9]{1,4}[A-L][0-9][X-Z,S,R]{0,1}[S]{0,1})#([^}]+)(?=})/g;
    const matchArr = [...value.matchAll(re)];
    if (matchArr.length > 0) {
        matchArr.map((item) => {
            result = [...result, { code: item[1], boil: item[2], marking: item[3] }];
        });
    }
    return result;
}
//# sourceMappingURL=parse-semiproducts.js.map