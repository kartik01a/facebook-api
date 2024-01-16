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
exports.ownership = exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    // Extracting tokens from cookies
    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    if (!authToken) {
        return res.status(401).json({ message: "No authToken or refreshToken is provided " });
    }
    // verifying the takens
    jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET_KEY || "", (err, decode) => {
        if (err) {
            jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY || "", (refreshErr, refreshDecode) => {
                if (refreshErr) {
                    return res.status(401).json({ message: "Both tokens are invalid" });
                }
                else {
                    const newAuthToken = jsonwebtoken_1.default.sign({ userId: refreshDecode.userId }, process.env.JWT_SECRET_KEY || "", { expiresIn: '30m' });
                    const newRefreshToken = jsonwebtoken_1.default.sign({ userId: refreshDecode.userId }, process.env.JWT_REFRESH_SECRET_KEY || "", { expiresIn: '2h' });
                    res.cookie('authToken', newAuthToken, { httpOnly: true });
                    res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
                    console.log(refreshDecode.userId, "liasd");
                    req.userId = refreshDecode.userId;
                    next();
                }
            });
        }
        else {
            req.userId = decode.userId;
            next();
        }
    });
};
exports.checkAuth = checkAuth;
const ownership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const authToken = req.cookies.authToken;
        const decodedToken = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET_KEY || '');
        const userId = decodedToken;
        if (!userId) {
            return res.sendStatus(400);
        }
        if (userId !== id) {
            return res.sendStatus(403);
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.ownership = ownership;
//# sourceMappingURL=checkAuthToken.js.map