"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const constants_1 = require("./constants");
const routes_1 = __importDefault(require("./api/routes"));
const socket_1 = __importDefault(require("./connections/socket"));
const mongoose_1 = __importDefault(require("./connections/mongoose"));
const app = (0, express_1.default)();
const options = { credentials: true, origin: constants_1.CLIENT_URL };
app.use(express_1.default.json());
app.use((0, cors_1.default)(options));
app.use((0, cookie_parser_1.default)());
app.use(routes_1.default);
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, { cors: options });
httpServer.listen(constants_1.PORT, () => {
    (0, socket_1.default)(io);
    (0, mongoose_1.default)();
    console.log(`Server is running on port ${constants_1.PORT}`);
}).on("error", () => process.exit(1));
