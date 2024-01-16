"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custonError_1 = __importDefault(require("../error/custonError"));
const errorHandlerMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(err)
    if (err instanceof custonError_1.default) {
        return res.status(404).json({ msg: err.message });
    }
    next(err);
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
});
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=errorHandler.js.map