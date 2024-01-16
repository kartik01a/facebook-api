"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res, next) => {
    try {
        res.clearCookie('authToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ ok: true, message: "User has been logged out" });
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
//# sourceMappingURL=logout.js.map