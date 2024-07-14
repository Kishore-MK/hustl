"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./router/user"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
exports.app = app;
const cors = require('cors');
app.use(body_parser_1.default.json());
app.use("/api/user", user_1.default);
app.use(cors());
app.use(express_1.default.json());
app.listen(4000);
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
exports.corsOptions = corsOptions;
app.use(cors(corsOptions));
