"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imovelText = void 0;
const imovelText = (imovelData) => {
    return `
**Nome:** ${imovelData.title}
**Valor:** ${imovelData.amount}
**Status:** ${imovelData.status}
**Link:** ${imovelData.url}
`;
};
exports.imovelText = imovelText;
