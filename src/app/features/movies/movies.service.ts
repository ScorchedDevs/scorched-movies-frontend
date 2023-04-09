import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  trackersArray = [
    'udp://open.demonii.com:1337/announce',
    'udp://tracker.openbittorrent.com:80',
    'udp://tracker.coppersurfer.tk:6969',
    'udp://glotorrents.pw:6969/announce',
    'udp://tracker.opentrackr.org:1337/announce',
    'udp://torrent.gresille.org:80/announce',
    'udp://p4p.arenabg.com:1337',
    'udp://tracker.leechers-paradise.org:6969',
    'udp://tracker.opentrackr.org:1337/announce',
    'udp://open.tracker.cl:1337/announce',
    'udp://9.rarbg.me:2970/announce',
    'udp://p4p.arenabg.com:1337/announce',
    'udp://tracker.torrent.eu.org:451/announce',
    'udp://tracker.dler.org:6969/announce',
    'udp://open.stealth.si:80/announce',
    'udp://ipv4.tracker.harry.lu:80/announce',
    'https://opentracker.i2p.rocks:443/announce',
  ];

  downloadMovie(torrent: any, movie: any) {
    const magnetUrl = `magnet:?xt=urn:btih:${
      torrent.hash
    }&dn=${movie.title.replaceAll(' ', '+')}&tr=${this.trackersArray.join(
      '&tr='
    )}`;

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
