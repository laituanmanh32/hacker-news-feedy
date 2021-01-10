import p = require('phin');
import cheerio = require('cheerio');

export abstract class Crawler<T> {
    public async craw(url: string): Promise<T> {
        const html = await this.loadHTML(url);
        return this.handleHtml(html);
    }

    private async loadHTML(url): Promise<string> {
        const response = await p(url);
        return response.body.toString();
    }

    abstract handleHtml(html: string): T;

}