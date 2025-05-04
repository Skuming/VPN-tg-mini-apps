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
const DB_1 = require("./DB/DB");
const cors_1 = __importDefault(require("cors"));
const validate_1 = __importDefault(require("./handlers/validate"));
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)());
app.post("/api/validate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(ValidateInitData(req.body.rawdata));
    if (req.body.rawdata !== "") {
        const validateResult = yield (0, validate_1.default)(req.body.rawdata);
        if (validateResult.status === 200) {
            const userDBInfo = yield (0, DB_1.GetUserInfo)(validateResult.user.id);
            const userInfo = Object.assign(Object.assign({}, userDBInfo), { photo_url: validateResult.user.photo_url, first_name: validateResult.user.first_name, lang: validateResult.user.language_code });
            yield res.status(validateResult.status).send(userInfo);
        }
        else {
            yield res.status(validateResult.status).send(validateResult.error);
        }
    }
    else {
        res.status(401).send("Use Telegram client!");
    }
    // Need to send to front-end ValidateInitData(req.body.rawdata) or maybe
    // should add another func to validate in DB and after that send it :)
}));
app.listen(process.env.PORT, () => {
    console.log("Server started... " + process.env.PORT);
});
