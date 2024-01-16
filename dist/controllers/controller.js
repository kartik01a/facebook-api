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
exports.registerUser = void 0;
const schema_1 = __importDefault(require("../modals/schema"));
const custonError_1 = __importDefault(require("../error/custonError"));
const bcrypt_1 = require("bcrypt");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Fname, Lname, email, phone, password } = req.body;
        // input passed or not
        if (!Fname)
            throw new custonError_1.default("First name required.");
        if (!Lname)
            throw new custonError_1.default("Last name required.");
        if (!email)
            throw new custonError_1.default("Email required.");
        if (!password)
            throw new custonError_1.default("Password required.");
        if (!phone)
            throw new custonError_1.default("Phone number required.");
        const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        // check input for correctness
        if (!pass.test(password.toString()))
            throw new custonError_1.default("Enter valid password with uppercase, lowercase, number & @");
        if (!expression.test(email.toString()))
            throw new custonError_1.default("Enter valid email");
        if (typeof phone !== 'number' && ("" + phone).length !== 10)
            throw new custonError_1.default("Phone number should only have 10 digits, No character allowed.");
        const existinguser = yield schema_1.default.findOne({ email });
        if (existinguser) {
            return res.status(407).json({ message: 'User already Exist' });
        }
        // password hashing
        const salt = (0, bcrypt_1.genSaltSync)(10);
        const hashPassword = (0, bcrypt_1.hashSync)(password.toString(), salt);
        yield new schema_1.default({ Fname, Lname, email, phone, password: hashPassword }).save();
        res.status(200).json({ msg: "New user registered" });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
//# sourceMappingURL=controller.js.map