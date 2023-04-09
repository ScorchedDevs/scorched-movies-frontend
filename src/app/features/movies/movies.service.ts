import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private readonly http: HttpClient) {}

  getMoviesList(page = 1, searchQuery: string) {
    return this.http.get(`${environment.backendUrl}/yts/list`, {
      params: { limit: 18, page, searchQuery },
    });
  }

  downloadMovie(torrent: any, movie: any) {
    const magnetUrl =
      `magnet:?xt=urn:btih:${torrent.hash}&dn=${movie.title.replaceAll(
        ' ',
        '+'
      )}&tr=udp://open.demonii.com:1337/announce` +
      '&tr=udp://tracker.openbittorrent.com:80' +
      '&tr=udp://tracker.coppersurfer.tk:6969' +
      '&tr=udp://glotorrents.pw:6969/announce' +
      '&tr=udp://tracker.opentrackr.org:1337/announce' +
      '&tr=udp://torrent.gresille.org:80/announce' +
      '&tr=udp://p4p.arenabg.com:1337' +
      '&tr=udp://tracker.leechers-paradise.org:6969';

    return this.http.post(`${environment.backendUrl}/torrent/download`, {
      magnetLink: magnetUrl,
      name: movie.title,
      quality: `${torrent.quality} ${torrent.type}`,
      imdbId: movie.imdb_code,
      image: movie.medium_cover_image,
    });
  }

  getUserMovies() {
    return this.http.get(`${environment.backendUrl}/movies/userMovies`);
  }
}
