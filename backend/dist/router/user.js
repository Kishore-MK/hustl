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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const express_1 = require("express");
const client_1 = require("@prisma/client");
const cors = require('cors');
const router = (0, express_1.Router)();
const prismaClient = new client_1.PrismaClient();
router.get("/getuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient.user.findUnique({
        where: {
            address: 'mywalletaddress',
        },
    });
    console.log(user);
    return res.json({ user });
}));
router.post("/createaccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient.user.findUnique({
        where: {
            address: 'mywallress',
        },
    });
    console.log(user);
    if (user == null) {
        const response = yield prismaClient.user.create({
            data: {
                address: "mywalletaddress",
                rewards: 0
            }
        });
        return res.json({ response });
    }
    else {
        return res.json({
            data: "Account already exist.."
        });
    }
}));
router.get("/getquestion", cors(__1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question = req.body;
    console.log(question);
    const response = yield prismaClient.question.findFirst({
        where: question
    });
    const responses = yield prismaClient.answer.findMany({
        where: {
            question_id: response === null || response === void 0 ? void 0 : response.id
        }
    });
    const result = {
        question: response,
        answers: responses
    };
    // console.log(response);
    console.log(result);
    return res.json({ result });
}));
router.post("/postquestion", cors(__1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    // const response = await prismaClient.question.create({
    //     data: body
    // });
    console.log(body);
    // return res.json({response});
}));
router.post("/postanswer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    data.upvote = 0;
    data.downvote = 0;
    console.log(data);
    const response = yield prismaClient.answer.create({
        data: data
    });
    return res.json({ response });
}));
router.put("/updateanswer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prismaClient.answer.updateMany({
        where: {
            user_id: 1,
            question_id: 1,
        },
        data: {
            content: "hey hii answerrr"
        }
    });
    return res.json({ response });
}));
router.put("/upvoteanswer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prismaClient.answer.updateMany({
        where: {
            user_id: 1,
            question_id: 1,
        },
        data: {
            upvote: 1
        }
    });
    return res.json({ response });
}));
router.put("/downvoteanswer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prismaClient.answer.updateMany({
        where: {
            user_id: 1,
            question_id: 1,
        },
        data: {
            downvote: 1
        }
    });
    return res.json({ response });
}));
router.get("/getanswer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prismaClient.answer.findFirst({
        where: {
            user_id: 1,
            question_id: 1
        }
    });
    return res.json({ response });
}));
router.put("/rewards", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prismaClient.user.update({
        where: {
            address: 'mywalletaddress',
        },
        data: {
            rewards: 1
        }
    });
    return res.json({ response });
}));
exports.default = router;
