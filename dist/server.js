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
// external modules
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
// internal modules
const app_1 = __importDefault(require("./app"));
let server;
/**
 * Connects to MongoDB and starts the Express server.
 * Logs a message to the console indicating success or failure.
 * @returns {Promise<void>}
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DB_URL);
        console.log("Connected to DB!!");
        server = app_1.default.listen(process.env.PORT, () => {
            console.log(`Server is listening to port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
// start the server
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
}))();
