import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  constructor(private readonly http: HttpClient) {}

  deleteMovie(movie: any) {
    return this.http.post(
      `${environment.backendUrl}/cleanup/deleteMovie`,
      movie
    );
  }
}
