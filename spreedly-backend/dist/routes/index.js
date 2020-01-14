"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const login_1 = __importDefault(require("./users/login"));
const spreedly_1 = __importDefault(require("./spreedly/spreedly"));
const router = express_1.Router();
router.use('/login', login_1.default);
router.use('/spreedly', spreedly_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map