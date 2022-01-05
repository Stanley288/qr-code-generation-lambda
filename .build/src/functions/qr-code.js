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
exports.handler = void 0;
const easyqrcodejs_nodejs_1 = __importDefault(require("easyqrcodejs-nodejs"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = JSON.parse(event.body || '');
        const responseHeaders = {
            'Content-Type': 'application/json',
        };
        const { url, title, logo = undefined, color = "#000", } = body;
        const options = {
            text: url,
            title: title,
            titleTop: 0,
            logo,
            quietZone: 15,
            dotScale: 0.5,
            width: 256,
            height: 256,
            colorDark: color,
            colorLight: "#ffffff",
            correctLevel: easyqrcodejs_nodejs_1.default.CorrectLevel.H,
        };
        const qrCode = new easyqrcodejs_nodejs_1.default(options);
        const dataUri = yield qrCode.toDataURL();
        const res = {
            statusCode: 200,
            headers: Object.assign({}, responseHeaders),
            body: JSON.stringify(dataUri),
        };
        return res;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
});
exports.handler = handler;
exports.default = {};
