"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ts_log_1 = require("ts-log");
const app = express_1.default();
const port = 8080;
const log = ts_log_1.dummyLogger;
app.get("/", (req, res) => {
    const a = res.send("Hello world!");
});
// start the Express server
app.listen(port, () => {
    log.info(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map