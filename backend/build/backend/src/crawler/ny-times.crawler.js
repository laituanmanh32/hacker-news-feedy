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
exports.NYTimesCrawler = void 0;
var ACrawler_1 = require("./ACrawler");
var NYTimesCrawler = /** @class */ (function (_super) {
    __extends(NYTimesCrawler, _super);
    function NYTimesCrawler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NYTimesCrawler.prototype.handleHtml = function ($) {
        var $body = $('section[name=articleBody]');
        var body_html = $body.html();
        var image = $('header').find('img').first().attr('src');
        return {
            id: null,
            title: null,
            excerp: null,
            body_html: body_html,
            image: image,
            origin_url: null,
            source: 'TheNewYorkTimes'
        };
    };
    return NYTimesCrawler;
}(ACrawler_1.ACrawler));
exports.NYTimesCrawler = NYTimesCrawler;
