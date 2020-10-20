
declare interface Manga {
  site: string;
  id: string;
  title: string;
  url: string;
  cover: string;
  authors: string[];
  numChapters?: number;
  status?: string;
  type: string;
  genres: string[];
}

declare interface MangaDocument {
  _id?: string;
  _rev?: string;
  manga: Manga;
  favorite: boolean;
  readed: {[k: string]: number};
}
