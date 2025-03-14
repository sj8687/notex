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
exports.loginRoute = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const types_1 = require("../zodTypes/types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenMiddeleware_1 = require("../middlewares/tokenMiddeleware");
exports.loginRoute = (0, express_1.default)();
const client = new client_1.PrismaClient();
exports.loginRoute.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const parseData = types_1.userTypes.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({
                error: "invalid input"
            });
        }
        else {
            const username = (_a = parseData.data) === null || _a === void 0 ? void 0 : _a.username;
            const email = (_b = parseData.data) === null || _b === void 0 ? void 0 : _b.email;
            const password = (_c = parseData.data) === null || _c === void 0 ? void 0 : _c.password;
            const securePassword = yield bcrypt_1.default.hash(password, 5);
            const userExistOrNot = yield client.user.findFirst({
                where: {
                    email
                }
            });
            if (!userExistOrNot) {
                const transaction = yield client.$transaction((client) => __awaiter(void 0, void 0, void 0, function* () {
                    yield client.user.create({
                        data: {
                            username,
                            email,
                            password: securePassword
                        }
                    });
                }));
                res.status(200).json({
                    message: "SignUp success"
                });
            }
            else {
                res.status(409).json({
                    error: "user alrady exist"
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error signUp fail" });
    }
}));
exports.loginRoute.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseData = types_1.userTypes.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({
                error: "invalid inputs"
            });
        }
        else {
            const email = parseData.data.email;
            const password = parseData.data.password;
            const userExistOrNot = yield client.user.findFirst({
                where: {
                    email,
                }
            });
            if (userExistOrNot) {
                const validUser = yield bcrypt_1.default.compare(password, userExistOrNot === null || userExistOrNot === void 0 ? void 0 : userExistOrNot.password);
                if (validUser) {
                    const token = jsonwebtoken_1.default.sign({
                        email: userExistOrNot.email
                    }, jwtSecret);
                    res.cookie("token", token, {
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax"
                    }).json({
                        login: "success",
                    });
                }
                else {
                    res.status(404).json({
                        error: "Incorrect Password"
                    });
                }
            }
            else {
                res.status(404).json({
                    error: "user not exist SignUp please"
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
exports.loginRoute.get("/authorized", (req, res) => {
    const token = req.cookies.token;
    try {
        const authorized = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (authorized) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    catch (error) {
        res.send(false);
    }
});
exports.loginRoute.get("/getuser", tokenMiddeleware_1.tokenMiddleware, (req, res) => {
    try {
        const username = req.username;
        res.status(200).send(username);
        if (!username) {
            res.send("somthing wrong");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginRoute.post("/logout", tokenMiddeleware_1.tokenMiddleware, (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });
    res.status(200).send("Logout success");
});
