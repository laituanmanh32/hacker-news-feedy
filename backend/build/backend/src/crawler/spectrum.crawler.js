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
exports.SpectrumCrawler = void 0;
var ACrawler_1 = require("./ACrawler");
var SpectrumCrawler = /** @class */ (function (_super) {
    __extends(SpectrumCrawler, _super);
    function SpectrumCrawler() {
        var _this = _super.call(this) || this;
        _this.scraper = 'puppeteer';
        return _this;
    }
    SpectrumCrawler.prototype.handleHtml = function ($) {
        var blogInner = $('#blog-inner').html();
        var articleVideo = $('#article-detail-video').html();
        var body_html = blogInner || articleVideo;
        body_html = body_html.replace(/\n/g, '');
        var excerp = $('.article-dek').text();
        var image = $('app-blog-detail').find('img').first().attr('src');
        return {
            id: null,
            title: null,
            excerp: excerp,
            body_html: body_html,
            image: image,
            origin_url: null,
            source: 'Spectrum'
        };
    };
    return SpectrumCrawler;
}(ACrawler_1.ACrawler));
exports.SpectrumCrawler = SpectrumCrawler;
