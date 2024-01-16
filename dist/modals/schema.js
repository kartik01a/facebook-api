"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema
const schema = new mongoose_1.Schema({
    Fname: { type: String, required: true },
    Lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    imageUrl: { type: String, required: false },
});
exports.default = (0, mongoose_1.model)('User', schema);
//# sourceMappingURL=schema.js.map