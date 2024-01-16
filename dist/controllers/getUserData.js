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
exports.getuserdata = void 0;
// import { compareSync } from "bcrypt-ts";
const schema_1 = __importDefault(require("../modals/schema"));
const getuserdata = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const id = req.userId;
        const { id } = req.params;
        console.log(id);
        const user = yield schema_1.default.findById(`${id}`).select('-password');
        // console.log(user)
        res.status(200).json({ user });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getuserdata = getuserdata;
//# sourceMappingURL=getUserData.js.map