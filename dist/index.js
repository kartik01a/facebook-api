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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const connect = require("./DB/connect");
const route_1 = __importDefault(require("./routes/route"));
require("express-async-errors");
// import imageRoute from './routes/images' ;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT || 5000;
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/', route_1.default);
app.use(errorHandler_1.default);
// app.use('/image',imageRoute)
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connectDB
        yield connect.connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
//# sourceMappingURL=index.js.map