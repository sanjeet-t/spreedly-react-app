"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_json_1 = __importDefault(require("./config.json"));
const index_1 = __importDefault(require("./routes/index"));
const PORT = config_json_1.default.PORT;
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.use(body_parser_1.default.json());
app.use('/', index_1.default);
app.get('/', (req, res) => {
    return res.status(200).send(`Spreedy-API is up`);
});
app.listen(PORT, () => {
    console.log(`App running on port : ${PORT}`);
});
//# sourceMappingURL=index.js.map