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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var spectrum_crawler_1 = require("./crawler/spectrum.crawler");
var hacker_news_crawler_1 = __importDefault(require("./crawler/hacker-news.crawler"));
var buzz_feed_news_crawler_1 = require("./crawler/buzz-feed-news.crawler");
var ny_times_crawler_1 = require("./crawler/ny-times.crawler");
var Queue = require('queue');
var newsList = [];
var newsFetchingQueue = Queue({
    autostart: true,
    concurrency: 1,
});
function getCrawler(url) {
    if (url.includes('spectrum.ieee.org')) {
        return new spectrum_crawler_1.SpectrumCrawler();
    }
    if (url.includes('buzzfeednews.com')) {
        return new buzz_feed_news_crawler_1.BuzzFeedNewsCrawler();
    }
    if (url.includes('www.nytimes.com')) {
        return new ny_times_crawler_1.NYTimesCrawler();
    }
    return null;
}
function fetchNews() {
    return __awaiter(this, void 0, void 0, function () {
        var page, hackerNewsList, newsItems;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = 0;
                    hackerNewsList = [];
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    page++;
                    return [4 /*yield*/, hacker_news_crawler_1.default.craw("https://news.ycombinator.com/best?p=" + page)];
                case 2:
                    newsItems = _a.sent();
                    if (!newsItems.length) {
                        return [3 /*break*/, 3];
                    }
                    hackerNewsList = hackerNewsList.concat(newsItems);
                    return [3 /*break*/, 1];
                case 3:
                    hackerNewsList.forEach(function (HNews) {
                        newsFetchingQueue.push(function (cb) { return __awaiter(_this, void 0, void 0, function () {
                            var crawler, news;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        crawler = getCrawler(HNews.url);
                                        if (!crawler) {
                                            console.error("url is not supported", HNews);
                                            cb();
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, crawler.craw(HNews.url)];
                                    case 1:
                                        news = _a.sent();
                                        news.id = HNews.id;
                                        news.title = HNews.title;
                                        news.origin_url = HNews.url;
                                        newsList.push(news);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    setTimeout(function () { return fetchNews(); }, 3600000);
                    return [2 /*return*/];
            }
        });
    });
}
fetchNews();
exports.default = {
    list: function (req, res) {
        res.send(newsList);
    },
    detail: function (req, res) {
        var id = req.params['id'];
        res.send(newsList.find(function (news) { return news.id == id; }));
    }
};
