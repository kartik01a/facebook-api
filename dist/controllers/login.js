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
exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const schema_1 = __importDefault(require("../modals/schema"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existinguser = yield schema_1.default.findOne({ email });
        // console.log(existinguser,"Email  ",email)
        //if user is not found
        if (!existinguser) {
            return res.status(407).json({ message: 'User not Exist' });
        }
        const isMatch = (0, bcrypt_1.compareSync)(("" + password), existinguser.password);
        //if password doens't match
        if (!isMatch) {
            return res.status(407).json({ message: 'Password not match' });
        }
        const id = existinguser._id;
        let refereshToken = "", AccessToken = "";
        refereshToken = yield jsonwebtoken_1.default.sign({ id }, process.env.JWT_REFRESH_SECRET_KEY, {
            expiresIn: "2h"
        });
        AccessToken = yield jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30m",
        });
        res.cookie('authToken', AccessToken, ({ httpOnly: true }));
        res.cookie('refreshToken', refereshToken, ({ httpOnly: true }));
        res.status(201).json({
            refereshToken,
            AccessToken,
            message: 'User logged in successfully'
        });
        next();
    }
    catch (err) {
        res.status(407).json({ message: err });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=login.js.map