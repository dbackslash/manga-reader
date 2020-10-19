import { BaseSpider } from "./base";

export class MangaReaderSpider extends BaseSpider {

  site = 'mangareader.net';
  baseUrl = 'https://www.mangareader.net';

  async topManga(): Promise<Manga[]> {
    const $ = await this.crawl(`${this.baseUrl}/popular`)
    const mangas = $('.d39').map((i, elem) => {
      const site = this.site;
      const id = `${$(elem).find($('.d42 a')).attr('href')}`.substr(1);
      const cover = `https:${$(elem).find($('.d41')).data('src')}`;
      const title = $(elem).find($('.d42 a')).text();
      const url = this.baseUrl + $(elem).find($('.d42 a')).attr('href');
      const authors = [$(elem).find($('.d43')).text()];
      const type = $(elem).find($('.d45')).text();
      const genres = $(elem).find($('.d46')).text().split(', ');
      
      const manga: Manga = { site, id, title, url, cover, authors, type, genres };

      const statusMatch = $(elem).find($('.d44')).text().match(/(\d+) Chapters Published. \((\w+)\)/i);
      if (statusMatch) {
        manga.numChapters = Number(statusMatch[1]);
        manga.status = statusMatch[2];
      }
      
      return manga;
    }).get()

    return mangas;
  }

}