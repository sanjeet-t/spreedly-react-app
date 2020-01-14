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
const express_1 = require("express");
const config_json_1 = __importDefault(require("../../config.json"));
const spreedlyAPI_1 = require("./spreedlyAPI");
const spreedlyAPI = new spreedlyAPI_1.SpreedlyAPI(config_json_1.default);
const spreedlyRouter = express_1.Router();
spreedlyRouter.get('/', (req, res) => {
    return res.status(200).send('Spreedy route OK');
});
spreedlyRouter.post('/preauth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: token } = req.body;
    try {
        const preauth = yield spreedlyAPI.preauth(token, 100, 'USD');
        return res.status(200).send(preauth.data);
    }
    catch (e) {
        console.error(`Spreedly preauth error : ${e}`);
        return res.status(400).send(e);
    }
}));
spreedlyRouter.post('/capture', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: token } = req.body;
    try {
        const capture = yield spreedlyAPI.capture(token);
        return res.status(200).send(capture.data);
    }
    catch (e) {
        console.error(`Spreedly capture error : ${e}`);
        return res.status(400).send(e);
    }
}));
spreedlyRouter.post('/refund', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: token } = req.body;
    try {
        const refund = yield spreedlyAPI.fullRefund(token);
        return res.status(200).send(refund.data);
    }
    catch (e) {
        console.error(`Spreedly refund error : ${e}`);
        return res.status(400).send(e);
    }
}));
module.exports = spreedlyRouter;
//# sourceMappingURL=spreedly.js.map