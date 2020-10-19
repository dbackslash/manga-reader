import { ipcMain } from 'electron';
import { MangaReaderSpider } from './spiders';
import { fetchManga, toggleFavManga } from './database';

const spider = new MangaReaderSpider();

ipcMain.handle('topManga', (event) => {
  return spider.topManga();
});

ipcMain.handle('getMangaMeta', (event, manga: Manga) => {
  return fetchManga(manga.site, manga.id);
})

ipcMain.handle('favManga', (event, manga: Manga, doc?: MangaDocument) => {
  return toggleFavManga(manga, doc?._id);
})