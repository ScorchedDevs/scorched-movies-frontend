import {
  Component,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MoviesService } from 'src/app/features/movies/movies.service';
import { Socket } from 'ngx-socket-io';
import { Download } from '../models/download.model';
import { map } from 'rxjs';
import { DownloadService } from './download.service';
import { MessageType } from '../models/download.type.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  userMovies!: any;
  download!: Download;
  badgeHidden = true;
  badgeNumber = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly moviesService: MoviesService,
    private readonly downloadService: DownloadService
  ) {}

  async ngOnInit(): Promise<void> {
    this.reloadDownloadingMovies();

    this.downloadService.getNewMessage('message').subscribe((message: any) => {
      if (message.type === MessageType.DOWNLOAD_STARTED) {
        this.reloadDownloadingMovies(message);
      } else if (message.type === MessageType.DOWNLOAD_PROGRESS) {
        this.refreshDownloadProgress(message);
      } else if (message.type === MessageType.DOWNLOAD_FINISHED) {
        this.reloadDownloadingMovies(message);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  reloadDownloadingMovies(message?: any) {
    this.moviesService.getUserMovies().subscribe({
      next: (response) => {
        this.userMovies = response;
        this.userMovies.forEach((movie: any) => {
          if (message && message.id == movie.id) {
            ++this.badgeNumber;
            this.badgeHidden = false;
          }
          movie.downloaded = {
            downloadedAmount: 0,
            downloadSpeed: 0,
          };
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  refreshDownloadProgress(message: any) {
    this.userMovies.forEach((movie: any) => {
      if (movie.id === message.id) {
        movie.downloaded = {
          downloadedAmount: message.content.downloadedAmount,
          downloadSpeed: message.content.downloadSpeed,
        };
      }
    });
  }

  clickOnDownloadManager() {
    this.badgeHidden = true;
    this.badgeNumber = 0;
  }
}
