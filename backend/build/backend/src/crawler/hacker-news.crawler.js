"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackerNewsCrawler = void 0;
var ACrawler_1 = require("./ACrawler");
var HackerNewsCrawler = /** @class */ (function (_super) {
    __extends(HackerNewsCrawler, _super);
    function HackerNewsCrawler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HackerNewsCrawler.prototype.handleHtml = function ($) {
        var $athings = $('.athing');
        var hackerNewsList = $athings.toArray().map(function ($athing) {
            var $storylink = $($athing).find('.storylink');
            var id = $($athing).attr('id');
            var title = $storylink.text();
            var url = $storylink.attr('href');
            return {
                id: id,
                title: title,
                url: url
            };
        });
        return hackerNewsList;
    };
    return HackerNewsCrawler;
}(ACrawler_1.ACrawler));
exports.HackerNewsCrawler = HackerNewsCrawler;
var hackerNewsCrawler = new HackerNewsCrawler();
exports.default = hackerNewsCrawler;
