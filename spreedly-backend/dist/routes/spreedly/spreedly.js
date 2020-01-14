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
// const axios = require('axios').default;
const axios_1 = __importDefault(require("axios"));
const spreedlyRouter = express_1.Router();
const spreedyAPI_1 = require("./spreedyAPI");
spreedlyRouter.get('/', (req, res) => {
    return res.status(200).send('Spreedy route OK');
});
spreedlyRouter.post('/preauth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: token } = req.body;
    try {
        const preauth = yield spreedyAPI_1.spreedlyAPI.authorize.create(spreedyAPI_1.testGateWayToken, {
            transaction: {
                payment_method_token: token,
                amount: 100,
                currency_code: 'USD'
            }
        });
        return res.status(200).send(preauth);
    }
    catch (e) {
        console.error(`Spreedly preauth error : ${JSON.stringify(e)}`);
        return res.status(400).send(e);
    }
}));
spreedlyRouter.post('/capture', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: token } = req.body;
    try {
        const capture = yield spreedyAPI_1.spreedlyAPI.capture.fullAmount(token);
        return res.status(200).send(capture);
    }
    catch (e) {
        console.error(`Spreedly capture error : ${JSON.stringify(e)}`);
        return res.status(400).send(e);
    }
}));
spreedlyRouter.post('/refund', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: token } = req.body;
    const refundUrl = `https://core.spreedly.com/v1/transactions/${token}/credit.json`;
    try {
        const response = yield axios_1.default.post(refundUrl, {}, {
            auth: {
                username: config_json_1.default.SPREEDLY_USERNAME,
                password: config_json_1.default.SPREEDLY_PASSWORD
            }
        });
        return res.status(200).send(response.data);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }
}));
module.exports = spreedlyRouter;
//# sourceMappingURL=spreedly.js.map